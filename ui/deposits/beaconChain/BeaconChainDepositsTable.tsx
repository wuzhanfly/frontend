import React from 'react';
import { useTranslation } from 'react-i18next';

import type { DepositsItem } from 'types/api/deposits';

import config from 'configs/app';
import useLazyRenderedList from 'lib/hooks/useLazyRenderedList';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import BeaconChainDepositsTableItem from './BeaconChainDepositsTableItem';

const feature = config.features.beaconChain;

type Props = {
  top: number;
  isLoading?: boolean;
  items: Array<DepositsItem>;
  view: 'list' | 'address' | 'block';
};

const BeaconChainDepositsTable = ({ items, isLoading, top, view }: Props) => {
  const { t } = useTranslation();
  const { cutRef, renderedItemsNum } = useLazyRenderedList(items, !isLoading);

  if (!feature.isEnabled) {
    return null;
  }

  return (
    <TableRoot style={{ tableLayout: 'auto' }} minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{t('deposits.common.transaction_hash')}</TableColumnHeader>
          { view !== 'block' && <TableColumnHeader>{t('deposits.common.block')}</TableColumnHeader> }
          { view !== 'block' && <TableColumnHeader>{t('common.common.timestamp')}<TimeFormatToggle/></TableColumnHeader> }
          <TableColumnHeader>{t('deposits.common.value_with_currency', { currency: feature.currency.symbol })}</TableColumnHeader>
          { view !== 'address' && <TableColumnHeader>{t('deposits.common.from')}</TableColumnHeader> }
          <TableColumnHeader>{t('deposits.common.pubkey')}</TableColumnHeader>
          <TableColumnHeader>{t('deposits.common.signature')}</TableColumnHeader>
          <TableColumnHeader>{t('common.common.status')}</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.slice(0, renderedItemsNum).map((item, index) => (
          <BeaconChainDepositsTableItem key={ item.index + (isLoading ? String(index) : '') } item={ item } view={ view } isLoading={ isLoading }/>
        )) }
        <TableRow ref={ cutRef }/>
      </TableBody>
    </TableRoot>
  );
};

export default BeaconChainDepositsTable;
