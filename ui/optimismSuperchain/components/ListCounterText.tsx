import React from 'react';
import { useTranslation } from 'react-i18next';

import useIsInitialLoading from 'lib/hooks/useIsInitialLoading';
import TruncatedValue from 'ui/shared/TruncatedValue';

interface Props {
  value: string | undefined;
  isLoading: boolean;
  type: 'transaction' | 'transfer';
}

const ListCounterText = ({ isLoading, value, type }: Props) => {
  const { t } = useTranslation();
  const isInitialLoading = useIsInitialLoading(isLoading);

  if (value === undefined || value === '0') {
    return null;
  }

  const valueNum = Number(value);
  const text = `${t('optimism_superchain.list_counter_text.total_of')}${ valueNum.toLocaleString() } ${ valueNum === 1 ? 
    type === 'transaction' ? t('optimism_superchain.list_counter_text.transaction') : t('optimism_superchain.list_counter_text.transfer') :
    type === 'transaction' ? `${t('optimism_superchain.list_counter_text.transaction')}${t('optimism_superchain.list_counter_text.transaction_s')}` :
    `${t('optimism_superchain.list_counter_text.transfer')}${t('optimism_superchain.list_counter_text.transfer_s')}` 
  }${t('optimism_superchain.list_counter_text.found')}`;

  return (
    <TruncatedValue
      value={ text }
      isLoading={ isInitialLoading }
      textStyle={{ base: 'md', lg: 'sm' }}
      color="text.secondary"
      ml={{ base: 0, lg: 4 }}
      mr={{ base: 0, lg: 8 }}
      mb={{ base: 4, lg: 0 }}
    />
  );
};

export default React.memo(ListCounterText);
