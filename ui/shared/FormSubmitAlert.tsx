import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from 'toolkit/chakra/alert';

const FormSubmitAlert = () => {
  const { t } = useTranslation();
  return (
    <Alert status="error">
      {t('common.common.there_has_been_an_error_processing_your_request')}
    </Alert>
  );
};

export default FormSubmitAlert;
