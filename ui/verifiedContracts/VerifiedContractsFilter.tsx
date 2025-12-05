import { createListCollection } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { VerifiedContractsFilter as TVerifiedContractsFilter } from 'types/api/contracts';

import config from 'configs/app';
import type { SelectOption } from 'toolkit/chakra/select';
import PopoverFilterRadio from 'ui/shared/filters/PopoverFilterRadio';

interface Props {
  hasActiveFilter: boolean;
  defaultValue: TVerifiedContractsFilter | undefined;
  onChange: (nextValue: string | Array<string>) => void;
  chainConfig?: typeof config;
}

const VerifiedContractsFilter = ({ onChange, defaultValue, hasActiveFilter, chainConfig }: Props) => {
  const { t } = useTranslation();

  const OPTIONS = React.useMemo(() => {
    return [
      { value: 'all', label: t('validators.common.all') },
      { value: 'solidity', label: t('common.common.solidity') },
      { value: 'vyper', label: t('common.common.vyper') },
      { value: 'yul', label: t('common.common.yul') },
      { value: 'scilla', label: t('common.common.scilla') },
      { value: 'geas', label: t('common.common.geas') },
      { value: 'stylus_rust', label: t('common.common.stylus_rust') },
    ];
  }, [ t ]);

  const options = React.useMemo(() => {
    return OPTIONS.filter(({ value }) => value === 'all' || (chainConfig || config).UI.views.address.languageFilters.includes(value));
  }, [ chainConfig, OPTIONS ]);

  const collection = React.useMemo(() => {
    return createListCollection<SelectOption>({ items: options });
  }, [ options ]);

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
