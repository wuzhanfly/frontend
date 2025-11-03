"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REWARDS_API_RESOURCES = void 0;
exports.REWARDS_API_RESOURCES = {
    config: {
        path: '/api/v1/config',
    },
    check_ref_code: {
        path: '/api/v1/auth/code/:code',
        pathParams: ['code'],
    },
    nonce: {
        path: '/api/v1/auth/nonce',
    },
    check_user: {
        path: '/api/v1/auth/user/:address',
        pathParams: ['address'],
    },
    login: {
        path: '/api/v1/auth/login',
    },
    logout: {
        path: '/api/v1/auth/logout',
    },
    user_balances: {
        path: '/api/v1/user/balances',
    },
    user_daily_check: {
        path: '/api/v1/user/daily/check',
    },
    user_daily_claim: {
        path: '/api/v1/user/daily/claim',
    },
    user_referrals: {
        path: '/api/v1/user/referrals',
    },
    user_badges: {
        path: '/api/v1/user/badges',
    },
    user_check_activity_pass: {
        path: '/api/v1/activity/check-pass',
        filterFields: ['address'],
    },
    user_activity: {
        path: '/api/v1/user/activity/rewards',
    },
    user_activity_track_tx: {
        path: '/api/v1/user/activity/track/transaction',
    },
    user_activity_track_tx_confirm: {
        path: '/api/v1/activity/track/transaction/confirm',
    },
    user_activity_track_contract: {
        path: '/api/v1/user/activity/track/contract',
    },
    user_activity_track_contract_confirm: {
        path: '/api/v1/activity/track/contract/confirm',
    },
    user_activity_track_usage: {
        path: '/api/v1/user/activity/track/usage',
    },
    instances: {
        path: '/api/v1/instances',
    },
};
/* eslint-enable @stylistic/indent */
