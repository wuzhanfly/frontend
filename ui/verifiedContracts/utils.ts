import type { VerifiedContractsSortingValue, VerifiedContractsSortingField } from 'types/api/verifiedContracts';

import type { SelectOption } from 'toolkit/chakra/select';

export const getSortOptions = (t: (key: string) => string): Array<SelectOption<VerifiedContractsSortingValue>> => [
  { label: t('validators.common.default'), value: 'default' },
  { label: t('common.common.balance_descending'), value: 'balance-desc' },
  { label: t('common.common.balance_ascending'), value: 'balance-asc' },
  { label: t('common.common.txs_count_descending'), value: 'transactions_count-desc' },
  { label: t('common.common.txs_count_ascending'), value: 'transactions_count-asc' },
];

export const SORT_SEQUENCE: Record<VerifiedContractsSortingField, Array<VerifiedContractsSortingValue>> = {
  balance: [ 'balance-desc', 'balance-asc', 'default' ],
  transactions_count: [ 'transactions_count-desc', 'transactions_count-asc', 'default' ],
};