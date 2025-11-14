import React from 'react';

import config from 'configs/app';
import type { AlertProps } from 'toolkit/chakra/alert';
import { Alert } from 'toolkit/chakra/alert';
import { useTranslation } from 'react-i18next';

interface Props extends AlertProps {
  view?: 'block' | 'tx';
}

const BlockPendingUpdateAlert = ({ view = 'block', ...props }: Props) => {
  const { t } = useTranslation();

  if (!config.UI.views.block.pendingUpdateAlertEnabled) {
    return null;
  }

  const content = view === 'block' ?
    t('shared.common.block_is_being_resynced_detail') :
    'This transaction is part of a block that is being re-synced. Details may be incomplete until the update is finished.';

  return (
    <Alert status="info" showIcon { ...props }>
      { content }
    </Alert>
  );
};

export default React.memo(BlockPendingUpdateAlert);
