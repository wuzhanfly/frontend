"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const projectToken = (0, utils_1.getEnvValue)('NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN');
const configOverrides = (() => {
    const value = (0, utils_1.getEnvValue)('NEXT_PUBLIC_MIXPANEL_CONFIG_OVERRIDES');
    if (!value) {
        return;
    }
    return (0, utils_1.parseEnvJson)(value) || undefined;
})();
const title = 'Mixpanel analytics';
const config = (() => {
    if (projectToken) {
        return Object.freeze({
            title,
            isEnabled: true,
            projectToken,
            configOverrides,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
