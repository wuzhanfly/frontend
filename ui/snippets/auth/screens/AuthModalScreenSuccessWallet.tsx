import { chakra, Box, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Screen } from '../types';
import type { UserInfo } from 'types/api/account';

import config from 'configs/app';
import shortenString from 'lib/shortenString';
import { Button } from 'toolkit/chakra/button';
import { apos } from 'toolkit/utils/htmlEntities';

interface Props {
  address: string;
  onAddEmail: (screen: Screen) => void;
  onClose: () => void;
  isAuth?: boolean;
  profile: UserInfo | undefined;
  rewardsToken?: string;
}

const AuthModalScreenSuccessWallet = ({ address, onAddEmail, onClose, isAuth, profile, rewardsToken }: Props) => {
  const { t } = useTranslation();
  const handleAddEmailClick = React.useCallback(() => {
    onAddEmail({ type: 'email', isAuth: true });
  }, [ onAddEmail ]);

  if (isAuth) {
    return (
      <Box>
        <Text>
          {t('common.common.your_account_was_linked_to')}<chakra.span fontWeight="700">{ shortenString(address) }</chakra.span>{t('common.common.wallet_use_for_the_next_login')}
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
        Wallet{ ' ' }
        <chakra.span fontWeight="700">{ shortenString(address) }</chakra.span>{ ' ' }
        has been successfully used to log in to your Blockscout account
        { Boolean(rewardsToken) && t('common.common.and_merits_program') }.
      </Text>
      { !profile?.email ? (
        <>
          <Text mt={ 6 }>
            Add your email to receive exclusive updates about Blockscout { config.features.rewards.isEnabled ? t('common.common.merits') : ' ' }
            and notifications about addresses in your watch list.
          </Text>
          <Flex mt={ 6 } gap={ 6 }>
            <Button onClick={ handleAddEmailClick }>{t('common.common.add_email')}</Button>
            <Button variant="link" onClick={ onClose }>{t('common.common.ill_do_it_later')}</Button>
          </Flex>
        </>
      ) : (
        <Button
          mt={ 6 }
          variant="outline"
          onClick={ onClose }
        >
          {t('common.common.got_it')}
        </Button>
      ) }
    </Box>
  );
};

export default React.memo(AuthModalScreenSuccessWallet);
