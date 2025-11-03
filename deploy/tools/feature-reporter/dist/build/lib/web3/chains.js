"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = exports.essentialDappsChains = exports.clusterChains = exports.parentChain = exports.currentChain = void 0;
const app_1 = __importDefault(require("configs/app"));
const essential_dapps_chains_1 = __importDefault(require("configs/essential-dapps-chains"));
const multichain_1 = __importDefault(require("configs/multichain"));
const getChainInfo = (config = app_1.default, contracts) => {
    return {
        id: Number(config.chain.id),
        name: config.chain.name ?? '',
        nativeCurrency: {
            decimals: config.chain.currency.decimals,
            name: config.chain.currency.name ?? '',
            symbol: config.chain.currency.symbol ?? '',
        },
        rpcUrls: {
            'default': {
                http: config.chain.rpcUrls,
            },
        },
        blockExplorers: {
            'default': {
                name: 'Blockscout',
                url: config.app.baseUrl,
            },
        },
        testnet: config.chain.isTestnet,
        contracts,
    };
};
exports.currentChain = !app_1.default.features.opSuperchain.isEnabled ? getChainInfo() : undefined;
exports.parentChain = (() => {
    const rollupFeature = app_1.default.features.rollup;
    const parentChain = rollupFeature.isEnabled && rollupFeature.parentChain;
    if (!parentChain) {
        return;
    }
    if (!parentChain.id || !parentChain.name || !parentChain.rpcUrls || !parentChain.baseUrl || !parentChain.currency) {
        return;
    }
    return {
        id: parentChain.id,
        name: parentChain.name,
        nativeCurrency: parentChain.currency,
        rpcUrls: {
            'default': {
                http: parentChain.rpcUrls,
            },
        },
        blockExplorers: {
            'default': {
                name: 'Blockscout',
                url: parentChain.baseUrl,
            },
        },
        testnet: parentChain.isTestnet,
    };
})();
exports.clusterChains = (() => {
    const config = (0, multichain_1.default)();
    if (!config) {
        return;
    }
    return config.chains.map(({ config, contracts }) => getChainInfo(config, contracts)).filter(Boolean);
})();
exports.essentialDappsChains = (() => {
    const config = (0, essential_dapps_chains_1.default)();
    if (!config) {
        return;
    }
    return config.chains.map(({ config, contracts }) => getChainInfo(config, contracts)).filter(Boolean);
})();
exports.chains = (() => {
    if (exports.essentialDappsChains) {
        const hasCurrentChain = exports.essentialDappsChains.some((chain) => chain.id === exports.currentChain?.id);
        const hasParentChain = exports.essentialDappsChains.some((chain) => chain.id === exports.parentChain?.id);
        return [
            ...exports.essentialDappsChains,
            hasCurrentChain ? undefined : exports.currentChain,
            hasParentChain ? undefined : exports.parentChain,
        ].filter(Boolean);
    }
    return [exports.currentChain, exports.parentChain, ...(exports.clusterChains ?? [])].filter(Boolean);
})();
