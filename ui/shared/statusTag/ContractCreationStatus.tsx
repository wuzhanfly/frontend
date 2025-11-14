import React from 'react';
import { useTranslation } from 'react-i18next';

import type { SmartContractCreationStatus } from 'types/api/contract';

import type { BadgeProps } from 'toolkit/chakra/badge';
import { Badge } from 'toolkit/chakra/badge';
import { Tooltip } from 'toolkit/chakra/tooltip';

import StatusTag from './StatusTag';

interface Props extends BadgeProps {
  status: SmartContractCreationStatus;
}

const ContractCreationStatus = ({ status, ...rest }: Props) => {
  const { t } = useTranslation();
  switch (status) {
    case 'success':
      return (
        <Tooltip content={t('shared.common.the_contract_was_successfully_')}>
          <StatusTag type="ok" text="Success" { ...rest }/>
        </Tooltip>
      );
    case 'failed':
      return (
        <Tooltip content={t('shared.common.the_creation_transaction_faile')}>
          <StatusTag type="error" text={t('shared.common.failed')} { ...rest }/>
        </Tooltip>
      );
    case 'selfdestructed':
      return (
        <Tooltip content={t('shared.common.the_contract_was_created_at_so')}>
          <Badge colorPalette="gray" { ...rest }>Self-destructed</Badge>
        </Tooltip>
      );
    default:
      return null;
  }
};

export default React.memo(ContractCreationStatus);
