import React from 'react';
import { useTranslation } from 'react-i18next';

import PageTitle from 'ui/shared/Page/PageTitle';

const OpSuperchainAccounts = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle
        title={t('account.common.top_accounts')}
        withTextAd
      />
      <div>{t('account.common.coming_soon_')}</div>
    </>
  );
};

export default React.memo(OpSuperchainAccounts);
