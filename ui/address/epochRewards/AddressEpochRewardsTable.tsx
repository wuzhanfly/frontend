import React from 'react';
import { useTranslation } from 'react-i18next';

import type { AddressEpochRewardsItem } from 'types/api/address';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import AddressEpochRewardsTableItem from './AddressEpochRewardsTableItem';

type Props = {
  items: Array<AddressEpochRewardsItem>;
  isLoading?: boolean;
  top: number;
};

const AddressEpochRewardsTable = ({ items, isLoading, top }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot minW="1000px" style={{ tableLayout: 'auto' }}>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>
            {t('epochs.common.epoch')}
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{t('common.common.reward_type')}</TableColumnHeader>
          <TableColumnHeader>{t('common.common.associated_address')}</TableColumnHeader>
          <TableColumnHeader isNumeric>{t('common.common.value')}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => {
          return (
            <AddressEpochRewardsTableItem
              key={ item.epoch_number + item.type + item.account.hash + item.associated_account.hash + (isLoading ? String(index) : '') }
              item={ item }
              isLoading={ isLoading }
            />
          );
        }) }
      </TableBody>
    </TableRoot>
  );
};

export default AddressEpochRewardsTable;
