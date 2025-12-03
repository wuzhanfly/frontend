import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import { SocketProvider } from 'lib/socket/context';
import { Heading } from 'toolkit/chakra/heading';
import AdaptiveTabs from 'toolkit/components/AdaptiveTabs/AdaptiveTabs';
import LatestOptimisticDeposits from 'ui/home/latestDeposits/LatestOptimisticDeposits';
import LatestTxs from 'ui/home/LatestTxs';
import LatestWatchlistTxs from 'ui/home/LatestWatchlistTxs';
import LatestZetaChainCCTXs from 'ui/home/latestZetaChainCCTX/LatestZetaChainCCTXs';
import useAuth from 'ui/snippets/auth/useIsAuth';

import LatestArbitrumDeposits from './latestDeposits/LatestArbitrumDeposits';

const rollupFeature = config.features.rollup;
const zetachainFeature = config.features.zetachain;

const Transactions = () => {
  const { t } = useTranslation();
  const isAuth = useAuth();
  if ((rollupFeature.isEnabled && (rollupFeature.type === 'optimistic' || rollupFeature.type === 'arbitrum')) || isAuth || zetachainFeature.isEnabled) {
    const tabs = [
      zetachainFeature.isEnabled && {
        id: 'cctx',
        title: t('transactions.common.crosschain'),
        component: (
          <SocketProvider url={ config.apis.zetachain?.socketEndpoint } name="zetachain">
            <LatestZetaChainCCTXs/>
          </SocketProvider>
        ),
      },
      { id: 'txn', title: zetachainFeature.isEnabled ? 'ZetaChain EVM' : t('transactions.common.latest_txn'), component: <LatestTxs/> },
      rollupFeature.isEnabled && rollupFeature.type === 'optimistic' &&
        { id: 'deposits', title: t('transactions.common.deposits_l1_to_l2_txn'), component: <LatestOptimisticDeposits/> },
      rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' &&
        { id: 'deposits', title: t('transactions.common.deposits_l1_to_l2_txn'), component: <LatestArbitrumDeposits/> },
      isAuth && { id: 'watchlist', title: t('transactions.common.watch_list'), component: <LatestWatchlistTxs/> },
    ].filter(Boolean);
    return (
      <>
        <Heading level="3" mb={ 3 }>{ t('home.common.transactions') }</Heading>
        <AdaptiveTabs tabs={ tabs } unmountOnExit={ false } listProps={{ mb: 3 }}/>
      </>
    );
  }

  return (
    <>
      <Heading level="3" mb={ 3 }>{ t('home.common.latest_transactions') }</Heading>
      <LatestTxs/>
    </>
  );
};

export default Transactions;
