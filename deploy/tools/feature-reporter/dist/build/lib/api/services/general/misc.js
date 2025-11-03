"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_API_MISC_RESOURCES = void 0;
exports.GENERAL_API_MISC_RESOURCES = {
    // WITHDRAWALS
    withdrawals: {
        path: '/api/v2/withdrawals',
        filterFields: [],
        paginated: true,
    },
    withdrawals_counters: {
        path: '/api/v2/withdrawals/counters',
    },
    // DEPOSITS
    deposits: {
        path: '/api/v2/beacon/deposits',
        filterFields: [],
        paginated: true,
    },
    deposits_counters: {
        path: '/api/v2/beacon/deposits/count',
    },
    // APP STATS
    stats: {
        path: '/api/v2/stats',
        headers: {
            'updated-gas-oracle': 'true',
        },
    },
    stats_charts_txs: {
        path: '/api/v2/stats/charts/transactions',
    },
    stats_charts_market: {
        path: '/api/v2/stats/charts/market',
    },
    stats_charts_secondary_coin_price: {
        path: '/api/v2/stats/charts/secondary-coin-market',
    },
    // HOMEPAGE
    homepage_blocks: {
        path: '/api/v2/main-page/blocks',
    },
    homepage_optimistic_deposits: {
        path: '/api/v2/main-page/optimism-deposits',
    },
    homepage_arbitrum_deposits: {
        path: '/api/v2/main-page/arbitrum/messages/to-rollup',
    },
    homepage_txs: {
        path: '/api/v2/main-page/transactions',
    },
    homepage_zkevm_l2_batches: {
        path: '/api/v2/main-page/zkevm/batches/confirmed',
    },
    homepage_arbitrum_l2_batches: {
        path: '/api/v2/main-page/arbitrum/batches/committed',
    },
    homepage_txs_watchlist: {
        path: '/api/v2/main-page/transactions/watchlist',
    },
    homepage_indexing_status: {
        path: '/api/v2/main-page/indexing-status',
    },
    homepage_zkevm_latest_batch: {
        path: '/api/v2/main-page/zkevm/batches/latest-number',
    },
    homepage_zksync_latest_batch: {
        path: '/api/v2/main-page/zksync/batches/latest-number',
    },
    homepage_arbitrum_latest_batch: {
        path: '/api/v2/main-page/arbitrum/batches/latest-number',
    },
    // SEARCH
    quick_search: {
        path: '/api/v2/search/quick',
        filterFields: ['q'],
    },
    search: {
        path: '/api/v2/search',
        filterFields: ['q'],
        paginated: true,
    },
    search_check_redirect: {
        path: '/api/v2/search/check-redirect',
    },
    // NOVES-FI
    noves_transaction: {
        path: '/api/v2/proxy/3rdparty/noves-fi/transactions/:hash',
        pathParams: ['hash'],
    },
    noves_address_history: {
        path: '/api/v2/proxy/3rdparty/noves-fi/addresses/:address/transactions',
        pathParams: ['address'],
        filterFields: [],
        paginated: true,
    },
    noves_describe_txs: {
        path: '/api/v2/proxy/3rdparty/noves-fi/transaction-descriptions',
    },
    // USER OPS
    user_ops: {
        path: '/api/v2/proxy/account-abstraction/operations',
        filterFields: ['transaction_hash', 'sender'],
        paginated: true,
    },
    user_op: {
        path: '/api/v2/proxy/account-abstraction/operations/:hash',
        pathParams: ['hash'],
    },
    user_ops_account: {
        path: '/api/v2/proxy/account-abstraction/accounts/:hash',
        pathParams: ['hash'],
    },
    user_op_interpretation: {
        path: '/api/v2/proxy/account-abstraction/operations/:hash/summary',
        pathParams: ['hash'],
    },
    // VALIDATORS
    validators_stability: {
        path: '/api/v2/validators/stability',
        filterFields: ['address_hash', 'state_filter'],
        paginated: true,
    },
    validators_stability_counters: {
        path: '/api/v2/validators/stability/counters',
    },
    validators_blackfort: {
        path: '/api/v2/validators/blackfort',
        filterFields: [],
        paginated: true,
    },
    validators_blackfort_counters: {
        path: '/api/v2/validators/blackfort/counters',
    },
    validators_zilliqa: {
        path: '/api/v2/validators/zilliqa',
        filterFields: [],
        paginated: true,
    },
    validator_zilliqa: {
        path: '/api/v2/validators/zilliqa/:bls_public_key',
        pathParams: ['bls_public_key'],
        filterFields: [],
    },
    // BLOBS
    blob: {
        path: '/api/v2/blobs/:hash',
        pathParams: ['hash'],
    },
    // EPOCHS
    epochs_celo: {
        path: '/api/v2/celo/epochs',
        filterFields: [],
        paginated: true,
    },
    epoch_celo: {
        path: '/api/v2/celo/epochs/:number',
        pathParams: ['number'],
    },
    epoch_celo_election_rewards: {
        path: '/api/v2/celo/epochs/:number/election-rewards/:reward_type',
        pathParams: ['number', 'reward_type'],
        filterFields: [],
        paginated: true,
    },
    // ADVANCED FILTER
    advanced_filter: {
        path: '/api/v2/advanced-filters',
        filterFields: [
            'transaction_types',
            'methods',
            'methods_names' /* frontend only */,
            'age_from',
            'age_to',
            'age' /* frontend only */,
            'from_address_hashes_to_include',
            'from_address_hashes_to_exclude',
            'to_address_hashes_to_include',
            'to_address_hashes_to_exclude',
            'address_relation',
            'amount_from',
            'amount_to',
            'token_contract_address_hashes_to_include',
            'token_contract_symbols_to_include' /* frontend only */,
            'token_contract_address_hashes_to_exclude',
            'token_contract_symbols_to_exclude' /* frontend only */,
            'block_number',
            'transaction_index',
            'internal_transaction_index',
            'token_transfer_index',
        ],
        paginated: true,
    },
    advanced_filter_methods: {
        path: '/api/v2/advanced-filters/methods',
        filterFields: ['q'],
    },
    advanced_filter_csv: {
        path: '/api/v2/advanced-filters/csv',
    },
    // CONFIGS
    config_backend_version: {
        path: '/api/v2/config/backend-version',
    },
    config_csv_export: {
        path: '/api/v2/config/csv-export',
    },
    config_celo: {
        path: '/api/v2/config/celo',
    },
    // OTHER
    api_v2_key: {
        path: '/api/v2/key',
    },
};
/* eslint-enable @stylistic/indent */
