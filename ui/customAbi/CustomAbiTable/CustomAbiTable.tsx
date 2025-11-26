import React from 'react';
import { useTranslation } from 'react-i18next';

import type { CustomAbis, CustomAbi } from 'types/api/account';

import { TableBody, TableColumnHeader, TableHeader, TableRoot, TableRow } from 'toolkit/chakra/table';

import CustomAbiTableItem from './CustomAbiTableItem';

interface Props {
  data?: CustomAbis;
  isLoading?: boolean;
  onEditClick: (item: CustomAbi) => void;
  onDeleteClick: (item: CustomAbi) => void;
}

const CustomAbiTable = ({ data, isLoading, onDeleteClick, onEditClick }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot minWidth="600px">
      <TableHeader>
        <TableRow>
          <TableColumnHeader>{t('custom_abi.table.abi_for_smart_contract')}</TableColumnHeader>
          <TableColumnHeader width="108px"></TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        { data?.map((item, index) => (
          <CustomAbiTableItem
            key={ item.id + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
            onDeleteClick={ onDeleteClick }
            onEditClick={ onEditClick }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(CustomAbiTable);
