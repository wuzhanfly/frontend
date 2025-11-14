import React from 'react';
import { useTranslation } from 'react-i18next';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldContractIndex from '../fields/ContractVerificationFieldContractIndex';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';

const FILE_TYPES = [ '.json' as const, '.sol' as const ];

const ContractVerificationSourcify = () => {
  const { t } = useTranslation();
  return (
    <ContractVerificationMethod title="Contract verification via Solidity (Sourcify)">
      <ContractVerificationFieldSources
        fileTypes={ FILE_TYPES }
        multiple
        required
        title={t('common.common.sources_and_metadata_json')}
        hint="Upload all Solidity contract source files and JSON metadata file(s) created during contract compilation."
      />
      <ContractVerificationFieldContractIndex/>
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationSourcify);
