import type { PublicClient, GetLogsParameters, Log } from 'viem';

export default async function getLogs(
  publicClient: PublicClient,
  baseFilter: GetLogsParameters,
  fromBlock: bigint,
  toBlock: bigint,
  t: (key: string) => string,
  signal?: AbortSignal,
): Promise<Array<Log>> {
  const filter = { ...baseFilter, fromBlock, toBlock } as GetLogsParameters;

  if (signal?.aborted) {
    throw new DOMException(t('shared.common.aborted'), 'AbortError');
  }

  try {
    return (await publicClient.getLogs(filter));
  } catch {
    const middle = fromBlock + (toBlock - fromBlock) / BigInt(2);
    const leftPromise = getLogs(publicClient, baseFilter, fromBlock, middle, t, signal);
    const rightPromise = getLogs(publicClient, baseFilter, middle + BigInt(1), toBlock, t, signal);
    const [ left, right ] = await Promise.all([ leftPromise, rightPromise ]);
    return [ ...left, ...right ];
  }
};
