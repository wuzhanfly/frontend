import { chakra, Code } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { FormFields } from '../types';

import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

interface Props {
  hint?: string;
}

const ContractVerificationFieldName = ({ hint }: Props) => {
  const { t } = useTranslation();
  return (
    <ContractVerificationFormRow>
      <FormFieldText<FormFields>
        name="name"
        required
        placeholder={ t('common.common.contract_name') }
        rules={{ maxLength: 255 }}
      />
      { hint ? <span>{ hint }</span> : (
        <>
          <span>{ t('contract_verification.common.must_match_the_name_specified') } </span>
          <Code color="text.secondary">{ t('contract_verification.common.contract_myContract') }</Code>
          <span>. <chakra.span fontWeight={ 600 }>{ t('contract_verification.common.myContract') }</chakra.span>
            { t('contract_verification.common.is_the_contract_name') }</span>
        </>
      ) }
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldName);
