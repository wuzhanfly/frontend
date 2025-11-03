"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const isDisabled = (0, utils_1.getEnvValue)('NEXT_PUBLIC_ADVANCED_FILTER_ENABLED') === 'false';
const title = 'Advanced filter';
const config = (() => {
    if (!isDisabled) {
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
