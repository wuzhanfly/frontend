import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ArbitrumL2TxnBatchesItem } from 'types/api/arbitrumL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ArbitrumL2TxnBatchesTableItem from './ArbitrumL2TxnBatchesTableItem';

type Props = {
  items: Array<ArbitrumL2TxnBatchesItem>;
  top: number;
  isLoading?: boolean;
};

const ArbitrumL2TxnBatchesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto" minW="1000px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('common.common.batch_number') }</TableColumnHeader>
          <TableColumnHeader>{ t('common.common.l1_status') }</TableColumnHeader>
          <TableColumnHeader>{ t('common.common.l1_block') }</TableColumnHeader>
          <TableColumnHeader>{ t('common.common.block_count') }</TableColumnHeader>
          <TableColumnHeader>{ t('common.common.l1_transaction') }</TableColumnHeader>
          <TableColumnHeader>
            { t('common.common.timestamp') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{ t('common.common.transaction_count') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ArbitrumL2TxnBatchesTableItem
            key={ item.number + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ArbitrumL2TxnBatchesTable;
