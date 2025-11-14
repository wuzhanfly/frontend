import React from 'react';
import { useTranslation } from 'react-i18next';

import type { SmartContractVerificationConfig } from 'types/client/contract';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldEvmVersion from '../fields/ContractVerificationFieldEvmVersion';
import ContractVerificationFieldLibraries from '../fields/ContractVerificationFieldLibraries';
import ContractVerificationFieldOptimization from '../fields/ContractVerificationFieldOptimization';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';

const FILE_TYPES = [ '.sol' as const, '.yul' as const ];

const ContractVerificationMultiPartFile = ({ config }: { config: SmartContractVerificationConfig }) => {
  const { t } = useTranslation();
  return (
    <ContractVerificationMethod title="Contract verification via Solidity (multi-part files)">
      <ContractVerificationFieldCompiler config={ config }/>
      <ContractVerificationFieldEvmVersion config={ config }/>
      <ContractVerificationFieldOptimization/>
      <ContractVerificationFieldSources
        fileTypes={ FILE_TYPES }
        multiple
        fullFilePath
        required
        title={t('common.common.sources_sol_or_yul_files')}
        hint={t('common.common.upload_all_solidity_or_yul_con')}
      />
      <ContractVerificationFieldLibraries/>
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationMultiPartFile);
