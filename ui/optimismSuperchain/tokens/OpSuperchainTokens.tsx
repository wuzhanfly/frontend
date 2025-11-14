import React from 'react';
import { useTranslation } from 'react-i18next';

import PageTitle from 'ui/shared/Page/PageTitle';

const OpSuperchainTokens = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={t('tokens.common.tokens')} withTextAd/>
      <div>{t('account.common.coming_soon_')}</div>
    </>
  );
};

export default React.memo(OpSuperchainTokens);
