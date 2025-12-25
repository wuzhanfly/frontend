import { Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TabItemRegular } from 'toolkit/components/AdaptiveTabs/types';

import config from 'configs/app';
import RoutedTabs from 'toolkit/components/RoutedTabs/RoutedTabs';
import EthRpcApi from 'ui/apiDocs/EthRpcApi';
import GraphQL from 'ui/apiDocs/GraphQL';
import RestApi from 'ui/apiDocs/RestApi';
import RpcApi from 'ui/apiDocs/RpcApi';
import PageTitle from 'ui/shared/Page/PageTitle';

const feature = config.features.apiDocs;

const ApiDocs = () => {
  const { t } = useTranslation();

  const tabs: Array<TabItemRegular> = [
    { id: 'rest_api', title: t('common.common.rest_api'), component: <RestApi/> },
    { id: 'eth_rpc_api', title: t('common.common.eth_rpc_api'), component: <EthRpcApi/> },
    { id: 'rpc_api', title: t('common.common.rpc_api_endpoints'), component: <RpcApi/> },
    { id: 'graphql_api', title: t('common.common.eth_rpc_api'), component: <GraphQL/> },
  ].filter(({ id }) => feature.isEnabled && feature.tabs.includes(id));

  return (
    <>
      <PageTitle
        title={ config.meta.seo.enhancedDataEnabled ?
          `${ config.chain.name } ${ t('common.common.api_documentation') }` : t('common.common.api_documentation') }
      />
      { tabs.length > 0 ? <RoutedTabs tabs={ tabs }/> : <Text>{ t('common.common.no_api_documentation_available') }</Text> }
    </>
  );
};

export default React.memo(ApiDocs);
