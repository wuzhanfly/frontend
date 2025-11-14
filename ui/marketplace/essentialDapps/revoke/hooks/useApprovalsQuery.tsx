import ERC20Artifact from '@openzeppelin/contracts/build/contracts/ERC20.json';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { GetLogsParameters } from 'viem';
import { isAddress, getAbiItem } from 'viem';

import type { ChainConfig } from 'types/multichain';

import { ALLOWANCES } from 'stubs/essentialDapps/revoke';

import createPublicClient from '../lib/createPublicClient';
import getLogs from '../lib/getLogs';
import useSearchErc20Allowances from './useSearchErc20Allowances';
import useSearchNftAllowances from './useSearchNftAllowances';

export default function useApprovalsQuery(chain: ChainConfig | undefined, userAddress: string) {
  const { t } = useTranslation();
  const searchErc20Allowances = useSearchErc20Allowances();
  const searchNftAllowances = useSearchNftAllowances();

  const publicClient = useMemo(
    () => createPublicClient(chain?.config.chain.id),
    [ chain?.config.chain.id ],
  );

  const searchAllowances = useCallback(async(signal?: AbortSignal) => {
    try {
      if (signal?.aborted) {
        throw new DOMException(t('shared.common.aborted'), 'AbortError');
      }
      if (!publicClient) {
        throw new Error(t('marketplace.common.public_client_not_found'));
      }

      const latestBlockNumber = await publicClient.getBlockNumber();

      const filter = {
        event: getAbiItem({ abi: ERC20Artifact.abi, name: t('marketplace.common.approval') }),
        args: { owner: userAddress },
      } as unknown as GetLogsParameters;
      const approvalEvents = await getLogs(publicClient, filter, BigInt(0), latestBlockNumber, t, signal);

      const [ erc20Allowances, nftAllowances ] = await Promise.all([
        searchErc20Allowances(chain, userAddress, approvalEvents, publicClient, t, signal),
        searchNftAllowances(chain, userAddress, approvalEvents, publicClient, latestBlockNumber, t, signal),
      ]);

      const allowances = [ ...erc20Allowances, ...nftAllowances ].sort((a, b) => {
        if (b.timestamp < a.timestamp) return -1;
        if (b.timestamp > a.timestamp) return 1;
        return 0;
      });

      return allowances;
    } catch {
      return [];
    }
  }, [ searchErc20Allowances, searchNftAllowances, publicClient, chain, userAddress ]);

  return useQuery({
    queryKey: [ 'revoke:approvals', chain?.config.chain.id, userAddress ],
    queryFn: ({ signal }) => searchAllowances(signal),
    enabled: Boolean(userAddress) && isAddress(userAddress),
    placeholderData: ALLOWANCES,
  });
}
