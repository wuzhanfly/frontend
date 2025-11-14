import React from 'react';
import { useTranslation } from 'react-i18next';

import { Skeleton } from 'toolkit/chakra/skeleton';
import { Tooltip } from 'toolkit/chakra/tooltip';

type Props = {
  value: number;
  isLoading?: boolean;
};

const GasUsedToTargetRatio = ({ value, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <Tooltip content={t('shared.common._of_gas_target')}>
      <Skeleton color="text.secondary" loading={ isLoading }>
        <span>{ (value > 0 ? '+' : '') + value.toLocaleString(undefined, { maximumFractionDigits: 2 }) }%</span>
      </Skeleton>
    </Tooltip>
  );
};

export default React.memo(GasUsedToTargetRatio);
