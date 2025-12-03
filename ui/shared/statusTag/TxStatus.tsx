import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Transaction } from 'types/api/transaction';

import type { StatusTagType } from './StatusTag';
import StatusTag from './StatusTag';

export interface Props {
  status: Transaction['status'];
  errorText?: string | null;
  isLoading?: boolean;
}

const TxStatus = ({ status, errorText, isLoading }: Props) => {
  const { t } = useTranslation();
  if (status === undefined) {
    return null;
  }

  let text;
  let type: StatusTagType;

  switch (status) {
    case 'ok':
      text = t('common.common.success');
      type = 'ok';
      break;
    case 'error':
      text = t('common.common.failed');
      type = 'error';
      break;
    case null:
      text = t('shared.common.pending');
      type = 'pending';
      break;
  }

  return <StatusTag type={ type } text={ text } errorText={ errorText } loading={ isLoading }/>;
};

export default TxStatus;
