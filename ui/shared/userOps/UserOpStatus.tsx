import React from 'react';
import { useTranslation } from 'react-i18next';

import StatusTag from 'ui/shared/statusTag/StatusTag';

type Props = {
  status?: boolean;
  isLoading?: boolean;
};

const UserOpStatus = ({ status, isLoading }: Props) => {
  const { t } = useTranslation();
  if (status === undefined) {
    return null;
  }

  return (
    <StatusTag loading={ isLoading } type={ status === true ? 'ok' : 'error' } text={ status === true ? 'Success' : t('shared.common.failed') }/>
  );
};

export default UserOpStatus;
