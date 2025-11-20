import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ZkSyncBatchesItem } from 'types/api/zkSyncL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ZkSyncTxnBatchesTableItem from './ZkSyncTxnBatchesTableItem';

type Props = {
  items: Array<ZkSyncBatchesItem>;
  top: number;
  isLoading?: boolean;
};

const ZkSyncTxnBatchesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot minW="1000px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="40%">{ t('common.common.batch_number') }</TableColumnHeader>
          <TableColumnHeader width="60%">{ t('common.common.status') }</TableColumnHeader>
          <TableColumnHeader width="180px">
            { t('common.common.timestamp') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader width="120px">{ t('common.common.transaction_count') }</TableColumnHeader>
          <TableColumnHeader width="210px">{ t('common.common.commit_transaction') }</TableColumnHeader>
          <TableColumnHeader width="210px">{ t('common.common.prove_transaction') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ZkSyncTxnBatchesTableItem
            key={ item.number + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ZkSyncTxnBatchesTable;
