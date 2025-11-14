import type { EnsLookupSorting } from 'types/api/ens';

import type { SelectOption } from 'toolkit/chakra/select';
import getNextSortValueShared from 'ui/shared/sort/getNextSortValue';

export type SortField = EnsLookupSorting['sort'];
export type Sort = `${ EnsLookupSorting['sort'] }-${ EnsLookupSorting['order'] }` | 'default';

export function getSortOptions(t: (key: string) => string): Array<SelectOption<Sort>> {
  return [
    { label: t('validators.common.default'), value: 'default' },
    { label: t('common.common.registered_on_descending'), value: 'registration_date-DESC' },
    { label: t('common.common.registered_on_ascending'), value: 'registration_date-ASC' },
  ];
}

const SORT_SEQUENCE: Record<SortField, Array<Sort>> = {
  registration_date: [ 'registration_date-DESC', 'registration_date-ASC', 'default' ],
};

export const getNextSortValue = (getNextSortValueShared<SortField, Sort>).bind(undefined, SORT_SEQUENCE);
