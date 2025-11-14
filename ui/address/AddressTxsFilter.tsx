import { createListCollection } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { AddressFromToFilter } from 'types/api/address';

import useIsInitialLoading from 'lib/hooks/useIsInitialLoading';
import PopoverFilterRadio from 'ui/shared/filters/PopoverFilterRadio';

interface Props {
  hasActiveFilter: boolean;
  initialValue: AddressFromToFilter;
  onFilterChange: (nextValue: string | Array<string>) => void;
  isLoading?: boolean;
}

const AddressTxsFilter = ({ onFilterChange, initialValue, hasActiveFilter, isLoading }: Props) => {
  const { t } = useTranslation();
  const OPTIONS = [
    { value: 'all', label: t('validators.common.all') },
    { value: 'from', label: t('addresses.common.outgoing_transactions') },
    { value: 'to', label: t('addresses.common.incoming_transactions') },
  ];
  const collection = createListCollection({ items: OPTIONS });

  const isInitialLoading = useIsInitialLoading(isLoading);

  return (
    <PopoverFilterRadio
      name="txs_filter"
      collection={ collection }
      onChange={ onFilterChange }
      hasActiveFilter={ hasActiveFilter }
      isLoading={ isInitialLoading }
      initialValue={ initialValue }
    />
  );
};

export default React.memo(AddressTxsFilter);
