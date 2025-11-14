import React from 'react';

import type { ArbitrumL2TxnBatchesItem } from 'types/api/arbitrumL2';

import { Badge } from 'toolkit/chakra/badge';
import { useTranslation } from 'react-i18next';

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
      text = t('shared.common.blob');
      break;
    case 'in_anytrust':
      text = 'AnyTrust';
      break;
    case 'in_calldata':
      text = t('shared.common.calldata');
      break;
    case 'in_celestia':
      text = t('shared.common.celestia');
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
