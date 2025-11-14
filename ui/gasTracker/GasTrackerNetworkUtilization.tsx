import { chakra } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import getNetworkUtilizationParams from 'lib/networks/getNetworkUtilizationParams';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { mdash } from 'toolkit/utils/htmlEntities';

interface Props {
  percentage: number;
  isLoading: boolean;
}

const GasTrackerNetworkUtilization = ({ percentage, isLoading }: Props) => {
  const { t } = useTranslation();
  const { load, color } = getNetworkUtilizationParams(percentage);

  return (
    <Skeleton loading={ isLoading } whiteSpace="pre-wrap">
      <span>{t('gas_tracker.common.network_utilization')} </span>
      <chakra.span color={ color }>{ percentage.toFixed(2) }% { mdash } { load } {t('gas_tracker.common.load')}</chakra.span>
    </Skeleton>
  );
};

export default React.memo(GasTrackerNetworkUtilization);
