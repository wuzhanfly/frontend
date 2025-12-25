import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TabItemRegular } from 'toolkit/components/AdaptiveTabs/types';

import { MultichainProvider } from 'lib/contexts/multichain';
import useRoutedChainSelect from 'lib/multichain/useRoutedChainSelect';
import getQueryParamString from 'lib/router/getQueryParamString';
import RoutedTabs from 'toolkit/components/RoutedTabs/RoutedTabs';
import ChainSelect from 'ui/optimismSuperchain/components/ChainSelect';
import ComingSoon from 'ui/shared/ComingSoon';
import PageTitle from 'ui/shared/Page/PageTitle';

import OpSuperchainTxsLocal, { OP_SUPERCHAIN_TXS_LOCAL_TAB_IDS } from './OpSuperchainTxsLocal';

const TABS_RIGHT_SLOT_PROPS = {
  ml: { base: 'auto', lg: 6 },
};
const QUERY_PRESERVED_PARAMS = [ 'tab' ];

const OpSuperchainTxs = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const chainSelect = useRoutedChainSelect({ persistedParams: QUERY_PRESERVED_PARAMS });

  const tab = getQueryParamString(router.query.tab);
  const isLocalTxs = tab === 'txs_local' || OP_SUPERCHAIN_TXS_LOCAL_TAB_IDS.includes(tab) || !tab;

  const tabs: Array<TabItemRegular> = React.useMemo(() => {
    return [
      {
        id: 'txs_cross_chain',
        title: t('transactions.common.crosschain'),
        component: <ComingSoon/>,
      },
      {
        id: 'txs_local',
        title: t('common.common.local'),
        component: (
          <MultichainProvider chainId={ chainSelect.value?.[0] }>
            <OpSuperchainTxsLocal/>
          </MultichainProvider>
        ),
        subTabs: OP_SUPERCHAIN_TXS_LOCAL_TAB_IDS,
      },
    ];
  }, [ chainSelect.value, t ]);

  const rightSlot = isLocalTxs && (
    <ChainSelect
      value={ chainSelect.value }
      onValueChange={ chainSelect.onValueChange }
    />
  );

  return (
    <>
      <PageTitle
        withTextAd
        title={ t('transactions.common.transactions') }
      />
      <RoutedTabs
        tabs={ tabs }
        defaultTabId="txs_local"
        rightSlot={ rightSlot }
        rightSlotProps={ rightSlot ? TABS_RIGHT_SLOT_PROPS : undefined }
      />
    </>
  );
};

export default React.memo(OpSuperchainTxs);
