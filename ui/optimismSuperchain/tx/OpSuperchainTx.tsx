import React from 'react';
import { useTranslation } from 'react-i18next';

import TextAd from 'ui/shared/ad/TextAd';
import PageTitle from 'ui/shared/Page/PageTitle';

const OpSuperchainTx = () => {
  const { t } = useTranslation();
  return (
    <>
      <TextAd mb={ 6 }/>
      <PageTitle
        title={t('transactions.common.crosschain_tx_details')}
      />
      <div>Coming soon 🔜</div>
    </>
  );
};

export default React.memo(OpSuperchainTx);
