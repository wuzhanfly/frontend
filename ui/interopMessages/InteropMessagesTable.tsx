import React from 'react';
import { useTranslation } from 'react-i18next';

import type { InteropMessage } from 'types/api/interop';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import InteropMessagesTableItem from './InteropMessagesTableItem';

interface Props {
  items?: Array<InteropMessage>;
  top: number;
  isLoading?: boolean;
}

const InteropMessagesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader/>
          <TableColumnHeader>{t('interop_messages.table.message')}</TableColumnHeader>
          <TableColumnHeader>
            {t('interop_messages.table.timestamp')}
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{t('interop_messages.table.status')}</TableColumnHeader>
          <TableColumnHeader>{t('interop_messages.table.source_tx')}</TableColumnHeader>
          <TableColumnHeader>{t('interop_messages.table.destination_tx')}</TableColumnHeader>
          <TableColumnHeader>{t('interop_messages.table.sender')}</TableColumnHeader>
          <TableColumnHeader>{t('interop_messages.table.in_out')}</TableColumnHeader>
          <TableColumnHeader>{t('interop_messages.table.target')}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items?.map((item, index) => (
          <InteropMessagesTableItem
            key={ item.init_transaction_hash + '_' + index }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(InteropMessagesTable);
