"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGroupItem = isGroupItem;
exports.isInternalItem = isInternalItem;
exports.default = useNavItems;
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const app_1 = __importDefault(require("configs/app"));
const htmlEntities_1 = require("toolkit/utils/htmlEntities");
function isGroupItem(item) {
    return 'subItems' in item;
}
function isInternalItem(item) {
    return 'nextRoute' in item;
}
function useNavItems() {
    const router = (0, router_1.useRouter)();
    const pathname = router.pathname;
    const query = router.query;
    const tab = query.tab;
    return react_1.default.useMemo(() => {
        let blockchainNavItems = [];
        const topAccounts = !app_1.default.UI.views.address.hiddenViews?.top_accounts ? {
            text: 'Top accounts',
            nextRoute: { pathname: '/accounts' },
            icon: 'top-accounts',
            isActive: pathname === '/accounts',
        } : null;
        const blocks = {
            text: 'Blocks',
            nextRoute: { pathname: '/blocks' },
            icon: 'block',
            isActive: pathname === '/blocks' || pathname === '/block/[height_or_hash]' || pathname === '/chain/[chain-slug]/block/[height_or_hash]',
        };
        const txs = {
            text: 'Transactions',
            nextRoute: { pathname: '/txs' },
            icon: 'transactions',
            isActive: 
            // sorry, but this is how it was designed
            (pathname === '/txs' && (!app_1.default.features.zetachain.isEnabled || !tab || !tab.includes('cctx'))) ||
                pathname === '/tx/[hash]' ||
                pathname === '/chain/[chain-slug]/tx/[hash]',
        };
        const cctxs = app_1.default.features.zetachain.isEnabled ? {
            text: 'Cross-chain transactions',
            nextRoute: { pathname: '/txs', query: { tab: 'cctx' } },
            icon: 'interop',
            isActive: pathname === '/cc/tx/[hash]' || (pathname === '/txs' && tab?.includes('cctx')),
        } : null;
        const operations = app_1.default.features.tac.isEnabled ? {
            text: 'Operations',
            nextRoute: { pathname: '/operations' },
            icon: 'operation',
            isActive: pathname === '/operations' || pathname === '/operation/[id]',
        } : null;
        const internalTxs = {
            text: 'Internal transactions',
            nextRoute: { pathname: '/internal-txs' },
            icon: 'internal_txns',
            isActive: pathname === '/internal-txs',
        };
        const userOps = app_1.default.features.userOps.isEnabled ? {
            text: 'User operations',
            nextRoute: { pathname: '/ops' },
            icon: 'user_op',
            isActive: pathname === '/ops' || pathname === '/op/[hash]' || pathname === '/chain/[chain-slug]/op/[hash]',
        } : null;
        const verifiedContracts = {
            text: 'Verified contracts',
            nextRoute: { pathname: '/verified-contracts' },
            icon: 'verified',
            isActive: pathname === '/verified-contracts',
        };
        const nameLookup = app_1.default.features.nameServices.isEnabled ? {
            text: 'Name services lookup',
            nextRoute: { pathname: '/name-services' },
            icon: 'name_services',
            isActive: pathname.startsWith('/name-services'),
        } : null;
        const validators = app_1.default.features.validators.isEnabled ? {
            text: 'Validators',
            nextRoute: { pathname: '/validators' },
            icon: 'validator',
            isActive: pathname === '/validators' || pathname === '/validators/[id]',
        } : null;
        const rollupDeposits = {
            text: `Deposits (L1${htmlEntities_1.rightLineArrow}L2)`,
            nextRoute: { pathname: '/deposits' },
            icon: 'arrows/south-east',
            isActive: pathname === '/deposits',
        };
        const rollupWithdrawals = {
            text: `Withdrawals (L2${htmlEntities_1.rightLineArrow}L1)`,
            nextRoute: { pathname: '/withdrawals' },
            icon: 'arrows/north-east',
            isActive: pathname === '/withdrawals',
        };
        const rollupTxnBatches = {
            text: 'Txn batches',
            nextRoute: { pathname: '/batches' },
            icon: 'txn_batches',
            isActive: pathname === '/batches',
        };
        const rollupOutputRoots = {
            text: 'Output roots',
            nextRoute: { pathname: '/output-roots' },
            icon: 'output_roots',
            isActive: pathname === '/output-roots',
        };
        const rollupDisputeGames = app_1.default.features.faultProofSystem.isEnabled ? {
            text: 'Dispute games',
            nextRoute: { pathname: '/dispute-games' },
            icon: 'games',
            isActive: pathname === '/dispute-games',
        } : null;
        const mudWorlds = app_1.default.features.mudFramework.isEnabled ? {
            text: 'MUD worlds',
            nextRoute: { pathname: '/mud-worlds' },
            icon: 'MUD_menu',
            isActive: pathname === '/mud-worlds',
        } : null;
        const epochs = app_1.default.features.celo.isEnabled ? {
            text: 'Epochs',
            nextRoute: { pathname: '/epochs' },
            icon: 'hourglass',
            isActive: pathname.startsWith('/epochs'),
        } : null;
        const rollupFeature = app_1.default.features.rollup;
        const rollupInteropMessages = rollupFeature.isEnabled && rollupFeature.interopEnabled ? {
            text: 'Interop messages',
            nextRoute: { pathname: '/interop-messages' },
            icon: 'interop',
            isActive: pathname === '/interop-messages',
        } : null;
        if (rollupFeature.isEnabled && (rollupFeature.type === 'optimistic' ||
            rollupFeature.type === 'arbitrum' ||
            rollupFeature.type === 'zkEvm' ||
            rollupFeature.type === 'scroll')) {
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
                    !app_1.default.features.celo.isEnabled ? rollupTxnBatches : undefined,
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
        }
        else if (rollupFeature.isEnabled && rollupFeature.type === 'shibarium') {
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
        }
        else if (rollupFeature.isEnabled && rollupFeature.type === 'zkSync') {
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
        }
        else {
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
                app_1.default.features.beaconChain.isEnabled && {
                    text: 'Deposits',
                    nextRoute: { pathname: '/deposits' },
                    icon: 'arrows/south-east',
                    isActive: pathname === '/deposits',
                },
                app_1.default.features.beaconChain.isEnabled && {
                    text: 'Withdrawals',
                    nextRoute: { pathname: '/withdrawals' },
                    icon: 'arrows/north-east',
                    isActive: pathname === '/withdrawals',
                },
            ].filter(Boolean);
        }
        const tokensNavItems = [
            {
                text: 'Tokens',
                nextRoute: { pathname: '/tokens' },
                icon: 'token',
                isActive: pathname === '/tokens' || pathname.startsWith('/token/'),
            },
            {
                text: 'Token transfers',
                nextRoute: { pathname: '/token-transfers' },
                icon: 'token-transfers',
                isActive: pathname === '/token-transfers',
            },
            app_1.default.features.pools.isEnabled && {
                text: 'DEX tracker',
                nextRoute: { pathname: '/pools' },
                icon: 'dex-tracker',
                isActive: pathname === '/pools' || pathname.startsWith('/pool/'),
            },
        ].filter(Boolean);
        const statsNavItem = (() => {
            const uptimeItem = {
                text: 'Uptime',
                nextRoute: { pathname: '/uptime' },
                icon: 'refresh_menu',
                isActive: pathname.startsWith('/uptime'),
            };
            if (app_1.default.features.stats.isEnabled && app_1.default.features.megaEth.isEnabled) {
                return {
                    text: 'Charts & stats',
                    icon: 'stats',
                    isActive: pathname.startsWith('/stats') || pathname.startsWith('/uptime'),
                    subItems: [
                        {
                            text: `${app_1.default.chain.name} stats`,
                            nextRoute: { pathname: '/stats' },
                            icon: 'graph',
                            isActive: pathname.startsWith('/stats/'),
                        },
                        uptimeItem,
                    ],
                };
            }
            if (!app_1.default.features.stats.isEnabled) {
                if (app_1.default.features.megaEth.isEnabled) {
                    return uptimeItem;
                }
                return null;
            }
            return {
                text: 'Charts & stats',
                nextRoute: { pathname: '/stats' },
                icon: 'stats',
                isActive: pathname.startsWith('/stats'),
            };
        })();
        const apiNavItem = app_1.default.features.apiDocs.isEnabled ? {
            text: 'API',
            nextRoute: { pathname: '/api-docs' },
            icon: 'restAPI',
            isActive: pathname.startsWith('/api-docs'),
        } : null;
        const otherNavItems = [
            app_1.default.features.opSuperchain.isEnabled ? {
                text: 'Verify contract',
                // TODO @tom2drum adjust URL to Vera
                url: 'https://vera.blockscout.com',
            } : {
                text: 'Verify contract',
                nextRoute: { pathname: '/contract-verification' },
                isActive: pathname.startsWith('/contract-verification'),
            },
            app_1.default.features.gasTracker.isEnabled && {
                text: 'Gas tracker',
                nextRoute: { pathname: '/gas-tracker' },
                isActive: pathname.startsWith('/gas-tracker'),
            },
            app_1.default.features.publicTagsSubmission.isEnabled && {
                text: 'Submit public tag',
                nextRoute: { pathname: '/public-tags/submit' },
                isActive: pathname.startsWith('/public-tags/submit'),
            },
            rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && {
                text: 'Txn withdrawals',
                nextRoute: { pathname: '/txn-withdrawals' },
                isActive: pathname.startsWith('/txn-withdrawals'),
            },
            ...app_1.default.UI.navigation.otherLinks,
        ].filter(Boolean);
        const mainNavItems = [
            {
                text: 'Blockchain',
                icon: 'globe-b',
                isActive: blockchainNavItems.flat().some(item => isInternalItem(item) && item.isActive),
                subItems: blockchainNavItems,
            },
            {
                text: 'Tokens',
                icon: 'token',
                isActive: tokensNavItems.flat().some(item => isInternalItem(item) && item.isActive),
                subItems: tokensNavItems,
            },
            app_1.default.features.marketplace.isEnabled ? {
                text: 'DApps',
                nextRoute: { pathname: '/apps' },
                icon: 'apps',
                isActive: pathname.startsWith('/app') || pathname.startsWith('/essential-dapps'),
            } : null,
            statsNavItem,
            apiNavItem,
            {
                text: 'Other',
                icon: 'gear',
                isActive: otherNavItems.flat().some(item => isInternalItem(item) && item.isActive),
                subItems: otherNavItems,
            },
        ].filter(Boolean);
        const accountNavItems = [
            {
                text: 'Watch list',
                nextRoute: { pathname: '/account/watchlist' },
                icon: 'watchlist',
                isActive: pathname === '/account/watchlist',
            },
            {
                text: 'Private tags',
                nextRoute: { pathname: '/account/tag-address' },
                icon: 'privattags',
                isActive: pathname === '/account/tag-address',
            },
            {
                text: 'API keys',
                nextRoute: { pathname: '/account/api-key' },
                icon: 'API',
                isActive: pathname === '/account/api-key',
            },
            {
                text: 'Custom ABI',
                nextRoute: { pathname: '/account/custom-abi' },
                icon: 'ABI',
                isActive: pathname === '/account/custom-abi',
            },
            app_1.default.features.addressVerification.isEnabled && {
                text: 'Verified addrs',
                nextRoute: { pathname: '/account/verified-addresses' },
                icon: 'verified',
                isActive: pathname === '/account/verified-addresses',
            },
        ].filter(Boolean);
        return { mainNavItems, accountNavItems };
    }, [pathname, tab]);
}
