import { Box, Text } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { UserInfo } from 'types/api/account';

import config from 'configs/app';
import { Button } from 'toolkit/chakra/button';
import { Heading } from 'toolkit/chakra/heading';
import { Link } from 'toolkit/chakra/link';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';

interface Props {
  profileQuery: UseQueryResult<UserInfo, unknown>;
  onAddWallet: () => void;
}

const MyProfileWallet = ({ profileQuery, onAddWallet }: Props) => {
  const { t } = useTranslation();

  return (
    <section>
      <Heading level="2" mb={ 3 }>{t('my_profile.wallet.my_linked_wallet')}</Heading>
      <Text mb={ 3 } >
        {t('my_profile.wallet.address_used_for_login')}{ ' ' }
        { config.features.rewards.isEnabled && (
          <>
            {t('my_profile.wallet.participation_merits_program')}
            <Link external href="https://docs.blockscout.com/using-blockscout/merits" ml={ 1 }>
              {t('common.common.learn_more')}
            </Link>
          </>
        ) }
      </Text>
      { profileQuery.data?.address_hash ? (
        <Box px={ 3 } py="18px" bgColor={{ _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' }} borderRadius="base">
          <AddressEntity
            address={{ hash: profileQuery.data.address_hash }}
            fontWeight="500"
            noAltHash
          />
        </Box>
      ) : <Button size="sm" onClick={ onAddWallet }>{t('my_profile.wallet.link_wallet')}</Button> }
    </section>
  );
};

export default React.memo(MyProfileWallet);
