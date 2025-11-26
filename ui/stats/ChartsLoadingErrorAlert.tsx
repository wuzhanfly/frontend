import { Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';
import { apos } from 'toolkit/utils/htmlEntities';

function ChartsLoadingErrorAlert() {
  const { t } = useTranslation();
  
  return (
    <Alert status="warning" mb={ 4 } closable>
      <Text mr={ 2 }>
        { t('stats.charts_loading_error.some_charts_did_not_load') }
        <Link href={ window.document.location.href }>{ t('stats.charts_loading_error.click_once_again') }</Link>
      </Text>
    </Alert>
  );
}

export default ChartsLoadingErrorAlert;
