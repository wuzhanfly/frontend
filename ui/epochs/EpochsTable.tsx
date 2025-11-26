import React from 'react';
import { useTranslation } from 'react-i18next';

import type { CeloEpochListItem } from 'types/api/epochs';

import config from 'configs/app';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import EpochsTableItem from './EpochsTableItem';

interface Props {
  items: Array<CeloEpochListItem>;
  isLoading?: boolean;
  top: number;
};

const EpochsTable = ({ items, isLoading, top }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot minW="1100px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader w="280px">
            {t('epochs.common.epoch')}
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader w="120px">{t('common.common.status')}</TableColumnHeader>
          <TableColumnHeader w="25%">{t('epochs.common.block_range')}</TableColumnHeader>
          <TableColumnHeader w="25%" isNumeric>{t('epochs.common.community_with_currency', { currency: config.chain.currency.symbol })}</TableColumnHeader>
          <TableColumnHeader w="25%" isNumeric>{t('epochs.common.carbon_offset_with_currency', { currency: config.chain.currency.symbol })}</TableColumnHeader>
          <TableColumnHeader w="25%" isNumeric>{t('epochs.common.total_with_currency', { currency: config.chain.currency.symbol })}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => {
          return (
            <EpochsTableItem
              key={ item.number + (isLoading ? String(index) : '') }
              item={ item }
              isLoading={ isLoading }
            />
          );
        }) }
      </TableBody>
    </TableRoot>
  );
};

export default EpochsTable;
