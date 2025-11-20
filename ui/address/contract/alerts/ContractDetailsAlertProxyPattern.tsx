import React from 'react';
import { useTranslation } from 'react-i18next';

import type { SmartContractProxyType } from 'types/api/contract';

import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';

interface Props {
  type: NonNullable<SmartContractProxyType>;
  isLoading: boolean;
}

const ContractCodeProxyPattern = ({ type, isLoading }: Props) => {
  const { t } = useTranslation();
  const PROXY_TYPES: Partial<Record<NonNullable<SmartContractProxyType>, {
    name: string;
    link?: string;
    description?: string;
  }>> = {
    eip1167: {
      name: 'EIP-1167',
      link: 'https://eips.ethereum.org/EIPS/eip-1167',
      description: t('addresses.common.minimal_proxy'),
    },
    eip1967: {
      name: 'EIP-1967',
      link: 'https://eips.ethereum.org/EIPS/eip-1967',
      description: t('addresses.common.proxy_storage_slots'),
    },
    eip1822: {
      name: 'EIP-1822',
      link: 'https://eips.ethereum.org/EIPS/eip-1822',
      description: t('addresses.common.universal_upgradeable_proxy_standard_uups'),
    },
    eip2535: {
      name: 'EIP-2535',
      link: 'https://eips.ethereum.org/EIPS/eip-2535',
      description: t('addresses.common.diamond_proxy'),
    },
    eip930: {
      name: 'ERC-930',
      link: 'https://github.com/ethereum/EIPs/issues/930',
      description: t('addresses.common.eternal_storage'),
    },
    erc7760: {
      name: 'ERC-7760',
      link: 'https://eips.ethereum.org/EIPS/eip-7760',
      description: t('addresses.common.minimal_upgradeable_proxies'),
    },
    resolved_delegate_proxy: {
      name: 'ResolvedDelegateProxy',
      // eslint-disable-next-line max-len
      link: 'https://github.com/ethereum-optimism/optimism/blob/9580179013a04b15e6213ae8aa8d43c3f559ed9a/packages/contracts-bedrock/src/legacy/ResolvedDelegateProxy.sol',
      description: t('addresses.common.op_stack_legacy_proxy_contract'),
    },
    clone_with_immutable_arguments: {
      name: t('addresses.common.clones_with_immutable_argument'),
      link: 'https://github.com/wighawag/clones-with-immutable-args',
    },
    master_copy: {
      name: t('addresses.common.safe_proxy'),
      link: 'https://github.com/safe-global/safe-smart-account',
    },
    comptroller: {
      name: t('addresses.common.compound_protocol_proxy'),
      link: 'https://github.com/compound-finance/compound-protocol',
    },
    basic_implementation: {
      name: t('addresses.common.public_implementation_getter'),
    },
    basic_get_implementation: {
      name: t('addresses.common.public_get_implementation_getter'),
    },
    unknown: {
      name: t('addresses.common.unknown_proxy_pattern'),
    },
  };

  const proxyInfo = PROXY_TYPES[type];

  if (!proxyInfo || type === 'unknown') {
    return null;
  }

  return (
    <Alert status="warning" whiteSpace="pre-wrap" loading={ isLoading }>
      { proxyInfo.link ? (
        <>
          { t('addresses.common.this_proxy_smart_contract_is_detected_via') } <Link href={ proxyInfo.link } external>{ proxyInfo.name }</Link>
          { proxyInfo.description && ` - ${ proxyInfo.description }` }
        </>
      ) : (
        <>
          { t('addresses.common.this_proxy_smart_contract_is_detected_via') } { proxyInfo.name }
          { proxyInfo.description && ` - ${ proxyInfo.description }` }
        </>
      ) }
    </Alert>
  );
};

export default React.memo(ContractCodeProxyPattern);
