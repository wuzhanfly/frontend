import React from 'react';
import { useTranslation } from 'react-i18next';

import type { FormFields } from '../types';

import { FormFieldCheckbox } from 'toolkit/components/forms/fields/FormFieldCheckbox';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

const ContractVerificationFieldIsYul = () => {
  const { t } = useTranslation();
  return (
    <ContractVerificationFormRow>
      <FormFieldCheckbox<FormFields, 'is_yul'>
        name="is_yul"
        label={ t('common.common.is_yul_contract') }
      />
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldIsYul);
