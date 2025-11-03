"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_API_RESOURCES = void 0;
exports.ADMIN_API_RESOURCES = {
    public_tag_application: {
        path: '/api/v1/chains/:chainId/metadata-submissions/tag',
        pathParams: ['chainId'],
    },
    token_info_applications_config: {
        path: '/api/v1/chains/:chainId/token-info-submissions/selectors',
        pathParams: ['chainId'],
    },
    token_info_applications: {
        path: '/api/v1/chains/:chainId/token-info-submissions{/:id}',
        pathParams: ['chainId', 'id'],
    },
    marketplace_dapps: {
        path: '/api/v1/chains/:chainId/marketplace/dapps',
        pathParams: ['chainId'],
    },
    marketplace_dapp: {
        path: '/api/v1/chains/:chainId/marketplace/dapps/:dappId',
        pathParams: ['chainId', 'dappId'],
    },
    marketplace_rate_dapp: {
        path: '/api/v1/chains/:chainId/marketplace/dapps/:dappId/ratings',
        pathParams: ['chainId', 'dappId'],
    },
};
/* eslint-enable @stylistic/indent */
