import React from 'react';

import type { OptimisticL2TxnBatchesItem } from 'types/api/optimisticL2';
import type { ExcludeUndefined } from 'types/utils';

import type { BadgeProps } from 'toolkit/chakra/badge';
import { Badge } from 'toolkit/chakra/badge';
import { useTranslation } from 'react-i18next';

export interface Props extends BadgeProps {
  container: ExcludeUndefined<OptimisticL2TxnBatchesItem['batch_data_container']>;
  isLoading?: boolean;
}

const OptimisticL2TxnBatchDA = ({ container, isLoading, ...rest }: Props) => {
  const { t } = useTranslation();

  const text = (() => {
    switch (container) {
      case 'in_blob4844':
        return t('shared.common.eip4844_blob');
      case 'in_calldata':
        return t('shared.common.calldata');
      case 'in_celestia':
        return t('shared.common.celestia_blob');
    }
  })();

  return (
    <Badge colorPalette="yellow" loading={ isLoading } { ...rest }>
      { text }
    </Badge>
  );
};

export default React.memo(OptimisticL2TxnBatchDA);
