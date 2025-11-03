"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useAddChain;
const react_1 = __importDefault(require("react"));
const app_1 = __importDefault(require("configs/app"));
const multichain_1 = require("lib/contexts/multichain");
const consts_1 = require("toolkit/utils/consts");
const useRewardsActivity_1 = __importDefault(require("../hooks/useRewardsActivity"));
const useProvider_1 = __importDefault(require("./useProvider"));
const utils_1 = require("./utils");
function getParams(chainConfig) {
    if (!chainConfig.chain.id) {
        throw new Error('Missing required chain config');
    }
    return {
        chainId: (0, utils_1.getHexadecimalChainId)(Number(chainConfig.chain.id)),
        chainName: chainConfig.chain.name ?? '',
        nativeCurrency: {
            name: chainConfig.chain.currency.name ?? '',
            symbol: chainConfig.chain.currency.symbol ?? '',
            decimals: chainConfig.chain.currency.decimals ?? 18,
        },
        rpcUrls: chainConfig.chain.rpcUrls,
        blockExplorerUrls: [chainConfig.app.baseUrl],
    };
}
function useAddChain() {
    const { wallet, provider } = (0, useProvider_1.default)();
    const { trackUsage } = (0, useRewardsActivity_1.default)();
    const multichainContext = (0, multichain_1.useMultichainContext)();
    const chainConfig = multichainContext?.chain.config ?? app_1.default;
    return react_1.default.useCallback(async () => {
        if (!wallet || !provider) {
            throw new Error('Wallet or provider not found');
        }
        const start = Date.now();
        await provider.request({
            method: 'wallet_addEthereumChain',
            params: [getParams(chainConfig)],
        });
        // if network is already added, the promise resolves immediately
        if (Date.now() - start > consts_1.SECOND) {
            await trackUsage('add_network');
        }
    }, [wallet, provider, chainConfig, trackUsage]);
}
