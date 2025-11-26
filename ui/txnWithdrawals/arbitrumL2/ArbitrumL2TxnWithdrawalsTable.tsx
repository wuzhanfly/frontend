import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ArbitrumL2TxnWithdrawalsItem } from 'types/api/arbitrumL2';

import { TableBody, TableColumnHeader, TableHeader, TableRoot, TableRow } from 'toolkit/chakra/table';

import ArbitrumL2TxnWithdrawalsTableItem from './ArbitrumL2TxnWithdrawalsTableItem';

interface Props {
  data: Array<ArbitrumL2TxnWithdrawalsItem>;
  txHash: string | undefined;
  isLoading: boolean;
}

const ArbitrumL2TxnWithdrawalsTable = ({ data, txHash, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot minW="900px">
      <TableHeader>
        <TableRow>
          <TableColumnHeader width="150px">{ t('withdrawals.arbitrum_l2.message_number') }</TableColumnHeader>
          <TableColumnHeader width="30%">{ t('withdrawals.arbitrum_l2.receiver') }</TableColumnHeader>
          <TableColumnHeader width="30%" isNumeric>{ t('withdrawals.arbitrum_l2.value') }</TableColumnHeader>
          <TableColumnHeader width="40%">{ t('withdrawals.arbitrum_l2.status') }</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        { data.map((item, index) => (
          <ArbitrumL2TxnWithdrawalsTableItem
            key={ String(item.id) + (isLoading ? index : '') }
            data={ item }
            isLoading={ isLoading }
            txHash={ txHash }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(ArbitrumL2TxnWithdrawalsTable);
