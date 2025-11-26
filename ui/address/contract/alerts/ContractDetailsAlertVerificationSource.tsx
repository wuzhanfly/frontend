import React from 'react';
import { useTranslation } from 'react-i18next';

import type { SmartContract } from 'types/api/contract';

import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';

interface Props {
  data: SmartContract | undefined;
}

const ContractDetailsAlertVerificationSource = ({ data }: Props) => {
  const { t } = useTranslation(['address']);

  if (data?.is_verified && data?.is_verified_via_eth_bytecode_db) {
    return (
      <Alert status="warning" whiteSpace="pre-wrap">
        <span>
          {t('address.contract.verification_source.verified_using', { 
            partiallyText: data.is_partially_verified ? 'partially ' : '' 
          })}{' '}
        </span>
        <Link
          href="https://docs.blockscout.com/devs/verification/ethereum-bytecode-database-microservice"
          external
        >
          Blockscout Bytecode Database
        </Link>
      </Alert>
    );
  }

  if (data?.is_verified && data?.is_verified_via_sourcify) {
    return (
      <Alert status="warning" whiteSpace="pre-wrap">
        <span>
          {t('address.contract.verification_source.verified_via_sourcify', { 
            partiallyText: data.is_partially_verified ? 'partially ' : '' 
          })}{' '}
        </span>
        { data.sourcify_repo_url && <Link href={ data.sourcify_repo_url } textStyle="md" external>{t('address.common.view_contract_in_sourcify_repository')}</Link> }
      </Alert>
    );
  }

  return null;
};

export default React.memo(ContractDetailsAlertVerificationSource);
