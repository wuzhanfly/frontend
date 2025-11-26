import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { UptimeRealTimeData } from 'types/api/megaEth';

import StatsWidget from 'ui/shared/stats/StatsWidget';

interface Props {
  realtimeData: UptimeRealTimeData | null;
}

const UptimeStats = ({ realtimeData }: Props) => {
  const { t } = useTranslation();

  return (
    <Box
      columnGap={ 2 }
      rowGap={ 2 }
      mb={ 8 }
      display="grid"
      gridTemplateColumns={{ base: '1fr', lg: 'repeat(4, 1fr)' }}
    >
      <StatsWidget
        label={t('common.common.current_tps')}
        hint={t('common.common.number_of_transactions_process')}
        value={ realtimeData ? Number(realtimeData.instant_tps).toLocaleString() : '-' }
      />
      <StatsWidget
        label={t('mega_eth.stats.megas_per_second')}
        hint={t('common.common.number_of_computational_gas_co')}
        value={ realtimeData ? Number(realtimeData.instant_mgas_per_second).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-' }
      />
      <StatsWidget
        label={t('common.common.block_height')}
        hint={t('common.common.number_of_blocks_created_since')}
        value={ realtimeData ? Number(realtimeData.latest_mini_block_id).toLocaleString() : '-' }
      />
      <StatsWidget
        label={t('common.common.block_time')}
        hint={t('common.common.time_taken_by_the_sequencer_to')}
        valuePostfix=" ms"
        value={ realtimeData ? Number(realtimeData.instant_mini_block_interval).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-' }
      />
    </Box>
  );
};

export default React.memo(UptimeStats);
