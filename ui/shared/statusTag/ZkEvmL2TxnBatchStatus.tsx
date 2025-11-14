import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ZkEvmL2TxnBatchesItem } from 'types/api/zkEvmL2';

import type { StatusTagType } from './StatusTag';
import StatusTag from './StatusTag';

export interface Props {
  status: ZkEvmL2TxnBatchesItem['status'];
  isLoading?: boolean;
}

const ZkEvmL2TxnBatchStatus = ({ status, isLoading }: Props) => {
  const { t } = useTranslation();
  let type: StatusTagType;

  switch (status) {
    case 'L1 Sequence Confirmed':
    case t('shared.common.finalized'):
      type = 'ok';
      break;
    default:
      type = 'pending';
      break;
  }

  return <StatusTag type={ type } text={ status } loading={ isLoading }/>;
};

export default ZkEvmL2TxnBatchStatus;
