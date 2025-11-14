import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TransactionsSortingValue, TxsResponse } from 'types/api/transaction';

import type { ResourceError } from 'lib/api/resources';
import * as cookies from 'lib/cookies';
import type { SelectOption } from 'toolkit/chakra/select';

import sortTxs from './sortTxs';

export const getSortOptions = (t: (key: string) => string): Array<SelectOption<TransactionsSortingValue>> => [
  { label: t('validators.common.default'), value: 'default' },
  { label: t('common.common.value_ascending'), value: 'value-asc' },
  { label: t('common.common.value_descending'), value: 'value-desc' },
  { label: t('common.common.fee_ascending'), value: 'fee-asc' },
  { label: t('common.common.fee_descending'), value: 'fee-desc' },
  { label: t('common.common.block_number_ascending'), value: 'block_number-asc' },
];

type SortingValue = TransactionsSortingValue;

type HookResult = UseQueryResult<TxsResponse, ResourceError<unknown>> & {
  sorting: SortingValue;
  setSortByValue: (value: SortingValue) => void;
};

export default function useTxsSort(
  queryResult: UseQueryResult<TxsResponse, ResourceError<unknown>>,
): HookResult {

  const [ sorting, setSorting ] = React.useState<SortingValue>((cookies.get(cookies.NAMES.TXS_SORT) as SortingValue | undefined) ?? 'default');

  const setSortByValue = React.useCallback((value: SortingValue) => {
    setSorting((prevVal: SortingValue) => {
      let newVal: SortingValue = 'default';
      if (value !== prevVal) {
        newVal = value as SortingValue;
      }
      cookies.set(cookies.NAMES.TXS_SORT, newVal ? newVal : '');
      return newVal;
    });
  }, []);

  return React.useMemo(() => {
    if (queryResult.isError || queryResult.isPending) {
      return { ...queryResult, setSortByValue, sorting };
    }

    return {
      ...queryResult,
      data: { ...queryResult.data, items: queryResult.data.items.slice().sort(sortTxs(sorting)) },
      setSortByValue,
      sorting,
    };
  }, [ queryResult, setSortByValue, sorting ]);

}
