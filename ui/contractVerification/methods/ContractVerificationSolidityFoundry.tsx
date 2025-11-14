import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import type { FormFields } from '../types';

import config from 'configs/app';
import { Link } from 'toolkit/chakra/link';

import ContractVerificationFormCodeSnippet from '../ContractVerificationFormCodeSnippet';
import ContractVerificationFormRow from '../ContractVerificationFormRow';
import ContractVerificationMethod from '../ContractVerificationMethod';

const ContractVerificationSolidityFoundry = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext<FormFields>();
  const address = watch('address');

  const codeSnippet = `forge verify-contract \\
  --rpc-url ${ config.chain.rpcUrls[0] || `${ config.apis.general.endpoint }/api/eth-rpc` } \\
  --verifier blockscout \\
  --verifier-url '${ config.apis.general.endpoint }/api/' \\
  ${ address || '<address>' } \\
  [contractFile]:[contractName]`;

  return (
    <ContractVerificationMethod title={t('common.common.contract_verification_via_foun')}>
      <ContractVerificationFormRow>
        <Flex flexDir="column">
          <ContractVerificationFormCodeSnippet code={ codeSnippet }/>
        </Flex>
        <Box whiteSpace="pre-wrap">
          <span>Full tutorial about contract verification via Foundry on Blockscout is available </span>
          <Link href="https://docs.blockscout.com/devs/verification/foundry-verification" external>
            here
          </Link>
        </Box>
      </ContractVerificationFormRow>
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationSolidityFoundry);
