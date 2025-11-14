import { Resolution } from '@blockscout/stats-types';
import type { StatsIntervalIds } from 'types/client/stats';

export const getStatsResolutions = (t: (key: string) => string): Array<{ id: Resolution; title: string }> => [
  {
    id: Resolution.DAY,
    title: t('stats.common.day'),
  },
  {
    id: Resolution.WEEK,
    title: t('stats.common.week'),
  },
  {
    id: Resolution.MONTH,
    title: t('stats.common.month'),
  },
  {
    id: Resolution.YEAR,
    title: t('stats.common.year'),
  },
];

export const getStatsIntervals = (t: (key: string) => string): { [key in StatsIntervalIds]: { title: string; shortTitle: string; start?: Date } } => ({
  all: {
    title: t('stats.common.all_time'),
    shortTitle: t('stats.common.all_time'),
  },
  oneMonth: {
    title: t('stats.common.1_month'),
    shortTitle: '1M',
    start: getStartDateInPast(1),
  },
  threeMonths: {
    title: t('stats.common.3_months'),
    shortTitle: '3M',
    start: getStartDateInPast(3),
  },
  sixMonths: {
    title: t('stats.common.6_months'),
    shortTitle: '6M',
    start: getStartDateInPast(6),
  },
  oneYear: {
    title: t('stats.common.1_year'),
    shortTitle: '1Y',
    start: getStartDateInPast(12),
  },
});

function getStartDateInPast(months: number): Date {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date;
}
