import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from 'toolkit/chakra/alert';

interface Props {
  isLoading?: boolean;
}

const ContractCustomAbiAlert = ({ isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <Alert status="warning" loading={ isLoading }>
      {
        t('contract_verification.common.abi_alert')
      }
    </Alert>
  );
};

export default React.memo(ContractCustomAbiAlert);
