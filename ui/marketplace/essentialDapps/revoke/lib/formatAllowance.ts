import type { AllowanceType } from 'types/client/revoke';

export default function formatAllowance(approval: AllowanceType, t: (key: string) => string) {
  if (!approval.allowance) return 'N/A';
  if (approval.allowance === t('marketplace.common.unlimited')) return t('marketplace.common.unlimited');

  const allowance = parseFloat(approval.allowance);
  return Number(
    allowance >= 1 ? allowance.toFixed(2) : allowance.toPrecision(2),
  ).toString();
}
