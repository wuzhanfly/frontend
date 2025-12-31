import React from 'react';
import { useTranslation } from 'react-i18next';

import type { SmartContractVerificationConfig } from 'types/client/contract';

import { Link } from 'toolkit/chakra/link';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldEvmVersion from '../fields/ContractVerificationFieldEvmVersion';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';

const MAIN_SOURCES_TYPES = [ '.vy' as const ];
const INTERFACE_TYPES = [ '.vy' as const, '.json' as const ];

const ContractVerificationVyperMultiPartFile = ({ config }: { config: SmartContractVerificationConfig }) => {
  const { t } = useTranslation();

  const interfacesHint = (
    <>
      <span>{ t('common.common.add_any') } </span>
      <Link href="https://docs.vyperlang.org/en/stable/interfaces.html" external noIcon>{ t('contract_verification.common.required_interfaces') }</Link>
      <span> { t('contract_verification.common.for_the_main_compiled_contract') }</span>
    </>
  );

  return (
    <ContractVerificationMethod title={ t('contract_verification.common.via_vyper_multi-part_files') }>
      <ContractVerificationFieldCompiler config={ config } isVyper/>
      <ContractVerificationFieldEvmVersion isVyper config={ config }/>
      <ContractVerificationFieldSources
        name="sources"
        fileTypes={ MAIN_SOURCES_TYPES }
        title={ t('contract_verification.common.upload_main_source') }
        hint={ t('contract_verification.common.primary_compiled_vyper_contract') }
        required
      />
      <ContractVerificationFieldSources
        name="interfaces"
        fileTypes={ INTERFACE_TYPES }
        multiple
        fullFilePath
        title={ t('contract_verification.common.interfaces_vy_json') }
        hint={ interfacesHint }
      />
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationVyperMultiPartFile);
