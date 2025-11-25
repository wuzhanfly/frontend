import type { BoxProps } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import { Tooltip } from 'toolkit/chakra/tooltip';
import IconSvg from 'ui/shared/IconSvg';
import { useTranslation } from 'react-i18next';

interface Props extends BoxProps {
  view?: 'block' | 'tx';
}

const BlockPendingUpdateHint = ({ view = 'block', ...props }: Props) => {
  const { t } = useTranslation();

  if (!config.UI.views.block.pendingUpdateAlertEnabled) {
    return null;
  }

  const tooltipContent = view === 'block' ?
    t('shared.common.block_is_being_resynced_detail') :
    t('shared.common.tx_is_being_resynced_detail');

  return (
    <Tooltip content={ tooltipContent }>
      <IconSvg boxSize={ 5 } color="icon.secondary" name="status/warning" { ...props }/>
    </Tooltip>
  );
};

export default React.memo(BlockPendingUpdateHint);
