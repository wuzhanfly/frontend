"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rollup_1 = require("types/client/rollup");
const url_1 = require("toolkit/utils/url");
const utils_1 = require("../utils");
const type = (() => {
    const envValue = (0, utils_1.getEnvValue)('NEXT_PUBLIC_ROLLUP_TYPE');
    return rollup_1.ROLLUP_TYPES.find((type) => type === envValue);
})();
const L2WithdrawalUrl = (0, utils_1.getEnvValue)('NEXT_PUBLIC_ROLLUP_L2_WITHDRAWAL_URL');
const parentChain = (() => {
    const envValue = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_ROLLUP_PARENT_CHAIN'));
    const baseUrl = (0, url_1.stripTrailingSlash)((0, utils_1.getEnvValue)('NEXT_PUBLIC_ROLLUP_L1_BASE_URL') || '');
    if (!baseUrl && !envValue?.baseUrl) {
        return;
    }
    return {
        ...envValue,
        baseUrl: baseUrl ?? envValue?.baseUrl,
    };
})();
const title = 'Rollup (L2) chain';
const config = (() => {
    if (type && parentChain) {
        return Object.freeze({
            title,
            isEnabled: true,
            type,
            stageIndex: (0, utils_1.getEnvValue)('NEXT_PUBLIC_ROLLUP_STAGE_INDEX'),
            L2WithdrawalUrl: type === 'optimistic' ? L2WithdrawalUrl : undefined,
            outputRootsEnabled: type === 'optimistic' && (0, utils_1.getEnvValue)('NEXT_PUBLIC_ROLLUP_OUTPUT_ROOTS_ENABLED') === 'true',
            interopEnabled: type === 'optimistic' && (0, utils_1.getEnvValue)('NEXT_PUBLIC_INTEROP_ENABLED') === 'true',
            homepage: {
                showLatestBlocks: (0, utils_1.getEnvValue)('NEXT_PUBLIC_ROLLUP_HOMEPAGE_SHOW_LATEST_BLOCKS') === 'true',
            },
            parentChain,
            DA: {
                celestia: {
                    namespace: type === 'arbitrum' ? (0, utils_1.getEnvValue)('NEXT_PUBLIC_ROLLUP_DA_CELESTIA_NAMESPACE') : undefined,
                    celeniumUrl: (0, utils_1.getEnvValue)('NEXT_PUBLIC_ROLLUP_DA_CELESTIA_CELENIUM_URL'),
                },
            },
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
