import React from 'react';
import { useTranslation } from 'react-i18next';

import type * as multichain from '@blockscout/multichain-aggregator-types';
import type { TxsSocketType } from 'ui/txs/socket/types';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import getCurrencySymbol from 'lib/multichain/getCurrencySymbol';
import { TableBody, TableColumnHeader, TableHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';
import TxsSocketNotice from 'ui/txs/socket/TxsSocketNotice';

import CrossChainTxsTableItem from './CrossChainTxsTableItem';

interface Props {
  items: Array<multichain.InteropMessage>;
  isLoading: boolean;
  socketType?: TxsSocketType;
  stickyHeader?: boolean;
  top?: number;
  currentAddress?: string;
}

const CrossChainTxsTable = ({ items, isLoading, socketType, stickyHeader = true, top, currentAddress }: Props) => {
  const { t } = useTranslation();
  const TableHeaderComponent = stickyHeader ? TableHeaderSticky : TableHeader;

  const currencySymbol = getCurrencySymbol();

  return (
    <AddressHighlightProvider>
      <TableRoot minW="1150px" tableLayout="auto">
        <TableHeaderComponent top={ stickyHeader ? top : undefined }>
          <TableRow>
            <TableColumnHeader minW="180px">
              {t('transactions.common.transaction')}
              <TimeFormatToggle/>
            </TableColumnHeader>
            <TableColumnHeader>{t('transactions.common.type')}</TableColumnHeader>
            <TableColumnHeader>{t('transactions.common.method')}</TableColumnHeader>
            <TableColumnHeader>{t('optimism_superchain.common.source_tx')}</TableColumnHeader>
            <TableColumnHeader whiteSpace="nowrap">{t('optimism_superchain.common.destination_tx')}</TableColumnHeader>
            <TableColumnHeader>{t('optimism_superchain.common.sender_target')}</TableColumnHeader>
            <TableColumnHeader isNumeric>{t('transactions.common.value')}</TableColumnHeader>
          </TableRow>
        </TableHeaderComponent>
        <TableBody>
          { socketType && <TxsSocketNotice type={ socketType } place="table" isLoading={ isLoading }/> }
          { items.map((item, index) => (
            <CrossChainTxsTableItem
              key={ String(item.nonce) + (isLoading ? index : '') }
              item={ item }
              isLoading={ isLoading }
              currencySymbol={ currencySymbol }
              currentAddress={ currentAddress }
            />
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default React.memo(CrossChainTxsTable);
