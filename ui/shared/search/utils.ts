import type { CctxListItem } from '@blockscout/zetachain-cctx-types';
import type { MarketplaceApp } from 'types/client/marketplace';
import type { SearchResultItem } from 'types/client/search';

import config from 'configs/app';

const nameServicesFeature = config.features.nameServices;

export type ApiCategory =
  'token' |
  'nft' |
  'address' |
  'public_tag' |
  'transaction' |
  'block' |
  'user_operation' |
  'blob' |
  'domain' |
  'cluster' |
  'tac_operation';
export type Category = ApiCategory | 'app' | 'zetaChainCCTX';

export type ItemsCategoriesMap =
Record<ApiCategory, Array<SearchResultItem>> &
Record<'app', Array<MarketplaceApp>> &
Record<'zetaChainCCTX', Array<CctxListItem>>;

export type SearchResultAppItem = {
  type: 'app';
  app: MarketplaceApp;
};

export const getSearchCategories = (t: (key: string) => string): Array<{ id: Category; title: string; tabTitle: string }> => [
  { id: 'app', title: 'DApps', tabTitle: 'DApps' },
  { id: 'token', title: `Tokens (${ config.chain.tokenStandard }-20)`, tabTitle: t('tokens.common.tokens') },
  { id: 'nft', title: `NFTs (${ config.chain.tokenStandard }-721 & 1155)`, tabTitle: 'NFTs' },
  { id: 'address', title: t('shared.common.addresses'), tabTitle: t('shared.common.addresses') },
  { id: 'public_tag', title: t('shared.common.public_tags'), tabTitle: t('shared.common.public_tags') },
  { id: 'transaction', title: t('transactions.common.transactions'), tabTitle: t('transactions.common.transactions') },
  { id: 'block', title: t('validators.common.blocks'), tabTitle: t('validators.common.blocks') },
  { id: 'tac_operation', title: t('shared.common.operations'), tabTitle: t('shared.common.operations') },
  { id: 'zetaChainCCTX', title: 'CCTXs', tabTitle: 'CCTXs' },
];

export const addUserSpecificCategories = (searchCategories: Array<{ id: Category; title: string; tabTitle: string }>, t: (key: string) => string) => {
  if (config.features.userOps.isEnabled) {
    searchCategories.push({ id: 'user_operation', title: t('transactions.common.user_operations'), tabTitle: t('shared.common.user_ops') });
  }

  if (config.features.dataAvailability.isEnabled) {
    searchCategories.push({ id: 'blob', title: t('transactions.common.blobs'), tabTitle: t('transactions.common.blobs') });
  }

  if (nameServicesFeature.isEnabled && nameServicesFeature.ens.isEnabled) {
    searchCategories.unshift({ id: 'domain', title: t('shared.common.names'), tabTitle: t('shared.common.names') });
  }

  if (nameServicesFeature.isEnabled && nameServicesFeature.clusters.isEnabled) {
    searchCategories.unshift({ id: 'cluster', title: t('shared.common.cluster_name'), tabTitle: t('shared.common.cluster') });
  }
};

export const getSearchItemTitles = (t: (key: string) => string): Record<Category, { itemTitle: string; itemTitleShort: string }> => {
  return {
    app: { itemTitle: 'DApp', itemTitleShort: t('shared.common.app') },
    domain: { itemTitle: t('validators.common.name'), itemTitleShort: t('validators.common.name') },
    cluster: { itemTitle: t('shared.common.cluster'), itemTitleShort: t('shared.common.cluster') },
    token: { itemTitle: t('tokens.common.token'), itemTitleShort: t('tokens.common.token') },
    nft: { itemTitle: 'NFT', itemTitleShort: 'NFT' },
    address: { itemTitle: t('validators.common.address'), itemTitleShort: t('validators.common.address') },
    public_tag: { itemTitle: t('shared.common.public_tag'), itemTitleShort: t('shared.common.tag') },
    transaction: { itemTitle: t('shared.common.transaction'), itemTitleShort: t('transactions.common.txn') },
    block: { itemTitle: 'Block', itemTitleShort: 'Block' },
    user_operation: { itemTitle: t('shared.common.user_operation'), itemTitleShort: t('shared.common.user_op') },
    blob: { itemTitle: t('shared.common.blob'), itemTitleShort: t('shared.common.blob') },
    tac_operation: { itemTitle: t('shared.common.operations'), itemTitleShort: t('shared.common.operations') },
    zetaChainCCTX: { itemTitle: 'CCTX', itemTitleShort: 'CCTX' },
  };
};

export function getItemCategory(item: SearchResultItem | SearchResultAppItem): Category | undefined {
  switch (item.type) {
    case 'address':
    case 'contract':
    case 'metadata_tag': {
      return 'address';
    }
    case 'token': {
      if (item.token_type === 'ERC-20') {
        return 'token';
      }
      return 'nft';
    }
    case 'block': {
      return 'block';
    }
    case 'label': {
      return 'public_tag';
    }
    case 'transaction': {
      return 'transaction';
    }
    case 'app': {
      return 'app';
    }
    case 'user_operation': {
      return 'user_operation';
    }
    case 'blob': {
      return 'blob';
    }
    case 'ens_domain': {
      return 'domain';
    }
    case 'cluster': {
      return 'cluster';
    }
    case 'tac_operation': {
      return 'tac_operation';
    }
    case 'zetaChainCCTX': {
      return 'zetaChainCCTX';
    }
  }
}
