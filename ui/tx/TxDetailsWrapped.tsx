import { Flex, Grid } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Transaction } from 'types/api/transaction';
import type { ExcludeUndefined } from 'types/utils';

import { currencyUnits } from 'lib/units';
import { Badge } from 'toolkit/chakra/badge';
import CurrencyValue from 'ui/shared/CurrencyValue';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import LogDecodedInputData from 'ui/shared/logs/LogDecodedInputData';
import RawInputData from 'ui/shared/RawInputData';
import TxFee from 'ui/shared/tx/TxFee';
import TxDetailsGasPrice from 'ui/tx/details/TxDetailsGasPrice';
import TxDetailsOther from 'ui/tx/details/TxDetailsOther';

interface Props {
  data: ExcludeUndefined<Transaction['wrapped']>;
}

const TxDetailsWrapped = ({ data }: Props) => {
  const { t } = useTranslation();
  return (
    <Grid columnGap={ 8 } rowGap={{ base: 3, lg: 3 }} templateColumns={{ base: 'minmax(0, 1fr)', lg: 'auto minmax(0, 1fr)' }}>
      <DetailedInfo.ItemLabel
        hint={t('transactions.wrapped.transaction_hash_hint')}
      >
        {t('transactions.wrapped.transaction_hash')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <TxEntity hash={ data.hash } noIcon noLink/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={t('transactions.common.transaction_method_name')}
      >
        {t('transactions.wrapped.method')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Badge colorPalette="gray">
          { data.method }
        </Badge>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemDivider/>

      { data.to && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.wrapped.address_receiving_transaction_hint')}
          >
            { data.to.is_contract ? t('transactions.common.interacted_with_contract') : t('transactions.common.to') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Flex flexWrap="nowrap" alignItems="center" maxW="100%">
              <AddressEntity address={ data.to }/>
            </Flex>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemDivider/>

      <DetailedInfo.ItemLabel
        hint={t('transactions.wrapped.value_hint')}
      >
        {t('transactions.wrapped.value')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <CurrencyValue
          value={ data.value }
          currency={ currencyUnits.ether }
          flexWrap="wrap"
        />
      </DetailedInfo.ItemValue>

      { data.fee.value !== null && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.total_transaction_fee')}
          >
            {t('transactions.wrapped.transaction_fee')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <TxFee tx={ data } withUsd/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <TxDetailsGasPrice gasPrice={ data.gas_price }/>

      { data.gas_limit && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.maximum_amount_of_gas_that_can')}
          >
            {t('transactions.wrapped.gas_limit')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { BigNumber(data.gas_limit).toFormat() }
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemDivider/>

      <TxDetailsOther type={ data.type } nonce={ data.nonce } position={ null }/>

      <DetailedInfo.ItemLabel
        hint={t('transactions.wrapped.raw_input_hint')}
      >
        {t('transactions.wrapped.raw_input')}
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <RawInputData hex={ data.raw_input }/>
      </DetailedInfo.ItemValue>

      { data.decoded_input && (
        <>
          <DetailedInfo.ItemLabel
            hint={t('transactions.common.decoded_input_data')}
          >
            {t('transactions.wrapped.decoded_input_data')}
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <LogDecodedInputData data={ data.decoded_input }/>
          </DetailedInfo.ItemValue>
        </>
      ) }
    </Grid>
  );
};

export default TxDetailsWrapped;
