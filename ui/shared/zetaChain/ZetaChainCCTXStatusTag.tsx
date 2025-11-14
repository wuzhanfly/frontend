import React from 'react';
import { useTranslation } from 'react-i18next';

import { CctxStatus } from '@blockscout/zetachain-cctx-types';

import { Tag } from 'toolkit/chakra/tag';

type Props = {
  status: CctxStatus;
  isLoading?: boolean;
};

const getTagText = (t: (key: string) => string): Record<CctxStatus, string> => ({
  [CctxStatus.PENDING_OUTBOUND]: t('shared.common.pending_outbound'),
  [CctxStatus.PENDING_INBOUND]: t('shared.common.pending_inbound'),
  [CctxStatus.OUTBOUND_MINED]: t('shared.common.outbound_mined'),
  [CctxStatus.PENDING_REVERT]: t('shared.common.pending_revert'),
  [CctxStatus.ABORTED]: t('shared.common.aborted'),
  [CctxStatus.REVERTED]: t('shared.common.reverted'),
  [CctxStatus.UNRECOGNIZED]: t('shared.common.unknown_status'),
});

const ZetaChainCCTXStatusTag = ({ status, isLoading }: Props) => {
  const { t } = useTranslation();
  const tagText = getTagText(t);
  return (
    <Tag loading={ isLoading }>
      { tagText[status] }
    </Tag>
  );
};

export default React.memo(ZetaChainCCTXStatusTag);
