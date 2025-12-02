import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { NavItemInternal, NavItem, NavGroupItem } from 'types/client/navigation';

import config from 'configs/app';
import { rightLineArrow } from 'toolkit/utils/htmlEntities';

const marketplaceFeature = config.features.marketplace;

interface ReturnType {
  mainNavItems: Array<NavItem | NavGroupItem>;
  accountNavItems: Array<NavItem>;
}

export function isGroupItem(item: NavItem | NavGroupItem): item is NavGroupItem {
  return 'subItems' in item;
}

export function isInternalItem(item: NavItem): item is NavItemInternal {
  return 'nextRoute' in item;
}

export default function useNavItems(): ReturnType {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = router.pathname;
  const query = router.query;
  const tab = query.tab;

  return React.useMemo(() => {
    let blockchainNavItems: Array<NavItem> | Array<Array<NavItem>> = [];

    const topAccounts: NavItem | null = !config.UI.views.address.hiddenViews?.top_accounts ? {
      text: t('common.common.top_accounts'),
      nextRoute: { pathname: '/accounts' as const },
      icon: 'top-accounts',
      isActive: pathname === '/accounts',
    } : null;
    const blocks: NavItem | null = {
      text: t('common.common.blocks'),
      nextRoute: { pathname: '/blocks' as const },
      icon: 'block',
      isActive: pathname === '/blocks' || pathname === '/block/[height_or_hash]' || pathname === '/chain/[chain_slug]/block/[height_or_hash]',
    };
    const txs: NavItem | null = {
      text: t('common.common.transactions'),
      nextRoute: { pathname: '/txs' as const },
      icon: 'transactions',
      isActive:
        // sorry, but this is how it was designed
        (pathname === '/txs' && (!config.features.zetachain.isEnabled || !tab || !tab.includes('cctx'))) ||
        pathname === '/tx/[hash]' ||
        pathname === '/chain/[chain_slug]/tx/[hash]',
    };
    const cctxs: NavItem | null = config.features.zetachain.isEnabled ? {
      text: t('common.common.cross_chain_transactions'),
      nextRoute: { pathname: '/txs' as const, query: { tab: 'cctx' } },
      icon: 'interop',
      isActive: pathname === '/cc/tx/[hash]' || (pathname === '/txs' && tab?.includes('cctx')),
    } : null;
    const operations: NavItem | null = config.features.tac.isEnabled ? {
      text: t('common.common.operations'),
      nextRoute: { pathname: '/operations' as const },
      icon: 'operation',
      isActive: pathname === '/operations' || pathname === '/operation/[id]',
    } : null;
    const internalTxs: NavItem | null = {
      text: t('common.common.internal_transactions'),
      nextRoute: { pathname: '/internal-txs' as const },
      icon: 'internal_txns',
      isActive: pathname === '/internal-txs',
    };
    const userOps: NavItem | null = config.features.userOps.isEnabled ? {
      text: t('common.common.user_operations'),
      nextRoute: { pathname: '/ops' as const },
      icon: 'user_op',
      isActive: pathname === '/ops' || pathname === '/op/[hash]' || pathname === '/chain/[chain_slug]/op/[hash]',
    } : null;

    const verifiedContracts: NavItem | null =
     {
       text: t('common.common.verified_contracts'),
       nextRoute: { pathname: '/verified-contracts' as const },
       icon: 'verified',
       isActive: pathname === '/verified-contracts',
     };
    const nameLookup = config.features.nameServices.isEnabled ? {
      text: t('common.common.name_services_lookup'),
      nextRoute: { pathname: '/name-services' as const },
      icon: 'name_services',
      isActive: pathname.startsWith('/name-services'),
    } : null;
    const validators = config.features.validators.isEnabled ? {
      text: t('common.common.validators'),
      nextRoute: { pathname: '/validators' as const },
      icon: 'validator',
      isActive: pathname === '/validators' || pathname === '/validators/[id]',
    } : null;
    const rollupDeposits = {
      text: `${ t('common.common.deposits') } (L1${ rightLineArrow }L2)`,
      nextRoute: { pathname: '/deposits' as const },
      icon: 'arrows/south-east',
      isActive: pathname === '/deposits',
    };
    const rollupWithdrawals = {
      text: `${ t('common.common.withdrawals') } (L2${ rightLineArrow }L1)`,
      nextRoute: { pathname: '/withdrawals' as const },
      icon: 'arrows/north-east',
      isActive: pathname === '/withdrawals',
    };
    const rollupTxnBatches = {
      text: t('common.common.txn_batches'),
      nextRoute: { pathname: '/batches' as const },
      icon: 'txn_batches',
      isActive: pathname === '/batches',
    };
    const rollupOutputRoots = {
      text: t('common.common.output_roots'),
      nextRoute: { pathname: '/output-roots' as const },
      icon: 'output_roots',
      isActive: pathname === '/output-roots',
    };
    const rollupDisputeGames = config.features.faultProofSystem.isEnabled ? {
      text: t('common.common.dispute_games'),
      nextRoute: { pathname: '/dispute-games' as const },
      icon: 'games',
      isActive: pathname === '/dispute-games',
    } : null;
    const mudWorlds = config.features.mudFramework.isEnabled ? {
      text: t('common.common.mud_worlds'),
      nextRoute: { pathname: '/mud-worlds' as const },
      icon: 'MUD_menu',
      isActive: pathname === '/mud-worlds',
    } : null;
    const epochs = config.features.celo.isEnabled ? {
      text: t('common.common.epochs'),
      nextRoute: { pathname: '/epochs' as const },
      icon: 'hourglass',
      isActive: pathname.startsWith('/epochs'),
    } : null;

    const rollupFeature = config.features.rollup;

    const rollupInteropMessages = rollupFeature.isEnabled && rollupFeature.interopEnabled ? {
      text: t('common.common.interop_messages'),
      nextRoute: { pathname: '/interop-messages' as const },
      icon: 'interop',
      isActive: pathname === '/interop-messages',
    } : null;

    if (rollupFeature.isEnabled && (
      rollupFeature.type === 'optimistic' ||
      rollupFeature.type === 'arbitrum' ||
      rollupFeature.type === 'zkEvm' ||
      rollupFeature.type === 'scroll'
    )) {
      blockchainNavItems = [
        [
          txs,
          internalTxs,
          rollupDeposits,
          rollupWithdrawals,
          rollupInteropMessages,
        ].filter(Boolean),
        [
          blocks,
          epochs,
          // currently, transaction batches are not implemented for Celo
          !config.features.celo.isEnabled ? rollupTxnBatches : undefined,
          rollupDisputeGames,
          rollupFeature.outputRootsEnabled ? rollupOutputRoots : undefined,
        ].filter(Boolean),
        [
          userOps,
          topAccounts,
          mudWorlds,
          validators,
          verifiedContracts,
          nameLookup,
        ].filter(Boolean),
      ];
    } else if (rollupFeature.isEnabled && rollupFeature.type === 'shibarium') {
      blockchainNavItems = [
        [
          txs,
          internalTxs,
          rollupDeposits,
          rollupWithdrawals,
        ],
        [
          blocks,
          userOps,
          topAccounts,
          verifiedContracts,
          nameLookup,
        ].filter(Boolean),
      ];
    } else if (rollupFeature.isEnabled && rollupFeature.type === 'zkSync') {
      blockchainNavItems = [
        [
          txs,
          internalTxs,
          userOps,
          blocks,
          rollupTxnBatches,
        ].filter(Boolean),
        [
          topAccounts,
          validators,
          verifiedContracts,
          nameLookup,
        ].filter(Boolean),
      ];
    } else {
      blockchainNavItems = [
        txs,
        operations,
        internalTxs,
        cctxs,
        userOps,
        blocks,
        epochs,
        topAccounts,
        validators,
        verifiedContracts,
        nameLookup,
        config.features.beaconChain.isEnabled && {
          text: t('common.common.deposits'),
          nextRoute: { pathname: '/deposits' as const },
          icon: 'arrows/south-east',
          isActive: pathname === '/deposits',
        },
        config.features.beaconChain.isEnabled && {
          text: t('common.common.withdrawals'),
          nextRoute: { pathname: '/withdrawals' as const },
          icon: 'arrows/north-east',
          isActive: pathname === '/withdrawals',
        },
      ].filter(Boolean);
    }

    const tokensNavItems = [
      {
        text: t('common.common.tokens'),
        nextRoute: { pathname: '/tokens' as const },
        icon: 'token',
        isActive: pathname === '/tokens' || pathname.startsWith('/token/'),
      },
      {
        text: t('common.common.token_transfers'),
        nextRoute: { pathname: '/token-transfers' as const },
        icon: 'token-transfers',
        isActive: pathname === '/token-transfers',
      },
      config.features.pools.isEnabled && {
        text: t('common.common.dex_tracker'),
        nextRoute: { pathname: '/pools' as const },
        icon: 'dex-tracker',
        isActive: pathname === '/pools' || pathname.startsWith('/pool/'),
      },
    ].filter(Boolean);

    const statsNavItem = (() => {
      const uptimeItem = {
        text: t('common.common.uptime'),
        nextRoute: { pathname: '/uptime' as const },
        icon: 'refresh_menu',
        isActive: pathname.startsWith('/uptime'),
      };

      if (config.features.stats.isEnabled && config.features.megaEth.isEnabled) {
        return {
          text: t('common.common.charts_and_stats'),
          icon: 'stats',
          isActive: pathname.startsWith('/stats') || pathname.startsWith('/uptime'),
          subItems: [
            {
              text: `${ t('common.common.chain_stats', { chainName: config.chain.name }) }`,
              nextRoute: { pathname: '/stats' as const },
              icon: 'graph',
              isActive: pathname.startsWith('/stats/'),
            },
            uptimeItem,
          ],
        };
      }

      if (!config.features.stats.isEnabled) {
        if (config.features.megaEth.isEnabled) {
          return uptimeItem;
        }
        return null;
      }

      return {
        text: t('common.common.charts_and_stats'),
        nextRoute: { pathname: '/stats' as const },
        icon: 'stats',
        isActive: pathname.startsWith('/stats'),
      };
    })();

    const apiNavItem: NavItem | null = config.features.apiDocs.isEnabled ? {
      text: t('common.common.api'),
      nextRoute: { pathname: '/api-docs' as const },
      icon: 'restAPI',
      isActive: pathname.startsWith('/api-docs'),
    } : null;

    const otherNavItems: Array<NavItem> | Array<Array<NavItem>> = [
      config.features.opSuperchain.isEnabled ? {
        text: t('common.common.verify_contract'),
        url: 'https://vera.blockscout.com',
      } : {
        text: t('common.common.verify_contract'),
        nextRoute: { pathname: '/contract-verification' as const },
        isActive: pathname.startsWith('/contract-verification'),
      },
      config.features.gasTracker.isEnabled && {
        text: t('common.common.gas_tracker'),
        nextRoute: { pathname: '/gas-tracker' as const },
        isActive: pathname.startsWith('/gas-tracker'),
      },
      config.features.publicTagsSubmission.isEnabled && {
        text: t('common.common.submit_public_tag'),
        nextRoute: { pathname: '/public-tags/submit' as const },
        isActive: pathname.startsWith('/public-tags/submit'),
      },
      rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && {
        text: t('common.common.txn_withdrawals'),
        nextRoute: { pathname: '/txn-withdrawals' as const },
        isActive: pathname.startsWith('/txn-withdrawals'),
      },
      ...config.UI.navigation.otherLinks,
    ].filter(Boolean);

    const mainNavItems: ReturnType['mainNavItems'] = [
      {
        text: t('common.common.blockchain'),
        icon: 'globe-b',
        isActive: blockchainNavItems.flat().some(item => isInternalItem(item) && item.isActive),
        subItems: blockchainNavItems,
      },
      {
        text: t('common.common.tokens'),
        icon: 'token',
        isActive: tokensNavItems.flat().some(item => isInternalItem(item) && item.isActive),
        subItems: tokensNavItems,
      },
      marketplaceFeature.isEnabled ? {
        text: marketplaceFeature.titles.menu_item,
        nextRoute: { pathname: '/apps' as const },
        icon: 'apps',
        isActive: pathname.startsWith('/app') || pathname.startsWith('/essential-dapps'),
      } : null,
      statsNavItem,
      apiNavItem,
      {
        text: t('common.common.other'),
        icon: 'gear',
        isActive: otherNavItems.flat().some(item => isInternalItem(item) && item.isActive),
        subItems: otherNavItems,
      },
    ].filter(Boolean);

    const accountNavItems: ReturnType['accountNavItems'] = [
      {
        text: t('common.common.watch_list'),
        nextRoute: { pathname: '/account/watchlist' as const },
        icon: 'watchlist',
        isActive: pathname === '/account/watchlist',
      },
      {
        text: t('common.common.private_tags'),
        nextRoute: { pathname: '/account/tag-address' as const },
        icon: 'privattags',
        isActive: pathname === '/account/tag-address',
      },
      {
        text: t('common.common.api_keys'),
        nextRoute: { pathname: '/account/api-key' as const },
        icon: 'API',
        isActive: pathname === '/account/api-key',
      },
      {
        text: t('common.common.custom_abi'),
        nextRoute: { pathname: '/account/custom-abi' as const },
        icon: 'ABI',
        isActive: pathname === '/account/custom-abi',
      },
      config.features.addressVerification.isEnabled && {
        text: t('common.common.verified_addrs'),
        nextRoute: { pathname: '/account/verified-addresses' as const },
        icon: 'verified',
        isActive: pathname === '/account/verified-addresses',
      },
    ].filter(Boolean);

    return { mainNavItems, accountNavItems };
  }, [ pathname, tab, t ]);
}
