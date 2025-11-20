import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ScrollL2TxnBatch } from 'types/api/scrollL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ScrollL2TxnBatchesTableItem from './ScrollL2TxnBatchesTableItem';

type Props = {
  items: Array<ScrollL2TxnBatch>;
  top: number;
  isLoading?: boolean;
};

const ScrollL2TxnBatchesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto" minW="1000px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('common.common.batch_number') }</TableColumnHeader>
          <TableColumnHeader>{ t('common.common.container') }</TableColumnHeader>
          <TableColumnHeader>{ t('common.common.status') }</TableColumnHeader>
          <TableColumnHeader>{ t('common.common.committed_block') }</TableColumnHeader>
          <TableColumnHeader>{ t('common.common.committed_transaction_hash') }</TableColumnHeader>
          <TableColumnHeader>
            { t('common.common.timestamp') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{ t('common.common.finalized_block') }</TableColumnHeader>
          <TableColumnHeader>{ t('common.common.finalized_transaction_hash') }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('common.common.blocks') }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('common.common.transaction') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ScrollL2TxnBatchesTableItem
            key={ item.number + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ScrollL2TxnBatchesTable;
