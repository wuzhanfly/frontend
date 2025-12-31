import React from 'react';
import { useTranslation } from 'react-i18next';

import type { SmartContractVerificationConfig } from 'types/client/contract';

import config from 'configs/app';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldAutodetectArgs from '../fields/ContractVerificationFieldAutodetectArgs';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldName from '../fields/ContractVerificationFieldName';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';
import ContractVerificationFieldZkCompiler from '../fields/ContractVerificationFieldZkCompiler';

const FILE_TYPES = [ '.json' as const ];
const rollupFeature = config.features.rollup;

const ContractVerificationStandardInput = ({ config }: { config: SmartContractVerificationConfig }) => {
  const { t } = useTranslation();
  return (
    <ContractVerificationMethod
      title={ t('contract_verification.common.via_solidity_standard_input_json') } disableScroll={ config.verification_options.length === 1 }>
      { !config?.is_rust_verifier_microservice_enabled && <ContractVerificationFieldName/> }
      <ContractVerificationFieldCompiler config={ config }/>
      { rollupFeature.isEnabled && rollupFeature.type === 'zkSync' && <ContractVerificationFieldZkCompiler config={ config }/> }
      <ContractVerificationFieldSources
        fileTypes={ FILE_TYPES }
        title={ t('contract_verification.common.standard_input_json') }
        hint={ t('common.common.upload_the_standard_input_json') }
        required
      />
      { !config?.is_rust_verifier_microservice_enabled && <ContractVerificationFieldAutodetectArgs/> }
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationStandardInput);
