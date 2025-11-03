"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const title = 'XStar score';
const url = (0, utils_1.getEnvValue)('NEXT_PUBLIC_XSTAR_SCORE_URL');
const config = (() => {
    if (url) {
        return Object.freeze({
            title,
            url,
            isEnabled: true,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
