import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ClustersDirectoryObject } from 'types/api/clusters';

import { TableBody, TableHeaderSticky, TableRow, TableColumnHeader, TableRoot } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ClustersDirectoryTableItem from './ClustersDirectoryTableItem';

interface Props {
  data: Array<ClustersDirectoryObject>;
  isLoading?: boolean;
  top?: number;
  isClusterDetailsLoading?: boolean;
}

const ClustersDirectoryTable = ({ data, isLoading, top, isClusterDetailsLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="40%">{t('name_services.directory.cluster_name')}</TableColumnHeader>
          <TableColumnHeader width="40%">{t('name_services.directory.cluster_address')}</TableColumnHeader>
          <TableColumnHeader width="180px">
            {t('name_services.directory.joined')}
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader width="20%">{t('name_services.directory.active_chains')}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data.map((item, index) => (
          <ClustersDirectoryTableItem
            key={ `${ item.name }-${ index }${ isLoading ? '-loading' : '' }` }
            item={ item }
            isLoading={ isLoading }
            isClusterDetailsLoading={ isClusterDetailsLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(ClustersDirectoryTable);
