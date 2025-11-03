"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function getApiUrl() {
    try {
        const envValue = (0, utils_1.getEnvValue)('NEXT_PUBLIC_SAFE_TX_SERVICE_URL');
        return new URL('/api/v1/safes', envValue).toString();
    }
    catch (error) {
        return;
    }
}
const title = 'Safe address tags';
const config = (() => {
    const apiUrl = getApiUrl();
    if (apiUrl) {
        return Object.freeze({
            title,
            isEnabled: true,
            apiUrl,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
