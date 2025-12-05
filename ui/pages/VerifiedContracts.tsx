import { Box, createListCollection, HStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import useIsMobile from 'lib/hooks/useIsMobile';
import { FilterInput } from 'toolkit/components/filters/FilterInput';
// import { apos } from 'toolkit/utils/htmlEntities';
import ActionBar from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import Pagination from 'ui/shared/pagination/Pagination';
import Sort from 'ui/shared/sort/Sort';
import useVerifiedContractsQuery from 'ui/verifiedContracts/useVerifiedContractsQuery';
import { SORT_OPTIONS } from 'ui/verifiedContracts/utils';
import VerifiedContractsCounters from 'ui/verifiedContracts/VerifiedContractsCounters';
import VerifiedContractsFilter from 'ui/verifiedContracts/VerifiedContractsFilter';
import VerifiedContractsList from 'ui/verifiedContracts/VerifiedContractsList';
import VerifiedContractsTable from 'ui/verifiedContracts/VerifiedContractsTable';

const sortCollection = createListCollection({
  items: SORT_OPTIONS,
});

const VerifiedContracts = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const { query, type, searchTerm, debouncedSearchTerm, sort, onSearchTermChange, onTypeChange, onSortChange } = useVerifiedContractsQuery();
  const { isError, isPlaceholderData, data, pagination } = query;

  const typeFilter = (
    <VerifiedContractsFilter
      onChange={ onTypeChange }
      defaultValue={ type }
      hasActiveFilter={ Boolean(type) }
    />
  );

  const filterInput = (
    <FilterInput
      w={{ base: '100%', lg: '350px' }}
      size="sm"
      onChange={ onSearchTermChange }
      placeholder={ t('common.common.search_by_contract_name_or_add') }
      initialValue={ searchTerm }
    />
  );

  const sortButton = (
    <Sort
      name="verified_contracts_sorting"
      defaultValue={ [ sort ] }
      collection={ sortCollection }
      onValueChange={ onSortChange }
      isLoading={ isPlaceholderData }
    />
  );

  const actionBar = (
    <>
      <HStack gap={ 3 } mb={ 6 } display={{ base: 'flex', lg: 'none' }}>
        { typeFilter }
        { sortButton }
        { filterInput }
      </HStack>
      { (!isMobile || pagination.isVisible) && (
        <ActionBar mt={ -6 }>
          <HStack gap={ 3 } display={{ base: 'none', lg: 'flex' }}>
            { typeFilter }
            { filterInput }
          </HStack>
          <Pagination ml="auto" { ...pagination }/>
        </ActionBar>
      ) }
    </>
  );

  const content = data?.items ? (
    <>
      <Box hideFrom="lg">
        <VerifiedContractsList data={ data.items } isLoading={ isPlaceholderData }/>
      </Box>
      <Box hideBelow="lg">
        <VerifiedContractsTable data={ data.items } sort={ sort } setSorting={ onSortChange } isLoading={ isPlaceholderData }/>
      </Box>
    </>
  ) : null;

  return (
    <Box>
      <PageTitle
        title={
          config.meta.seo.enhancedDataEnabled ?
            t('common.common.verified_name_contracts', { name: config.chain.name }) :
            t('common.common.verified_contracts')
        }
        withTextAd
      />
      <VerifiedContractsCounters/>
      <DataListDisplay
        isError={ isError }
        itemsNum={ data?.items.length }
        emptyText={ t('common.common.there_are_no_verified_contract') }
        filterProps={{
          emptyFilteredText: t('common.common.couldnt_find_any_contract_that_matches_your_query'),
          hasActiveFilters: Boolean(debouncedSearchTerm || type),
        }}
        actionBar={ actionBar }
      >
        { content }
      </DataListDisplay>
    </Box>
  );
};

export default VerifiedContracts;
