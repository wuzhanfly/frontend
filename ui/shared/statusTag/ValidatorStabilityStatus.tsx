import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ValidatorStability } from 'types/api/validators';

import StatusTag from './StatusTag';

interface Props {
  state: ValidatorStability['state'];
  isLoading?: boolean;
}

const ValidatorStabilityStatus = ({ state, isLoading }: Props) => {
  const { t } = useTranslation();

  switch (state) {
    case 'active':
      return <StatusTag type="ok" text={ t('shared.common.active') } loading={ isLoading }/>;
    case 'probation':
      return <StatusTag type="pending" text={ t('shared.common.probation') } loading={ isLoading }/>;
    case 'inactive':
      return <StatusTag type="error" text={ t('shared.common.inactive') } loading={ isLoading }/>;
  }
};

export default React.memo(ValidatorStabilityStatus);
