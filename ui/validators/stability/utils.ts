import type {
  ValidatorsStabilitySortingValue,
  ValidatorsStabilitySortingField,
} from 'types/api/validators';

import type { SelectOption } from 'toolkit/chakra/select';

export const getValidatorsStabilitySortOptions = (t: (key: string) => string): Array<SelectOption<ValidatorsStabilitySortingValue>> => [
  { label: t('validators.common.default'), value: 'default' },
  { label: t('validators.common.status_descending'), value: 'state-desc' },
  { label: t('validators.common.status_ascending'), value: 'state-asc' },
  { label: t('validators.common.blocks_validated_descending'), value: 'blocks_validated-desc' },
  { label: t('validators.common.blocks_validated_ascending'), value: 'blocks_validated-asc' },
];

export const VALIDATORS_STABILITY_SORT_SEQUENCE: Record<ValidatorsStabilitySortingField, Array<ValidatorsStabilitySortingValue>> = {
  state: [ 'state-desc', 'state-asc', 'default' ],
  blocks_validated: [ 'blocks_validated-desc', 'blocks_validated-asc', 'default' ],
};
