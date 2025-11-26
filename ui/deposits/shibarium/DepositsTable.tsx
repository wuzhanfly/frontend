import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ShibariumDepositsItem } from 'types/api/shibarium';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import DepositsTableItem from './DepositsTableItem';

type Props = {
  items: Array<ShibariumDepositsItem>;
  top: number;
  isLoading?: boolean;
};

const DepositsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto" minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{t('deposits.common.l1_block_no')}</TableColumnHeader>
          <TableColumnHeader>{t('deposits.common.l1_txn_hash')}</TableColumnHeader>
          <TableColumnHeader>{t('deposits.common.l2_txn_hash')}</TableColumnHeader>
          <TableColumnHeader>{t('deposits.common.user')}</TableColumnHeader>
          <TableColumnHeader>
            {t('common.common.timestamp')}
            <TimeFormatToggle/>
          </TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <DepositsTableItem key={ `${ item.l2_transaction_hash }-${ index }` } item={ item } isLoading={ isLoading }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default DepositsTable;
