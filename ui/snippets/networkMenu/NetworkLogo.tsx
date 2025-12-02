import { chakra } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { useColorModeValue } from 'toolkit/chakra/color-mode';
import { Image } from 'toolkit/chakra/image';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  isCollapsed?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  className?: string;
}

const LogoFallback = ({ isCollapsed, isSmall }: { isCollapsed?: boolean; isSmall?: boolean }) => {
  const { t } = useTranslation();
  const display = isSmall ? {
    base: 'none',
    lg: isCollapsed === false ? 'none' : 'block',
    xl: isCollapsed ? 'block' : 'none',
  } : {
    base: 'block',
    lg: isCollapsed === false ? 'block' : 'none',
    xl: isCollapsed ? 'none' : 'block',
  };

  return (
    <IconSvg
      name={ isSmall ? 'networks/icon-placeholder' : 'networks/logo-placeholder' }
      width={ isSmall ? '30px' : '120px' }
      height="100%"
      color={{ base: 'blue.600', _dark: 'white' }}
      display={ display }
      aria-label={ isSmall ? t('common.common.network_icon_placeholder') : t('common.common.network_logo_placeholder') }
    />
  );
};

const INVERT_FILTER = 'brightness(0) invert(1)';

const NetworkLogo = ({ isCollapsed, onClick, className }: Props) => {
  const { t } = useTranslation();

  const logoSrc = useColorModeValue(config.UI.navigation.logo.default, config.UI.navigation.logo.dark || config.UI.navigation.logo.default);
  const iconSrc = useColorModeValue(config.UI.navigation.icon.default, config.UI.navigation.icon.dark || config.UI.navigation.icon.default);

  return (
    <chakra.a
      className={ className }
      href={ route({ pathname: '/' }) }
      width={{ base: '120px', lg: isCollapsed === false ? '120px' : '30px', xl: isCollapsed ? '30px' : '120px' }}
      height={{ base: '24px', lg: isCollapsed === false ? '24px' : '30px', xl: isCollapsed ? '30px' : '24px' }}
      display="inline-flex"
      overflow="hidden"
      onClick={ onClick }
      flexShrink={ 0 }
      aria-label={ t('common.common.link_to_main_page') }
    >
      { /* big logo */ }
      <Image
        w="100%"
        h="100%"
        src={ logoSrc }
        alt={ t('common.common.chain_network_logo', { chainName: config.chain.name }) }
        fallback={ <LogoFallback isCollapsed={ isCollapsed }/> }
        display={{ base: 'block', lg: isCollapsed === false ? 'block' : 'none', xl: isCollapsed ? 'none' : 'block' }}
        filter={{ _dark: !config.UI.navigation.logo.dark ? INVERT_FILTER : undefined }}
        objectFit="contain"
        objectPosition="left"
      />
      { /* small logo */ }
      <Image
        w="100%"
        h="100%"
        src={ iconSrc }
        alt={ t('common.common.chain_network_icon', { chainName: config.chain.name }) }
        fallback={ <LogoFallback isCollapsed={ isCollapsed } isSmall/> }
        display={{ base: 'none', lg: isCollapsed === false ? 'none' : 'block', xl: isCollapsed ? 'block' : 'none' }}
        filter={{ _dark: !config.UI.navigation.icon.dark ? INVERT_FILTER : undefined }}
        objectFit="contain"
        objectPosition="left"
      />
    </chakra.a>
  );
};

export default React.memo(chakra(NetworkLogo));
