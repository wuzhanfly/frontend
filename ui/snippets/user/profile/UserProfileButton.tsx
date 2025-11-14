import type { ButtonProps } from '@chakra-ui/react';
import { Box, HStack } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { UserInfo } from 'types/api/account';

import { useMarketplaceContext } from 'lib/contexts/marketplace';
import useIsMobile from 'lib/hooks/useIsMobile';
import shortenString from 'lib/shortenString';
import useWeb3AccountWithDomain from 'lib/web3/useAccountWithDomain';
import { Button } from 'toolkit/chakra/button';
import { Tooltip } from 'toolkit/chakra/tooltip';
import IconSvg from 'ui/shared/IconSvg';

import UserIdenticon from '../UserIdenticon';
import { getUserHandle } from './utils';

interface Props {
  profileQuery: UseQueryResult<UserInfo, unknown>;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  onClick: () => void;
  isPending?: boolean;
}

const UserProfileButton = ({ profileQuery, size, variant, onClick, isPending, ...rest }: Props, ref: React.ForwardedRef<HTMLButtonElement>) => {
  const { t } = useTranslation();
  const [ isFetched, setIsFetched ] = useState(false);
  const isMobile = useIsMobile();

  const { data, isLoading } = profileQuery;
  const web3AccountWithDomain = useWeb3AccountWithDomain(true);
  const { isAutoConnectDisabled } = useMarketplaceContext();

  React.useEffect(() => {
    if (!isLoading) {
      setIsFetched(true);
    }
  }, [ isLoading ]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }, []);

  const isButtonLoading = isPending || !isFetched || web3AccountWithDomain.isLoading;
  const dataExists = !isButtonLoading && (Boolean(data) || Boolean(web3AccountWithDomain.address));

  const content = (() => {
  const { t } = useTranslation();
    if (web3AccountWithDomain.address && !isButtonLoading) {
      return (
        <HStack gap={ 2 }>
          <UserIdenticon address={ web3AccountWithDomain.address } isAutoConnectDisabled={ isAutoConnectDisabled }/>
          <Box display={{ base: 'none', md: 'block' }}>
            { web3AccountWithDomain.domain || shortenString(web3AccountWithDomain.address) }
          </Box>
        </HStack>
      );
    }

    if (!data || isButtonLoading) {
      return t('common.common.log_in');
    }

    return (
      <HStack gap={ 2 }>
        <IconSvg name="profile" boxSize={ 5 }/>
        <Box display={{ base: 'none', md: 'block' }}>{ data.email ? getUserHandle(data.email) : t('common.common.my_profile') }</Box>
      </HStack>
    );
  })();

  return (
    <Tooltip
      content={ <span>Sign in to My Account to add tags,<br/>create watchlists, access API keys and more</span> }
      disabled={ isMobile || isLoading || Boolean(data) }
      openDelay={ 500 }
      disableOnMobile
    >
      <span>
        <Button
          ref={ ref }
          size={ size }
          variant={ variant }
          onClick={ onClick }
          onFocus={ handleFocus }
          selected={ dataExists }
          highlighted={ isAutoConnectDisabled }
          px={{ base: 2.5, lg: 3 }}
          fontWeight={ dataExists ? 700 : 600 }
          loading={ isButtonLoading }
          { ...rest }
        >
          { content }
        </Button>
      </span>
    </Tooltip>
  );
};

export default React.forwardRef(UserProfileButton);
