import React from 'react';
import { useTranslation } from 'react-i18next';

import type { OptimisticL2WithdrawalsItem } from 'types/api/optimisticL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import OptimisticL2WithdrawalsTableItem from './OptimisticL2WithdrawalsTableItem';

type Props = {
  items: Array<OptimisticL2WithdrawalsItem>;
  top: number;
  isLoading?: boolean;
};

const OptimisticL2WithdrawalsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <TableRoot tableLayout="auto" minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('withdrawals.optimistic_l2.msg_nonce') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.optimistic_l2.from') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.optimistic_l2.l2_txn_hash') }</TableColumnHeader>
          <TableColumnHeader>
            { t('withdrawals.optimistic_l2.timestamp') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.optimistic_l2.status') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.optimistic_l2.l1_txn_hash') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.optimistic_l2.time_left') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <OptimisticL2WithdrawalsTableItem
            key={ String(item.msg_nonce_version) + item.msg_nonce + (isLoading ? index : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default OptimisticL2WithdrawalsTable;
