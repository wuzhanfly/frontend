"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("types/client/validators");
const utils_1 = require("../utils");
const chainType = (() => {
    const envValue = (0, utils_1.getEnvValue)('NEXT_PUBLIC_VALIDATORS_CHAIN_TYPE');
    return envValue && validators_1.VALIDATORS_CHAIN_TYPE.includes(envValue) ? envValue : undefined;
})();
const title = 'Validators list';
const config = (() => {
    if (chainType) {
        return Object.freeze({
            title,
            isEnabled: true,
            chainType,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
