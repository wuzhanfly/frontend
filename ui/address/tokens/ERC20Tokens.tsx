import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useIsMobile from 'lib/hooks/useIsMobile';
import ActionBar from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import Pagination from 'ui/shared/pagination/Pagination';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

import ERC20TokensListItem from './ERC20TokensListItem';
import ERC20TokensTable from './ERC20TokensTable';

type Props = {
  tokensQuery: QueryWithPagesResult<'general:address_tokens'>;
};

const ERC20Tokens = ({ tokensQuery }: Props) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const { isError, isPlaceholderData, data, pagination } = tokensQuery;

  const actionBar = isMobile && pagination.isVisible && (
    <ActionBar mt={ -6 }>
      <Pagination ml="auto" { ...pagination }/>
    </ActionBar>
  );

  const content = data?.items ? (
    <>
      <Box hideBelow="lg"><ERC20TokensTable data={ data.items } top={ pagination.isVisible ? 72 : 0 } isLoading={ isPlaceholderData }/></Box>
      <Box hideFrom="lg">{ data.items.map((item, index) => (
        <ERC20TokensListItem
          key={ item.token.address_hash + (isPlaceholderData ? index : '') }
          { ...item }
          isLoading={ isPlaceholderData }
        />
      )) }
      </Box>
    </>
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      itemsNum={ data?.items.length }
      emptyText={ t('addresses.common.there_are_no_tokens_of_selected_type') }
      actionBar={ actionBar }
    >
      { content }
    </DataListDisplay>
  );

};

export default ERC20Tokens;
