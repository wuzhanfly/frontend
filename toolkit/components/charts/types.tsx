import type * as d3 from 'd3';

export { Resolution } from '@blockscout/stats-types';
import { Resolution as ResolutionEnum } from '@blockscout/stats-types';

// 导出国际化函数而不是静态常量
export const getResolutionLabels = (t: (key: string) => string) => [
  {
    id: ResolutionEnum.DAY,
    title: t('charts.common.day'),
  },
  {
    id: ResolutionEnum.WEEK,
    title: t('charts.common.week'),
  },
  {
    id: ResolutionEnum.MONTH,
    title: t('charts.common.month'),
  },
  {
    id: ResolutionEnum.YEAR,
    title: t('charts.common.year'),
  },
];

export interface TimeChartItemRaw {
  date: Date;
  dateLabel?: string;
  value: number | string | null;
}

export interface TimeChartItem {
  date: Date;
  date_to?: Date;
  dateLabel?: string;
  value: number;
  isApproximate?: boolean;
}

export interface ChartMargin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface ChartOffset {
  x?: number;
  y?: number;
}

export type ChartConfig =
  | {
    type: 'line';
    color: string;
    strokeWidth?: number;
    strokeDasharray?: string;
  } |
  {
    type: 'area';
    gradient: {
      startColor: string;
      stopColor: string;
    };
  };

export interface TimeChartDataItem {
  id: string;
  name: string;
  items: Array<TimeChartItem>;
  charts: Array<ChartConfig>;
  units?: string;
  valueFormatter?: (value: number) => string;
}

export type TimeChartData = Array<TimeChartDataItem>;

export interface AxisConfig {
  ticks?: number;
  nice?: boolean;
  noLabel?: boolean;
  scale?: {
    min?: number;
  };
  tickFormatter?: () => (d: d3.AxisDomain) => string;
}

export interface AxesConfig {
  x?: AxisConfig;
  y?: AxisConfig;
}

export type AxesConfigFn = (props: {
  isEnlarged?: boolean;
  isMobile?: boolean;
}) => AxesConfig;