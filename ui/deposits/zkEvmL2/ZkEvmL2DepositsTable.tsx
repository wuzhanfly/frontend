import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ZkEvmL2DepositsItem } from 'types/api/zkEvmL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ZkEvmL2DepositsTableItem from './ZkEvmL2DepositsTableItem';

type Props = {
  items: Array<ZkEvmL2DepositsItem>;
  top: number;
  isLoading?: boolean;
};

const ZkEvmL2DepositsTable = ({ items, top, isLoading }: Props) => {
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
          <TableColumnHeader isNumeric>{t('deposits.common.value')}</TableColumnHeader>
          <TableColumnHeader>{t('deposits.common.token')}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ZkEvmL2DepositsTableItem key={ String(item.index) + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ZkEvmL2DepositsTable;
