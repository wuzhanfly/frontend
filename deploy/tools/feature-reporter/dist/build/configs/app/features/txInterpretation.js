"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const txInterpretation_1 = require("types/client/txInterpretation");
const utils_1 = require("../utils");
const title = 'Transaction interpretation';
const provider = (() => {
    const value = (0, utils_1.getEnvValue)('NEXT_PUBLIC_TRANSACTION_INTERPRETATION_PROVIDER');
    if (value && txInterpretation_1.PROVIDERS.includes(value)) {
        return value;
    }
    return 'none';
})();
const config = (() => {
    if (provider !== 'none') {
        return Object.freeze({
            title,
            provider,
            isEnabled: true,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
