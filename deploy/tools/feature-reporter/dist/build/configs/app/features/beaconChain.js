"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const title = 'Beacon chain';
const config = (() => {
    if ((0, utils_1.getEnvValue)('NEXT_PUBLIC_HAS_BEACON_CHAIN') === 'true') {
        const validatorUrlTemplate = (0, utils_1.getEnvValue)('NEXT_PUBLIC_BEACON_CHAIN_VALIDATOR_URL_TEMPLATE');
        return Object.freeze({
            title,
            isEnabled: true,
            currency: {
                symbol: (0, utils_1.getEnvValue)('NEXT_PUBLIC_BEACON_CHAIN_CURRENCY_SYMBOL') ||
                    (0, utils_1.getEnvValue)('NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL') ||
                    '', // maybe we need some other default value here
            },
            validatorUrlTemplate,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
