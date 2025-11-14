import React from 'react';
import { useTranslation } from 'react-i18next';

import * as multichain from '@blockscout/multichain-aggregator-types';

import type { BadgeProps } from 'toolkit/chakra/badge';
import StatusTag from 'ui/shared/statusTag/StatusTag';

interface Props extends BadgeProps {
  status: multichain.InteropMessage_Status;
}

const CrossChainTxStatusTag = ({ status: statusProp, ...rest }: Props) => {
  const { t } = useTranslation();
  
  const { status, text } = (() => {
    switch (statusProp) {
      case multichain.InteropMessage_Status.SUCCESS:
        return { status: 'ok' as const, text: t('transactions.common.relayed') };
      case multichain.InteropMessage_Status.FAILED:
        return { status: 'error' as const, text: t('shared.common.failed') };
      case multichain.InteropMessage_Status.EXPIRED:
        return { status: 'error' as const, text: t('common.common.expired') };
      case multichain.InteropMessage_Status.PENDING:
        return { status: 'pending' as const, text: t('transactions.common.sent') };
      default:
        return { status: undefined, text: undefined };
    }
  })();

  if (!status || !text) {
    return null;
  }

  return <StatusTag type={ status } text={ text } { ...rest }/>;
};

export default React.memo(CrossChainTxStatusTag);
