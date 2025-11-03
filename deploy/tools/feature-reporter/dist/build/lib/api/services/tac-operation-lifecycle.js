"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TAC_OPERATION_LIFECYCLE_API_RESOURCES = void 0;
exports.TAC_OPERATION_LIFECYCLE_API_RESOURCES = {
    operations: {
        path: '/api/v1/tac/operations',
        paginated: true,
        filterFields: ['q'],
    },
    operation: {
        path: '/api/v1/tac/operations/:id',
        pathParams: ['id'],
    },
    operation_by_tx_hash: {
        path: '/api/v1/tac/operations\\:byTx/:tx_hash',
        pathParams: ['tx_hash'],
    },
    stat_operations: {
        path: '/api/v1/stat/operations',
    },
};
/* eslint-enable @stylistic/indent */
