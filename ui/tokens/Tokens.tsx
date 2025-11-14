import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TokensSortingValue } from 'types/api/tokens';

import { apos } from 'toolkit/utils/htmlEntities';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import DataListDisplay from 'ui/shared/DataListDisplay';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

import TokensListItem from './TokensListItem';
import TokensTable from './TokensTable';

interface Props {
  query: QueryWithPagesResult<'general:tokens'> | QueryWithPagesResult<'general:tokens_bridged'>;
  onSortChange: (value: TokensSortingValue) => void;
  sort: TokensSortingValue;
  actionBar?: React.ReactNode;
  hasActiveFilters: boolean;
  description?: React.ReactNode;
  tableTop?: number;
}

const Tokens = ({ query, onSortChange, sort, actionBar, description, hasActiveFilters, tableTop }: Props) => {
  const { t } = useTranslation();

  const { isError, isPlaceholderData, data, pagination } = query;

  if (isError) {
    return <DataFetchAlert/>;
  }

  const content = data?.items ? (
    <>
      <Box hideFrom="lg">
        { description }
        { data.items.map((item, index) => (
          <TokensListItem
            key={ item.address_hash + (isPlaceholderData ? index : '') }
            token={ item }
            index={ index }
            page={ pagination.page }
            isLoading={ isPlaceholderData }
          />
        )) }
      </Box>
      <Box hideBelow="lg">
        { description }
        <TokensTable
          items={ data.items }
          page={ pagination.page }
          isLoading={ isPlaceholderData }
          setSorting={ onSortChange }
          sorting={ sort }
          top={ tableTop }
        />
      </Box>
    </>
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      itemsNum={ data?.items.length }
      emptyText={t('tokens.common.there_are_no_tokens')}
      filterProps={{
        emptyFilteredText: `Couldn${ apos }t find token that matches your filter query.`,
        hasActiveFilters,
      }}
      actionBar={ query.pagination.isVisible || hasActiveFilters ? actionBar : null }
    >
      { content }
    </DataListDisplay>
  );
};

export default Tokens;
