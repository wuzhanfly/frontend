"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_API_ACCOUNT_RESOURCES = void 0;
exports.GENERAL_API_ACCOUNT_RESOURCES = {
    // ACCOUNT
    csrf: {
        path: '/api/account/v2/get_csrf',
    },
    user_info: {
        path: '/api/account/v2/user/info',
    },
    custom_abi: {
        path: '/api/account/v2/user/custom_abis{/:id}',
        pathParams: ['id'],
    },
    watchlist: {
        path: '/api/account/v2/user/watchlist{/:id}',
        pathParams: ['id'],
        filterFields: [],
        paginated: true,
    },
    private_tags_address: {
        path: '/api/account/v2/user/tags/address{/:id}',
        pathParams: ['id'],
        filterFields: [],
        paginated: true,
    },
    private_tags_tx: {
        path: '/api/account/v2/user/tags/transaction{/:id}',
        pathParams: ['id'],
        filterFields: [],
        paginated: true,
    },
    api_keys: {
        path: '/api/account/v2/user/api_keys{/:id}',
        pathParams: ['id'],
    },
    // AUTH
    auth_send_otp: {
        path: '/api/account/v2/send_otp',
    },
    auth_confirm_otp: {
        path: '/api/account/v2/confirm_otp',
    },
    auth_siwe_message: {
        path: '/api/account/v2/siwe_message',
    },
    auth_siwe_verify: {
        path: '/api/account/v2/authenticate_via_wallet',
    },
    auth_link_email: {
        path: '/api/account/v2/email/link',
    },
    auth_link_address: {
        path: '/api/account/v2/address/link',
    },
    auth_logout: {
        path: '/api/account/auth/logout',
    },
};
/* eslint-enable @stylistic/indent */
