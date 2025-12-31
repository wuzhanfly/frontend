import { chakra, Code, createListCollection } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { FormFields } from '../types';
import type { SmartContractVerificationConfig } from 'types/client/contract';

import { Checkbox } from 'toolkit/chakra/checkbox';
import { FormFieldSelectAsync } from 'toolkit/components/forms/fields/FormFieldSelectAsync';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

const OPTIONS_LIMIT = 50;

interface Props {
  isVyper?: boolean;
  isStylus?: boolean;
  config: SmartContractVerificationConfig;
}

const ContractVerificationFieldCompiler = ({ isVyper, isStylus, config }: Props) => {
  const { t } = useTranslation();
  const [ isNightly, setIsNightly ] = React.useState(false);
  const { formState, getValues, resetField } = useFormContext<FormFields>();

  const handleCheckboxChange = React.useCallback(() => {
    setIsNightly(prev => {
      if (prev) {
        const field = getValues('compiler');
        field?.[0]?.includes('nightly') && resetField('compiler', { defaultValue: [] });
      }

      return !prev;
    });
  }, [ getValues, resetField ]);

  const versions = React.useMemo(() => {
    if (isStylus) {
      return config?.stylus_compiler_versions;
    }
    if (isVyper) {
      return config?.vyper_compiler_versions;
    }
    return config?.solidity_compiler_versions;
  }, [ isStylus, isVyper, config?.solidity_compiler_versions, config?.stylus_compiler_versions, config?.vyper_compiler_versions ]);

  const loadOptions = React.useCallback(async(inputValue: string, currentValue: Array<string>) => {
    const items = versions
      ?.filter((value) => !inputValue || currentValue.includes(value) || value.toLowerCase().includes(inputValue.toLowerCase()))
      .filter((value) => isNightly ? true : !value.includes('nightly'))
      .sort((a, b) => {
        if (currentValue.includes(a)) {
          return -1;
        }
        if (currentValue.includes(b)) {
          return 1;
        }
        return 0;
      })
      .slice(0, OPTIONS_LIMIT)
      .map((value) => ({ label: value, value })) ?? [];

    return createListCollection({ items });
  }, [ isNightly, versions ]);

  const extraControls = !isVyper && !isStylus ? (
    <Checkbox
      mt={ 2 }
      checked={ isNightly }
      onCheckedChange={ handleCheckboxChange }
      disabled={ formState.isSubmitting }
      size="sm"
    >
      { t('contract_verification.common.include_nightly_builds') }
    </Checkbox>
  ) : null;

  return (
    <ContractVerificationFormRow>
      <FormFieldSelectAsync<FormFields, 'compiler'>
        name="compiler"
        placeholder={ t('common.common.compiler') }
        loadOptions={ loadOptions }
        extraControls={ extraControls }
        required
      />
      { isVyper || isStylus ? null : (
        <chakra.div>
          <span >{ t('contract_verification.common.the_compiler_version_is_specified_in') } </span>
          <Code color="text.secondary">{ t('contract_verification.common.pragma_solidity') }</Code>
          <span>{ t('contract_verification.common.use_the_compiler_version') }</span>
          <Code color="text.secondary">{ t('contract_verification.common.solc_version') }</Code>
          <span>{ t('contract_verification.common.to_check') }</span>
        </chakra.div>
      ) }
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldCompiler);
