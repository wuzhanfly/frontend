import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TabItemRegular } from 'toolkit/components/AdaptiveTabs/types';

import RoutedTabs from 'toolkit/components/RoutedTabs/RoutedTabs';
import PrivateAddressTags from 'ui/privateTags/PrivateAddressTags';
import PrivateTransactionTags from 'ui/privateTags/PrivateTransactionTags';
import PageTitle from 'ui/shared/Page/PageTitle';
import useRedirectForInvalidAuthToken from 'ui/snippets/auth/useRedirectForInvalidAuthToken';

const PrivateTags = () => {
  const { t } = useTranslation();
  useRedirectForInvalidAuthToken();

  const TABS: Array<TabItemRegular> = [
    { id: 'address', title: t('validators.common.address'), component: <PrivateAddressTags/> },
    { id: 'tx', title: t('shared.common.transaction'), component: <PrivateTransactionTags/> },
  ];

  return (
    <>
      <PageTitle title={ t('common.common.private_tags') }/>
      <RoutedTabs tabs={ TABS }/>
    </>
  );
};

export default PrivateTags;
