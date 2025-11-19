import { useTranslation } from 'react-i18next';
import React from 'react';

import { Badge } from 'toolkit/chakra/badge';

import PageTitle from '../PageTitle';

const WithTextAd = () => {
  const { t } = useTranslation();
  return (
    <PageTitle
      title={t('common.common.block')}
      contentAfter={ <Badge key="custom" colorPalette="orange" variant="solid">{t('common.common.awesome')}</Badge> }
      withTextAd
    />
  );
};

export default WithTextAd;
