import { chakra } from '@chakra-ui/react';
import React from 'react';

import { IconButton } from 'toolkit/chakra/icon-button';
import { Link } from 'toolkit/chakra/link';
import { Tooltip } from 'toolkit/chakra/tooltip';
import { useTranslation } from 'react-i18next';

import IconSvg from '../IconSvg';

interface Props {
  className?: string;
  label?: string;
  href: string;
}

const LinkNewTab = ({ className, label, href }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip content={ label }>
      <IconButton
        asChild
        aria-label={ label ?? t('shared.common.open_link') }
        variant="icon_secondary"
        boxSize={ 5 }
        className={ className }
        borderRadius={ 0 }
      >
        <Link href={ href } external noIcon>
          <IconSvg name="open-link"/>
        </Link>
      </IconButton>
    </Tooltip>
  );
};

export default React.memo(chakra(LinkNewTab));
