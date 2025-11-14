import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';
interface Props {
  status: 'error' | 'close';
}

const TxSocketAlert = ({ status }: Props) => {
  const { t } = useTranslation();
  const text = status === 'close' ?
    t('transactions.common.connection_is_lost_please_clic') :
    'An error has occurred while fetching transaction info. Please click here to update.';

  return (
    <Link href={ window.document.location.href } asChild>
      <Alert status="warning">{ text }</Alert>
    </Link>
  );
};

export default React.memo(TxSocketAlert);
