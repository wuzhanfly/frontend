"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const title = 'User operations';
const config = (() => {
    if ((0, utils_1.getEnvValue)('NEXT_PUBLIC_HAS_USER_OPS') === 'true') {
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
