import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { FormFields } from '../types';

import { FormFieldCheckbox } from 'toolkit/components/forms/fields/FormFieldCheckbox';

import ContractVerificationFormRow from '../ContractVerificationFormRow';
import ContractVerificationFieldConstructorArgs from './ContractVerificationFieldConstructorArgs';

const ContractVerificationFieldAutodetectArgs = () => {
  const { t } = useTranslation();
  const [ isOn, setIsOn ] = React.useState(true);
  const { resetField } = useFormContext<FormFields>();

  const handleCheckboxChange = React.useCallback(() => {
    !isOn && resetField('constructor_args');
    setIsOn(prev => !prev);
  }, [ isOn, resetField ]);

  return (
    <>
      <ContractVerificationFormRow>
        <FormFieldCheckbox<FormFields, 'autodetect_constructor_args'>
          name="autodetect_constructor_args"
          label={ t('common.common.try_to_fetch_constructor_argum') }
          onChange={ handleCheckboxChange }
        />
      </ContractVerificationFormRow>
      { !isOn && <ContractVerificationFieldConstructorArgs/> }
    </>
  );
};

export default React.memo(ContractVerificationFieldAutodetectArgs);
