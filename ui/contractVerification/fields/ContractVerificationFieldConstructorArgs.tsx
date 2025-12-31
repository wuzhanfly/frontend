import React from 'react';
import { useTranslation } from 'react-i18next';

import type { FormFields } from '../types';

import { Link } from 'toolkit/chakra/link';
import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

const ContractVerificationFieldConstructorArgs = () => {
  const { t } = useTranslation();
  return (
    <ContractVerificationFormRow>
      <FormFieldText<FormFields>
        name="constructor_args"
        required
        rules={{ maxLength: 255 }}
        placeholder={ t('common.common.abiencoded_constructor_argumen') }
        asComponent="Textarea"
      />
      <>
        <span>{ t('contract_verification.common.add_arguments_in') } </span>
        <Link href="https://solidity.readthedocs.io/en/develop/abi-spec.html" external noIcon>{ t('contract_verification.common.abi_hex_encoded_form') }</Link>
        <span>{ t('contract_verification.common.if_required_by_the_contract') }</span>
        <span> { t('contract_verification.common.they_may_also_be') } </span>
        <Link href="https://abi.hashex.org/" external noIcon>{ t('contract_verification.common.parsed_here') }</Link>
        <span>.</span>
      </>
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldConstructorArgs);
