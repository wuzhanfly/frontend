import React from 'react';
import { useTranslation } from 'react-i18next';

import type { AddressWithdrawalsItem } from 'types/api/address';
import type { BlockWithdrawalsItem } from 'types/api/block';
import type { WithdrawalsItem } from 'types/api/withdrawals';

import config from 'configs/app';
import useLazyRenderedList from 'lib/hooks/useLazyRenderedList';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import BeaconChainWithdrawalsTableItem from './BeaconChainWithdrawalsTableItem';

const feature = config.features.beaconChain;

type Props = {
  top: number;
  isLoading?: boolean;
} & ({
  items: Array<WithdrawalsItem>;
  view: 'list';
} | {
  items: Array<AddressWithdrawalsItem>;
  view: 'address';
} | {
  items: Array<BlockWithdrawalsItem>;
  view: 'block';
});

const BeaconChainWithdrawalsTable = ({ items, isLoading, top, view }: Props) => {
  const { t } = useTranslation();
  const { cutRef, renderedItemsNum } = useLazyRenderedList(items, !isLoading);

  if (!feature.isEnabled) {
    return null;
  }

  return (
    <TableRoot style={{ tableLayout: 'auto' }} minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('withdrawals.beacon_chain.index') }</TableColumnHeader>
          <TableColumnHeader>{ t('withdrawals.beacon_chain.validator_index') }</TableColumnHeader>
          { view !== 'block' && <TableColumnHeader>{ t('withdrawals.beacon_chain.block') }</TableColumnHeader> }
          { view !== 'address' && <TableColumnHeader>{ t('withdrawals.beacon_chain.to') }</TableColumnHeader> }
          { view !== 'block' && <TableColumnHeader>{ t('withdrawals.beacon_chain.timestamp') }<TimeFormatToggle/></TableColumnHeader> }
          <TableColumnHeader>{ `${ t('withdrawals.beacon_chain.value') } ${ feature.currency.symbol }` }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { view === 'list' && (items as Array<WithdrawalsItem>).slice(0, renderedItemsNum).map((item, index) => (
          <BeaconChainWithdrawalsTableItem key={ item.index + (isLoading ? String(index) : '') } item={ item } view="list" isLoading={ isLoading }/>
        )) }
        { view === 'address' && (items as Array<AddressWithdrawalsItem>).slice(0, renderedItemsNum).map((item, index) => (
          <BeaconChainWithdrawalsTableItem key={ item.index + (isLoading ? String(index) : '') } item={ item } view="address" isLoading={ isLoading }/>
        )) }
        { view === 'block' && (items as Array<BlockWithdrawalsItem>).slice(0, renderedItemsNum).map((item, index) => (
          <BeaconChainWithdrawalsTableItem key={ item.index + (isLoading ? String(index) : '') } item={ item } view="block" isLoading={ isLoading }/>
        )) }
        <TableRow ref={ cutRef }/>
      </TableBody>
    </TableRoot>
  );
};

export default BeaconChainWithdrawalsTable;
