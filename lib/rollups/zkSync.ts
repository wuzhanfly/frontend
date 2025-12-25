import type { TFunction } from 'i18next';

import { ZKSYNC_L2_TX_BATCH_STATUSES, type ZkSyncBatchStatus } from 'types/api/zkSyncL2';

export const VERIFICATION_STEPS_MAP: Record<ZkSyncBatchStatus, string> = {
  'Processed on L2': 'batches.zksync_l2.status_processed_on_l2',
  'Sealed on L2': 'batches.zksync_l2.status_sealed_on_l2',
  'Sent to L1': 'batches.zksync_l2.status_sent_to_l1',
  'Validated on L1': 'batches.zksync_l2.status_validated_on_l1',
  'Executed on L1': 'batches.zksync_l2.status_executed_on_l1',
};

export function getVerificationStepTranslationKey(status: ZkSyncBatchStatus): string {
  return VERIFICATION_STEPS_MAP[status];
}

export function getVerificationSteps(t: TFunction): Array<string> {
  return ZKSYNC_L2_TX_BATCH_STATUSES.map((status) => t(VERIFICATION_STEPS_MAP[status]));
}
