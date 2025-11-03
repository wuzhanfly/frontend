"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appkit_adapter_wagmi_1 = require("@reown/appkit-adapter-wagmi");
const viem_1 = require("viem");
const wagmi_1 = require("wagmi");
const app_1 = __importDefault(require("configs/app"));
const essential_dapps_chains_1 = __importDefault(require("configs/essential-dapps-chains"));
const multichain_1 = __importDefault(require("configs/multichain"));
const chains_1 = require("lib/web3/chains");
const feature = app_1.default.features.blockchainInteraction;
const getChainTransportFromConfig = (config, readOnly) => {
    if (!config.chain.id) {
        return {};
    }
    return {
        [config.chain.id]: (0, viem_1.fallback)(config.chain.rpcUrls
            .concat(readOnly ? `${config.apis.general.endpoint}/api/eth-rpc` : '')
            .filter(Boolean)
            .map((url) => (0, viem_1.http)(url, { batch: { wait: 100, batchSize: 5 } }))),
    };
};
const reduceExternalChainsToTransportConfig = (readOnly) => {
    const multichain = (0, multichain_1.default)();
    const essentialDapps = (0, essential_dapps_chains_1.default)();
    const chains = [...(multichain?.chains ?? []), ...(essentialDapps?.chains ?? [])].filter(Boolean);
    if (!chains) {
        return {};
    }
    return chains
        .map(({ config }) => getChainTransportFromConfig(config, readOnly))
        .reduce((result, item) => {
        Object.entries(item).map(([id, transport]) => {
            result[id] = transport;
        });
        return result;
    }, {});
};
const wagmi = (() => {
    if (!feature.isEnabled) {
        const wagmiConfig = (0, wagmi_1.createConfig)({
            chains: chains_1.chains,
            transports: {
                ...getChainTransportFromConfig(app_1.default, true),
                ...(chains_1.parentChain ? { [chains_1.parentChain.id]: (0, viem_1.http)(chains_1.parentChain.rpcUrls.default.http[0]) } : {}),
                ...reduceExternalChainsToTransportConfig(true),
            },
            ssr: true,
            batch: { multicall: { wait: 100, batchSize: 5 } },
        });
        return { config: wagmiConfig, adapter: null };
    }
    const wagmiAdapter = new appkit_adapter_wagmi_1.WagmiAdapter({
        networks: chains_1.chains,
        multiInjectedProviderDiscovery: true,
        transports: {
            ...getChainTransportFromConfig(app_1.default, false),
            ...(chains_1.parentChain ? { [chains_1.parentChain.id]: (0, viem_1.http)() } : {}),
            ...reduceExternalChainsToTransportConfig(false),
        },
        projectId: feature.walletConnect.projectId,
        ssr: true,
        batch: { multicall: { wait: 100, batchSize: 5 } },
        syncConnectedChain: false,
    });
    return { config: wagmiAdapter.wagmiConfig, adapter: wagmiAdapter };
})();
exports.default = wagmi;
