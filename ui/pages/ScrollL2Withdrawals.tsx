import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useApiQuery from 'lib/api/useApiQuery';
import { SCROLL_L2_MESSAGE_ITEM } from 'stubs/scrollL2';
import { generateListStub } from 'stubs/utils';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { rightLineArrow, nbsp } from 'toolkit/utils/htmlEntities';
import { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import StickyPaginationWithText from 'ui/shared/StickyPaginationWithText';
import ScrollL2WithdrawalsListItem from 'ui/withdrawals/scrollL2/ScrollL2WithdrawalsListItem';
import ScrollL2WithdrawalsTable from 'ui/withdrawals/scrollL2/ScrollL2WithdrawalsTable';

const ScrollL2Withdrawals = () => {
  const { t } = useTranslation();
  const { data, isError, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: 'general:scroll_l2_withdrawals',
    options: {
      placeholderData: generateListStub<'general:scroll_l2_withdrawals'>(
        SCROLL_L2_MESSAGE_ITEM,
        50,
        { next_page_params: { items_count: 50, id: 1 } },
      ),
    },
  });

  const countersQuery = useApiQuery('general:scroll_l2_withdrawals_count', {
    queryOptions: {
      placeholderData: 1927029,
    },
  });

  const content = data?.items ? (
    <>
      <Box hideFrom="lg">
        { data.items.map(((item, index) => (
          <ScrollL2WithdrawalsListItem
            key={ String(item.id) + (isPlaceholderData ? index : '') }
            isLoading={ isPlaceholderData }
            item={ item }
          />
        ))) }
      </Box>
      <Box hideBelow="lg">
        <ScrollL2WithdrawalsTable items={ data.items } top={ pagination.isVisible ? ACTION_BAR_HEIGHT_DESKTOP : 0 } isLoading={ isPlaceholderData }/>
      </Box>
    </>
  ) : null;

  const text = (() => {
    if (countersQuery.isError) {
      return null;
    }

    return (
      <Skeleton
        loading={ countersQuery.isPlaceholderData }
        display="inline-block"
      >
        { t('common.common.a_total_of_data_withdrawals_found', { data: countersQuery.data?.toLocaleString() }) }
      </Skeleton>
    );
  })();

  const actionBar = <StickyPaginationWithText text={ text } pagination={ pagination }/>;

  return (
    <>
      <PageTitle title={ `${ t('common.common.withdrawals') } (L2${ nbsp }${ rightLineArrow }${ nbsp }L1)` } withTextAd/>
      <DataListDisplay
        isError={ isError }
        itemsNum={ data?.items?.length }
        emptyText={ t('common.common.there_are_no_withdrawals') }
        actionBar={ actionBar }
      >
        { content }
      </DataListDisplay>
    </>
  );
};

export default ScrollL2Withdrawals;
