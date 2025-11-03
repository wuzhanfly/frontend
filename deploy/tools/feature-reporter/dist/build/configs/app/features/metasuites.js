"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const title = 'MetaSuites extension';
const config = (() => {
    if ((0, utils_1.getEnvValue)('NEXT_PUBLIC_METASUITES_ENABLED') === 'true') {
        return Object.freeze({
            title,
            isEnabled: true,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
