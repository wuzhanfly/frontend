import React from 'react';
import { useTranslation } from 'react-i18next';

import type { FormFields } from '../types';
import type { SmartContractVerificationConfig } from 'types/client/contract';

import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';

import ContractVerificationFormRow from '../ContractVerificationFormRow';
import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCommit from '../fields/ContractVerificationFieldCommit';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldGitHubRepo from '../fields/ContractVerificationFieldGitHubRepo';

const ContractVerificationStylusGitHubRepo = ({ config }: { config: SmartContractVerificationConfig }) => {
  const { t } = useTranslation();
  const [ latestCommitHash, setLatestCommitHash ] = React.useState<string | undefined>(undefined);

  return (
    <ContractVerificationMethod title="Contract verification via Stylus (GitHub repository) ">
      <ContractVerificationFieldCompiler config={ config } isStylus/>
      <ContractVerificationFieldGitHubRepo onCommitHashChange={ setLatestCommitHash }/>
      <ContractVerificationFieldCommit latestCommitHash={ latestCommitHash }/>

      <ContractVerificationFormRow>
        <FormFieldText<FormFields>
          name="path_prefix"
          placeholder={t('common.common.path_prefix')}
        />
        <span>
          The crate should be located in the root directory. If it is not the case, please specify the relative path from
          the root to the crate directory.
        </span>
      </ContractVerificationFormRow>
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationStylusGitHubRepo);
