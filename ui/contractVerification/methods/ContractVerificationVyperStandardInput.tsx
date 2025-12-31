import React from 'react';
import { useTranslation } from 'react-i18next';

import type { SmartContractVerificationConfig } from 'types/client/contract';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';

const FILE_TYPES = [ '.json' as const ];

const ContractVerificationVyperStandardInput = ({ config }: { config: SmartContractVerificationConfig }) => {
  const { t } = useTranslation();

  return (
    <ContractVerificationMethod title={ t('contract_verification.common.contract_verification_via_vyper_standard_json_input') }>
      <ContractVerificationFieldCompiler config={ config } isVyper/>
      <ContractVerificationFieldSources
        fileTypes={ FILE_TYPES }
        title={ t('contract_verification.common.standard_input_json') }
        hint={ t('common.common.upload_the_standard_input_json') }
        required
      />
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationVyperStandardInput);
