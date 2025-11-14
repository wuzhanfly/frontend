import React from 'react';
import { useTranslation } from 'react-i18next';

import type { InteropMessage } from 'types/api/interop';

import type { StatusTagType } from './StatusTag';
import StatusTag from './StatusTag';

export interface Props {
  status: InteropMessage['status'];
  isLoading?: boolean;
}

const InteropMessageStatus = ({ status, isLoading }: Props) => {
  const { t } = useTranslation();
  let type: StatusTagType;

  switch (status) {
    case t('transactions.common.relayed'): {
      type = 'ok';
      break;
    }
    case t('shared.common.failed'): {
      type = 'error';
      break;
    }
    case t('transactions.common.sent'): {
      type = 'pending';
      break;
    }
    default:
      type = 'pending';
      break;
  }

  return <StatusTag type={ type } text={ status } loading={ isLoading }/>;
};

export default InteropMessageStatus;
