import React from 'react';
import { useTranslation } from 'react-i18next';

import type { OptimisticL2DepositsItem } from 'types/api/optimisticL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import OptimisticDepositsTableItem from './OptimisticDepositsTableItem';

type Props = {
  items: Array<OptimisticL2DepositsItem>;
  top: number;
  isLoading?: boolean;
};

const OptimisticDepositsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto" minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{t('deposits.common.l1_block_no')}</TableColumnHeader>
          <TableColumnHeader>{t('deposits.common.l2_txn_hash')}</TableColumnHeader>
          <TableColumnHeader>
            {t('common.common.timestamp')}
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{t('deposits.common.l1_txn_hash')}</TableColumnHeader>
          <TableColumnHeader>{t('deposits.common.l1_txn_origin')}</TableColumnHeader>
          <TableColumnHeader isNumeric>{t('deposits.common.gas_limit')}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <OptimisticDepositsTableItem key={ item.l2_transaction_hash + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default OptimisticDepositsTable;
