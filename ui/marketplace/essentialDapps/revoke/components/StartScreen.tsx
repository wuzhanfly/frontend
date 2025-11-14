import { Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Heading } from 'toolkit/chakra/heading';
import IconSvg from 'ui/shared/IconSvg';
import type { IconName } from 'ui/shared/IconSvg';

export default function StartScreen() {
  const { t } = useTranslation();
  
  const STEPS = [
    {
      text: t('marketplace.common.click_connect_wallet_on_the_to'),
      icon: 'wallet' as IconName,
    },
    {
      text: t('marketplace.common.inspect_your_approvals_by_usin'),
      icon: 'search' as IconName,
    },
    {
      text: t('marketplace.common.revoke_the_approvals_that_you_'),
      icon: 'return' as IconName,
    },
  ];
  return (
    <Flex flexDir="column" w="full" gap={{ base: 3, md: 6 }}>
      <Heading level="3">
        How to revoke your approvals
      </Heading>
      <Flex flexDir={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 6 }}>
        { STEPS.map((step, index) => (
          <Flex
            key={ index }
            flexDir={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'flex-start', md: 'center' }}
            p={ 6 }
            borderRadius="md"
            bgColor={{ _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' }}
            flex={ 1 }
            gap={ 6 }
          >
            <IconSvg name={ step.icon } boxSize={ 6 }/>
            <Text textStyle="sm">
              { step.text }
            </Text>
          </Flex>
        )) }
      </Flex>
    </Flex>
  );
}
