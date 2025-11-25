import {
  Box,
  GridItem,
  Text,
  Spinner,
  Flex,
  chakra,
  VStack,
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type * as tac from '@blockscout/tac-operation-lifecycle-types';
import { SCROLL_L2_BLOCK_STATUSES } from 'types/api/scrollL2';
import type { Transaction } from 'types/api/transaction';
import { ZKEVM_L2_TX_STATUSES } from 'types/api/transaction';
import { ZKSYNC_L2_TX_BATCH_STATUSES } from 'types/api/zkSyncL2';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import useIsMobile from 'lib/hooks/useIsMobile';
import getNetworkValidatorTitle from 'lib/networks/getNetworkValidatorTitle';
import * as arbitrum from 'lib/rollups/arbitrum';
import getConfirmationDuration from 'lib/tx/getConfirmationDuration';
import { currencyUnits } from 'lib/units';
import { Badge } from 'toolkit/chakra/badge';
import { CollapsibleDetails } from 'toolkit/chakra/collapsible';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { Tooltip } from 'toolkit/chakra/tooltip';
import { WEI, WEI_IN_GWEI } from 'toolkit/utils/consts';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import CurrencyValue from 'ui/shared/CurrencyValue';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoSponsoredItem from 'ui/shared/DetailedInfo/DetailedInfoSponsoredItem';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import AddressEntityInterop from 'ui/shared/entities/address/AddressEntityInterop';
import BatchEntityL2 from 'ui/shared/entities/block/BatchEntityL2';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import IconSvg from 'ui/shared/IconSvg';
import LogDecodedInputData from 'ui/shared/logs/LogDecodedInputData';
import RawInputData from 'ui/shared/RawInputData';
import StatusTag from 'ui/shared/statusTag/StatusTag';
import TxStatus from 'ui/shared/statusTag/TxStatus';
import TextSeparator from 'ui/shared/TextSeparator';
import Utilization from 'ui/shared/Utilization/Utilization';
import VerificationSteps from 'ui/shared/verificationSteps/VerificationSteps';
import TxDetailsActions from 'ui/tx/details/txDetailsActions/TxDetailsActions';
import TxDetailsBurntFees from 'ui/tx/details/TxDetailsBurntFees';
import TxDetailsFeePerGas from 'ui/tx/details/TxDetailsFeePerGas';
import TxDetailsGasPrice from 'ui/tx/details/TxDetailsGasPrice';
import TxDetailsOther from 'ui/tx/details/TxDetailsOther';
import TxDetailsTokenTransfers from 'ui/tx/details/TxDetailsTokenTransfers';
import TxDetailsWithdrawalStatusOptimistic from 'ui/tx/details/TxDetailsWithdrawalStatusOptimistic';
import TxRevertReason from 'ui/tx/details/TxRevertReason';
import TxAllowedPeekers from 'ui/tx/TxAllowedPeekers';
import TxExternalTxs from 'ui/tx/TxExternalTxs';
import TxSocketAlert from 'ui/tx/TxSocketAlert';
import ZkSyncL2TxnBatchHashesInfo from 'ui/txnBatches/zkSyncL2/ZkSyncL2TxnBatchHashesInfo';

import TxDetailsGasUsage from './TxDetailsGasUsage';
import TxDetailsInterop from './TxDetailsInterop';
import TxDetailsSetMaxGasLimit from './TxDetailsSetMaxGasLimit';
import TxDetailsTacOperation from './TxDetailsTacOperation';
import TxDetailsTxFee from './TxDetailsTxFee';
import TxDetailsWithdrawalStatusArbitrum from './TxDetailsWithdrawalStatusArbitrum';
import TxInfoScrollFees from './TxInfoScrollFees';

interface Props {
  data: Transaction | undefined;
  tacOperations?: Array<tac.OperationDetails>;
  isLoading: boolean;
  socketStatus?: 'close' | 'error';
}

const externalTxFeature = config.features.externalTxs;
const rollupFeature = config.features.rollup;

const TxInfo = ({ data, tacOperations, isLoading, socketStatus }: Props) => {
  const { t } = useTranslation();
  const [ isExpanded, setIsExpanded ] = React.useState(false);

  const isMobile = useIsMobile();

  const externalTxsQuery = useApiQuery('general:tx_external_transactions', {
    pathParams: {
      hash: data?.hash,
    },
    queryOptions: {
      enabled: externalTxFeature.isEnabled,
      placeholderData: [ '1', '2', '3' ],
    },
  });

  const handleCutLinkClick = React.useCallback(() => {
    setIsExpanded((flag) => !flag);
  }, []);

  const showAssociatedL1Tx = React.useCallback(() => {
    setIsExpanded(true);
  }, []);

  if (!data) {
    return null;
  }

  const addressFromTags = [
    ...data.from.private_tags || [],
    ...data.from.public_tags || [],
    ...data.from.watchlist_names || [],
  ].map((tag) => <Badge key={ tag.label }>{ tag.display_name }</Badge>);

  const toAddress = data.to ? data.to : data.created_contract;
  const addressToTags = [
    ...toAddress?.private_tags || [],
    ...toAddress?.public_tags || [],
    ...toAddress?.watchlist_names || [],
  ].map((tag) => <Badge key={ tag.label }>{ tag.display_name }</Badge>);

  const executionSuccessBadge = toAddress?.is_contract && data.result === 'success' ? (
    <Tooltip content={t('transactions.common.contract_execution_completed')}>
      <chakra.span display="inline-flex" ml={ 2 } mr={ 1 }>
        <IconSvg name="status/success" boxSize={ 4 } color={{ _light: 'blackAlpha.800', _dark: 'whiteAlpha.800' }} cursor="pointer"/>
      </chakra.span>
    </Tooltip>
  ) : null;
  const executionFailedBadge = toAddress?.is_contract && Boolean(data.status) && data.result !== 'success' ? (
    <Tooltip content={t('transactions.common.error_occurred_during_contract')}>
      <chakra.span display="inline-flex" ml={ 2 } mr={ 1 }>
        <IconSvg name="status/error" boxSize={ 4 } color="text.error" cursor="pointer"/>
      </chakra.span>
    </Tooltip>
  ) : null;

  const hasInterop = rollupFeature.isEnabled && rollupFeature.interopEnabled && data.op_interop_messages && data.op_interop_messages.length > 0;

  return (
    <DetailedInfo.Container templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(215px, auto) minmax(0, 1fr)' }}>

      { config.features.metasuites.isEnabled && (
        <>
          <Box display="none" as="p" id="meta-suites__tx-info-label" data-status={ data.status } data-ready={ !isLoading }/>
          <Box display="none" as="p" id="meta-suites__tx-info-value"/>
          <DetailedInfo.ItemDivider display="none" as="p" id="meta-suites__details-info-item-divider"/>
        </>
      ) }

      { socketStatus && (
        <GridItem colSpan={{ base: undefined, lg: 2 }} mb={ 2 }>
          <TxSocketAlert status={ socketStatus }/>
        </GridItem>
      ) }

      { tacOperations && tacOperations.length > 0 && <TxDetailsTacOperation tacOperations={ tacOperations } isLoading={ isLoading } txHash={ data.hash }/> }

      { data.op_interop_messages ? data.op_interop_messages.map((message) => (
        <TxDetailsInterop key={ message.nonce } data={ message } isLoading={ isLoading }/>
      )) : null }

      <DetailedInfo.ItemLabel
        hint="Unique character string (TxID) assigned to every verified transaction"
        isLoading={ isLoading }
      >
        {t('transactions.common.transaction_hash')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow={ config.features.externalTxs.isEnabled && externalTxsQuery.data && externalTxsQuery.data.length > 0 }>
        <Flex flexWrap="nowrap" alignItems="center" overflow="hidden">
          { data.status === null && <Spinner mr={ 2 } size="sm" flexShrink={ 0 }/> }
          <Skeleton loading={ isLoading } overflow="hidden">
            <HashStringShortenDynamic hash={ data.hash }/>
          </Skeleton>
          <CopyToClipboard text={ data.hash } isLoading={ isLoading }/>
          { config.features.metasuites.isEnabled && (
            <>
              <TextSeparator flexShrink={ 0 } display="none" id="meta-suites__tx-explorer-separator"/>
              <Box display="none" flexShrink={ 0 } id="meta-suites__tx-explorer-link"/>
            </>
          ) }
        </Flex>
        { config.features.externalTxs.isEnabled && externalTxsQuery.data && externalTxsQuery.data.length > 0 && (
          <Skeleton loading={ isLoading || externalTxsQuery.isPlaceholderData } display={{ base: 'block', lg: 'inline-flex' }} alignItems="center">
            { !isMobile && <TextSeparator flexShrink={ 0 }/> }
            <TxExternalTxs data={ externalTxsQuery.data }/>
          </Skeleton>
        ) }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint="Current transaction state: Success, Failed (Error), or Pending (In Process)"
        isLoading={ isLoading }
      >
        {
          rollupFeature.isEnabled &&
          (rollupFeature.type === 'zkEvm' || rollupFeature.type === 'zkSync' || rollupFeature.type === 'arbitrum' || rollupFeature.type === 'scroll') ?
            t('transactions.common.l2_status_and_method') :
            t('transactions.common.status_and_method')
        }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <TxStatus status={ data.status } errorText={ data.status === 'error' ? data.result : undefined } isLoading={ isLoading }/>
        { data.method && (
          <Badge colorPalette={ data.method === t('common.common.multicall') ? 'teal' : 'gray' } loading={ isLoading } truncated ml={ 3 }>
            { data.method }
          </Badge>
        ) }
        { data.arbitrum?.contains_message && (
          <Skeleton loading={ isLoading } onClick={ showAssociatedL1Tx }>
            <Link truncate ml={ 3 }>
              { data.arbitrum?.contains_message === 'incoming' ? t('transactions.common.incoming_message') : t('transactions.common.outgoing_message') }
            </Link>
          </Skeleton>
        ) }
      </DetailedInfo.ItemValue>

      { rollupFeature.isEnabled && rollupFeature.type === 'optimistic' && data.op_withdrawals && data.op_withdrawals.length > 0 &&
      !config.UI.views.tx.hiddenFields?.L1_status && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.detailed_status_progress_of_th')}
          >
            {t('transactions.common.withdrawal_status')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Flex flexDir="column" rowGap={ 2 }>
              { data.op_withdrawals.map((withdrawal) => (
                <Box key={ withdrawal.nonce }>
                  <Box mb={ 2 }>
                    <span>{t('common.common.nonce')}{t('common.common.colon')} </span>
                    <chakra.span fontWeight={ 600 }>{ withdrawal.nonce }</chakra.span>
                  </Box>
                  <TxDetailsWithdrawalStatusOptimistic
                    status={ withdrawal.status }
                    l1TxHash={ withdrawal.l1_transaction_hash }
                  />
                </Box>
              )) }
            </Flex>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.zkevm_status && !config.UI.views.tx.hiddenFields?.L1_status && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.status_of_the_transaction_conf')}
            isLoading={ isLoading }
          >
            {t('transactions.common.confirmation_status')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <VerificationSteps currentStep={ data.zkevm_status } steps={ ZKEVM_L2_TX_STATUSES } isLoading={ isLoading }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.arbitrum?.status && !config.UI.views.tx.hiddenFields?.L1_status && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.status_of_the_transaction_conf')}
            isLoading={ isLoading }
          >
            {t('common.common.l1_status')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <VerificationSteps
              currentStep={ arbitrum.VERIFICATION_STEPS_MAP[data.arbitrum.status] }
              currentStepPending={ arbitrum.getVerificationStepStatus(data.arbitrum) === 'pending' }
              steps={ arbitrum.verificationSteps }
              isLoading={ isLoading }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.revert_reason && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.the_revert_reason_of_the_trans')}
          >
            {t('transactions.common.revert_reason')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue flexWrap="wrap" mt={{ base: '5px', lg: '4px' }}>
            <TxRevertReason { ...data.revert_reason }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.zksync && !config.UI.views.tx.hiddenFields?.L1_status && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.status_is_the_short_interpreta')}
            isLoading={ isLoading }
          >
            {t('common.common.l1_status')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <VerificationSteps steps={ ZKSYNC_L2_TX_BATCH_STATUSES } currentStep={ data.zksync.status } isLoading={ isLoading }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemLabel
        hint={t('transactions.common.block_number_containing_the_tr')}
        isLoading={ isLoading }
      >
        {t('transactions.common.block')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow={ Boolean(data.scroll?.l2_block_status) }>
        { data.block_number === null ?
          <Text>Pending</Text> : (
            <BlockEntity
              isLoading={ isLoading }
              number={ data.block_number }
              noIcon
            />
          ) }
        { Boolean(data.confirmations) && (
          <>
            <TextSeparator/>
            <Skeleton loading={ isLoading } color="text.secondary">
              <span>{ data.confirmations } Block confirmations</span>
            </Skeleton>
          </>
        ) }
        { data.scroll?.l2_block_status && (
          <>
            <TextSeparator/>
            <VerificationSteps steps={ SCROLL_L2_BLOCK_STATUSES } currentStep={ data.scroll.l2_block_status } isLoading={ isLoading }/>
          </>
        ) }
      </DetailedInfo.ItemValue>

      { data.zkevm_batch_number && !config.UI.views.tx.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint="Batch index for this transaction"
            isLoading={ isLoading }
          >
            {t('transactions.common.txn_batch')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <BatchEntityL2
              isLoading={ isLoading }
              number={ data.zkevm_batch_number }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.zksync && !config.UI.views.tx.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.batch_number')}
            isLoading={ isLoading }
          >
            {t('transactions.common.batch')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { data.zksync.batch_number ? (
              <BatchEntityL2
                isLoading={ isLoading }
                number={ data.zksync.batch_number }
              />
            ) : <Skeleton loading={ isLoading }>Pending</Skeleton> }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.arbitrum && !config.UI.views.tx.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.index_of_the_batch_containing_')}
            isLoading={ isLoading }
          >
            {t('transactions.common.batch')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { data.arbitrum.batch_number ?
              <BatchEntityL2 isLoading={ isLoading } number={ data.arbitrum.batch_number }/> :
              <Skeleton loading={ isLoading }>Pending</Skeleton> }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.timestamp && (
        <>
          <DetailedInfo.ItemLabel
            hint="Date & time of transaction inclusion, including length of time for confirmation"
            isLoading={ isLoading }
          >
            {t('transactions.common.timestamp')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue multiRow>
            <Flex alignItems="center" maxW="100%">
              <DetailedInfoTimestamp timestamp={ data.timestamp } isLoading={ isLoading }/>
            </Flex>
            { data.confirmation_duration && (
              <Flex alignItems="center">
                <TextSeparator hideBelow="lg"/>
                <Skeleton loading={ isLoading } color="text.secondary">
                  <span>{ getConfirmationDuration(data.confirmation_duration) }</span>
                </Skeleton>
              </Flex>
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.execution_node && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.node_that_carried_out_the_conf')}
            isLoading={ isLoading }
          >
            {t('transactions.common.kettle')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <AddressEntity
              address={ data.execution_node }
              href={ route({ pathname: '/txs/kettle/[hash]', query: { hash: data.execution_node.hash } }) }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.allowed_peekers && data.allowed_peekers.length > 0 && (
        <TxAllowedPeekers items={ data.allowed_peekers }/>
      ) }

      <DetailedInfoSponsoredItem isLoading={ isLoading }/>

      <DetailedInfo.ItemDivider/>

      <TxDetailsActions hash={ data.hash } actions={ data.actions } isTxDataLoading={ isLoading }/>

      <DetailedInfo.ItemLabel
        hint="Address (external or contract) sending the transaction"
        isLoading={ isLoading }
      >
        {t('transactions.common.from')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue columnGap={ 3 }>
        <AddressEntity
          address={ data.from }
          isLoading={ isLoading }
        />
        { data.from.name && <Text>{ data.from.name }</Text> }
        { addressFromTags.length > 0 && (
          <Flex columnGap={ 3 }>
            { addressFromTags }
          </Flex>
        ) }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint="Address (external or contract) receiving the transaction"
        isLoading={ isLoading }
      >
        { data.to?.is_contract ? t('transactions.common.interacted_with_contract') : t('transactions.common.to') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue
        flexWrap={{ base: 'wrap', lg: 'nowrap' }}
        columnGap={ 3 }
      >
        { toAddress ? (
          <>
            { data.to && data.to.hash ? (
              <Flex flexWrap="nowrap" alignItems="center" maxW="100%">
                <AddressEntity
                  address={ toAddress }
                  isLoading={ isLoading }
                />
                { executionSuccessBadge }
                { executionFailedBadge }
              </Flex>
            ) : (
              <Flex width="100%" whiteSpace="pre" alignItems="center" flexShrink={ 0 }>
                <span>[{t('transactions.common.contract')} </span>
                <AddressEntity
                  address={ toAddress }
                  isLoading={ isLoading }
                  noIcon
                />
                <span>{t('transactions.common.created')}]</span>
                { executionSuccessBadge }
                { executionFailedBadge }
              </Flex>
            ) }
            { addressToTags.length > 0 && (
              <Flex columnGap={ 3 }>
                { addressToTags }
              </Flex>
            ) }
          </>
        ) : (
          <span>[ {t('transactions.common.contract')} {t('transactions.common.creation')} ]</span>
        ) }
      </DetailedInfo.ItemValue>

      { data.token_transfers && <TxDetailsTokenTransfers data={ data.token_transfers } txHash={ data.hash } isOverflow={ data.token_transfers_overflow }/> }

      { hasInterop && data.op_interop_messages?.some(message => message.target_address_hash) && (
        <>
          <DetailedInfo.ItemLabel
            isLoading={ isLoading }
            hint={t('transactions.common.the_target_address_where_this_')}
          >
            {t('transactions.common.interop_target')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <VStack gap={ 2 } w="100%" overflow="hidden" alignItems="flex-start">
              { data.op_interop_messages
                .filter((message) => message.target_address_hash)
                .map((message) => {
                  return message.relay_chain !== undefined ? (
                    <AddressEntityInterop
                      chain={ message.relay_chain }
                      address={{ hash: message.target_address_hash }}
                      isLoading={ isLoading }
                      truncation="dynamic"
                      w="100%"
                    />
                  ) : (
                    <AddressEntity address={{ hash: message.target_address_hash }} isLoading={ isLoading } truncation="dynamic" w="100%"/>
                  );
                }) }
            </VStack>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemDivider/>

      { (data.arbitrum?.commitment_transaction.hash || data.arbitrum?.confirmation_transaction.hash) &&
      (
        <>
          { data.arbitrum?.commitment_transaction.hash && (
            <>
              <DetailedInfo.ItemLabel
                hint={t('transactions.common.l1_transaction_containing_this')}
                isLoading={ isLoading }
              >
                {t('transactions.common.commitment_tx')}
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <TxEntityL1 hash={ data.arbitrum?.commitment_transaction.hash } isLoading={ isLoading }/>
                { data.arbitrum?.commitment_transaction.status === 'finalized' && <StatusTag type="ok" text={t('shared.common.finalized')} ml={ 2 }/> }
              </DetailedInfo.ItemValue>
            </>
          ) }
          { data.arbitrum?.confirmation_transaction.hash && (
            <>
              <DetailedInfo.ItemLabel
                hint={t('transactions.common.l1_transaction_containing_conf')}
                isLoading={ isLoading }
              >
                {t('transactions.common.confirmation_tx')}
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <TxEntityL1 hash={ data.arbitrum?.confirmation_transaction.hash } isLoading={ isLoading }/>
                { data.arbitrum?.commitment_transaction.status === 'finalized' && <StatusTag type="ok" text={t('shared.common.finalized')} ml={ 2 }/> }
              </DetailedInfo.ItemValue>
            </>
          ) }
          <DetailedInfo.ItemDivider/>
        </>
      ) }

      { data.zkevm_sequence_hash && (
        <>
          <DetailedInfo.ItemLabel
            isLoading={ isLoading }
          >
            {t('transactions.common.sequence_tx_hash')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue flexWrap="nowrap">
            <Skeleton loading={ isLoading } overflow="hidden">
              <HashStringShortenDynamic hash={ data.zkevm_sequence_hash }/>
            </Skeleton>
            <CopyToClipboard text={ data.zkevm_sequence_hash } isLoading={ isLoading }/>
          </DetailedInfo.ItemValue>
        </>

      ) }

      { data.zkevm_verify_hash && (
        <>
          <DetailedInfo.ItemLabel
            isLoading={ isLoading }
          >
            {t('transactions.common.verify_tx_hash')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue flexWrap="nowrap">
            <Skeleton loading={ isLoading } overflow="hidden">
              <HashStringShortenDynamic hash={ data.zkevm_verify_hash }/>
            </Skeleton>
            <CopyToClipboard text={ data.zkevm_verify_hash } isLoading={ isLoading }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { (data.zkevm_batch_number || data.zkevm_verify_hash) && <DetailedInfo.ItemDivider/> }

      { !config.UI.views.tx.hiddenFields?.value && (
        <>
          <DetailedInfo.ItemLabel
            hint="Value sent in the native token (and USD) if applicable"
            isLoading={ isLoading }
          >
            {t('transactions.common.value')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <CurrencyValue
              value={ data.value }
              currency={ currencyUnits.ether }
              exchangeRate={ data.exchange_rate }
              isLoading={ isLoading }
              flexWrap="wrap"
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      <TxDetailsTxFee isLoading={ isLoading } data={ data }/>

      { rollupFeature.isEnabled && rollupFeature.type === 'optimistic' && data.operator_fee && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.a_fee_set_by_the_chain_operato')}
          >
            {t('transactions.common.operator_fee')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue multiRow>
            <CurrencyValue
              value={ data.operator_fee }
              currency={ currencyUnits.ether }
              exchangeRate={ data.exchange_rate }
              flexWrap="wrap"
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && data.arbitrum && (
        <>
          <DetailedInfo.ItemLabel
            hint="Fee paid to the poster for L1 resources"
            isLoading={ isLoading }
          >
            {t('transactions.common.poster_fee')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <CurrencyValue
              value={ data.arbitrum.poster_fee }
              currency={ currencyUnits.ether }
              exchangeRate={ data.exchange_rate }
              flexWrap="wrap"
              isLoading={ isLoading }
            />
          </DetailedInfo.ItemValue>

          <DetailedInfo.ItemLabel
            hint="Fee paid to the network for L2 resources"
            isLoading={ isLoading }
          >
            {t('transactions.common.network_fee')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <CurrencyValue
              value={ data.arbitrum.network_fee }
              currency={ currencyUnits.ether }
              exchangeRate={ data.exchange_rate }
              flexWrap="wrap"
              isLoading={ isLoading }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      <TxDetailsGasPrice gasPrice={ data.gas_price } gasToken={ data.celo?.gas_token } isLoading={ isLoading }/>

      <TxDetailsFeePerGas txFee={ data.fee.value } gasUsed={ data.gas_used } isLoading={ isLoading }/>

      { !config.UI.views.tx.additionalFields?.set_max_gas_limit && <TxDetailsGasUsage isLoading={ isLoading } data={ data }/> }

      { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && data.arbitrum && data.gas_used && (
        <>
          <DetailedInfo.ItemLabel
            hint="L2 gas set aside for L1 data charges"
            isLoading={ isLoading }
          >
            {t('transactions.common.gas_used_for_l1')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isLoading }>{ BigNumber(data.arbitrum.gas_used_for_l1 || 0).toFormat() }</Skeleton>
            <TextSeparator/>
            <Utilization
              ml={ 4 }
              value={ BigNumber(data.arbitrum.gas_used_for_l1 || 0).dividedBy(BigNumber(data.gas_used)).toNumber() }
              isLoading={ isLoading }
            />
          </DetailedInfo.ItemValue>

          <DetailedInfo.ItemLabel
            hint={t('transactions.common.l2_gas_spent_on_l2_resources')}
            isLoading={ isLoading }
          >
            {t('transactions.common.gas_used_for_l2')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isLoading }>{ BigNumber(data.arbitrum.gas_used_for_l2 || 0).toFormat() }</Skeleton>
            <TextSeparator/>
            <Utilization
              ml={ 4 }
              value={ BigNumber(data.arbitrum.gas_used_for_l2 || 0).dividedBy(BigNumber(data.gas_used)).toNumber() }
              isLoading={ isLoading }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.scroll?.l1_gas_used !== undefined && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.total_gas_used_on_l1')}
            isLoading={ isLoading }
          >
            {t('transactions.common.l1_gas_used')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isLoading }>{ BigNumber(data.scroll?.l1_gas_used || 0).toFormat() }</Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { !config.UI.views.tx.hiddenFields?.gas_fees &&
            (data.base_fee_per_gas || data.max_fee_per_gas || data.max_priority_fee_per_gas) && (
        <>
          <DetailedInfo.ItemLabel
            hint={ `
            Base Fee refers to the network Base Fee at the time of the block, 
            while Max Fee & Max Priority Fee refer to the max amount a user is willing to pay 
            { t('transactions.common.tx_fee_distribution_info', { validator: t(getNetworkValidatorTitle()) }) }
          ` }
            isLoading={ isLoading }
          >
            {t('transactions.common.gas_fees_gwei', { currency: currencyUnits.gwei })}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue multiRow>
            { data.base_fee_per_gas && (
              <Skeleton loading={ isLoading }>
                <span>Base: </span>
                <span>{ BigNumber(data.base_fee_per_gas).dividedBy(WEI_IN_GWEI).toFixed() }</span>
                { (data.max_fee_per_gas || data.max_priority_fee_per_gas) && <TextSeparator/> }
              </Skeleton>
            ) }
            { data.max_fee_per_gas && (
              <Skeleton loading={ isLoading }>
                <span>Max: </span>
                <span>{ BigNumber(data.max_fee_per_gas).dividedBy(WEI_IN_GWEI).toFixed() }</span>
                { data.max_priority_fee_per_gas && <TextSeparator/> }
              </Skeleton>
            ) }
            { data.max_priority_fee_per_gas && (
              <Skeleton loading={ isLoading }>
                <span>Max priority: </span>
                <span>{ BigNumber(data.max_priority_fee_per_gas).dividedBy(WEI_IN_GWEI).toFixed() }</span>
              </Skeleton>
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      <TxDetailsBurntFees data={ data } isLoading={ isLoading }/>

      { rollupFeature.isEnabled && rollupFeature.type === 'optimistic' && (
        <>
          { data.l1_gas_used && (
            <>
              <DetailedInfo.ItemLabel
                hint={t('transactions.common.l1_gas_used_by_transaction')}
                isLoading={ isLoading }
              >
                {t('transactions.common.l1_gas_used_by_txn')}
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <Text>{ BigNumber(data.l1_gas_used).toFormat() }</Text>
              </DetailedInfo.ItemValue>
            </>
          ) }

          { data.l1_gas_price && (
            <>
              <DetailedInfo.ItemLabel
                hint={t('transactions.common.l1_gas_price')}
                isLoading={ isLoading }
              >
                {t('transactions.common.l1_gas_price')}
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue multiRow>
                <Text mr={ 1 }>
                  { BigNumber(data.l1_gas_price).dividedBy(WEI).toFixed() } { rollupFeature.parentChain.currency?.symbol || currencyUnits.ether }
                </Text>
                <Text color="text.secondary">({ BigNumber(data.l1_gas_price).dividedBy(WEI_IN_GWEI).toFixed() } { currencyUnits.gwei })</Text>
              </DetailedInfo.ItemValue>
            </>
          ) }

          { data.l1_fee && (
            <>
              <DetailedInfo.ItemLabel
                // eslint-disable-next-line max-len
                hint={ `L1 Data Fee which is used to cover the L1 "security" cost from the batch submission mechanism. In combination with L2 execution fee, L1 fee makes the total amount of fees that a transaction pays.` }
                isLoading={ isLoading }
              >
                {t('transactions.common.l1_fee')}
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue multiRow>
                <CurrencyValue
                  value={ data.l1_fee }
                  currency={ rollupFeature.parentChain.currency?.symbol || currencyUnits.ether }
                  exchangeRate={ data.exchange_rate }
                  flexWrap="wrap"
                  rowGap={ 0 }
                />
              </DetailedInfo.ItemValue>
            </>
          ) }

          { data.l1_fee_scalar && (
            <>
              <DetailedInfo.ItemLabel
                hint="A Dynamic overhead (fee scalar) premium, which serves as a buffer in case L1 prices rapidly increase."
                isLoading={ isLoading }
              >
                {t('transactions.common.l1_fee_scalar')}
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <Text>{ data.l1_fee_scalar }</Text>
              </DetailedInfo.ItemValue>
            </>
          ) }
        </>
      ) }
      <TxInfoScrollFees data={ data } isLoading={ isLoading }/>

      <CollapsibleDetails loading={ isLoading } mt={ 6 } gridColumn={{ base: undefined, lg: '1 / 3' }} isExpanded={ isExpanded } onClick={ handleCutLinkClick }>
        <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 4 }}/>

        <TxDetailsSetMaxGasLimit data={ data }/>

        <TxDetailsWithdrawalStatusArbitrum data={ data }/>

        { (data.blob_gas_used || data.max_fee_per_blob_gas || data.blob_gas_price) && (
          <>
            { data.blob_gas_used && data.blob_gas_price && (
              <>
                <DetailedInfo.ItemLabel
                  hint="Blob fee for this transaction"
                >
                  {t('transactions.common.blob_fee')}
                </DetailedInfo.ItemLabel>
                <DetailedInfo.ItemValue>
                  <CurrencyValue
                    value={ BigNumber(data.blob_gas_used).multipliedBy(data.blob_gas_price).toString() }
                    currency={ config.UI.views.tx.hiddenFields?.fee_currency ? '' : currencyUnits.ether }
                    exchangeRate={ data.exchange_rate }
                    flexWrap="wrap"
                    isLoading={ isLoading }
                  />
                </DetailedInfo.ItemValue>
              </>
            ) }

            { data.blob_gas_used && (
              <>
                <DetailedInfo.ItemLabel
                  hint={t('transactions.common.amount_of_gas_used_by_the_blob')}
                >
                  {t('transactions.common.blob_gas_usage')}
                </DetailedInfo.ItemLabel>
                <DetailedInfo.ItemValue>
                  { BigNumber(data.blob_gas_used).toFormat() }
                </DetailedInfo.ItemValue>
              </>
            ) }

            { (data.max_fee_per_blob_gas || data.blob_gas_price) && (
              <>
                <DetailedInfo.ItemLabel
                  hint={ `Amount of ${ currencyUnits.ether } used for blobs in this transaction` }
                >
                  {t('transactions.common.blob_gas_fees_gwei', { currency: currencyUnits.gwei })}
                </DetailedInfo.ItemLabel>
                <DetailedInfo.ItemValue>
                  { data.blob_gas_price && (
                    <Text fontWeight="600" as="span">{ BigNumber(data.blob_gas_price).dividedBy(WEI_IN_GWEI).toFixed() }</Text>
                  ) }
                  { (data.max_fee_per_blob_gas && data.blob_gas_price) && <TextSeparator/> }
                  { data.max_fee_per_blob_gas && (
                    <>
                      <Text as="span" fontWeight="500" whiteSpace="pre">Max: </Text>
                      <Text fontWeight="600" as="span">{ BigNumber(data.max_fee_per_blob_gas).dividedBy(WEI_IN_GWEI).toFixed() }</Text>
                    </>
                  ) }
                </DetailedInfo.ItemValue>
              </>
            ) }
            <DetailedInfo.ItemDivider/>
          </>
        ) }

        <TxDetailsOther nonce={ data.nonce } type={ data.type } position={ data.position } queueIndex={ data.scroll?.queue_index }/>

        <DetailedInfo.ItemLabel
          hint="Binary data included with the transaction. See logs tab for additional info"
          mb={{ base: 1, lg: 0 }}
        >
          {t('transactions.common.raw_input')}
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <RawInputData hex={ data.raw_input } defaultDataType={ data.zilliqa?.is_scilla ? 'UTF-8' : 'Hex' }/>
        </DetailedInfo.ItemValue>

        { data.decoded_input && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('transactions.common.decoded_input_data')}
            >
              {t('transactions.common.decoded_input_data')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue flexWrap="wrap" mt={{ base: '5px', lg: '4px' }}>
              <LogDecodedInputData data={ data.decoded_input }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.zksync && <ZkSyncL2TxnBatchHashesInfo data={ data.zksync } isLoading={ isLoading }/> }
      </CollapsibleDetails>
    </DetailedInfo.Container>
  );
};

export default TxInfo;
