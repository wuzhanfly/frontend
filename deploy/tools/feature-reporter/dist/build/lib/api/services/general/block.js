"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_API_BLOCK_RESOURCES = void 0;
exports.GENERAL_API_BLOCK_RESOURCES = {
    blocks: {
        path: '/api/v2/blocks',
        filterFields: ['type'],
        paginated: true,
    },
    block: {
        path: '/api/v2/blocks/:height_or_hash',
        pathParams: ['height_or_hash'],
    },
    block_txs: {
        path: '/api/v2/blocks/:height_or_hash/transactions',
        pathParams: ['height_or_hash'],
        filterFields: ['type'],
        paginated: true,
    },
    block_internal_txs: {
        path: '/api/v2/blocks/:height_or_hash/internal-transactions',
        pathParams: ['height_or_hash'],
        paginated: true,
    },
    block_deposits: {
        path: '/api/v2/blocks/:height_or_hash/beacon/deposits',
        pathParams: ['height_or_hash'],
        filterFields: [],
        paginated: true,
    },
    block_withdrawals: {
        path: '/api/v2/blocks/:height_or_hash/withdrawals',
        pathParams: ['height_or_hash'],
        filterFields: [],
        paginated: true,
    },
};
/* eslint-enable @stylistic/indent */
