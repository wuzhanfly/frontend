import React from 'react';
import { useTranslation } from 'react-i18next';

import type { UserOpsItem } from 'types/api/userOps';

import config from 'configs/app';
import { useMultichainContext } from 'lib/contexts/multichain';
import { getChainDataForList } from 'lib/multichain/getChainDataForList';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import UserOpsTableItem from './UserOpsTableItem';

type Props = {
  items: Array<UserOpsItem>;
  isLoading?: boolean;
  top: number;
  showTx: boolean;
  showSender: boolean;
};

const UserOpsTable = ({ items, isLoading, top, showTx, showSender }: Props) => {
  const multichainContext = useMultichainContext();
  const chainData = getChainDataForList(multichainContext);
  const chainConfig = (multichainContext?.chain.config || config);
  const { t } = useTranslation();

  return (
    <TableRoot minW="1000px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          { chainData && <TableColumnHeader width="38px"></TableColumnHeader> }
          <TableColumnHeader w="60%">{ t('user_ops.table.user_op_hash') }</TableColumnHeader>
          <TableColumnHeader w="180px">
            { t('user_ops.table.timestamp') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader w="140px">{ t('user_ops.table.status') }</TableColumnHeader>
          { showSender && <TableColumnHeader w="160px">{ t('user_ops.table.sender') }</TableColumnHeader> }
          { showTx && <TableColumnHeader w="160px">{ t('user_ops.table.tx_hash') }</TableColumnHeader> }
          <TableColumnHeader w="40%">{ t('user_ops.table.block') }</TableColumnHeader>
          { !chainConfig.UI.views.tx.hiddenFields?.tx_fee &&
          <TableColumnHeader w="120px" isNumeric>{ `${ t('user_ops.table.fee') } ${ chainConfig.chain.currency.symbol }` }</TableColumnHeader> }
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => {
          return (
            <UserOpsTableItem
              key={ item.hash + (isLoading ? String(index) : '') }
              item={ item }
              isLoading={ isLoading }
              showSender={ showSender }
              showTx={ showTx }
              chainData={ chainData }
            />
          );
        }) }
      </TableBody>
    </TableRoot>
  );
};

export default UserOpsTable;
