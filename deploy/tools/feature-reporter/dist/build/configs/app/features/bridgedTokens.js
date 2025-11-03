"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const title = 'Bridged tokens';
const config = (() => {
    const chains = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_BRIDGED_TOKENS_CHAINS'));
    const bridges = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_BRIDGED_TOKENS_BRIDGES'));
    if (chains && chains.length > 0 && bridges && bridges.length > 0) {
        return Object.freeze({
            title,
            isEnabled: true,
            chains,
            bridges,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
