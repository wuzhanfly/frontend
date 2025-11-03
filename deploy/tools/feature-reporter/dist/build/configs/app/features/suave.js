"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const title = 'SUAVE chain';
const config = (() => {
    if ((0, utils_1.getEnvValue)('NEXT_PUBLIC_IS_SUAVE_CHAIN') === 'true') {
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
