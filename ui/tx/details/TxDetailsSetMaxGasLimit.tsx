import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Transaction } from 'types/api/transaction';

import config from 'configs/app';
import { currencyUnits } from 'lib/units';
import CurrencyValue from 'ui/shared/CurrencyValue';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';

import TxDetailsGasUsage from './TxDetailsGasUsage';

interface Props {
  data: Transaction;
}

const TxDetailsSetMaxGasLimit = ({ data }: Props) => {
  const { t } = useTranslation();

  if (!config.UI.views.tx.additionalFields?.set_max_gas_limit) {
    return null;
  }

  const maxGasLimit = BigNumber(data.gas_limit || 0).multipliedBy(BigNumber(data.gas_price || 0));

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('transactions.common.max_network_fee_sender_willing_to_pay') }
      >
        { t('transactions.common.user_is_gas_limit') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        <CurrencyValue
          value={ maxGasLimit.toString() }
          currency={ currencyUnits.ether }
          decimals={ String(config.chain.currency.decimals) }
          exchangeRate={ 'exchange_rate' in data ? data.exchange_rate : null }
          showGweiTooltip
          flexWrap="wrap"
          mr={ 3 }
          rowGap={ 0 }
        />
      </DetailedInfo.ItemValue>
      <TxDetailsGasUsage data={ data }/>
    </>
  );
};

export default React.memo(TxDetailsSetMaxGasLimit);
