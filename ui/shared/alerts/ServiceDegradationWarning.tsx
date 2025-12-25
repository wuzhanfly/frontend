import { Spinner, chakra } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from 'toolkit/chakra/alert';

interface Props {
  isLoading?: boolean;
  className?: string;
}

const ServiceDegradationWarning = ({ isLoading, className }: Props) => {
  const { t } = useTranslation();

  return (
    <Alert
      loading={ isLoading }
      status="info"
      className={ className }
      startElement={ <Spinner size="sm" my="3px" flexShrink={ 0 }/> }
    >
      { t('blocks.common.service_degradation_warning_alert') }
    </Alert>
  );
};

export default React.memo(chakra(ServiceDegradationWarning));
