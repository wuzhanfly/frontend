import type {
  ValidatorsBlackfortSortingValue,
  ValidatorsBlackfortSortingField,
} from 'types/api/validators';

import type { SelectOption } from 'toolkit/chakra/select';

export const getValidatorsBlackfortSortOptions = (t: (key: string) => string): Array<SelectOption<ValidatorsBlackfortSortingValue>> => [
  { label: t('validators.common.default'), value: 'default' },
  { label: t('validators.common.address_descending'), value: 'address_hash-desc' },
  { label: t('validators.common.address_ascending'), value: 'address_hash-asc' },
];

export const VALIDATORS_BLACKFORT_SORT_SEQUENCE: Record<ValidatorsBlackfortSortingField, Array<ValidatorsBlackfortSortingValue>> = {
  address_hash: [ 'address_hash-desc', 'address_hash-asc', 'default' ],
};
