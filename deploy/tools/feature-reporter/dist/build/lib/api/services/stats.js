"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATS_API_RESOURCES = void 0;
exports.STATS_API_RESOURCES = {
    counters: {
        path: '/api/v1/counters',
    },
    lines: {
        path: '/api/v1/lines',
    },
    line: {
        path: '/api/v1/lines/:id',
        pathParams: ['id'],
    },
    pages_main: {
        path: '/api/v1/pages/main',
    },
    pages_transactions: {
        path: '/api/v1/pages/transactions',
    },
    pages_contracts: {
        path: '/api/v1/pages/contracts',
    },
};
/* eslint-enable @stylistic/indent */
