import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from 'toolkit/chakra/alert';
import { Button } from 'toolkit/chakra/button';
import { useDisclosure } from 'toolkit/hooks/useDisclosure';
import AuthModal from 'ui/snippets/auth/AuthModal';

const WatchlistEmailAlert = () => {
  const { t } = useTranslation();
  const authModal = useDisclosure();

  return (
    <>
      <Alert
        status="info"
        descriptionProps={{ alignItems: 'center', gap: 2 }}
        w="fit-content"
        mb={ 6 }
      >
        To receive notifications you need to add an email to your profile.
        <Button variant="outline" size="sm" onClick={ authModal.onOpen }>{t('common.common.add_email')}</Button>
      </Alert>
      { authModal.open && <AuthModal initialScreen={{ type: 'email', isAuth: true }} onClose={ authModal.onClose }/> }
    </>
  );
};

export default React.memo(WatchlistEmailAlert);
