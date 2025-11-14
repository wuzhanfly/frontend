import type { TokenType } from 'types/api/token';
import type { TokensSortingValue } from 'types/api/tokens';

import config from 'configs/app';
import getFilterValuesFromQuery from 'lib/getFilterValuesFromQuery';
import { TOKEN_TYPE_IDS } from 'lib/token/tokenTypes';
import type { SelectOption } from 'toolkit/chakra/select';

export const getSortOptions = (t: (key: string) => string): Array<SelectOption<TokensSortingValue>> => [
  { label: t('validators.common.default'), value: 'default' },
  { label: t('tokens.common.price_ascending'), value: 'fiat_value-asc' },
  { label: t('tokens.common.price_descending'), value: 'fiat_value-desc' },
  { label: t('tokens.common.holders_ascending'), value: 'holders_count-asc' },
  { label: t('tokens.common.holders_descending'), value: 'holders_count-desc' },
  { label: t('tokens.common.onchain_market_cap_ascending'), value: 'circulating_market_cap-asc' },
  { label: t('tokens.common.onchain_market_cap_descending'), value: 'circulating_market_cap-desc' },
];

export const getTokenFilterValue = (getFilterValuesFromQuery<TokenType>).bind(null, TOKEN_TYPE_IDS);

const bridgedTokensChainIds = (() => {
  const feature = config.features.bridgedTokens;
  if (!feature.isEnabled) {
    return [];
  }

  return feature.chains.map(chain => chain.id);
})();
export const getBridgedChainsFilterValue = (getFilterValuesFromQuery<string>).bind(null, bridgedTokensChainIds);
