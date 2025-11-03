"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZETA_CHAIN_API_RESOURCES = void 0;
exports.ZETA_CHAIN_API_RESOURCES = {
    transactions: {
        path: '/api/v1/CctxInfo\\:list',
        filterFields: [
            'limit',
            'offset',
            'status_reduced',
            'start_timestamp',
            'end_timestamp',
            'sender_address',
            'receiver_address',
            'source_chain_id',
            'target_chain_id',
            'token_symbol',
            'coin_type',
            'hash',
            'age',
        ],
        paginated: true,
    },
    transaction: {
        path: '/api/v1/CctxInfo\\:get',
        filterFields: ['cctx_id'],
    },
    tokens: {
        path: '/api/v1/TokenInfo\\:list',
    },
};
/* eslint-enable @stylistic/indent */
