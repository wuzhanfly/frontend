import { Text, chakra } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import React from 'react';

import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';

interface Props {
  className?: string;
}

const SocketAlert = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <Alert status="warning" className={ className }>
      <Text whiteSpace="pre">{t('common.common.connection_lost_click')}</Text>
      <Link href={ window.document.location.href }>{t('common.common.to_load_newer_records')}</Link>
    </Alert>
  );
};

export default chakra(SocketAlert);
