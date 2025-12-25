import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Transaction } from 'types/api/transaction';

import config from 'configs/app';
import { currencyUnits } from 'lib/units';
import CurrencyValue from 'ui/shared/CurrencyValue';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import * as DetailedInfoItemBreakdown from 'ui/shared/DetailedInfo/DetailedInfoItemBreakdown';
import TxFee from 'ui/shared/tx/TxFee';

interface Props {
  isLoading: boolean;
  data: Transaction;
}

const TxDetailsTxFee = ({ isLoading, data }: Props) => {
  const { t } = useTranslation();

  if (config.UI.views.tx.hiddenFields?.tx_fee) {
    return null;
  }

  const content = (() => {
    if (!config.UI.views.tx.groupedFees) {
      return (
        <TxFee
          tx={ data }
          isLoading={ isLoading }
          withUsd
          rowGap={ 0 }
        />
      );
    }

    const baseFeeBn = BigNumber(data.base_fee_per_gas || 0).multipliedBy(data.gas_used || 0);
    const priorityFeeBn = BigNumber(data.priority_fee || 0);

    return (
      <>
        <CurrencyValue
          value={ data.fee.value }
          currency={ currencyUnits.ether }
          decimals={ String(config.chain.currency.decimals) }
          exchangeRate={ 'exchange_rate' in data ? data.exchange_rate : null }
          isLoading={ isLoading }
          showGweiTooltip
          flexWrap="wrap"
          mr={ 3 }
          rowGap={ 0 }
        />
        <DetailedInfoItemBreakdown.Container loading={ isLoading }>
          <DetailedInfoItemBreakdown.Row
            label={ t('transactions.common.base_fee') }
            hint={ t('transactions.common.the_minimum_network_fee_charge') }
          >
            <CurrencyValue
              value={ baseFeeBn.toString() }
              currency={ currencyUnits.ether }
              decimals={ String(config.chain.currency.decimals) }
              exchangeRate={ 'exchange_rate' in data ? data.exchange_rate : null }
              isLoading={ isLoading }
              showGweiTooltip
              flexWrap="wrap"
              rowGap={ 0 }
            />
          </DetailedInfoItemBreakdown.Row>
          <DetailedInfoItemBreakdown.Row
            label={ t('transactions.common.priority_fee') }
            hint={ t('transactions.common.an_extra_fee_set_by_the_sender') }
          >
            <CurrencyValue
              value={ priorityFeeBn.toString() }
              currency={ currencyUnits.ether }
              decimals={ String(config.chain.currency.decimals) }
              exchangeRate={ 'exchange_rate' in data ? data.exchange_rate : null }
              isLoading={ isLoading }
              showGweiTooltip
              flexWrap="wrap"
              rowGap={ 0 }
            />
          </DetailedInfoItemBreakdown.Row>
        </DetailedInfoItemBreakdown.Container>

      </>
    );
  })();

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ data.blob_gas_used ? t('transactions.common.transaction_fee_without_blob_f') : t('transactions.common.total_transaction_fee') }
        isLoading={ isLoading }
      >
        { t('transactions.common.transaction_fee') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        { content }
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(TxDetailsTxFee);
