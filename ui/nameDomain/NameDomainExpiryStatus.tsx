import { chakra } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import dayjs from 'lib/date/dayjs';

interface Props {
  date: string | undefined;
}

const NameDomainExpiryStatus = ({ date }: Props) => {
  const { t } = useTranslation();

  if (!date) {
    return null;
  }

  const hasExpired = dayjs(date).isBefore(dayjs());

  if (hasExpired) {
    return <chakra.span color="red.600">{t('common.common.expired', 'Expired')}</chakra.span>;
  }

  const diff = dayjs(date).diff(dayjs(), 'day');
  if (diff < 30) {
    return <chakra.span color="red.600">{t('common.common.days_left', '{{count}} days left', { count: diff })}</chakra.span>;
  }

  return <chakra.span color="text.secondary">{t('common.common.expires_at', 'Expires {{time}}', { time: dayjs(date).fromNow() })}</chakra.span>;
};

export default React.memo(NameDomainExpiryStatus);
