"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const externalTransactionsConfig = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_TX_EXTERNAL_TRANSACTIONS_CONFIG'));
const title = 'External transactions';
const config = (() => {
    if (externalTransactionsConfig) {
        return Object.freeze({
            title,
            isEnabled: true,
            chainName: externalTransactionsConfig.chain_name,
            chainLogoUrl: externalTransactionsConfig.chain_logo_url,
            explorerUrlTemplate: externalTransactionsConfig.explorer_url_template,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
