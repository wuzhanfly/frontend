import React from 'react';
import { useTranslation } from 'react-i18next';

import type { AddressesItem } from 'types/api/addresses';

import { currencyUnits } from 'lib/units';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';

import AddressesLabelSearchTableItem from './AddressesLabelSearchTableItem';

interface Props {
  items: Array<AddressesItem>;
  top: number;
  isLoading?: boolean;
}

const AddressesLabelSearchTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="70%">{t('addresses.common.address')}</TableColumnHeader>
          <TableColumnHeader width="15%" isNumeric>{ `Balance ${ currencyUnits.ether }` }</TableColumnHeader>
          <TableColumnHeader width="15%" isNumeric>{t('addresses.common.txn_count')}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <AddressesLabelSearchTableItem
            key={ item.hash + (isLoading ? index : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default AddressesLabelSearchTable;
