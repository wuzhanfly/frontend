import React from 'react';
import { useTranslation } from 'react-i18next';

import type { OptimisticL2OutputRootsItem } from 'types/api/optimisticL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import OptimisticL2OutputRootsTableItem from './OptimisticL2OutputRootsTableItem';

type Props = {
  items: Array<OptimisticL2OutputRootsItem>;
  top: number;
  isLoading?: boolean;
};

const OptimisticL2OutputRootsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot minW="900px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="160px">{t('output_roots.table.l2_output_index')}</TableColumnHeader>
          <TableColumnHeader width="20%">
            {t('output_roots.table.timestamp')}
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader width="20%">{t('output_roots.table.l2_block')}</TableColumnHeader>
          <TableColumnHeader width="30%">{t('output_roots.table.l1_txn_hash')}</TableColumnHeader>
          <TableColumnHeader width="30%">{t('output_roots.table.output_root')}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <OptimisticL2OutputRootsTableItem
            key={ item.l2_output_index + (Number(isLoading ? index : '') ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default OptimisticL2OutputRootsTable;
