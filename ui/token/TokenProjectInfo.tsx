import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TokenVerifiedInfo } from 'types/api/token';

import InfoButton from 'ui/shared/InfoButton';

import Content, { hasContent } from './TokenProjectInfo/Content';

interface Props {
  data: TokenVerifiedInfo;
}

const TokenProjectInfo = ({ data }: Props) => {
  const { t } = useTranslation();
  if (!hasContent(data, t)) {
    return null;
  }

  return (
    <InfoButton>
      <Content data={ data }/>
    </InfoButton>
  );
};

export default React.memo(TokenProjectInfo);
