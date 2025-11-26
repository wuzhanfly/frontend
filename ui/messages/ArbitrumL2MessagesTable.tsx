import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ArbitrumL2MessagesItem } from 'types/api/arbitrumL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import type { MessagesDirection } from './ArbitrumL2Messages';
import ArbitrumL2MessagesTableItem from './ArbitrumL2MessagesTableItem';

type Props = {
  items: Array<ArbitrumL2MessagesItem>;
  direction: MessagesDirection;
  top: number;
  isLoading?: boolean;
};

const ArbitrumL2MessagesTable = ({ items, direction, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto" minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          { direction === 'to-rollup' && <TableColumnHeader>{t('messages.table.l1_block')}</TableColumnHeader> }
          { direction === 'from-rollup' && <TableColumnHeader>{t('messages.table.from')}</TableColumnHeader> }
          <TableColumnHeader>{t('messages.table.message_number')}</TableColumnHeader>
          <TableColumnHeader>{t('messages.table.l2_transaction')}</TableColumnHeader>
          <TableColumnHeader>
            {t('messages.table.timestamp')}
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{t('messages.table.status')}</TableColumnHeader>
          <TableColumnHeader>{t('messages.table.l1_transaction')}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ArbitrumL2MessagesTableItem
            key={ String(item.id) + (isLoading ? index : '') }
            item={ item }
            direction={ direction }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ArbitrumL2MessagesTable;
