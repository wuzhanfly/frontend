import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useApiQuery from 'lib/api/useApiQuery';
import { L2_DISPUTE_GAMES_ITEM } from 'stubs/L2';
import { generateListStub } from 'stubs/utils';
import { Skeleton } from 'toolkit/chakra/skeleton';
import OptimisticL2DisputeGamesListItem from 'ui/disputeGames/optimisticL2/OptimisticL2DisputeGamesListItem';
import OptimisticL2DisputeGamesTable from 'ui/disputeGames/optimisticL2/OptimisticL2DisputeGamesTable';
import { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import StickyPaginationWithText from 'ui/shared/StickyPaginationWithText';

const OptimisticL2DisputeGames = () => {
  const { t } = useTranslation();
  const { data, isError, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: 'general:optimistic_l2_dispute_games',
    options: {
      placeholderData: generateListStub<'general:optimistic_l2_dispute_games'>(
        L2_DISPUTE_GAMES_ITEM,
        50,
        {
          next_page_params: {
            items_count: 50,
            index: 9045200,
          },
        },
      ),
    },
  });

  const countersQuery = useApiQuery('general:optimistic_l2_dispute_games_count', {
    queryOptions: {
      placeholderData: 50617,
    },
  });

  const content = data?.items ? (
    <>
      <Box hideFrom="lg">
        { data.items.map(((item, index) => (
          <OptimisticL2DisputeGamesListItem
            key={ item.index + (isPlaceholderData ? String(index) : '') }
            item={ item }
            isLoading={ isPlaceholderData }
          />
        ))) }
      </Box>
      <Box hideBelow="lg">
        <OptimisticL2DisputeGamesTable items={ data.items } top={ pagination.isVisible ? ACTION_BAR_HEIGHT_DESKTOP : 0 } isLoading={ isPlaceholderData }/>
      </Box>
    </>
  ) : null;

  const text = (() => {
    if (countersQuery.isError || isError || !data?.items.length) {
      return null;
    }

    return (
      <Skeleton loading={ countersQuery.isPlaceholderData || isPlaceholderData } display="flex" flexWrap="wrap">
        { t('common.common.dispute_game_index') }
        <Text fontWeight={ 600 } whiteSpace="pre"> #{ data.items[0].index } </Text>{ t('common.common.to') }
        <Text fontWeight={ 600 } whiteSpace="pre"> #{ data.items[data.items.length - 1].index } </Text>
        { t('common.common.total_of_data_games', { data: countersQuery.data?.toLocaleString() }) }
      </Skeleton>
    );
  })();

  const actionBar = <StickyPaginationWithText text={ text } pagination={ pagination }/>;

  return (
    <>
      <PageTitle title={ t('common.common.dispute_games') } withTextAd/>
      <DataListDisplay
        isError={ isError }
        itemsNum={ data?.items.length }
        emptyText={ t('common.common.there_are_no_dispute_games') }
        actionBar={ actionBar }
      >
        { content }
      </DataListDisplay>
    </>
  );
};

export default OptimisticL2DisputeGames;
