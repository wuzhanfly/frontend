import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TokenInfo, TokenInstance } from 'types/api/token';
import type { TokenTransfer } from 'types/api/tokenTransfer';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { useMultichainContext } from 'lib/contexts/multichain';
import { NFT_TOKEN_TYPE_IDS } from 'lib/token/tokenTypes';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';
import TruncatedValue from 'ui/shared/TruncatedValue';
import TokenTransferTableItem from 'ui/token/TokenTransfer/TokenTransferTableItem';

interface Props {
  data: Array<TokenTransfer>;
  top: number;
  showSocketInfo: boolean;
  showSocketErrorAlert?: boolean;
  socketInfoNum?: number;
  tokenId?: string;
  isLoading?: boolean;
  token: TokenInfo;
  instance?: TokenInstance;
}

const TokenTransferTable = ({ data, top, showSocketInfo, showSocketErrorAlert, socketInfoNum, tokenId, isLoading, token, instance }: Props) => {
  const { t } = useTranslation();
  const multichainContext = useMultichainContext();
  const chainData = multichainContext?.chain;
  const tokenType = token.type;

  return (
    <AddressHighlightProvider>
      <TableRoot minW="950px">
        <TableHeaderSticky top={ top }>
          <TableRow>
            { chainData && <TableColumnHeader width="38px"/> }
            <TableColumnHeader width="280px">
              { t('common.common.txn_hash') }
              <TimeFormatToggle/>
            </TableColumnHeader>
            <TableColumnHeader width="200px">{ t('common.common.method') }</TableColumnHeader>
            <TableColumnHeader width={{ lg: '224px', xl: '380px' }}>{ t('common.common.from_to') }</TableColumnHeader>
            { (NFT_TOKEN_TYPE_IDS.includes(tokenType)) &&
              (
                <TableColumnHeader width={ tokenType === 'ERC-1155' || tokenType === 'ERC-404' ? '50%' : '100%' }>
                  { t('common.common.token_id') }
                </TableColumnHeader>
              )
            }
            { (tokenType === 'ERC-20' || tokenType === 'ERC-1155' || tokenType === 'ERC-404') && (
              <TableColumnHeader width={ tokenType === 'ERC-20' ? '100%' : '50%' } isNumeric>
                <TruncatedValue value={ `${ t('common.common.value') } ${ token?.symbol || '' }` } w="100%" verticalAlign="middle"/>
              </TableColumnHeader>
            ) }
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { showSocketInfo && (
            <SocketNewItemsNotice.Desktop
              showErrorAlert={ showSocketErrorAlert }
              num={ socketInfoNum }
              type="token_transfer"
              isLoading={ isLoading }
            />
          ) }
          { data.map((item, index) => (
            <TokenTransferTableItem
              key={ item.transaction_hash + item.block_hash + item.log_index + '_' + index }
              { ...item }
              tokenId={ tokenId }
              instance={ instance }
              isLoading={ isLoading }
              chainData={ chainData }
            />
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default React.memo(TokenTransferTable);
