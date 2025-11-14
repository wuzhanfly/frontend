import { createListCollection } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { VerifiedContractsFilter as TVerifiedContractsFilter } from 'types/api/contracts';

import config from 'configs/app';
import type { SelectOption } from 'toolkit/chakra/select';
import PopoverFilterRadio from 'ui/shared/filters/PopoverFilterRadio';

type OptionValue = TVerifiedContractsFilter | 'all';

interface Props {
  hasActiveFilter: boolean;
  defaultValue: TVerifiedContractsFilter | undefined;
  onChange: (nextValue: string | Array<string>) => void;
}

const VerifiedContractsFilter = ({ onChange, defaultValue, hasActiveFilter }: Props) => {
  const { t } = useTranslation();
  
  const OPTIONS = React.useMemo(() => [
    { value: 'all', label: t('validators.common.all') },
    { value: 'solidity', label: t('common.common.solidity') },
    { value: 'vyper', label: t('common.common.vyper') },
    { value: 'yul', label: t('common.common.yul') },
    { value: 'scilla', label: t('common.common.scilla') },
    { value: 'geas', label: t('common.common.geas') },
    { value: 'stylus_rust', label: t('common.common.stylus_rust') },
  ].filter(({ value }) => value === 'all' || config.UI.views.address.languageFilters.includes(value)) as Array<{ value: OptionValue; label: string }>, [t]);
  
  const collection = React.useMemo(() => createListCollection<SelectOption>({
    items: OPTIONS,
  }), [OPTIONS]);

  return (
    <PopoverFilterRadio
      name="verified_contracts_filter"
      collection={ collection }
      onChange={ onChange }
      hasActiveFilter={ hasActiveFilter }
      initialValue={ defaultValue || OPTIONS[0].value }
    />
  );
};

export default React.memo(VerifiedContractsFilter);