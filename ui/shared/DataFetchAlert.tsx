import { chakra } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import React from 'react';

import { Alert } from 'toolkit/chakra/alert';

const DataFetchAlert = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  return (
    <Alert status="warning" width="fit-content" className={ className }>
      {t('common.common.something_went_wrong_try_refreshing_the_page_or_come_back_later')}
    </Alert>
  );
};

export default chakra(DataFetchAlert);
