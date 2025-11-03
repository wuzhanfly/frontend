"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adProviders_1 = require("types/client/adProviders");
const utils_1 = require("../utils");
const provider = (() => {
    const envValue = (0, utils_1.getEnvValue)('NEXT_PUBLIC_AD_BANNER_PROVIDER');
    return envValue && adProviders_1.SUPPORTED_AD_BANNER_PROVIDERS.includes(envValue) ? envValue : 'slise';
})();
const additionalProvider = (0, utils_1.getEnvValue)('NEXT_PUBLIC_AD_BANNER_ADDITIONAL_PROVIDER');
const isSpecifyEnabled = (0, utils_1.getEnvValue)('NEXT_PUBLIC_AD_BANNER_ENABLE_SPECIFY') === 'true';
const title = 'Banner ads';
const config = (() => {
    if (provider === 'adbutler') {
        const desktopConfig = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_AD_ADBUTLER_CONFIG_DESKTOP'));
        const mobileConfig = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_AD_ADBUTLER_CONFIG_MOBILE'));
        if (desktopConfig && mobileConfig) {
            return Object.freeze({
                title,
                isEnabled: true,
                provider,
                adButler: {
                    config: {
                        desktop: desktopConfig,
                        mobile: mobileConfig,
                    },
                },
                isSpecifyEnabled,
            });
        }
    }
    else if (provider !== 'none') {
        if (additionalProvider === 'adbutler') {
            const desktopConfig = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_AD_ADBUTLER_CONFIG_DESKTOP'));
            const mobileConfig = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_AD_ADBUTLER_CONFIG_MOBILE'));
            return Object.freeze({
                title,
                isEnabled: true,
                provider,
                additionalProvider,
                adButler: {
                    config: {
                        desktop: desktopConfig,
                        mobile: mobileConfig,
                    },
                },
                isSpecifyEnabled,
            });
        }
        return Object.freeze({
            title,
            isEnabled: true,
            provider,
            isSpecifyEnabled,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
