import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from 'toolkit/chakra/alert';

const TxPendingAlert = () => {
  const { t } = useTranslation();
  return (
    <Alert startElement={ <Spinner size="sm" my={ 1 }/> }>
      { t('transactions.pending_alert.transaction_pending_confirmation') }
    </Alert>
  );
};

export default TxPendingAlert;
