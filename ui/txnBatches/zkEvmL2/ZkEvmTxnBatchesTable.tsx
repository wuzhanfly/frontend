import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ZkEvmL2TxnBatchesItem } from 'types/api/zkEvmL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ZkEvmTxnBatchesTableItem from './ZkEvmTxnBatchesTableItem';

type Props = {
  items: Array<ZkEvmL2TxnBatchesItem>;
  top: number;
  isLoading?: boolean;
};

const ZkEvmTxnBatchesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <TableRoot minW="1100px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="40%">{ t('common.common.batch_number') }</TableColumnHeader>
          <TableColumnHeader width="60%">{ t('common.common.status') }</TableColumnHeader>
          <TableColumnHeader width="180px">
            { t('common.common.timestamp') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader width="100px">{ t('common.common.transaction_count') }</TableColumnHeader>
          <TableColumnHeader width="230px">{ t('common.common.verify_transaction_hash') }</TableColumnHeader>
          <TableColumnHeader width="230px">{ t('common.common.sequence_hash') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ZkEvmTxnBatchesTableItem
            key={ item.number + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ZkEvmTxnBatchesTable;
