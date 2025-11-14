import { createListCollection } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { StatsInterval, StatsIntervalIds } from 'types/client/stats';

import { Select } from 'toolkit/chakra/select';
import { Skeleton } from 'toolkit/chakra/skeleton';
import type { TagProps } from 'toolkit/chakra/tag';
import TagGroupSelect from 'ui/shared/tagGroupSelect/TagGroupSelect';
import { getStatsIntervals } from 'ui/stats/constants';



type Props = {
  interval: StatsIntervalIds;
  onIntervalChange: (newInterval: StatsIntervalIds) => void;
  isLoading?: boolean;
  selectTagSize?: TagProps['size'];
};

const ChartIntervalSelect = ({ interval, onIntervalChange, isLoading, selectTagSize }: Props) => {
  const { t } = useTranslation();
  const STATS_INTERVALS = getStatsIntervals(t);
  
  const intervalCollection = React.useMemo(() => createListCollection({
    items: Object.keys(STATS_INTERVALS).map((id: string) => ({
      value: id,
      label: STATS_INTERVALS[id as StatsIntervalIds].title,
    })),
  }), [t]);

  const intervalListShort = React.useMemo(() => Object.keys(STATS_INTERVALS).map((id: string) => ({
    id: id,
    title: STATS_INTERVALS[id as StatsIntervalIds].shortTitle,
  })) as Array<StatsInterval>, [t]);

  const handleItemSelect = React.useCallback(({ value }: { value: Array<string> }) => {
    onIntervalChange(value[0] as StatsIntervalIds);
  }, [ onIntervalChange ]);

  return (
    <>
      <Skeleton hideBelow="lg" borderRadius="base" loading={ isLoading }>
        <TagGroupSelect<StatsIntervalIds> items={ intervalListShort } onChange={ onIntervalChange } value={ interval } tagSize={ selectTagSize }/>
      </Skeleton>
      <Select
        collection={ intervalCollection }
        placeholder={t('shared.common.select_interval')}
        defaultValue={ [ interval ] }
        onValueChange={ handleItemSelect }
        hideFrom="lg"
        w="100%"
        loading={ isLoading }
      />
    </>
  );
};

export default React.memo(ChartIntervalSelect);
