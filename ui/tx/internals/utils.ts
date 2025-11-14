import type { TxInternalsType } from 'types/api/internalTransaction';

export type Sort = 'value-asc' | 'value-desc' | 'gas-limit-asc' | 'gas-limit-desc' | 'default';
export type SortField = 'value' | 'gas-limit';

interface TxInternalsTypeItem {
  title: string;
  id: TxInternalsType;
}

export const getTxInternalsItems = (t: (key: string) => string): Array<TxInternalsTypeItem> => [
  { title: t('shared.common.call'), id: 'call' },
  { title: t('transactions.common.delegate_call'), id: 'delegatecall' },
  { title: t('transactions.common.static_call'), id: 'staticcall' },
  { title: t('transactions.common.create'), id: 'create' },
  { title: 'Create2', id: 'create2' },
  { title: t('transactions.common.selfdestruct'), id: 'selfdestruct' },
  { title: t('transactions.common.reward'), id: 'reward' },
];
