import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { Screen } from 'ui/snippets/auth/types';

import { useRewardsContext } from 'lib/contexts/rewards';
import useWallet from 'lib/web3/useWallet';
import { DialogBody, DialogContent, DialogHeader, DialogRoot, DialogTrigger } from 'toolkit/chakra/dialog';
import { useDisclosure } from 'toolkit/hooks/useDisclosure';
import AuthModal from 'ui/snippets/auth/AuthModal';

import CongratsStepContent from './steps/CongratsStepContent';
import LoginStepContent from './steps/LoginStepContent';

const RewardsLoginModal = () => {
  const { t } = useTranslation();
  const MIXPANEL_CONFIG = {
    account_link_info: {
      source: t('staking.common.merits') as 'Merits',
    },
    wallet_connect: {
      source: t('staking.common.merits') as 'Merits',
    },
  };

  const { isOpen: isWalletModalOpen } = useWallet({ source: t('staking.common.merits') as 'Merits' });
  const { isLoginModalOpen, closeLoginModal, openLoginModal } = useRewardsContext();

  const [ isLoginStep, setIsLoginStep ] = React.useState(true);
  const [ isReferral, setIsReferral ] = React.useState(false);
  const [ customReferralReward, setCustomReferralReward ] = React.useState<string | undefined>();
  const [ authModalInitialScreen, setAuthModalInitialScreen ] = React.useState<Screen>();
  const authModal = useDisclosure();

  useEffect(() => {
    if (!isLoginModalOpen) {
      setIsLoginStep(true);
      setIsReferral(false);
      setCustomReferralReward(undefined);
    }
  }, [ isLoginModalOpen ]);

  const goNext = useCallback((isReferral: boolean, reward: string | undefined) => {
    setIsReferral(isReferral);
    setCustomReferralReward(reward);
    setIsLoginStep(false);
  }, [ setIsLoginStep, setIsReferral ]);

  const handleOpenChange = React.useCallback(({ open }: { open: boolean }) => {
    if (open) {
      openLoginModal();
    } else {
      closeLoginModal();
    }
  }, [ closeLoginModal, openLoginModal ]);

  const handleAuthModalOpen = useCallback((isAuth: boolean, trySharedLogin?: boolean) => {
    setAuthModalInitialScreen({ type: 'connect_wallet', isAuth, loginToRewards: trySharedLogin });
    authModal.onOpen();
  }, [ authModal, setAuthModalInitialScreen ]);

  const handleAuthModalClose = useCallback((isSuccess?: boolean, rewardsApiToken?: string) => {
    if (isSuccess && rewardsApiToken) {
      closeLoginModal();
    }
    setAuthModalInitialScreen(undefined);
    authModal.onClose();
  }, [ authModal, setAuthModalInitialScreen, closeLoginModal ]);

  return (
    <>
      <DialogRoot
        open={ isLoginModalOpen && !isWalletModalOpen && !authModal.open }
        onOpenChange={ handleOpenChange }
        size={{ lgDown: 'full', lg: isLoginStep ? 'sm' : 'md' }}
      >
        <DialogContent>
          <DialogHeader>
            { isLoginStep ? t('staking.common.login') : t('staking.common.congratulations') }
          </DialogHeader>
          <DialogBody>
            { isLoginStep ?
              <LoginStepContent goNext={ goNext } openAuthModal={ handleAuthModalOpen } closeModal={ closeLoginModal }/> :
              <CongratsStepContent isReferral={ isReferral } customReferralReward={ customReferralReward }/>
            }
          </DialogBody>
        </DialogContent>
      </DialogRoot>
      { authModal.open && authModalInitialScreen && (
        <AuthModal
          onClose={ handleAuthModalClose }
          initialScreen={ authModalInitialScreen }
          mixpanelConfig={ MIXPANEL_CONFIG }
          closeOnError
        />
      ) }
    </>
  );
};

export default RewardsLoginModal;
