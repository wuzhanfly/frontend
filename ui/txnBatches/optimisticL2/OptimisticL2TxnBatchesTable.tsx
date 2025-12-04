import React from 'react';
import { useTranslation } from 'react-i18next';

import type { OptimisticL2TxnBatchesItem } from 'types/api/optimisticL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import OptimisticL2TxnBatchesTableItem from './OptimisticL2TxnBatchesTableItem';

type Props = {
  items: Array<OptimisticL2TxnBatchesItem>;
  top: number;
  isLoading?: boolean;
};

const OptimisticL2TxnBatchesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <TableRoot tableLayout="auto" minW="850px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('common.common.batch_id') }</TableColumnHeader>
          <TableColumnHeader>{ t('common.common.storage') }</TableColumnHeader>
          <TableColumnHeader>
            { t('common.common.timestamp') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('common.common.l1_txn_count') }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('common.common.l2_blocks') }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('transactions.common.txn') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <OptimisticL2TxnBatchesTableItem
            key={ item.number + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default OptimisticL2TxnBatchesTable;
