import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import type { EssentialDappsConfig } from 'types/client/marketplace';

import config from 'configs/app';

import EssentialDappCard from './EssentialDappCard';

const feature = config.features.marketplace;
const essentialDappsConfig = feature.isEnabled ? feature.essentialDapps : undefined;

const EssentialDappsList = () => {
  const { t } = useTranslation();
  
  const essentialDapps = [
    {
      id: 'swap',
      title: t('marketplace.common.swap'),
      description: 'Swap, trade and bridge tokens between chains',
      buttonText: t('marketplace.common.swap_tokens'),
      imageUrl: '/static/marketplace/swap.png',
      darkImageUrl: '/static/marketplace/swap-dark.png',
    },
    {
      id: 'revoke',
      title: t('marketplace.common.revoke'),
      description: t('marketplace.common.view_and_remove_token_approval'),
      buttonText: t('staking.common.get_started'),
      imageUrl: '/static/marketplace/revoke.png',
      darkImageUrl: '/static/marketplace/revoke-dark.png',
    },
    {
      id: 'multisend',
      title: t('marketplace.common.multisend'),
      description: t('marketplace.common.send_tokens_to_multiple_addres'),
      buttonText: t('marketplace.common.send_tokens'),
      imageUrl: '/static/marketplace/multisend.png',
      darkImageUrl: '/static/marketplace/multisend-dark.png',
    },
  ].filter((dapp) =>
    feature.isEnabled && Boolean(essentialDappsConfig?.[dapp.id as keyof EssentialDappsConfig]),
);

  return (
    <Flex
      gap={{ base: 2, md: 3 }}
      mb={ 8 }
      w="full"
      overflowX={{ base: 'auto', md: 'initial' }}
      css={{
        // hide scrollbar
        '&::-webkit-scrollbar': { /* Chromiums */
          display: 'none',
        },
        '-ms-overflow-style': 'none', /* IE and Edge */
        scrollbarWidth: 'none', /* Firefox */
      }}
    >
      { essentialDapps.map((dapp) => (
        <EssentialDappCard
          key={ dapp.id }
          id={ dapp.id }
          title={ dapp.title }
          description={ dapp.description }
          buttonText={ dapp.buttonText }
          imageUrl={ dapp.imageUrl }
          darkImageUrl={ dapp.darkImageUrl }
        />
      )) }
    </Flex>
  );
};

export default EssentialDappsList;
