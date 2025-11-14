import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Props as StatusTagProps } from './StatusTag';
import StatusTag from './StatusTag';

export interface Props extends Omit<StatusTagProps, 'type' | 'text'> {
  isFinalized: boolean;
}

const CeloEpochStatus = ({ isFinalized, ...rest }: Props) => {
  const { t } = useTranslation();
  return (
    <StatusTag
      { ...rest }
      type={ isFinalized ? 'ok' : 'pending' }
      text={ isFinalized ? t('shared.common.finalized') : t('shared.common.in_progress') }
    />
  );
};

export default CeloEpochStatus;
