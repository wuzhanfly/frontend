import { Box, Separator, Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { NavLink } from './types';
import type { UserInfo } from 'types/api/account';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { useMarketplaceContext } from 'lib/contexts/marketplace';
import shortenString from 'lib/shortenString';
import { Button } from 'toolkit/chakra/button';
import { Link } from 'toolkit/chakra/link';
import { Hint } from 'toolkit/components/Hint/Hint';
import TruncatedValue from 'ui/shared/TruncatedValue';
import useLogout from 'ui/snippets/auth/useLogout';

import UserWalletAutoConnectAlert from '../UserWalletAutoConnectAlert';
import UserProfileContentNavLink from './UserProfileContentNavLink';
import UserProfileContentWallet from './UserProfileContentWallet';



interface Props {
  data: UserInfo | undefined;
  onClose: () => void;
  onLogin: () => void;
  onAddEmail: () => void;
  onAddAddress: () => void;
}

const UserProfileContent = ({ data, onClose, onLogin, onAddEmail, onAddAddress }: Props) => {
  const { t } = useTranslation();
  const { isAutoConnectDisabled } = useMarketplaceContext();
  const logout = useLogout();

  const navLinks: Array<NavLink> = [
    {
      text: t('common.common.my_profile'),
      href: route({ pathname: '/auth/profile' }),
      icon: 'profile' as const,
    },
    {
      text: t('transactions.common.watch_list'),
      href: route({ pathname: '/account/watchlist' }),
      icon: 'star_outline' as const,
    },
    {
      text: t('common.common.private_tags'),
      href: route({ pathname: '/account/tag-address' }),
      icon: 'private_tags_slim' as const,
    },
    {
      text: t('common.common.api_keys'),
      href: route({ pathname: '/account/api-key' }),
      icon: 'API_slim' as const,
    },
    {
      text: t('common.common.custom_abi'),
      href: route({ pathname: '/account/custom-abi' }),
      icon: 'ABI_slim' as const,
    },
    config.features.addressVerification.isEnabled && {
      text: t('common.common.verified_addrs'),
      href: route({ pathname: '/account/verified-addresses' }),
      icon: 'verified_slim' as const,
    },
  ].filter(Boolean) as Array<NavLink>;

  const handleLogoutClick = React.useCallback(() => {
    logout();
    onClose();
  }, [ logout, onClose ]);

  if (!data) {
        return (
          <Box>
            { isAutoConnectDisabled && <UserWalletAutoConnectAlert/> }
            { config.features.blockchainInteraction.isEnabled && <UserProfileContentWallet onClose={ onClose }/> }
            <Button mt={ 3 } onClick={ onLogin } size="sm" w="100%">{t('common.common.log_in')}</Button>
          </Box>
        );
      }

  return (
    <Box>
      { isAutoConnectDisabled && <UserWalletAutoConnectAlert/> }

      <Box textStyle="xs" fontWeight="500" px={ 1 } mb="1">{t('common.common.account')}</Box>
      <Box
        textStyle="xs"
        fontWeight="500"
        borderColor="border.divider"
        borderWidth="1px"
        borderRadius="base"
        color="text.secondary"
      >
        { config.features.blockchainInteraction.isEnabled && (
          <Flex p={ 2 } borderColor="border.divider" borderBottomWidth="1px">
            <Box>{t('addresses.common.address')}</Box>
            <Hint
              label={t('common.common.this_wallet_address_is_linked_to_your_blockscout_account_it_can_be_used_to_login' + (config.features.rewards.isEnabled ? '_and_is_used_for_merits_program_participation' : ''))}
              boxSize={ 4 }
              ml={ 1 }
            />
          </Flex>
        ) }
        <Flex p={ 2 } columnGap={ 4 }>
          <Box mr="auto">{t('common.common.email')}</Box>
          { data?.email ?
            <TruncatedValue value={ data.email }/> : <Link onClick={ onAddEmail }>{t('common.common.add_email')}</Link> }
        </Flex>
      </Box>

      { config.features.blockchainInteraction.isEnabled && <UserProfileContentWallet onClose={ onClose } mt={ 3 }/> }

      <VStack as="ul" gap="0" alignItems="flex-start" overflow="hidden" mt={ 4 }>
        { navLinks.map((item) => (
          <UserProfileContentNavLink
            key={ item.text }
            { ...item }
            onClick={ onClose }
          />
        )) }
      </VStack>

      <Separator my={ 1 }/>

      <UserProfileContentNavLink
        text={t('common.common.sign_out')}
        icon="sign_out"
        onClick={ handleLogoutClick }
      />
    </Box>
  );
};

export default React.memo(UserProfileContent);
