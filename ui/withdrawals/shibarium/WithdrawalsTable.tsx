import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ShibariumWithdrawalsItem } from 'types/api/shibarium';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import WithdrawalsTableItem from './WithdrawalsTableItem';

type Props = {
  items: Array<ShibariumWithdrawalsItem>;
  top: number;
  isLoading?: boolean;
};

const WithdrawalsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  
  return (
    <TableRoot tableLayout="auto" minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('withdrawals.shibarium.l2_block_no') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.shibarium.l2_txn_hash') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.shibarium.l1_txn_hash') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.shibarium.user') }</TableColumnHeader>
          <TableColumnHeader>
            { t('withdrawals.shibarium.timestamp') }
            <TimeFormatToggle/>
          </TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <WithdrawalsTableItem key={ `${ item.l2_transaction_hash }-${ index }` } item={ item } isLoading={ isLoading }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default WithdrawalsTable;
