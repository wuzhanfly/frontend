"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adProviders_1 = require("types/client/adProviders");
const utils_1 = require("../utils");
const provider = (() => {
    const envValue = (0, utils_1.getEnvValue)('NEXT_PUBLIC_AD_TEXT_PROVIDER');
    return envValue && adProviders_1.SUPPORTED_AD_TEXT_PROVIDERS.includes(envValue) ? envValue : 'coinzilla';
})();
const title = 'Text ads';
const config = (() => {
    if (provider !== 'none') {
        return Object.freeze({
            title,
            isEnabled: true,
            provider,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
