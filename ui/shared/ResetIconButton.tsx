import React from 'react';
import { useTranslation } from 'react-i18next';

import { CloseButton } from 'toolkit/chakra/close-button';
import { Tooltip } from 'toolkit/chakra/tooltip';

type Props = {
  onClick: () => void;
};

const ResetIconButton = ({ onClick }: Props) => {
  const { t } = useTranslation();
  return (
    <Tooltip content={t('shared.common.reset_filter')}>
      <CloseButton onClick={ onClick } ml={ 1 }/>
    </Tooltip>
  );
};

export default ResetIconButton;
