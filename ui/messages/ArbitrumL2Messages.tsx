import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useApiQuery from 'lib/api/useApiQuery';
import { ARBITRUM_MESSAGES_ITEM } from 'stubs/arbitrumL2';
import { generateListStub } from 'stubs/utils';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { rightLineArrow, nbsp } from 'toolkit/utils/htmlEntities';
import ArbitrumL2MessagesListItem from 'ui/messages/ArbitrumL2MessagesListItem';
import ArbitrumL2MessagesTable from 'ui/messages/ArbitrumL2MessagesTable';
import { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import StickyPaginationWithText from 'ui/shared/StickyPaginationWithText';

export type MessagesDirection = 'from-rollup' | 'to-rollup';

type Props = {
  direction: MessagesDirection;
};

const ArbitrumL2Messages = ({ direction }: Props) => {
  const { t } = useTranslation();
  const type = direction === 'from-rollup' ? 'withdrawals' : 'deposits';
  const { data, isError, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: 'general:arbitrum_l2_messages',
    pathParams: { direction },
    options: {
      placeholderData: generateListStub<'general:arbitrum_l2_messages'>(
        ARBITRUM_MESSAGES_ITEM,
        50,
        { next_page_params: { items_count: 50, direction: 'to-rollup', id: 123456 } },
      ),
    },
  });

  const countersQuery = useApiQuery('general:arbitrum_l2_messages_count', {
    pathParams: { direction },
    queryOptions: {
      placeholderData: 1927029,
    },
  });

  const content = data?.items ? (
    <>
      <Box hideFrom="lg">
        { data.items.map(((item, index) => (
          <ArbitrumL2MessagesListItem
            key={ String(item.id) + (isPlaceholderData ? index : '') }
            isLoading={ isPlaceholderData }
            item={ item }
            direction={ direction }
          />
        ))) }
      </Box>
      <Box hideBelow="lg">
        <ArbitrumL2MessagesTable
          items={ data.items }
          direction={ direction }
          top={ pagination.isVisible ? ACTION_BAR_HEIGHT_DESKTOP : 0 }
          isLoading={ isPlaceholderData }
        />
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
        {t('common.common.total_found', 'A total of {{count}} {{type}} found', { 
          count: Number(countersQuery.data || 0), 
          type: t(`common.common.${type}`, type) 
        })}
      </Skeleton>
    );
  })();

  const actionBar = <StickyPaginationWithText text={ text } pagination={ pagination }/>;

  return (
    <>
      <PageTitle
        title={ direction === 'from-rollup' ?
          t('common.common.withdrawals_l2_to_l1', `Withdrawals (L2${ nbsp }${ rightLineArrow }${ nbsp }L1)`) :
          t('common.common.deposits_l1_to_l2', `Deposits (L1${ nbsp }${ rightLineArrow }${ nbsp }L2)`) }
        withTextAd
      />
      <DataListDisplay
        isError={ isError }
        itemsNum={ data?.items.length }
        emptyText={ t('common.common.there_are_no_type', `There are no {{type}}.`, { type: t(`common.common.${type}`, type) }) }
        actionBar={ actionBar }
      >
        { content }
      </DataListDisplay>
    </>
  );
};

export default ArbitrumL2Messages;
