"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MULTICHAIN_API_RESOURCES = void 0;
exports.MULTICHAIN_API_RESOURCES = {
    interop_messages: {
        path: '/messages',
        filterFields: ['address'],
        paginated: true,
    },
    interop_messages_count: {
        path: '/messages/count',
        filterFields: ['address'],
    },
};
/* eslint-enable @stylistic/indent */
