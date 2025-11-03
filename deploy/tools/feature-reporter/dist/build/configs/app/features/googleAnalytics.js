"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const propertyId = (0, utils_1.getEnvValue)('NEXT_PUBLIC_GOOGLE_ANALYTICS_PROPERTY_ID');
const title = 'Google analytics';
const config = (() => {
    if (propertyId) {
        return Object.freeze({
            title,
            isEnabled: true,
            propertyId,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
