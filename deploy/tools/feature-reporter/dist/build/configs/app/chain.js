"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("toolkit/components/forms/validators/url");
const utils_1 = require("./utils");
const DEFAULT_CURRENCY_DECIMALS = 18;
const rollupType = (0, utils_1.getEnvValue)('NEXT_PUBLIC_ROLLUP_TYPE');
const verificationType = (() => {
    if (rollupType === 'arbitrum') {
        return 'posting';
    }
    if (rollupType === 'zkEvm') {
        return 'sequencing';
    }
    return (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_VERIFICATION_TYPE') || 'mining';
})();
const rpcUrls = (() => {
    const envValue = (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_RPC_URL');
    const isUrl = (0, url_1.urlValidator)(envValue);
    if (envValue && isUrl === true) {
        return [envValue];
    }
    const parsedValue = (0, utils_1.parseEnvJson)(envValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
})();
const chain = Object.freeze({
    id: (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_ID'),
    name: (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_NAME'),
    shortName: (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_SHORT_NAME'),
    currency: {
        name: (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_CURRENCY_NAME'),
        weiName: (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_CURRENCY_WEI_NAME'),
        symbol: (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL'),
        decimals: Number((0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_CURRENCY_DECIMALS')) || DEFAULT_CURRENCY_DECIMALS,
    },
    secondaryCoin: {
        symbol: (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_SECONDARY_COIN_SYMBOL'),
    },
    hasMultipleGasCurrencies: (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_MULTIPLE_GAS_CURRENCIES') === 'true',
    tokenStandard: (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_TOKEN_STANDARD_NAME') || 'ERC',
    rpcUrls,
    isTestnet: (0, utils_1.getEnvValue)('NEXT_PUBLIC_IS_TESTNET') === 'true',
    verificationType,
});
exports.default = chain;
