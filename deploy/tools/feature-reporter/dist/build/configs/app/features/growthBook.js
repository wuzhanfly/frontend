"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const clientKey = (0, utils_1.getEnvValue)('NEXT_PUBLIC_GROWTH_BOOK_CLIENT_KEY');
const title = 'GrowthBook feature flagging and A/B testing';
const config = (() => {
    if (clientKey) {
        return Object.freeze({
            title,
            isEnabled: true,
            clientKey,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
