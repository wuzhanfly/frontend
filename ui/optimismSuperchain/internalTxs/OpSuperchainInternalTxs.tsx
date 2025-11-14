import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { MultichainProvider } from 'lib/contexts/multichain';
import useIsMobile from 'lib/hooks/useIsMobile';
import { FilterInput } from 'toolkit/components/filters/FilterInput';
import { apos } from 'toolkit/utils/htmlEntities';
import InternalTxsList from 'ui/internalTxs/InternalTxsList';
import InternalTxsTable from 'ui/internalTxs/InternalTxsTable';
import useInternalTxsQuery from 'ui/internalTxs/useInternalTxsQuery';
import ActionBar from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import ChainSelect from 'ui/shared/multichain/ChainSelect';
import PageTitle from 'ui/shared/Page/PageTitle';
import Pagination from 'ui/shared/pagination/Pagination';

const OpSuperchainInternalTxs = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const { query, searchTerm, onSearchTermChange } = useInternalTxsQuery({ isMultichain: true });
  const { isError, isPlaceholderData, data, pagination } = query;

  const filterInput = (
    <FilterInput
      w={{ base: '100%', lg: '350px' }}
      size="sm"
      onChange={ onSearchTermChange }
      placeholder={t('common.common.search_by_transaction_hash')}
      initialValue={ searchTerm }
    />
  );

  const chainSelect = (
    <ChainSelect
      value={ query.chainValue }
      onValueChange={ query.onChainValueChange }
      ml={{ base: 0, lg: 2 }}
    />
  );

  const actionBar = (
    <>
      { isMobile && (
        <Box mb={ 6 }>
          { filterInput }
        </Box>
      ) }
      <ActionBar mt={ -6 } justifyContent="flex-start">
        { !isMobile && filterInput }
        { chainSelect }
        <Pagination ml="auto" { ...pagination }/>
      </ActionBar>
    </>
  );

  const content = data?.items ? (
    <MultichainProvider chainSlug={ query.chainValue?.[0] }>
      <Box hideBelow="lg">
        <InternalTxsTable data={ data.items } isLoading={ isPlaceholderData }/>
      </Box>
      <Box hideFrom="lg">
        <InternalTxsList data={ data.items } isLoading={ isPlaceholderData }/>
      </Box>
    </MultichainProvider>
  ) : null;

  return (
    <>
      <PageTitle
        title={t('common.common.internal_transactions')}
        withTextAd
      />
      <DataListDisplay
        isError={ isError }
        itemsNum={ data?.items.length }
        emptyText={t('common.common.there_are_no_internal_transact')}
        filterProps={{
          emptyFilteredText: `Couldn${ apos }t find any internal transaction that matches your query.`,
          hasActiveFilters: Boolean(searchTerm),
        }}
        actionBar={ actionBar }
        showActionBarIfError
        showActionBarIfEmpty
      >
        { content }
      </DataListDisplay>
    </>
  );
};

export default React.memo(OpSuperchainInternalTxs);
