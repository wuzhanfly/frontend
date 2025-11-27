import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TokenHolder, TokenInfo } from 'types/api/token';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TokenHoldersTableItem from 'ui/token/TokenHolders/TokenHoldersTableItem';

interface Props {
  data: Array<TokenHolder>;
  token: TokenInfo;
  top: number;
  isLoading?: boolean;
}

const TokenHoldersTable = ({ data, token, top, isLoading }: Props) => {
  const { t } = useTranslation();
  
  return (
    <TableRoot>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader w="70%">{t('tokens.table.holder')}</TableColumnHeader>
          { (token.type === 'ERC-1155' || token.type === 'ERC-404') && <TableColumnHeader w="30%">{t('tokens.table.id')}</TableColumnHeader> }
          <TableColumnHeader isNumeric width="220px">{t('tokens.table.quantity')}</TableColumnHeader>
          { token.total_supply && token.type !== 'ERC-404' && <TableColumnHeader isNumeric width="175px">{t('tokens.table.percentage')}</TableColumnHeader> }
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data.map((item, index) => {
          const tokenId = 'token_id' in item ? item.token_id : null;
          return (
            <TokenHoldersTableItem key={ item.address.hash + tokenId + (isLoading ? index : '') } holder={ item } token={ token } isLoading={ isLoading }/>
          );
        }) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(TokenHoldersTable);
