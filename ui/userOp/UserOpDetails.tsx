import { GridItem, Text } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { UserOp } from 'types/api/userOps';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import throwOnResourceLoadError from 'lib/errors/throwOnResourceLoadError';
import { currencyUnits } from 'lib/units';
import { CollapsibleDetails } from 'toolkit/chakra/collapsible';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { WEI, WEI_IN_GWEI } from 'toolkit/utils/consts';
import { space } from 'toolkit/utils/htmlEntities';
import isCustomAppError from 'ui/shared/AppError/isCustomAppError';
import CurrencyValue from 'ui/shared/CurrencyValue';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import AddressStringOrParam from 'ui/shared/entities/address/AddressStringOrParam';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import UserOpEntity from 'ui/shared/entities/userOp/UserOpEntity';
import UserOpSponsorType from 'ui/shared/userOps/UserOpSponsorType';
import UserOpStatus from 'ui/shared/userOps/UserOpStatus';
import Utilization from 'ui/shared/Utilization/Utilization';

import UserOpCallData from './UserOpCallData';
import UserOpDecodedCallData from './UserOpDecodedCallData';
import UserOpDetailsActions from './UserOpDetailsActions';

interface Props {
  query: UseQueryResult<UserOp, ResourceError>;
}

const UserOpDetails = ({ query }: Props) => {
  const { t } = useTranslation();
  const { data, isPlaceholderData, isError, error } = query;

  if (isError) {
    if (error?.status === 400 || isCustomAppError(error)) {
      throwOnResourceLoadError({ isError, error });
    }

    return <DataFetchAlert/>;
  }

  if (!data) {
    return null;
  }

  return (
    <DetailedInfo.Container
      templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(min-content, 220px) minmax(0, 1fr)' }}
    >
      <DetailedInfo.ItemLabel
        hint={t('common.common.unique_character_string_assign')}
        isLoading={ isPlaceholderData }
      >
        { t('user_ops.common.user_operation_hash') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData } overflow="hidden">
          <UserOpEntity hash={ data.hash } noIcon noLink/>
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('common.common.the_address_of_the_smart_contr')}
        isLoading={ isPlaceholderData }
      >
        {t('user_ops.common.sender')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressStringOrParam address={ data.sender } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      { data.execute_target && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('common.common.target_smart_contract_called_b')}
            isLoading={ isPlaceholderData }
          >
            {t('user_ops.common.target')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <AddressEntity address={ data.execute_target } isLoading={ isPlaceholderData }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemLabel
        hint={t('common.common.current_user_operation_state')}
        isLoading={ isPlaceholderData }
      >
        {t('user_ops.common.status')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <UserOpStatus status={ data.status } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      { data.revert_reason && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('common.common.the_revert_reason_of_the_user_')}
            isLoading={ isPlaceholderData }
          >
            {t('user_ops.common.revert_reason')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue
            wordBreak="break-all"
            whiteSpace="normal"
          >
            <Skeleton loading={ isPlaceholderData }>
              { data.revert_reason }
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.timestamp && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('common.common.date_and_time_of_user_operatio')}
            isLoading={ isPlaceholderData }
          >
            {t('user_ops.common.timestamp')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <DetailedInfoTimestamp timestamp={ data.timestamp } isLoading={ isPlaceholderData }/>
          </DetailedInfo.ItemValue>
        </>

      ) }
      { !config.UI.views.tx.hiddenFields?.tx_fee && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('common.common.total_user_operation_fee')}
            isLoading={ isPlaceholderData }
          >
            {t('user_ops.common.fee')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <CurrencyValue
              value={ data.fee }
              currency={ currencyUnits.ether }
              isLoading={ isPlaceholderData }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemLabel
        hint={t('user_ops.common.gas_limit_for_the_user_operation')}
        isLoading={ isPlaceholderData }
      >
        {t('user_ops.common.gas_limit')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { BigNumber(data.gas).toFormat() }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('common.common.actual_gas_amount_used_by_the_')}
        isLoading={ isPlaceholderData }
      >
        {t('user_ops.common.gas_used')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { BigNumber(data.gas_used).toFormat() }
        </Skeleton>
        <Utilization
          ml={ 4 }
          colorScheme="gray"
          value={ BigNumber(data.gas_used).dividedBy(BigNumber(data.gas)).toNumber() }
          isLoading={ isPlaceholderData }
        />
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('common.common.hash_of_the_transaction_this_u')}
        isLoading={ isPlaceholderData }
      >
        {t('user_ops.common.transaction_hash')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <TxEntity hash={ data.transaction_hash } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('common.common.block_number_containing_this_u')}
        isLoading={ isPlaceholderData }
      >
        {t('user_ops.common.block')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <BlockEntity number={ Number(data.block_number) } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('common.common.contract_that_executes_bundles')}
        isLoading={ isPlaceholderData }
      >
        {t('user_ops.common.entry_point')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressStringOrParam address={ data.entry_point } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      { config.features.txInterpretation.isEnabled && <UserOpDetailsActions hash={ data.hash } isUserOpDataLoading={ isPlaceholderData }/> }

      { /* ADDITIONAL INFO */ }
      <CollapsibleDetails loading={ isPlaceholderData } mt={ 6 } gridColumn={{ base: undefined, lg: '1 / 3' }}>
        <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 4 }}/>

        <DetailedInfo.ItemLabel
          hint={t('user_ops.common.gas_limit_for_execution_phase')}
        >
          {t('user_ops.common.call_gas_limit')}
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          { BigNumber(data.call_gas_limit).toFormat() }
        </DetailedInfo.ItemValue>

        <DetailedInfo.ItemLabel
          hint={t('user_ops.common.gas_limit_for_verification_phase')}
        >
          {t('user_ops.common.verification_gas_limit')}
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          { BigNumber(data.verification_gas_limit).toFormat() }
        </DetailedInfo.ItemValue>

        <DetailedInfo.ItemLabel
          hint={t('common.common.gas_to_compensate_the_bundler')}
        >
          {t('user_ops.common.pre_verification_gas')}
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          { BigNumber(data.pre_verification_gas).toFormat() }
        </DetailedInfo.ItemValue>

        { !config.UI.views.tx.hiddenFields?.gas_fees && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('common.common.maximum_fee_per_gas')}
            >
              {t('user_ops.common.max_fee_per_gas')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <Text>{ BigNumber(data.max_fee_per_gas).dividedBy(WEI).toFixed() } { currencyUnits.ether } </Text>
              <Text color="text.secondary" whiteSpace="pre">
                { space }({ BigNumber(data.max_fee_per_gas).dividedBy(WEI_IN_GWEI).toFixed() } { currencyUnits.gwei })
              </Text>
            </DetailedInfo.ItemValue>

            <DetailedInfo.ItemLabel
              hint={t('common.common.maximum_priority_fee_per_gas')}
            >
              {t('user_ops.common.max_priority_fee_per_gas')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <Text>{ BigNumber(data.max_priority_fee_per_gas).dividedBy(WEI).toFixed() } { currencyUnits.ether } </Text>
              <Text color="text.secondary" whiteSpace="pre">
                { space }({ BigNumber(data.max_priority_fee_per_gas).dividedBy(WEI_IN_GWEI).toFixed() } { currencyUnits.gwei })
              </Text>
            </DetailedInfo.ItemValue>
          </>
        ) }

        <DetailedInfo.ItemDivider/>

        { data.aggregator && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('common.common.helper_contract_to_validate_an')}
            >
              {t('user_ops.common.aggregator')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <AddressStringOrParam address={ data.aggregator }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.aggregator_signature && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('common.common.aggregator_signature')}
            >
              {t('user_ops.common.aggregator_signature')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              { data.aggregator_signature }
            </DetailedInfo.ItemValue>
          </>
        ) }

        <DetailedInfo.ItemLabel
          hint={t('user_ops.common.a_node_block_builder_that_handles_user_operations')}
        >
          {t('user_ops.common.bundler')}
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <AddressStringOrParam address={ data.bundler }/>
        </DetailedInfo.ItemValue>

        { data.factory && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('user_ops.common.smart_contract_that_deploys_new_smart_contract_wallets_for_users')}
            >
              {t('user_ops.common.factory')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <AddressStringOrParam address={ data.factory }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.paymaster && (
          <>
            <DetailedInfo.ItemLabel
              hint={t('user_ops.common.contract_to_sponsor_the_gas_fees_for_user_operations')}
            >
              {t('user_ops.common.paymaster')}
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <AddressStringOrParam address={ data.paymaster }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        <DetailedInfo.ItemLabel
          hint={t('user_ops.common.type_of_the_gas_fees_sponsor')}
        >
          {t('user_ops.common.sponsor_type')}
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <UserOpSponsorType sponsorType={ data.sponsor_type }/>
        </DetailedInfo.ItemValue>

        <DetailedInfo.ItemDivider/>

        <DetailedInfo.ItemLabel
          hint={t('common.common.used_to_validate_a_user_operat')}
        >
          {t('user_ops.common.signature')}
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue
          wordBreak="break-all"
          whiteSpace="normal"
        >
          { data.signature }
        </DetailedInfo.ItemValue>

        <DetailedInfo.ItemLabel
          hint={t('user_ops.common.anti_replay_protection_also_used_as_the_salt_for_first_time_account_creation')}
        >
          {t('user_ops.common.nonce')}
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue
          wordBreak="break-all"
          whiteSpace="normal"
        >
          { data.nonce }
        </DetailedInfo.ItemValue>

        <UserOpCallData data={ data }/>

        <UserOpDecodedCallData data={ data }/>
      </CollapsibleDetails>
    </DetailedInfo.Container>
  );
};

export default UserOpDetails;
