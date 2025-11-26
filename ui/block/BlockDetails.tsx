import { GridItem, Text, Box } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { capitalize } from 'es-toolkit';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ZKSYNC_L2_TX_BATCH_STATUSES } from 'types/api/zkSyncL2';

import { route, routeParams } from 'nextjs/routes';

import config from 'configs/app';
import getBlockReward from 'lib/block/getBlockReward';
import { useMultichainContext } from 'lib/contexts/multichain';
import getNetworkValidatorTitle from 'lib/networks/getNetworkValidatorTitle';
import * as arbitrum from 'lib/rollups/arbitrum';
import getQueryParamString from 'lib/router/getQueryParamString';
import { currencyUnits } from 'lib/units';
import { CollapsibleDetails } from 'toolkit/chakra/collapsible';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { Tooltip } from 'toolkit/chakra/tooltip';
import { GWEI, WEI, WEI_IN_GWEI, ZERO } from 'toolkit/utils/consts';
import { space } from 'toolkit/utils/htmlEntities';
import OptimisticL2TxnBatchDA from 'ui/shared/batch/OptimisticL2TxnBatchDA';
import BlockGasUsed from 'ui/shared/block/BlockGasUsed';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import BatchEntityL2 from 'ui/shared/entities/block/BatchEntityL2';
import BlockEntityL1 from 'ui/shared/entities/block/BlockEntityL1';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import IconSvg from 'ui/shared/IconSvg';
import PrevNext from 'ui/shared/PrevNext';
import RawDataSnippet from 'ui/shared/RawDataSnippet';
import StatusTag from 'ui/shared/statusTag/StatusTag';
import Utilization from 'ui/shared/Utilization/Utilization';
import VerificationSteps from 'ui/shared/verificationSteps/VerificationSteps';
import ZkSyncL2TxnBatchHashesInfo from 'ui/txnBatches/zkSyncL2/ZkSyncL2TxnBatchHashesInfo';

import BlockDetailsBaseFeeCelo from './details/BlockDetailsBaseFeeCelo';
import BlockDetailsBlobInfo from './details/BlockDetailsBlobInfo';
import BlockDetailsZilliqaQuorumCertificate from './details/BlockDetailsZilliqaQuorumCertificate';
import type { BlockQuery } from './useBlockQuery';

interface Props {
  query: BlockQuery;
}

const rollupFeature = config.features.rollup;

const BlockDetails = ({ query }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const heightOrHash = getQueryParamString(router.query.height_or_hash);
  const multichainContext = useMultichainContext();

  const { data, isPlaceholderData } = query;

  const handlePrevNextClick = React.useCallback((direction: 'prev' | 'next') => {
    if (!data) {
      return;
    }

    const increment = direction === 'next' ? +1 : -1;
    const nextId = String(data.height + increment);

    router.push(routeParams({ pathname: '/block/[height_or_hash]', query: { height_or_hash: nextId } }, multichainContext), undefined);
  }, [ data, multichainContext, router ]);

  if (!data) {
    return null;
  }

  const { totalReward, staticReward, burntFees, txFees } = getBlockReward(data);

  const validatorTitle = t(getNetworkValidatorTitle());

  const rewardBreakDown = (() => {
    const { t } = useTranslation();
    if (rollupFeature.isEnabled || totalReward.isEqualTo(ZERO) || txFees.isEqualTo(ZERO) || burntFees.isEqualTo(ZERO)) {
      return null;
    }

    if (isPlaceholderData) {
      return <Skeleton loading w="525px" h="20px"/>;
    }

    return (
      <Text color="text.secondary" whiteSpace="break-spaces">
        <Tooltip content={ t('blocks.common.static_block_reward') }>
          <span>{ staticReward.dividedBy(WEI).toFixed() }</span>
        </Tooltip>
        { !txFees.isEqualTo(ZERO) && (
          <>
            { space }+{ space }
            <Tooltip content={ t('blocks.common.txn_fees') }>
              <span>{ txFees.dividedBy(WEI).toFixed() }</span>
            </Tooltip>
          </>
        ) }
        { !burntFees.isEqualTo(ZERO) && (
          <>
            { space }-{ space }
            <Tooltip content={ t('blocks.common.burnt_fees') }>
              <span>{ burntFees.dividedBy(WEI).toFixed() }</span>
            </Tooltip>
          </>
        ) }
      </Text>
    );
  })();

  const txsNum = (() => {
    const { t } = useTranslation();
    const blockTxsNum = (
      <Link href={ route({ pathname: '/block/[height_or_hash]', query: { height_or_hash: heightOrHash, tab: 'txs' } }, multichainContext) }>
          { data.transactions_count } {t('common.common.transaction')}{ data.transactions_count === 1 ? '' : 's' }
        </Link>
    );

    const blockBlobTxsNum = (config.features.dataAvailability.isEnabled && data.blob_transaction_count) ? (
      <>
        <span> including </span>
        <Link href={ route({ pathname: '/block/[height_or_hash]', query: { height_or_hash: heightOrHash, tab: 'blob_txs' } }, multichainContext) }>
          { data.blob_transaction_count } {t('common.common.blob_transaction')}{ data.blob_transaction_count === 1 ? '' : 's' }
        </Link>
      </>
    ) : null;

    return (
      <>
        { blockTxsNum }
        { blockBlobTxsNum }
        <span> in this block</span>
      </>
    );
  })();

  const blockTypeLabel = (() => {
    const { t } = useTranslation();
    switch (data.type) {
      case 'reorg':
        return t('common.common.reorg');
      case 'uncle':
        return t('common.common.uncle');
      default:
        return t('blocks.common.block');
    }
  })();

  return (
    <DetailedInfo.Container templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(min-content, 200px) minmax(0, 1fr)' }} >
      <DetailedInfo.ItemLabel
        hint={ t('common.common.tbhoa') }
        isLoading={ isPlaceholderData }
      >
        { blockTypeLabel } height
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { data.height }
        </Skeleton>
        { data.height === 0 && <Text whiteSpace="pre">{` - ${t('blocks.common.genesis_block')}`}</Text> }
        <PrevNext
          ml={ 6 }
          onClick={ handlePrevNextClick }
          prevLabel={ t('blocks.common.view_previous_block') }
          nextLabel={ t('blocks.common.view_next_block') }
          isPrevDisabled={ data.height === 0 }
          isLoading={ isPlaceholderData }
        />
      </DetailedInfo.ItemValue>

      { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && data.arbitrum && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blocks.common.the_most_recent_l1_block_heigh') }
            isLoading={ isPlaceholderData }
          >
            {t('blocks.common.l1_block_height')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <BlockEntityL1 isLoading={ isPlaceholderData } number={ data.arbitrum.l1_block_number }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && data.arbitrum && !config.UI.views.block.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('transactions.common.batch_number') }
            isLoading={ isPlaceholderData }
          >
            {t('transactions.common.batch_number')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { data.arbitrum.batch_number ?
              <BatchEntityL2 isLoading={ isPlaceholderData } number={ data.arbitrum.batch_number }/> :
              <Skeleton loading={ isPlaceholderData }>{t('shared.common.pending')}</Skeleton> }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { rollupFeature.isEnabled && rollupFeature.type === 'optimistic' && data.optimism && !config.UI.views.block.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('transactions.common.batch_number') }
            isLoading={ isPlaceholderData }
          >
            {t('transactions.common.batch_number')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue columnGap={ 3 }>
            { data.optimism.number ?
              <BatchEntityL2 isLoading={ isPlaceholderData } number={ data.optimism.number }/> :
              <Skeleton loading={ isPlaceholderData }>{ t('shared.common.pending') }</Skeleton> }
            { data.optimism.batch_data_container && (
              <OptimisticL2TxnBatchDA
                container={ data.optimism.batch_data_container }
                isLoading={ isPlaceholderData }
              />
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { typeof data.size === 'number' && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blocks.common.size_of_the_block_in_bytes') }
            isLoading={ isPlaceholderData }
          >
            {t('common.common.size')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isPlaceholderData }>
              { data.size.toLocaleString() }
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemLabel
        hint={ t('common.common.dta') }
        isLoading={ isPlaceholderData }
      >
        Timestamp
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <DetailedInfoTimestamp timestamp={ data.timestamp } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('common.common.number_of_transactions_in_the_block') }
        isLoading={ isPlaceholderData }
      >
        {t('common.common.transactions')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { txsNum }
        </Skeleton>
      </DetailedInfo.ItemValue>

      { config.features.beaconChain.isEnabled && Boolean(data.withdrawals_count) && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blocks.common.the_number_of_beacon_withdrawa') }
            isLoading={ isPlaceholderData }
          >
            {t('common.common.withdrawals')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isPlaceholderData }>
              <Link href={ route({ pathname: '/block/[height_or_hash]', query: { height_or_hash: heightOrHash, tab: 'withdrawals' } }, multichainContext) }>
                { data.withdrawals_count } withdrawal{ data.withdrawals_count === 1 ? '' : 's' }
              </Link>
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { rollupFeature.isEnabled && rollupFeature.type === 'zkSync' && data.zksync && !config.UI.views.block.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('transactions.common.batch_number') }
            isLoading={ isPlaceholderData }
          >
            {t('transactions.common.batch_number')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { data.zksync.batch_number ?
              <BatchEntityL2 isLoading={ isPlaceholderData } number={ data.zksync.batch_number }/> :
              <Skeleton loading={ isPlaceholderData }>{t('shared.common.pending')}</Skeleton> }
          </DetailedInfo.ItemValue>
        </>
      ) }
      { !config.UI.views.block.hiddenFields?.L1_status && rollupFeature.isEnabled &&
        ((rollupFeature.type === 'zkSync' && data.zksync) || (rollupFeature.type === 'arbitrum' && data.arbitrum)) &&
      (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('transactions.common.status_is_the_short_interpreta') }
            isLoading={ isPlaceholderData }
          >
            {t('common.common.status')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { rollupFeature.type === 'zkSync' && data.zksync &&
              <VerificationSteps steps={ ZKSYNC_L2_TX_BATCH_STATUSES } currentStep={ data.zksync.status } isLoading={ isPlaceholderData }/> }
            { rollupFeature.type === 'arbitrum' && data.arbitrum && (
              <VerificationSteps
                steps={ arbitrum.verificationSteps }
                currentStep={ arbitrum.VERIFICATION_STEPS_MAP[data.arbitrum.status] }
                currentStepPending={ arbitrum.getVerificationStepStatus(data.arbitrum) === 'pending' }
                isLoading={ isPlaceholderData }
              />
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { !config.UI.views.block.hiddenFields?.miner && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blocks.common.a_block_producer_who_successfu') }
            isLoading={ isPlaceholderData }
          >
            { capitalize(validatorTitle) }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <AddressEntity
              address={ data.miner }
              isLoading={ isPlaceholderData }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' &&
        (data.arbitrum?.commitment_transaction.hash || data.arbitrum?.confirmation_transaction.hash) &&
      (
        <>
          <DetailedInfo.ItemDivider/>
          { data.arbitrum?.commitment_transaction.hash && (
            <>
              <DetailedInfo.ItemLabel
                hint={ t('transactions.common.l1_transaction_containing_this') }
                isLoading={ isPlaceholderData }
              >
                {t('blocks.common.commitment_transaction')}
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <TxEntityL1 hash={ data.arbitrum?.commitment_transaction.hash } isLoading={ isPlaceholderData }/>
                { data.arbitrum?.commitment_transaction.status === 'finalized' && <StatusTag type="ok" text={ t('shared.common.finalized') } ml={ 2 }/> }
              </DetailedInfo.ItemValue>
            </>
          ) }
          { data.arbitrum?.confirmation_transaction.hash && (
            <>
              <DetailedInfo.ItemLabel
                hint={ t('transactions.common.l1_transaction_containing_conf') }
                isLoading={ isPlaceholderData }
              >
                {t('blocks.common.confirmation_transaction')}
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <TxEntityL1 hash={ data.arbitrum?.confirmation_transaction.hash } isLoading={ isPlaceholderData }/>
                { data.arbitrum?.commitment_transaction.status === 'finalized' && <StatusTag type="ok" text={ t('shared.common.finalized') } ml={ 2 }/> }
              </DetailedInfo.ItemValue>
            </>
          ) }
        </>
      ) }

      { !rollupFeature.isEnabled && !totalReward.isEqualTo(ZERO) && !config.UI.views.block.hiddenFields?.total_reward && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('blocks.common.for_each_block_the_validator_is_rewarded_with_a_finite_amount_of_currency_on_top_of_the_fees_paid_for_all_transactions_in_the_block', { validatorTitle, currency: config.chain.currency.symbol || t('blocks.common.native_token') })}
            isLoading={ isPlaceholderData }
          >
            {t('blocks.common.block_reward')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue columnGap={ 1 } multiRow>
            <Skeleton loading={ isPlaceholderData }>
              { totalReward.dividedBy(WEI).toFixed() } { currencyUnits.ether }
            </Skeleton>
            { rewardBreakDown }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.rewards
        ?.filter(({ type }) => type !== 'Validator Reward' && type !== 'Miner Reward')
        .map(({ type, reward }) => (
          <React.Fragment key={ type }>
            <DetailedInfo.ItemLabel
              hint={t('blocks.common.amount_of_distributed_reward_validator_receive_a_static_block_reward_tx_fees_uncle_fees', { validatorTitle: capitalize(validatorTitle) })}
            >
              { type }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              { BigNumber(reward).dividedBy(WEI).toFixed() } { currencyUnits.ether }
            </DetailedInfo.ItemValue>
          </React.Fragment>
        ))
      }

      { typeof data.zilliqa?.view === 'number' && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blocks.common.the_iteration_of_the_consensus') }
            isLoading={ isPlaceholderData }
          >
            {t('blocks.common.view_label')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isPlaceholderData }>
              { data.zilliqa.view }
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemDivider/>

      { data.celo?.base_fee && <BlockDetailsBaseFeeCelo data={ data.celo.base_fee }/> }

      <DetailedInfo.ItemLabel
        hint={ t('blocks.common.the_total_gas_amount_used_in_t') }
        isLoading={ isPlaceholderData }
      >
        {t('blocks.common.gas_used_label')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { BigNumber(data.gas_used || 0).toFormat() }
        </Skeleton>
        <BlockGasUsed
          gasUsed={ data.gas_used || undefined }
          gasLimit={ data.gas_limit }
          isLoading={ isPlaceholderData }
          ml={ 4 }
          gasTarget={ data.gas_target_percentage || undefined }
        />
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('blocks.common.total_gas_limit_provided_by_al') }
        isLoading={ isPlaceholderData }
      >
        {t('blocks.common.gas_limit_label')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { BigNumber(data.gas_limit).toFormat() }
        </Skeleton>
      </DetailedInfo.ItemValue>

      { data.minimum_gas_price && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blocks.common.the_minimum_gas_price_a_transa') }
            isLoading={ isPlaceholderData }
          >
            {t('blocks.common.minimum_gas_price_label')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isPlaceholderData }>
              { BigNumber(data.minimum_gas_price).dividedBy(GWEI).toFormat() } { currencyUnits.gwei }
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.base_fee_per_gas && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blocks.common.minimum_fee_required_per_unit_') }
            isLoading={ isPlaceholderData }
          >
            {t('blocks.common.base_fee_per_gas_label')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { isPlaceholderData ? (
              <Skeleton loading={ isPlaceholderData } h="20px" maxW="380px" w="100%"/>
            ) : (
              <>
                <Text>{ BigNumber(data.base_fee_per_gas).dividedBy(WEI).toFixed() } { currencyUnits.ether } </Text>
                <Text color="text.secondary" whiteSpace="pre">
                  { space }({ BigNumber(data.base_fee_per_gas).dividedBy(WEI_IN_GWEI).toFixed() } { currencyUnits.gwei })
                </Text>
              </>
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { !config.UI.views.block.hiddenFields?.burnt_fees && !burntFees.isEqualTo(ZERO) && (
        <>
          <DetailedInfo.ItemLabel
            hint={
              t('blocks.common.amount_of_native_token_burned_from_transactions_included_in_the_block_equals_block_base_fee_per_gas_gas_used', { currency: config.chain.currency.symbol || t('blocks.common.native_token') })
            }
            isLoading={ isPlaceholderData }
          >
            {t('blocks.common.burnt_fees_label')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <IconSvg name="flame" boxSize={ 5 } color="icon.primary" isLoading={ isPlaceholderData }/>
            <Skeleton loading={ isPlaceholderData } ml={{ base: 1, lg: 2 }}>
              { burntFees.dividedBy(WEI).toFixed() } { currencyUnits.ether }
            </Skeleton>
            { !txFees.isEqualTo(ZERO) && (
              <Tooltip content={ t('blocks.common.bbf') }>
                <Utilization
                  ml={ 4 }
                  value={ burntFees.dividedBy(txFees).toNumber() }
                  isLoading={ isPlaceholderData }
                />
              </Tooltip>
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.priority_fee !== null && BigNumber(data.priority_fee).gt(ZERO) && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('common.common.udtst') }
            isLoading={ isPlaceholderData }
          >
            {t('blocks.common.priority_fee_tip_label')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isPlaceholderData }>
              { BigNumber(data.priority_fee).dividedBy(WEI).toFixed() } { currencyUnits.ether }
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { /* ADDITIONAL INFO */ }
      <CollapsibleDetails loading={ isPlaceholderData } mt={ 6 } gridColumn={{ base: undefined, lg: '1 / 3' }}>
        <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 4 }}/>

        { rollupFeature.isEnabled && rollupFeature.type === 'zkSync' && data.zksync &&
              <ZkSyncL2TxnBatchHashesInfo data={ data.zksync } isLoading={ isPlaceholderData }/> }

        { !isPlaceholderData && <BlockDetailsBlobInfo data={ data }/> }

        { data.bitcoin_merged_mining_header && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('common.common.mmfbh') }
            >
              {t('blocks.common.bitcoin_merged_mining_header_label')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              flexWrap="nowrap"
              alignSelf="flex-start"
            >
              <Box whiteSpace="nowrap" overflow="hidden">
                <HashStringShortenDynamic hash={ data.bitcoin_merged_mining_header }/>
              </Box>
              <CopyToClipboard text={ data.bitcoin_merged_mining_header }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.bitcoin_merged_mining_coinbase_transaction && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('common.common.mmfct') }
            >
              {t('blocks.common.bitcoin_merged_mining_coinbase_transaction_label')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <RawDataSnippet
                data={ data.bitcoin_merged_mining_coinbase_transaction }
                isLoading={ isPlaceholderData }
                showCopy={ false }
                textareaMaxHeight="100px"
              />
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.bitcoin_merged_mining_merkle_proof && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('common.common.mmfmp') }
            >
              {t('blocks.common.bitcoin_merged_mining_merkle_proof_label')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <RawDataSnippet
                data={ data.bitcoin_merged_mining_merkle_proof }
                isLoading={ isPlaceholderData }
                showCopy={ false }
                textareaMaxHeight="100px"
              />
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.hash_for_merged_mining && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('common.common.mmfrbhh') }
            >
              {t('blocks.common.hash_for_merged_mining_label')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              flexWrap="nowrap"
              alignSelf="flex-start"
            >
              <Box whiteSpace="nowrap" overflow="hidden">
                <HashStringShortenDynamic hash={ data.hash_for_merged_mining }/>
              </Box>
              <CopyToClipboard text={ data.hash_for_merged_mining }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.difficulty && (
          <>
            <DetailedInfo.ItemLabel
              hint={ `Block difficulty for ${ validatorTitle }, used to calibrate block generation time` }
            >
              {t('blocks.common.difficulty_label')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <Box overflow="hidden">
                <HashStringShortenDynamic hash={ BigNumber(data.difficulty).toFormat() }/>
              </Box>
            </DetailedInfo.ItemValue>
          </>
        ) }
        { data.total_difficulty && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('blocks.common.total_difficulty_of_the_chain_') }
            >
              {t('blocks.common.total_difficulty_label')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <Box overflow="hidden">
                <HashStringShortenDynamic hash={ BigNumber(data.total_difficulty).toFormat() }/>
              </Box>
            </DetailedInfo.ItemValue>
          </>
        ) }

        <DetailedInfo.ItemDivider/>

        <DetailedInfo.ItemLabel
          hint={ t('blocks.common.the_sha256_hash_of_the_block') }
        >
          {t('blocks.common.hash_label')}
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue flexWrap="nowrap">
          <Box overflow="hidden" >
            <HashStringShortenDynamic hash={ data.hash }/>
          </Box>
          <CopyToClipboard text={ data.hash }/>
        </DetailedInfo.ItemValue>

        { data.height > 0 && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('common.common.thotb') }
            >
              {t('blocks.common.parent_hash_label')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue flexWrap="nowrap">
              <Link
                href={ route({ pathname: '/block/[height_or_hash]', query: { height_or_hash: String(data.height - 1) } }, multichainContext) }
                overflow="hidden"
                whiteSpace="nowrap"
              >
                <HashStringShortenDynamic
                  hash={ data.parent_hash }
                />
              </Link>
              <CopyToClipboard text={ data.parent_hash }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && data.arbitrum && data.arbitrum.send_count && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('blocks.common.the_cumulative_number_of_l2_to') }
              isLoading={ isPlaceholderData }
            >
              {t('blocks.common.send_count_label')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              { data.arbitrum.send_count.toLocaleString() }
            </DetailedInfo.ItemValue>

            <DetailedInfo.ItemLabel
              hint={ t('blocks.common.the_root_of_the_merkle_accumul') }
              isLoading={ isPlaceholderData }
            >
              {t('blocks.common.send_root_label')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              { data.arbitrum.send_root }
            </DetailedInfo.ItemValue>

            <DetailedInfo.ItemLabel
              hint={ t('blocks.common.the_number_of_delayed_l1_to_l2') }
              isLoading={ isPlaceholderData }
            >
              {t('blocks.common.delayed_messages_label')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              { data.arbitrum.delayed_messages.toLocaleString() }
            </DetailedInfo.ItemValue>
          </>
        ) }

        { !config.UI.views.block.hiddenFields?.nonce && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('common.common.bniav') }
            >
              {t('blocks.common.nonce_label')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              { data.nonce }
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.zilliqa && (
          <>
            <DetailedInfo.ItemDivider/>
            <BlockDetailsZilliqaQuorumCertificate data={ data.zilliqa?.quorum_certificate }/>
            { data.zilliqa?.aggregate_quorum_certificate && (
              <>
                <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 2 }}/>
                <BlockDetailsZilliqaQuorumCertificate data={ data.zilliqa?.aggregate_quorum_certificate }/>
              </>
            ) }
          </>
        ) }
      </CollapsibleDetails>

    </DetailedInfo.Container>
  );
};

export default BlockDetails;
