"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const title = 'Data availability';
const config = (() => {
    if ((0, utils_1.getEnvValue)('NEXT_PUBLIC_DATA_AVAILABILITY_ENABLED') === 'true') {
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
