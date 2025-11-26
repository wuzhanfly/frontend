import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ScrollL2MessageItem } from 'types/api/scrollL2';

import config from 'configs/app';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ScrollL2WithdrawalsTableItem from './ScrollL2WithdrawalsTableItem';

type Props = {
  items: Array<ScrollL2MessageItem>;
  top: number;
  isLoading?: boolean;
};

const ScrollL2WithdrawalsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  
  return (
    <TableRoot tableLayout="auto" minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('withdrawals.scroll_l2.l2_block') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.scroll_l2.index') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.scroll_l2.l2_txn_hash') }</TableColumnHeader>
          <TableColumnHeader>
            { t('withdrawals.scroll_l2.timestamp') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.scroll_l2.l1_txn_hash') }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ `${ t('withdrawals.scroll_l2.value') } ${ config.chain.currency.symbol }` }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ScrollL2WithdrawalsTableItem key={ String(item.id) + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ScrollL2WithdrawalsTable;
