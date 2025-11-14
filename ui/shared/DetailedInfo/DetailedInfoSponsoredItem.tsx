import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import * as cookies from 'lib/cookies';
import AdBanner from 'ui/shared/ad/AdBanner';

import * as DetailedInfo from './DetailedInfo';

const feature = config.features.adsBanner;

interface Props {
  isLoading?: boolean;
}

const DetailedInfoSponsoredItem = ({ isLoading }: Props) => {
  const { t } = useTranslation();
  const hasAdblockCookie = cookies.get(cookies.NAMES.ADBLOCK_DETECTED);

  if (!feature.isEnabled || hasAdblockCookie === 'true') {
    return null;
  }

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={t('shared.common.sponsored_banner_advertisement')}
        isLoading={ isLoading }
      >
        Sponsored
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue mt={{ base: 0, lg: 1 }}>
        <AdBanner isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(DetailedInfoSponsoredItem);
