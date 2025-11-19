import React from 'react';

import type { TChainIndicator } from '../types';

import config from 'configs/app';
import IconSvg from 'ui/shared/IconSvg';
import NativeTokenIcon from 'ui/shared/NativeTokenIcon';

const rollupFeature = config.features.rollup;
const isOptimisticRollup = rollupFeature.isEnabled && rollupFeature.type === 'optimistic';
const isArbitrumRollup = rollupFeature.isEnabled && rollupFeature.type === 'arbitrum';

export function getIndicators(t: (key: string) => string): Array<TChainIndicator> {
  return [
    {
      id: 'daily_txs',
      title: t('common.common.daily_transactions'),
      titleMicroservice: (stats) => stats.daily_new_transactions?.info?.title,
      value: (stats) => stats.transactions_today === null ?
        'N/A' :
        Number(stats.transactions_today).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }),
      valueMicroservice: (stats) => stats.yesterday_transactions?.value === null ?
        'N/A' :
        Number(stats.yesterday_transactions?.value).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }),
      icon: <IconSvg name="transactions" boxSize={ 6 } bgColor="#56ACD1" borderRadius="base" color="white"/>,
      hint: t('common.common.number_of_transactions_yesterday'),
      hintMicroservice: (stats) => stats.daily_new_transactions?.info?.description,
    },
    {
      id: 'daily_operational_txs',
      title: t('common.common.daily_op_txns'),
      titleMicroservice: (stats) => {
        if (isArbitrumRollup) {
          return stats.daily_new_operational_transactions?.info?.title;
        } else if (isOptimisticRollup) {
          return stats.op_stack_daily_new_operational_transactions?.info?.title;
        }
        return '';
      },
      value: () => 'N/A',
      valueMicroservice: (stats) => {
        if (isArbitrumRollup) {
          return stats.yesterday_operational_transactions?.value === null ?
            'N/A' :
            Number(stats.yesterday_operational_transactions?.value).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' });
        } else if (isOptimisticRollup) {
          return stats.op_stack_yesterday_operational_transactions?.value === null ?
            'N/A' :
            Number(stats.op_stack_yesterday_operational_transactions?.value).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' });
        }
        return;
      },
      icon: <IconSvg name="transactions" boxSize={ 6 } bgColor="#56ACD1" borderRadius="base" color="white"/>,
      hint: t('common.common.number_of_operational_transactions_yesterday'),
      hintMicroservice: (stats) => stats.daily_new_operational_transactions?.info?.description,
    },
    {
      id: 'coin_price',
      title: t('common.common.token_price', { symbol: config.chain.currency.symbol }),
      value: (stats) => stats.coin_price === null ?
        '$N/A' :
        '$' + Number(stats.coin_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }),
      valueDiff: (stats) => stats?.coin_price !== null ? stats?.coin_price_change_percentage : null,
      icon: <NativeTokenIcon boxSize={ 6 }/>,
      hint: t('common.common.token_price_in_usd', { symbol: config.chain.currency.symbol }),
    },
    {
      id: 'secondary_coin_price',
      title: t('common.common.token_price', { symbol: config.chain.secondaryCoin.symbol }),
      value: (stats) => !stats.secondary_coin_price || stats.secondary_coin_price === null ?
        '$N/A' :
        '$' + Number(stats.secondary_coin_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }),
      valueDiff: () => null,
      icon: <NativeTokenIcon boxSize={ 6 } type="secondary"/>,
      hint: t('common.common.token_price_in_usd', { symbol: config.chain.secondaryCoin.symbol }),
    },
    {
      id: 'market_cap',
      title: t('common.common.market_cap'),
      value: (stats) => stats.market_cap === null ?
        '$N/A' :
        '$' + Number(stats.market_cap).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }),
      icon: <IconSvg name="globe" boxSize={ 6 } bgColor="#6A5DCC" borderRadius="base" color="white"/>,
      // eslint-disable-next-line max-len
      hint: t('common.common.market_cap_description'),
    },
    {
      id: 'tvl',
      title: t('common.common.total_value_locked'),
      value: (stats) => stats.tvl === null ?
        '$N/A' :
        '$' + Number(stats.tvl).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }),
      icon: <IconSvg name="lock" boxSize={ 6 } bgColor="#517FDB" borderRadius="base" color="white"/>,
      hint: t('common.common.total_value_of_digital_assets_'),
    },
  ];
}