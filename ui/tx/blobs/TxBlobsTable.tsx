import { useTranslation } from 'react-i18next';
import React from 'react';

import type { TxBlob } from 'types/api/blobs';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';

import TxBlobsTableItem from './TxBlobsTableItem';

interface Props {
  data: Array<TxBlob>;
  top: number;
  isLoading?: boolean;
}

const TxBlobsTable = ({ data, top, isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <TableRoot>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="60%">{t('common.common.blob_hash')}</TableColumnHeader>
            <TableColumnHeader width="20%">{t('common.common.data_type')}</TableColumnHeader>
          <TableColumnHeader width="20%">Size, bytes</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data.map((item, index) => (
          <TxBlobsTableItem key={ item.hash + (isLoading ? index : '') } data={ item } isLoading={ isLoading }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default TxBlobsTable;
