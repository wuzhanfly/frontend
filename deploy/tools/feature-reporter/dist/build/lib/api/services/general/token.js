"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_API_TOKEN_RESOURCES = void 0;
exports.GENERAL_API_TOKEN_RESOURCES = {
    // TOKEN
    token: {
        path: '/api/v2/tokens/:hash',
        pathParams: ['hash'],
    },
    token_counters: {
        path: '/api/v2/tokens/:hash/counters',
        pathParams: ['hash'],
    },
    token_holders: {
        path: '/api/v2/tokens/:hash/holders',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    token_transfers: {
        path: '/api/v2/tokens/:hash/transfers',
        pathParams: ['hash'],
        filterFields: [],
        paginated: true,
    },
    token_inventory: {
        path: '/api/v2/tokens/:hash/instances',
        pathParams: ['hash'],
        filterFields: ['holder_address_hash'],
        paginated: true,
    },
    tokens: {
        path: '/api/v2/tokens',
        filterFields: ['q', 'type'],
        paginated: true,
    },
    tokens_bridged: {
        path: '/api/v2/tokens/bridged',
        filterFields: ['q', 'chain_ids'],
        paginated: true,
    },
    token_csv_export_holders: {
        path: '/api/v2/tokens/:hash/holders/csv',
        pathParams: ['hash'],
    },
    // TOKEN INSTANCE
    token_instance: {
        path: '/api/v2/tokens/:hash/instances/:id',
        pathParams: ['hash', 'id'],
    },
    token_instance_transfers_count: {
        path: '/api/v2/tokens/:hash/instances/:id/transfers-count',
        pathParams: ['hash', 'id'],
    },
    token_instance_transfers: {
        path: '/api/v2/tokens/:hash/instances/:id/transfers',
        pathParams: ['hash', 'id'],
        filterFields: [],
        paginated: true,
    },
    token_instance_holders: {
        path: '/api/v2/tokens/:hash/instances/:id/holders',
        pathParams: ['hash', 'id'],
        filterFields: [],
        paginated: true,
    },
    token_instance_refresh_metadata: {
        path: '/api/v2/tokens/:hash/instances/:id/refetch-metadata',
        pathParams: ['hash', 'id'],
        filterFields: [],
    },
    // TOKEN TRANSFERS
    token_transfers_all: {
        path: '/api/v2/token-transfers',
        filterFields: ['type'],
        paginated: true,
    },
};
/* eslint-enable @stylistic/indent */
