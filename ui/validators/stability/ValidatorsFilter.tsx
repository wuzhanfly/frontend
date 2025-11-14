import { createListCollection } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ValidatorsStabilityFilters } from 'types/api/validators';

import PopoverFilterRadio from 'ui/shared/filters/PopoverFilterRadio';



interface Props {
  hasActiveFilter: boolean;
  defaultValue: ValidatorsStabilityFilters['state_filter'] | undefined;
  onChange: (nextValue: string | Array<string>) => void;
}

const ValidatorsFilter = ({ onChange, defaultValue, hasActiveFilter }: Props) => {
  const { t } = useTranslation();
  
  const OPTIONS = React.useMemo(() => [
    { value: 'all', label: t('validators.common.all') },
    { value: 'active', label: 'Active' },
    { value: 'probation', label: 'Probation' },
    { value: 'inactive', label: 'Inactive' },
  ], [t]);
  
  const collection = React.useMemo(() => createListCollection({
    items: OPTIONS,
  }), [t]);

  return (
    <PopoverFilterRadio
      name="validators_filter"
      collection={ collection }
      onChange={ onChange }
      hasActiveFilter={ hasActiveFilter }
      initialValue={ defaultValue || OPTIONS[0].value }
    />
  );
};

export default React.memo(ValidatorsFilter);
