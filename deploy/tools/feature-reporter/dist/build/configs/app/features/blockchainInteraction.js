"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chain_1 = __importDefault(require("../chain"));
const utils_1 = require("../utils");
const opSuperchain_1 = __importDefault(require("./opSuperchain"));
const walletConnectProjectId = (0, utils_1.getEnvValue)('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID');
const title = 'Blockchain interaction (writing to contract, etc.)';
const config = (() => {
    // all chain parameters are required for wagmi provider
    // @wagmi/chains/dist/index.d.ts
    const isSingleChain = Boolean(chain_1.default.id &&
        chain_1.default.name &&
        chain_1.default.currency.name &&
        chain_1.default.currency.symbol &&
        chain_1.default.currency.decimals &&
        chain_1.default.rpcUrls.length > 0);
    const isOpSuperchain = opSuperchain_1.default.isEnabled;
    if ((isSingleChain || isOpSuperchain) &&
        walletConnectProjectId) {
        return Object.freeze({
            title,
            isEnabled: true,
            walletConnect: {
                projectId: walletConnectProjectId,
            },
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
