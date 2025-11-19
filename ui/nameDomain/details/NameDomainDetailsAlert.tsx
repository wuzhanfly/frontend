import React from 'react';
import { useTranslation } from 'react-i18next';

import type * as bens from '@blockscout/bens-types';

import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';

interface Props {
  data: bens.DetailedDomain | undefined;
}

const NameDomainDetailsAlert = ({ data }: Props) => {
  const { t } = useTranslation();

  if (!data?.stored_offchain && !data?.resolved_with_wildcard) {
    return null;
  }

  return (
    <Alert status="info" display="inline-block" whiteSpace="pre-wrap" mb={ 6 }>
      <span>{t('common.common.the_domain_name_is_resolved_offchain_using', 'The domain name is resolved offchain using ')}</span>
      { data.stored_offchain && <Link external href="https://eips.ethereum.org/EIPS/eip-3668">{t('common.common.eip_3668_ccip_read', 'EIP-3668: CCIP Read')}</Link> }
      { data.stored_offchain && data.resolved_with_wildcard && <span> {t('common.common.ampersand', '&')} </span> }
      { data.resolved_with_wildcard && <Link external href="https://eips.ethereum.org/EIPS/eip-2544">{t('common.common.eip_2544_wildcard_resolution', 'EIP-2544: Wildcard Resolution')}</Link> }
    </Alert>
  );
};

export default React.memo(NameDomainDetailsAlert);
