"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_API_ADDRESS_RESOURCES = void 0;
exports.GENERAL_API_ADDRESS_RESOURCES = {
    // ADDRESSES
    addresses: {
        path: '/api/v2/addresses/',
        filterFields: [],
        paginated: true,
    },
    addresses_metadata_search: {
        path: '/api/v2/proxy/metadata/addresses',
        filterFields: ['slug', 'tag_type'],
        paginated: true,
    },
    // ADDRESS INFO
    address: {
        path: '/api/v2/addresses/:hash',
        pathParams: ['hash'],
    },
    address_counters: {
        path: '/api/v2/addresses/:hash/counters',
        pathParams: ['hash'],
    },
    address_tabs_counters: {
        path: '/api/v2/addresses/:hash/tabs-counters',
        pathParams: ['hash'],
    },
    address_txs: {
        path: '/api/v2/addresses/:hash/transactions',
        pathParams: ['hash'],
        filterFields: ['filter'],
        paginated: true,
    },
    address_internal_txs: {
        path: '/api/v2/addresses/:hash/internal-transactions',
        pathParams: ['hash'],
        filterFields: ['filter'],
        paginated: true,
    },
    address_token_transfers: {
        path: '/api/v2/addresses/:hash/token-transfers',
        pathParams: ['hash'],
        filterFields: ['filter', 'type', 'token'],
        paginated: true,
    },
    address_blocks_validated: {
        path: '/api/v2/addresses/:hash/blocks-validated',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    address_coin_balance: {
        path: '/api/v2/addresses/:hash/coin-balance-history',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    address_coin_balance_chart: {
        path: '/api/v2/addresses/:hash/coin-balance-history-by-day',
        pathParams: ['hash'],
        filterFields: [],
    },
    address_logs: {
        path: '/api/v2/addresses/:hash/logs',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    address_tokens: {
        path: '/api/v2/addresses/:hash/tokens',
        pathParams: ['hash'],
        filterFields: ['type'],
        paginated: true,
    },
    address_token_balances: {
        path: '/api/v2/addresses/:hash/token-balances',
        pathParams: ['hash'],
        filterFields: [],
    },
    address_nfts: {
        path: '/api/v2/addresses/:hash/nft',
        pathParams: ['hash'],
        filterFields: ['type'],
        paginated: true,
    },
    address_collections: {
        path: '/api/v2/addresses/:hash/nft/collections',
        pathParams: ['hash'],
        filterFields: ['type'],
        paginated: true,
    },
    address_deposits: {
        path: '/api/v2/addresses/:hash/beacon/deposits',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    address_withdrawals: {
        path: '/api/v2/addresses/:hash/withdrawals',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    address_epoch_rewards: {
        path: '/api/v2/addresses/:hash/celo/election-rewards',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    address_xstar_score: {
        path: '/api/v2/proxy/3rdparty/xname/addresses/:hash',
        pathParams: ['hash'],
    },
    address_3rd_party_info: {
        path: '/api/v2/proxy/3rdparty/:name',
        pathParams: ['name'],
        filterFields: ['address', 'chain_id'],
    },
    // CSV EXPORTS
    address_csv_export_txs: {
        path: '/api/v2/addresses/:hash/transactions/csv',
        pathParams: ['hash'],
    },
    address_csv_export_internal_txs: {
        path: '/api/v2/addresses/:hash/internal-transactions/csv',
        pathParams: ['hash'],
    },
    address_csv_export_token_transfers: {
        path: '/api/v2/addresses/:hash/token-transfers/csv',
        pathParams: ['hash'],
    },
    address_csv_export_logs: {
        path: '/api/v2/addresses/:hash/logs/csv',
        pathParams: ['hash'],
    },
    address_csv_export_celo_election_rewards: {
        path: '/api/v2/addresses/:hash/celo/election-rewards/csv',
        pathParams: ['hash'],
    },
};
/* eslint-enable @stylistic/indent */
