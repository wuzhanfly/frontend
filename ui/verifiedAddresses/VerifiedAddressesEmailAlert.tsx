import React from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from 'toolkit/chakra/alert';
import { Button } from 'toolkit/chakra/button';
import { useDisclosure } from 'toolkit/hooks/useDisclosure';
import AuthModal from 'ui/snippets/auth/AuthModal';

const VerifiedAddressesEmailAlert = () => {
  const { t } = useTranslation();
  const authModal = useDisclosure();

  return (
    <>
      <Alert
        status="warning"
        mb={ 6 }
        descriptionProps={{
          alignItems: 'center',
          gap: 2,
        }}
      >
        {t('verified_addresses.common.you_need_a_valid_email_address_to_verify_contracts_please_add_your_email_to_your_account')}
        <Button variant="outline" size="sm" onClick={ authModal.onOpen }>{t('common.common.add_email')}</Button>
      </Alert>
      { authModal.open && <AuthModal initialScreen={{ type: 'email', isAuth: true }} onClose={ authModal.onClose }/> }
    </>
  );
};

export default React.memo(VerifiedAddressesEmailAlert);
