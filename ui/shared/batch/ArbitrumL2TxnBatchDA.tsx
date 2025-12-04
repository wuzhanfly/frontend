import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ArbitrumL2TxnBatchesItem } from 'types/api/arbitrumL2';

import { Badge } from 'toolkit/chakra/badge';

export interface Props {
  dataContainer: ArbitrumL2TxnBatchesItem['batch_data_container'];
  isLoading?: boolean;
}

const ArbitrumL2TxnBatchDA = ({ dataContainer, isLoading }: Props) => {
  const { t } = useTranslation();

  let text: string;

  if (dataContainer === null) {
    return null;
  }

  switch (dataContainer) {
    case 'in_blob4844':
      text = t('txnBatches.common.blob');
      break;
    case 'in_anytrust':
      text = t('txnBatches.common.in_anytrust');
      break;
    case 'in_calldata':
      text = t('txnBatches.common.in_calldata');
      break;
    case 'in_celestia':
      text = t('txnBatches.common.in_celestia');
      break;
    default:
      text = '';
  }

  if (!text) {
    return null;
  }

  return (
    <Badge loading={ isLoading } colorPalette={ dataContainer === 'in_blob4844' ? 'yellow' : 'gray' }>
      { text }
    </Badge>
  );
};

export default ArbitrumL2TxnBatchDA;
