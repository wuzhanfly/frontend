import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useApiQuery from 'lib/api/useApiQuery';
import { SCROLL_L2_TXN_BATCH } from 'stubs/scrollL2';
import { generateListStub } from 'stubs/utils';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import StickyPaginationWithText from 'ui/shared/StickyPaginationWithText';
import ScrollL2TxnBatchesListItem from 'ui/txnBatches/scrollL2/ScrollL2TxnBatchesListItem';
import ScrollL2TxnBatchesTable from 'ui/txnBatches/scrollL2/ScrollL2TxnBatchesTable';

const ScrollL2TxnBatches = () => {
  const { t } = useTranslation();
  const { data, isError, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: 'general:scroll_l2_txn_batches',
    options: {
      placeholderData: generateListStub<'general:scroll_l2_txn_batches'>(
        SCROLL_L2_TXN_BATCH,
        50,
        {
          next_page_params: {
            items_count: 50,
            number: 224,
          },
        },
      ),
    },
  });

  const countersQuery = useApiQuery('general:scroll_l2_txn_batches_count', {
    queryOptions: {
      placeholderData: 123456,
    },
  });

  const content = data?.items ? (
    <>
      <Box hideFrom="lg">
        { data.items.map(((item, index) => (
          <ScrollL2TxnBatchesListItem
            key={ item.number + (isPlaceholderData ? String(index) : '') }
            item={ item }
            isLoading={ isPlaceholderData }
          />
        ))) }
      </Box>
      <Box hideBelow="lg">
        <ScrollL2TxnBatchesTable items={ data.items } top={ pagination.isVisible ? ACTION_BAR_HEIGHT_DESKTOP : 0 } isLoading={ isPlaceholderData }/>
      </Box>
    </>
  ) : null;

  const text = (() => {
    if (countersQuery.isError || isError || !data?.items.length) {
      return null;
    }

    return (
      <Skeleton loading={ countersQuery.isPlaceholderData || isPlaceholderData } display="flex" flexWrap="wrap">
        { t('transactions.common.txn_batch') }
        <Text fontWeight={ 600 } whiteSpace="pre"> #{ data.items[0].number } </Text>{ t('transactions.common.to') }
        <Text fontWeight={ 600 } whiteSpace="pre"> #{ data.items[data.items.length - 1].number } </Text>
        ({ t('common.common.total_of') } { countersQuery.data?.toLocaleString() } { t('common.common.batches') })
      </Skeleton>
    );
  })();

  const actionBar = <StickyPaginationWithText text={ text } pagination={ pagination }/>;

  return (
    <>
      <PageTitle title={ t('common.common.txn_batches') } withTextAd/>
      <DataListDisplay
        isError={ isError }
        itemsNum={ data?.items?.length }
        emptyText={ t('common.common.there_are_no_txn_batches') }
        actionBar={ actionBar }
      >
        { content }
      </DataListDisplay>
    </>
  );
};

export default ScrollL2TxnBatches;
