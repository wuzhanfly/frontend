import i18n from 'i18next';

import type { TokenInfo } from 'types/api/token';

import config from 'configs/app';

const t = i18n.t.bind(i18n);

export type ColumnsIds = 'tx_hash' | 'type' | 'method' | 'age' | 'from' | 'or_and' | 'to' | 'amount' | 'asset' | 'fee';

type TxTableColumn = {
  id: ColumnsIds;
  name: string;
  width: string;
  isNumeric?: boolean;
};

export const TABLE_COLUMNS: Array<TxTableColumn> = [
  {
    id: 'tx_hash',
    name: t('advanced_filter.common.tx_hash'),
    width: '180px',
  },
  {
    id: 'type',
    name: t('advanced_filter.common.type'),
    width: '160px',
  },
  {
    id: 'method',
    name: t('advanced_filter.common.method'),
    width: '160px',
  },
  {
    id: 'age',
    name: t('advanced_filter.common.age'),
    width: '190px',
  },
  {
    id: 'from',
    name: t('advanced_filter.common.from'),
    width: '160px',
  },
  {
    id: 'or_and',
    name: '',
    width: '65px',
  },
  {
    id: 'to',
    name: t('advanced_filter.common.to'),
    width: '160px',
  },
  {
    id: 'amount',
    name: t('advanced_filter.common.amount'),
    isNumeric: true,
    width: '150px',
  },
  {
    id: 'asset',
    name: t('advanced_filter.common.asset'),
    width: '120px',
  },
  {
    id: 'fee',
    name: t('advanced_filter.common.fee'),
    isNumeric: true,
    width: '120px',
  },
] as const;

export const ADVANCED_FILTER_TYPES = [
  {
    id: 'coin_transfer',
    name: t('advanced_filter.common.coin_transfer'),
  },
  {
    id: 'ERC-20',
    name: t('advanced_filter.common.erc_20_transfer'),
  },
  {
    id: 'ERC-404',
    name: t('advanced_filter.common.erc_404_transfer'),
  },
  {
    id: 'ERC-721',
    name: t('advanced_filter.common.erc_721_transfer'),
  },
  {
    id: 'ERC-1155',
    name: t('advanced_filter.common.erc_1155_transfer'),
  },
  {
    id: 'contract_creation',
    name: t('advanced_filter.common.contract_creation'),
  },
  {
    id: 'contract_interaction',
    name: t('advanced_filter.common.contract_interaction'),
  },
] as const;

export const ADVANCED_FILTER_TYPES_WITH_ALL = [
  {
    id: 'all',
    name: t('advanced_filter.common.all'),
  },
  ...ADVANCED_FILTER_TYPES,
];

export const NATIVE_TOKEN = {
  name: config.chain.currency.name || '',
  icon_url: '',
  symbol: config.chain.currency.symbol || '',
  address_hash: 'native',
  type: 'ERC-20' as const,
} as TokenInfo;
