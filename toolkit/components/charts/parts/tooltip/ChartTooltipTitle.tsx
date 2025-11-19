import { useToken } from '@chakra-ui/react';
import * as d3 from 'd3';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Resolution, getResolutionLabels } from '../../types';

import ChartTooltipRow from './ChartTooltipRow';

const ChartTooltipTitle = ({ resolution = Resolution.DAY }: { resolution?: Resolution }) => {
  const { t } = useTranslation();
  const titleColor = useToken('colors', 'yellow.300');
  const resolutionLabels = getResolutionLabels(t);
  const resolutionTitle = resolutionLabels.find(({ id }) => id === resolution)?.title || t('charts.common.day');

  return (
    <ChartTooltipRow lineNum={ 0 }>
      <text
        className="ChartTooltip__title"
        transform="translate(0,0)"
        fill={ titleColor[0] }
        opacity={ 0 }
        dominantBaseline="hanging"
      >
        { t('charts.common.incomplete_resolution', { resolution: resolutionTitle.toLowerCase() }) }
      </text>
    </ChartTooltipRow>
  );
};

export default React.memo(ChartTooltipTitle);

export function useRenderTitle(ref: React.RefObject<SVGGElement | null>) {
  return React.useCallback((isVisible: boolean) => {
    d3.select(ref.current)
      .select('.ChartTooltip__title')
      .attr('opacity', isVisible ? 1 : 0);
  }, [ ref ]);
}
