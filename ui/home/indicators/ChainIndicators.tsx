import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TChainIndicator } from './types';
import type { ChainIndicatorId } from 'types/homepage';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { HOMEPAGE_STATS, HOMEPAGE_STATS_MICROSERVICE } from 'stubs/stats';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { Hint } from 'toolkit/components/Hint/Hint';
import IconSvg from 'ui/shared/IconSvg';

import ChainIndicatorChartContainer from './ChainIndicatorChartContainer';
import ChainIndicatorItem from './ChainIndicatorItem';
import useChartDataQuery from './useChartDataQuery';
import getIndicatorValues from './utils/getIndicatorValues';
import { getIndicators } from './utils/indicators';

const isStatsFeatureEnabled = config.features.stats.isEnabled;

const ChainIndicators = () => {
  const { t } = useTranslation();

  // 获取指标定义，但不进行国际化
  const INDICATORS = React.useMemo(() => getIndicators(t), [ t ]);

  const indicators = INDICATORS
    .filter(({ id }) => config.UI.homepage.charts.includes(id))
    .sort((a, b) => {
      if (config.UI.homepage.charts.indexOf(a.id) > config.UI.homepage.charts.indexOf(b.id)) {
        return 1;
      }

      if (config.UI.homepage.charts.indexOf(a.id) < config.UI.homepage.charts.indexOf(b.id)) {
        return -1;
      }

      return 0;
    });
  const [ selectedIndicator, selectIndicator ] = React.useState(indicators[0]?.id);
  const selectedIndicatorData = indicators.find(({ id }) => id === selectedIndicator);

  // 动态获取当前语言的指标信息
  // const getDynamicIndicatorData = React.useCallback((indicator: TChainIndicator | undefined) => {
  //   if (!indicator) return { title: undefined, hint: undefined };
  //
  //   // 基于指标ID动态确定国际化键
  //   let titleKey = '';
  //   let hintKey = '';
  //
  //   switch (indicator.id) {
  //     case 'daily_txs':
  //       titleKey = 'common.common.daily_transactions';
  //       hintKey = 'common.common.number_of_transactions_yesterday';
  //       break;
  //     case 'daily_operational_txs':
  //       titleKey = 'common.common.daily_op_txns';
  //       hintKey = 'common.common.number_of_operational_transactions_yesterday';
  //       break;
  //     case 'coin_price':
  //       // 对于代币价格，使用动态插值
  //       titleKey = 'common.common.token_price';
  //       hintKey = 'common.common.token_price_in_usd';
  //       break;
  //     case 'secondary_coin_price':
  //       titleKey = 'common.common.token_price';
  //       hintKey = 'common.common.token_price_in_usd';
  //       break;
  //     case 'market_cap':
  //       titleKey = 'common.common.market_cap';
  //       hintKey = 'common.common.market_cap_description';
  //       break;
  //     case 'tvl':
  //       titleKey = 'common.common.total_value_locked';
  //       hintKey = 'common.common.total_value_of_digital_assets_';
  //       break;
  //     default:
  //       titleKey = '';
  //       hintKey = '';
  //   }
  //
  //   let title = indicator.title; // 默认使用原始标题
  //   if (titleKey) {
  //     title = t(titleKey);
  //   }
  //
  //   let hint = indicator.hint; // 默认使用原始提示
  //   if (hintKey) {
  //     if (indicator.id === 'coin_price') {
  //       hint = t(hintKey, { symbol: config.chain.currency.symbol });
  //     } else if (indicator.id === 'secondary_coin_price') {
  //       hint = t(hintKey, { symbol: config.chain.secondaryCoin.symbol });
  //     } else {
  //       hint = t(hintKey);
  //     }
  //   }
  //
  //   return { title, hint };
  //
  // }, [ t ]);

  const queryResult = useChartDataQuery(selectedIndicatorData?.id as ChainIndicatorId);

  const statsMicroserviceQueryResult = useApiQuery('stats:pages_main', {
    queryOptions: {
      refetchOnMount: false,
      enabled: isStatsFeatureEnabled,
      placeholderData: HOMEPAGE_STATS_MICROSERVICE,
    },
  });

  const statsApiQueryResult = useApiQuery('general:stats', {
    queryOptions: {
      refetchOnMount: false,
      placeholderData: HOMEPAGE_STATS,
    },
  });

  if (indicators.length === 0) {
    return null;
  }

  const isPlaceholderData = (isStatsFeatureEnabled && statsMicroserviceQueryResult.isPlaceholderData) || statsApiQueryResult.isPlaceholderData;
  const hasData = Boolean(statsApiQueryResult?.data || statsMicroserviceQueryResult?.data);

  const { value: indicatorValue, valueDiff: indicatorValueDiff } =
    getIndicatorValues(selectedIndicatorData as TChainIndicator, statsMicroserviceQueryResult?.data, statsApiQueryResult?.data);

  // const { title: dynamicTitle, hint: dynamicHint } = getDynamicIndicatorData(selectedIndicatorData);

  // 创建一个辅助函数，获取特定键的英文原始值
  const getEnglishValue = React.useCallback((key: string, symbol?: string) => {
    switch (key) {
      case 'common.common.daily_transactions': return 'Daily transactions';
      case 'common.common.daily_op_txns': return 'Daily op txns';
      case 'common.common.market_cap': return 'Market Cap';
      case 'common.common.total_value_locked': return 'Total Value Locked';
      case 'common.common.number_of_transactions_yesterday':
        return 'Number of transactions yesterday (0:00 - 23:59 UTC). The chart displays daily transactions for the past 30 days.';
      case 'common.common.number_of_operational_transactions_yesterday':
        return 'Number of operational transactions yesterday (0:00 - 23:59 UTC). The chart displays daily operational transactions for the past 30 days.';
      case 'common.common.market_cap_description':
        return 'The total market value of a cryptocurrency\'s circulating supply. It is analogous to the free-float capitalization in the stock market. Market Cap = Current Price x Circulating Supply.';
      case 'common.common.total_value_of_digital_assets_':
        return 'Total Value Of Digital Assets ';
      case 'common.common.token_price':
        return symbol ? `${ symbol } price` : ' price';
      case 'common.common.token_price_in_usd':
        return symbol ? `${ symbol } token daily price in USD.` : ' token daily price in USD.';
      case 'common.common.average_block_time':
        return 'Average block time';
      case 'common.common.total_addresses':
        return 'Total addresses';
      case 'common.common.total_blocks':
        return 'Total blocks';
      case 'common.common.total_txns':
        return 'Total txns';
      case 'common.common.yesterday_txns':
        return 'Yesterday txns';
      case 'common.common.total_operational_txns':
        return 'Total operational txns';
      case 'common.common.yesterday_operational_txns':
        return 'Yesterday operational txns';
      case 'common.common.daily_operational_transactions':
        return 'Daily operational transactions';
      case 'common.common.average_time_for_a_block_to_be_included_in_the_blockchain':
        return 'Average time taken in seconds for a block to be included in the blockchain';
      case 'common.common.number_of_addresses_that_participated_in_the_blockchain':
        return 'Number of addresses that participated in the blockchain';
      case 'common.common.number_of_blocks_over_all_time':
        return 'Number of blocks over all time';
      case 'common.common.all_transactions_including_pending_dropped_replaced_failed_transactions':
        return 'All transactions including pending, dropped, replaced, failed transactions';
      case 'common.common.number_of_transactions_yesterday_0_00_23_59_utc':
        return 'Number of transactions yesterday (0:00 - 23:59 UTC)';
      case 'common.common.total_txns_without_block_creation_transactions':
        return 'Total txns without block creation transactions';
      case 'common.common.number_of_transactions_yesterday_0_00_23_59_utc_without_block_creation_transactions':
        return 'Number of transactions yesterday (0:00 - 23:59 UTC) without block creation transactions';
      case 'common.common.the_chart_displays_daily_transactions_for_the_past_30_days':
        return 'The chart displays daily transactions for the past 30 days';
      case 'common.common.the_chart_displays_daily_transactions_for_the_past_30_days_without_block_creation_transactions':
        return 'The chart displays daily transactions for the past 30 days (without block creation transactions)';
      case 'common.common.average_block_time_description':
        return 'Average time taken in seconds for a block to be included in the blockchain';
      case 'common.common.total_addresses_description':
        return 'Number of addresses that participated in the blockchain';
      case 'common.common.total_blocks_description':
        return 'Number of blocks over all time';
      case 'common.common.total_txns_description':
        return 'All transactions including pending, dropped, replaced, failed transactions';
      case 'common.common.yesterday_txns_description':
        return 'Number of transactions yesterday (0:00 - 23:59 UTC)';
      case 'common.common.total_operational_txns_description':
        return 'Total txns without block creation transactions';
      case 'common.common.yesterday_operational_txns_description':
        return 'Number of transactions yesterday (0:00 - 23:59 UTC) without block creation transactions';
      default: 
        return key;
    }
  }, []);

  const title = (() => {
    let title: string | undefined;
    if (isStatsFeatureEnabled && selectedIndicatorData?.titleMicroservice && statsMicroserviceQueryResult?.data) {
      title = selectedIndicatorData.titleMicroservice(statsMicroserviceQueryResult.data);
    }

    // 检查微服务返回的标题是否与英文原始值一致，如果是则使用当前语言的国际化版本
    if (title && selectedIndicatorData) {
      let isEnglishOriginalTitle = false;

      // 根据不同的指标ID检查对应的英文原始值
      switch (selectedIndicatorData.id) {
        case 'daily_txs':
          isEnglishOriginalTitle = title === getEnglishValue('common.common.daily_transactions');
          break;
        case 'daily_operational_txs':
          isEnglishOriginalTitle = title === getEnglishValue('common.common.daily_op_txns');
          break;
        case 'coin_price':
          isEnglishOriginalTitle = title === getEnglishValue('common.common.token_price', config.chain.currency.symbol);
          break;
        case 'secondary_coin_price':
          isEnglishOriginalTitle = title === getEnglishValue('common.common.token_price', config.chain.secondaryCoin.symbol);
          break;
        case 'market_cap':
          isEnglishOriginalTitle = title === getEnglishValue('common.common.market_cap');
          break;
        case 'tvl':
          isEnglishOriginalTitle = title === getEnglishValue('common.common.total_value_locked');
          break;
      }

      if (isEnglishOriginalTitle) {
        return selectedIndicatorData.title; // 返回当前语言的国际化标题
      }
    }

    return title || selectedIndicatorData?.title;
  })();

  const hint = (() => {
    let hint: string | undefined;
    if (isStatsFeatureEnabled && selectedIndicatorData?.hintMicroservice && statsMicroserviceQueryResult?.data) {
      hint = selectedIndicatorData.hintMicroservice(statsMicroserviceQueryResult.data);
    }

    // 检查微服务返回的提示是否与英文原始值一致，如果是则使用当前语言的国际化版本
    if (hint && selectedIndicatorData) {
      let isEnglishOriginalHint = false;

      // 根据不同的指标ID检查对应的英文原始值
      switch (selectedIndicatorData.id) {
        case 'daily_txs':
          // daily_txs 指标从微服务返回的是 daily_new_transactions.info.description
          isEnglishOriginalHint = hint === getEnglishValue('common.common.the_chart_displays_daily_transactions_for_the_past_30_days') ||
                                  hint === getEnglishValue('common.common.number_of_transactions_yesterday');
          break;
        case 'daily_operational_txs':
          // daily_operational_txs 指标从微服务返回的是 daily_new_operational_transactions.info.description
          isEnglishOriginalHint = hint === getEnglishValue('common.common.the_chart_displays_daily_transactions_for_the_past_30_days_without_block_creation_transactions') ||
                                  hint === getEnglishValue('common.common.number_of_operational_transactions_yesterday');
          break;
        case 'coin_price':
          isEnglishOriginalHint = hint === getEnglishValue('common.common.token_price_in_usd', config.chain.currency.symbol);
          break;
        case 'secondary_coin_price':
          isEnglishOriginalHint = hint === getEnglishValue('common.common.token_price_in_usd', config.chain.secondaryCoin.symbol);
          break;
        case 'market_cap':
          isEnglishOriginalHint = hint === getEnglishValue('common.common.market_cap_description');
          break;
        case 'tvl':
          isEnglishOriginalHint = hint === getEnglishValue('common.common.total_value_of_digital_assets_');
          break;
      }

      if (isEnglishOriginalHint) {
        return selectedIndicatorData.hint; // 返回当前语言的国际化提示
      }
    }

    return hint || selectedIndicatorData?.hint;
  })();

  const valueTitle = (() => {
    if (isPlaceholderData) {
      return <Skeleton loading h="36px" w="215px"/>;
    }

    if (!hasData) {
      return <Text fontSize="xs">There is no data</Text>;
    }

    return (
      <Text fontWeight={ 700 } fontSize="30px" lineHeight="36px">
        { indicatorValue }
      </Text>
    );
  })();

  const valueDiff = (() => {
    if (indicatorValueDiff === undefined || indicatorValueDiff === null) {
      return null;
    }

    const diffColor = indicatorValueDiff >= 0 ? 'green.500' : 'red.500';

    return (
      <Skeleton loading={ statsApiQueryResult.isPlaceholderData } display="flex" alignItems="center" color={ diffColor } ml={ 2 }>
        <IconSvg name="arrows/up-head" boxSize={ 5 } mr={ 1 } transform={ indicatorValueDiff < 0 ? 'rotate(180deg)' : 'rotate(0)' }/>
        <Text color={ diffColor } fontWeight={ 600 }>{ indicatorValueDiff }%</Text>
      </Skeleton>
    );
  })();

  return (
    <Flex
      px={{ base: 3, lg: 4 }}
      py={ 3 }
      borderRadius="base"
      bgColor={{ _light: 'theme.stats.bg._light', _dark: 'theme.stats.bg._dark' }}
      columnGap={{ base: 3, lg: 4 }}
      rowGap={ 0 }
      flexBasis="50%"
      flexGrow={ 1 }
      alignItems="stretch"
    >
      <Flex flexGrow={ 1 } flexDir="column">
        <Skeleton loading={ isPlaceholderData } display="flex" alignItems="center" w="fit-content" columnGap={ 1 }>
          <Text fontWeight={ 500 }>{ title }</Text>
          { hint && <Hint label={ hint }/> }
        </Skeleton>
        <Flex mb={{ base: 0, lg: 2 }} mt={ 1 } alignItems="end">
          { valueTitle }
          { valueDiff }
        </Flex>
        <Flex h={{ base: '80px', lg: '110px' }} alignItems="flex-start" flexGrow={ 1 }>
          <ChainIndicatorChartContainer { ...queryResult }/>
        </Flex>
      </Flex>
      { indicators.length > 1 && (
        <Flex
          flexShrink={ 0 }
          flexDir="column"
          as="ul"
          borderRadius="lg"
          rowGap="6px"
          m={{ base: 'auto 0', lg: 0 }}
        >
          { indicators.map((indicator) => {
            // 为每个指标项动态计算国际化标题
            let itemTitle = indicator.title;
            switch (indicator.id) {
              case 'daily_txs':
                itemTitle = t('common.common.daily_transactions');
                break;
              case 'daily_operational_txs':
                itemTitle = t('common.common.daily_op_txns');
                break;
              case 'coin_price':
                itemTitle = t('common.common.token_price', { symbol: config.chain.currency.symbol });
                break;
              case 'secondary_coin_price':
                itemTitle = t('common.common.token_price', { symbol: config.chain.secondaryCoin.symbol });
                break;
              case 'market_cap':
                itemTitle = t('common.common.market_cap');
                break;
              case 'tvl':
                itemTitle = t('common.common.total_value_locked');
                break;
            }

            return (
              <ChainIndicatorItem
                key={ indicator.id }
                id={ indicator.id }
                title={ itemTitle }
                icon={ indicator.icon }
                isSelected={ selectedIndicator === indicator.id }
                onClick={ selectIndicator }
                { ...getIndicatorValues(indicator, statsMicroserviceQueryResult?.data, statsApiQueryResult?.data) }
                isLoading={ isPlaceholderData }
                hasData={ hasData }
              />
            );
          }) }
        </Flex>
      ) }
    </Flex>
  );
};

export default ChainIndicators;
