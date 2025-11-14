import React from 'react';
import { useTranslation } from 'react-i18next';

import type { StatusTagType } from './StatusTag';
import StatusTag from './StatusTag';

export interface Props {
  status: 'finalized' | 'committed';
  isLoading?: boolean;
}

const ScrollL2TxnBatchStatus = ({ status, isLoading }: Props) => {
  const { t } = useTranslation();
  let type: StatusTagType;

  switch (status) {
    case 'finalized':
      type = 'ok';
      break;
    default:
      type = 'pending';
      break;
  }

  return <StatusTag type={ type } text={ status } loading={ isLoading }/>;
};

export default ScrollL2TxnBatchStatus;
