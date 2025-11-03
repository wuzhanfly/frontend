"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallets_1 = require("types/client/wallets");
const utils_1 = require("../utils");
const wallets = (() => {
    const envValue = (0, utils_1.getEnvValue)('NEXT_PUBLIC_WEB3_WALLETS');
    if (envValue === 'none') {
        return;
    }
    const wallets = (0, utils_1.parseEnvJson)(envValue)?.filter((type) => wallets_1.SUPPORTED_WALLETS.includes(type));
    if (!wallets || wallets.length === 0) {
        return ['metamask'];
    }
    return wallets;
})();
const title = 'Web3 wallet integration (add token or network to the wallet)';
const config = (() => {
    if (wallets && wallets.length > 0) {
        return Object.freeze({
            title,
            isEnabled: true,
            wallets,
            addToken: {
                isDisabled: (0, utils_1.getEnvValue)('NEXT_PUBLIC_WEB3_DISABLE_ADD_TOKEN_TO_WALLET') === 'true',
            },
            addNetwork: {},
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
