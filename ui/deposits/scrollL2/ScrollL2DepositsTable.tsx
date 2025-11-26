import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ScrollL2MessageItem } from 'types/api/scrollL2';

import config from 'configs/app';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ScrollL2DepositsTableItem from './ScrollL2DepositsTableItem';

type Props = {
  items: Array<ScrollL2MessageItem>;
  top: number;
  isLoading?: boolean;
};

const ScrollL2DepositsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto" minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{t('deposits.common.l1_block')}</TableColumnHeader>
          <TableColumnHeader>{t('deposits.common.index')}</TableColumnHeader>
          <TableColumnHeader>{t('deposits.common.l1_txn_hash')}</TableColumnHeader>
          <TableColumnHeader>
            {t('common.common.timestamp')}
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{t('deposits.common.l2_txn_hash')}</TableColumnHeader>
          <TableColumnHeader isNumeric>{t('deposits.common.value_with_currency', { currency: config.chain.currency.symbol })}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ScrollL2DepositsTableItem key={ String(item.id) + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ScrollL2DepositsTable;
