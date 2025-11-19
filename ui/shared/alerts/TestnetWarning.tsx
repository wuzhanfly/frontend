import { chakra } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import React from 'react';

import config from 'configs/app';
import { Alert } from 'toolkit/chakra/alert';

interface Props {
  isLoading?: boolean;
  className?: string;
}

const TestnetWarning = ({ isLoading, className }: Props) => {
  const { t } = useTranslation();
  if (!config.chain.isTestnet) {
    return null;
  }

  return (
    <Alert status="warning" loading={ isLoading } className={ className }>{t('common.common.this_is_a_testnet_transaction_only')}</Alert>
  );
};

export default React.memo(chakra(TestnetWarning));
