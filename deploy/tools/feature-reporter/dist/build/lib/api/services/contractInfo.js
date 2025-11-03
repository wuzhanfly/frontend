"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTRACT_INFO_API_RESOURCES = void 0;
exports.CONTRACT_INFO_API_RESOURCES = {
    address_verification: {
        path: '/api/v1/chains/:chainId/verified-addresses:type',
        pathParams: ['chainId', 'type'],
    },
    verified_addresses: {
        path: '/api/v1/chains/:chainId/verified-addresses',
        pathParams: ['chainId'],
    },
    token_verified_info: {
        path: '/api/v1/chains/:chainId/token-infos/:hash',
        pathParams: ['chainId', 'hash'],
    },
    pools: {
        path: '/api/v1/chains/:chainId/pools',
        pathParams: ['chainId'],
        filterFields: ['query'],
        paginated: true,
    },
    pool: {
        path: '/api/v1/chains/:chainId/pools/:hash',
        pathParams: ['chainId', 'hash'],
    },
};
/* eslint-enable @stylistic/indent */
