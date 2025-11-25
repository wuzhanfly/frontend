import { upperFirst } from 'es-toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TxAuthorization } from 'types/api/transaction';

import type { BadgeProps } from 'toolkit/chakra/badge';

import StatusTag from './StatusTag';

export interface Props extends BadgeProps {
  status: TxAuthorization['status'];
}

const TxAuthorizationStatus = ({ status, ...rest }: Props) => {
  const { t } = useTranslation();

  const type = (() => {
    if (!status) {
      return 'pending';
    }
    if (status === 'ok') {
      return 'ok';
    }
    return 'error';
  })();

  const text = (() => {
    if (!status) {
      return t('shared.common.pending');
    }
    if (status === 'ok') {
      return t('common.common.success');
    }
    return upperFirst(status.replace('_', ' '));
  })();

  return <StatusTag { ...rest } type={ type } text={ text }/>;
};

export default TxAuthorizationStatus;
