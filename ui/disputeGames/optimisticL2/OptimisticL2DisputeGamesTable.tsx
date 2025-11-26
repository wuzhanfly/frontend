import React from 'react';
import { useTranslation } from 'react-i18next';

import type { OptimisticL2DisputeGamesItem } from 'types/api/optimisticL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import OptimisticL2DisputeGamesTableItem from './OptimisticL2DisputeGamesTableItem';

type Props = {
  items: Array<OptimisticL2DisputeGamesItem>;
  top: number;
  isLoading?: boolean;
};

const OptimisticL2DisputeGamesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto" minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{t('dispute_games.common.index')}</TableColumnHeader>
          <TableColumnHeader>{t('dispute_games.common.game_type')}</TableColumnHeader>
          <TableColumnHeader>{t('dispute_games.common.address')}</TableColumnHeader>
          <TableColumnHeader>{t('dispute_games.common.l2_block_number')}</TableColumnHeader>
          <TableColumnHeader>
            {t('common.common.timestamp')}
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{t('common.common.status')}</TableColumnHeader>
          <TableColumnHeader>
            {t('dispute_games.common.resolved')}
            <TimeFormatToggle/>
          </TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <OptimisticL2DisputeGamesTableItem
            key={ String(item.index) + (isLoading ? index : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default OptimisticL2DisputeGamesTable;
