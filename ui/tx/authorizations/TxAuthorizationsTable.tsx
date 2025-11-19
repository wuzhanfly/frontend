import { useTranslation } from 'react-i18next';
import React from 'react';

import type { TxAuthorization } from 'types/api/transaction';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';

import TxAuthorizationsTableItem from './TxAuthorizationsTableItem';

interface Props {
  data: Array<TxAuthorization> | undefined;
  isLoading?: boolean;
}

const TxAuthorizationsTable = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot>
        <TableHeaderSticky>
          <TableRow>
            <TableColumnHeader width="50%">{t('common.common.authority')}</TableColumnHeader>
            <TableColumnHeader width="50%">{t('common.common.delegated_address')}</TableColumnHeader>
            <TableColumnHeader width="120px">{t('common.common.chain')}</TableColumnHeader>
            <TableColumnHeader width="120px">{t('common.common.nonce')}</TableColumnHeader>
            <TableColumnHeader width="200px">{t('common.common.status')}</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { data?.map((item, index) => (
            <TxAuthorizationsTableItem key={ item.nonce.toString() + (isLoading ? index : '') } { ...item } isLoading={ isLoading }/>
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default TxAuthorizationsTable;
