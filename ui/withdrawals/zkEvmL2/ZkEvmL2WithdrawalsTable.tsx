import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ZkEvmL2WithdrawalsItem } from 'types/api/zkEvmL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ZkEvmL2WithdrawalsTableItem from './ZkEvmL2WithdrawalsTableItem';

type Props = {
  items: Array<ZkEvmL2WithdrawalsItem>;
  top: number;
  isLoading?: boolean;
};

const ZkEvmL2WithdrawalsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  
  return (
    <TableRoot tableLayout="auto" minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('withdrawals.zk_evm_l2.block') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.zk_evm_l2.index') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.zk_evm_l2.l2_txn_hash') }</TableColumnHeader>
          <TableColumnHeader>
            { t('withdrawals.zk_evm_l2.timestamp') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.zk_evm_l2.l1_txn_hash') }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('withdrawals.zk_evm_l2.value') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.zk_evm_l2.token') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ZkEvmL2WithdrawalsTableItem key={ String(item.index) + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ZkEvmL2WithdrawalsTable;
