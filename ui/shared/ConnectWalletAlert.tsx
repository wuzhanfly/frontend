import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import useIsMobile from 'lib/hooks/useIsMobile';
import useWeb3Wallet from 'lib/web3/useWallet';
import { Alert } from 'toolkit/chakra/alert';
import { Button } from 'toolkit/chakra/button';
import { Skeleton } from 'toolkit/chakra/skeleton';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';

interface Props {
  isLoading?: boolean;
}

const ConnectWalletAlert = ({ isLoading }: Props) => {
  const { t } = useTranslation();
  const web3Wallet = useWeb3Wallet({ source: t('shared.common.smart_contracts') as 'Smart contracts' });
  const isMobile = useIsMobile();

  const content = (() => {
    if (!web3Wallet.isConnected) {
      return (
        <>
          <span>{t('common.common.disconnected')}</span>
          <Button
            ml={ 3 }
            onClick={ web3Wallet.connect }
            size="sm"
            variant="outline"
            loading={ web3Wallet.isOpen }
            loadingText={t('staking.common.connect_wallet')}
          >
            {t('common.common.connect_wallet')}
          </Button>
        </>
      );
    }

    return (
      <Flex columnGap={ 2 } rowGap={ 2 } alignItems={{ base: 'flex-start', lg: 'center' }} flexDir={{ base: 'column', lg: 'row' }}>
        <Flex alignItems="center">
          <span>{t('common.common.connected_to')}&nbsp;</span>
          <AddressEntity
            address={{ hash: web3Wallet.address || '' }}
            truncation={ isMobile ? 'constant' : 'dynamic' }
            fontWeight={ 600 }
            ml={ 2 }
            noAltHash
          />
        </Flex>
        <Button onClick={ web3Wallet.disconnect } size="sm" variant="outline">{t('common.common.disconnect')}</Button>
      </Flex>
    );
  })();

  return (
    <Skeleton loading={ isLoading }>
      <Alert status={ web3Wallet.address ? 'success' : 'warning' } descriptionProps={{ alignItems: 'center' }}>
        { content }
      </Alert>
    </Skeleton>
  );
};

const Fallback = () => null;

export default config.features.blockchainInteraction.isEnabled ? ConnectWalletAlert : Fallback;
