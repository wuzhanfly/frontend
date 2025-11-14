import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TabItemRegular } from 'toolkit/components/AdaptiveTabs/types';

import config from 'configs/app';
import RoutedTabs from 'toolkit/components/RoutedTabs/RoutedTabs';
import Clusters from 'ui/nameServices/directories/Clusters';
import NameDomains from 'ui/nameServices/domains/NameDomains';
import PageTitle from 'ui/shared/Page/PageTitle';

const feature = config.features.nameServices;

const NameServices = () => {
  const { t } = useTranslation();
  const tabs: Array<TabItemRegular> = [
    feature.isEnabled && feature.ens.isEnabled && { id: 'domains', title: t('common.common.domains'), component: <NameDomains/> },
    feature.isEnabled && feature.clusters.isEnabled && { id: 'directories', title: t('common.common.directories'), component: <Clusters/> },
  ].filter(Boolean);

  return (
    <>
      <PageTitle
        title={ config.meta.seo.enhancedDataEnabled ? `${ config.chain.name } name services` : t('common.common.name_services_lookup') }
        withTextAd
      />
      <RoutedTabs tabs={ tabs }/>
    </>
  );
};

export default NameServices;
