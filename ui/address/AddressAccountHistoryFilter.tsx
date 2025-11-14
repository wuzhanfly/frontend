import { createListCollection } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { NovesHistoryFilterValue } from 'types/api/noves';

import useIsInitialLoading from 'lib/hooks/useIsInitialLoading';
import PopoverFilterRadio from 'ui/shared/filters/PopoverFilterRadio';

interface Props {
  hasActiveFilter: boolean;
  defaultFilter: NovesHistoryFilterValue;
  onFilterChange: (nextValue: string | Array<string>) => void;
  isLoading?: boolean;
}

const AccountHistoryFilter = ({ onFilterChange, defaultFilter, hasActiveFilter, isLoading }: Props) => {
  const { t } = useTranslation();
  const OPTIONS = [
    { value: 'all', label: t('validators.common.all') },
    { value: 'received', label: t('shared.common.received_from') },
    { value: 'sent', label: t('shared.common.sent_to') },
  ];

  const collection = createListCollection({ items: OPTIONS });
  
  const isInitialLoading = useIsInitialLoading(isLoading);

  return (
    <PopoverFilterRadio
      name="account_history_filter"
      collection={ collection }
      onChange={ onFilterChange }
      hasActiveFilter={ hasActiveFilter }
      isLoading={ isInitialLoading }
      initialValue={ defaultFilter || OPTIONS[0].value }
    />
  );
};

export default React.memo(AccountHistoryFilter);
