import { Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'toolkit/chakra/button';
import { useDisclosure } from 'toolkit/hooks/useDisclosure';

import AuthModal from './AuthModal';
import useIsAuth from './useIsAuth';

interface Props {
  flow: 'email_login' | 'email_link';
}

const AuthModalStory = ({ flow }: Props) => {
  const { t } = useTranslation();
  const authModal = useDisclosure();
  const isAuth = useIsAuth();

  const initialScreen = flow === 'email_login' ? { type: 'select_method' as const } : { type: 'email' as const, isAuth: true };

  const handleClose = React.useCallback(() => {
    authModal.onClose();
  }, [ authModal ]);

  return (
    <>
      <Button onClick={ authModal.onOpen }>{ flow === 'email_login' ? t('common.common.log_in') : t('common.common.link_email') }</Button>
      { authModal.open && <AuthModal initialScreen={ initialScreen } onClose={ handleClose }/> }
      <Box>Status: { isAuth ? t('common.common.authenticated') : t('common.common.not_authenticated') }</Box>
    </>
  );
};

export default AuthModalStory;
