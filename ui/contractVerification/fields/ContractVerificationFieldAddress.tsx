import React from 'react';
import { useTranslation } from 'react-i18next';

import type { FormFields } from '../types';

import { Heading } from 'toolkit/chakra/heading';
import { FormFieldAddress } from 'toolkit/components/forms/fields/FormFieldAddress';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

interface Props {
  readOnly?: boolean;
}

const ContractVerificationFieldAddress = ({ readOnly }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <ContractVerificationFormRow>
        <Heading level="2">
          { t('contract_verification.common.contract_address_to_verify') }
        </Heading>
      </ContractVerificationFormRow>
      <ContractVerificationFormRow>
        <FormFieldAddress<FormFields>
          name="address"
          required
          placeholder={ t('contract_verification.common.smart_contract_address_placeholder') }
          readOnly={ readOnly }
        />
      </ContractVerificationFormRow>
    </>
  );
};

export default React.memo(ContractVerificationFieldAddress);
