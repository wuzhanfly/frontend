import { chakra, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Screen } from '../types';
import type { UserInfo } from 'types/api/account';

import config from 'configs/app';
import { Button } from 'toolkit/chakra/button';

interface Props {
  email: string;
  onConnectWallet: (screen: Screen) => void;
  onClose: () => void;
  isAuth?: boolean;
  profile: UserInfo | undefined;
}

const AuthModalScreenSuccessEmail = ({ email, onConnectWallet, onClose, isAuth, profile }: Props) => {
  const { t } = useTranslation();
  const handleConnectWalletClick = React.useCallback(() => {
    onConnectWallet({ type: 'connect_wallet', isAuth: true, loginToRewards: true });
  }, [ onConnectWallet ]);

  if (isAuth) {
    return (
      <Box>
        <Text>
          {t('common.common.your_account_was_linked_to')}<chakra.span fontWeight="700">{ email }</chakra.span>{t('common.common.email_use_for_the_next_login')}
        </Text>
        <Button
          mt={ 6 }
          variant="outline"
          onClick={ onClose }
        >
          {t('common.common.got_it')}
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Text>
        <chakra.span fontWeight="700">{ email }</chakra.span>{ ' ' }
        {t('snippets.auth_modal.screen_success_email.success_text')}
      </Text>
      { !profile?.address_hash && config.features.blockchainInteraction.isEnabled ? (
        <>
          <Text mt={ 6 }>{t('common.common.add_your_web3_wallet_to_safely_interact_with_smart_contracts_and_dapps_inside_blockscout')}</Text>
          <Button mt={ 6 } onClick={ handleConnectWalletClick }>{t('common.common.connect_wallet')}</Button>
        </>
      ) : (
        <Button
          variant="outline"
          mt={ 6 }
          onClick={ onClose }
        >
          {t('common.common.got_it')}
        </Button>
      ) }
    </Box>
  );
};

export default React.memo(AuthModalScreenSuccessEmail);
