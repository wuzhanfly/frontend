"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_API_TX_RESOURCES = void 0;
exports.GENERAL_API_TX_RESOURCES = {
    txs_stats: {
        path: '/api/v2/transactions/stats',
    },
    txs_validated: {
        path: '/api/v2/transactions',
        filterFields: ['filter', 'type', 'method'],
        paginated: true,
    },
    txs_pending: {
        path: '/api/v2/transactions',
        filterFields: ['filter', 'type', 'method'],
        paginated: true,
    },
    txs_with_blobs: {
        path: '/api/v2/transactions',
        filterFields: ['type'],
        paginated: true,
    },
    txs_watchlist: {
        path: '/api/v2/transactions/watchlist',
        filterFields: [],
        paginated: true,
    },
    txs_execution_node: {
        path: '/api/v2/transactions/execution-node/:hash',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    tx: {
        path: '/api/v2/transactions/:hash',
        pathParams: ['hash'],
    },
    tx_internal_txs: {
        path: '/api/v2/transactions/:hash/internal-transactions',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    tx_logs: {
        path: '/api/v2/transactions/:hash/logs',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    tx_token_transfers: {
        path: '/api/v2/transactions/:hash/token-transfers',
        pathParams: ['hash'],
        filterFields: ['type'],
        paginated: true,
    },
    tx_raw_trace: {
        path: '/api/v2/transactions/:hash/raw-trace',
        pathParams: ['hash'],
    },
    tx_state_changes: {
        path: '/api/v2/transactions/:hash/state-changes',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    tx_blobs: {
        path: '/api/v2/transactions/:hash/blobs',
        pathParams: ['hash'],
        paginated: true,
    },
    tx_interpretation: {
        path: '/api/v2/transactions/:hash/summary',
        pathParams: ['hash'],
    },
    tx_external_transactions: {
        path: '/api/v2/transactions/:hash/external-transactions',
        pathParams: ['hash'],
    },
    internal_txs: {
        path: '/api/v2/internal-transactions',
        paginated: true,
        filterFields: ['transaction_hash'],
    },
};
/* eslint-enable @stylistic/indent */
