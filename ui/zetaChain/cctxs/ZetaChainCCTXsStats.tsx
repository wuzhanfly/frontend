import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import React from 'react';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { TXS_STATS_MICROSERVICE } from 'stubs/tx';
import StatsWidget from 'ui/shared/stats/StatsWidget';

interface Props extends BoxProps {}

const ZetaChainCCTXsStats = (props: Props) => {
  const { t } = useTranslation();
  const isStatsFeatureEnabled = config.features.stats.isEnabled;

  const txsStatsQuery = useApiQuery('stats:pages_transactions', {
    queryOptions: {
      enabled: isStatsFeatureEnabled,
      placeholderData: isStatsFeatureEnabled ? TXS_STATS_MICROSERVICE : undefined,
    },
  });

  if (!txsStatsQuery.data) {
    return null;
  }

  const isLoading = txsStatsQuery.isPlaceholderData;

  const cctxCountTotal = txsStatsQuery.data?.total_zetachain_cross_chain_txns;
  const cctxPendingCountTotal = txsStatsQuery.data?.pending_zetachain_cross_chain_txns;
  const cctxCount24h = txsStatsQuery.data?.new_zetachain_cross_chain_txns_24h;

  const itemsCount = [
    cctxCountTotal,
    cctxPendingCountTotal,
    cctxCount24h,
  ].filter(item => item !== null && item !== undefined).length;

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: '1fr', lg: `repeat(${ itemsCount }, calc(${ 100 / itemsCount }% - 9px))` }}
      rowGap={ 3 }
      columnGap={ 3 }
      mb={ 6 }
      { ...props }
    >
      { cctxCountTotal && (
        <StatsWidget
          label={ t('transactions.common.total_zetachain_cross_chain_txns') }
          value={ Number(cctxCountTotal.value).toLocaleString() }
          isLoading={ isLoading }
        />
      ) }
      { cctxPendingCountTotal && (
        <StatsWidget
          label={ t('transactions.common.pending_zetachain_cross_chain_txns') }
          value={ Number(cctxPendingCountTotal.value).toLocaleString() }
          isLoading={ isLoading }
        />
      ) }
      { cctxCount24h && (
        <StatsWidget
          label={ t('transactions.common.new_zetachain_cross_chain_txns_24h') }
          value={ Number(cctxCount24h.value).toLocaleString() }
          period="24h"
          isLoading={ isLoading }
        />
      ) }
    </Box>
  );
};

export default React.memo(ZetaChainCCTXsStats);
