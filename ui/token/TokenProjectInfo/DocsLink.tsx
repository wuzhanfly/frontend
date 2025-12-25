import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'toolkit/chakra/link';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  href: string;
}

const DocsLink = ({ href }: Props) => {
  const { t } = useTranslation();

  return (
    <Link
      href={ href }
      external
      noIcon
      display="inline-flex"
      alignItems="center"
      columnGap={ 1 }
    >
      <IconSvg name="docs" boxSize={ 6 } color="icon.primary"/>
      <span>{ t('common.common.documentation') }</span>
    </Link>
  );
};

export default DocsLink;
