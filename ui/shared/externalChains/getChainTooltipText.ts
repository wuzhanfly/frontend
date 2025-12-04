import i18n from 'i18next';

import type { ExternalChain } from 'types/externalChains';

export default function getChainTooltipText(chain: Pick<ExternalChain, 'id' | 'name'> | undefined, prefix: string = '') {
  const t = i18n.t.bind(i18n);

  if (!chain) {
    return t('common.common.unknown_chain');
  }
  return `${ prefix }${ chain.name } (${ t('common.common.chain_id') }: ${ chain.id })`;
}
