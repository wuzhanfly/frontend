import { Box, chakra } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import React from 'react';

import { route } from 'nextjs/routes';

import type { TMultichainContext } from 'lib/contexts/multichain';
import type { LinkProps } from 'toolkit/chakra/link';
import { Link } from 'toolkit/chakra/link';
import IconSvg from 'ui/shared/IconSvg';

interface Props extends LinkProps {
  query?: Record<string, string | Array<string> | undefined>;
  linkContext?: TMultichainContext | null;
  adaptive?: boolean;
}

const AdvancedFilterLink = React.forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { t } = useTranslation();
  const { query, linkContext, adaptive, ...rest } = props;
  
  return (
    <Link
      ref={ref}
      href={ route({ pathname: '/advanced-filter', query }, linkContext) }
      display="flex"
      alignItems="center"
      gap={ 1 }
      textStyle="sm"
      { ...rest }
    >
      <IconSvg name="advanced-filter" boxSize={ 5 }/>
      <chakra.span hideBelow={ adaptive ? 'lg' : undefined }>{t('common.common.advanced')}</chakra.span>
    </Link>
  );
});

export default React.memo(AdvancedFilterLink);
