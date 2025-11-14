import type { TokenTransfer } from 'types/api/tokenTransfer';

export const getTokenTransferTypeText = (type: TokenTransfer['type'], t: (key: string) => string) => {
  switch (type) {
    case 'token_minting':
      return 'Token minting';
    case 'token_burning':
      return t('shared.common.token_burning');
    case 'token_spawning':
      return t('shared.common.token_creating');
    case 'token_transfer':
      return t('shared.common.token_transfer');
  }
};
