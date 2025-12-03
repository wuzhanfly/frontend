import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useIsMobile from 'lib/hooks/useIsMobile';
import { FilterInput } from 'toolkit/components/filters/FilterInput';
// import { apos } from 'toolkit/utils/htmlEntities';
import InternalTxsList from 'ui/internalTxs/InternalTxsList';
import InternalTxsTable from 'ui/internalTxs/InternalTxsTable';
import useInternalTxsQuery from 'ui/internalTxs/useInternalTxsQuery';
import ActionBar from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import Pagination from 'ui/shared/pagination/Pagination';

const InternalTxs = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const { query, searchTerm, debouncedSearchTerm, onSearchTermChange } = useInternalTxsQuery();
  const { isError, isPlaceholderData, data, pagination } = query;

  const filterInput = (
    <FilterInput
      w={{ base: '100%', lg: '350px' }}
      size="sm"
      onChange={ onSearchTermChange }
      placeholder={ t('common.common.search_by_transaction_hash') }
      initialValue={ searchTerm }
    />
  );

  const actionBar = (
    <>
      <Box mb={ 6 } display={{ base: 'flex', lg: 'none' }}>
        { filterInput }
      </Box>
      { (!isMobile || pagination.isVisible) && (
        <ActionBar mt={ -6 }>
          <Box display={{ base: 'none', lg: 'flex' }}>
            { filterInput }
          </Box>
          <Pagination ml="auto" { ...pagination }/>
        </ActionBar>
      ) }
    </>
  );

  const content = data?.items ? (
    <>
      <Box hideFrom="lg">
        <InternalTxsList data={ data.items } isLoading={ isPlaceholderData }/>
      </Box>
      <Box hideBelow="lg">
        <InternalTxsTable data={ data.items } isLoading={ isPlaceholderData }/>
      </Box>
    </>
  ) : null;

  return (
    <>
      <PageTitle
        title={ t('common.common.internal_transactions') }
        withTextAd
      />
      <DataListDisplay
        isError={ isError }
        itemsNum={ data?.items.length }
        emptyText={ t('common.common.there_are_no_internal_transact') }
        filterProps={{
          emptyFilteredText: t('common.common.couldnt_find_any_internal_transaction_that_matches_your_query'),
          hasActiveFilters: Boolean(debouncedSearchTerm),
        }}
        actionBar={ actionBar }
      >
        { content }
      </DataListDisplay>
    </>
  );
};

export default InternalTxs;
