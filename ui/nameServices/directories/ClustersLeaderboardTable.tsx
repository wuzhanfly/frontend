import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ClustersLeaderboardObject } from 'types/api/clusters';

import { TableBody, TableHeaderSticky, TableRow, TableColumnHeader, TableRoot } from 'toolkit/chakra/table';

import ClustersLeaderboardTableItem from './ClustersLeaderboardTableItem';

interface Props {
  data: Array<ClustersLeaderboardObject>;
  isLoading?: boolean;
  top?: number;
}

const ClustersLeaderboardTable = ({ data, isLoading, top }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="5%">{t('name_services.leaderboard.rank')}</TableColumnHeader>
          <TableColumnHeader width="40%">{t('name_services.leaderboard.cluster_name')}</TableColumnHeader>
          <TableColumnHeader width="10%">{t('name_services.leaderboard.names')}</TableColumnHeader>
          <TableColumnHeader width="10%">{t('name_services.leaderboard.total_backing')}</TableColumnHeader>
          <TableColumnHeader width="10%">{t('name_services.leaderboard.active_chains')}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data.map((item, index) => (
          <ClustersLeaderboardTableItem
            key={ `${ item.name }-${ index }${ isLoading ? '-loading' : '' }` }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(ClustersLeaderboardTable);
