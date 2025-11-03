"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useSwitchChain;
const react_1 = __importDefault(require("react"));
const app_1 = __importDefault(require("configs/app"));
const multichain_1 = require("lib/contexts/multichain");
const useProvider_1 = __importDefault(require("./useProvider"));
const utils_1 = require("./utils");
function getParams(chainConfig) {
    if (!chainConfig.chain.id) {
        throw new Error('Missing required chain config');
    }
    return { chainId: (0, utils_1.getHexadecimalChainId)(Number(chainConfig.chain.id)) };
}
function useSwitchChain() {
    const { wallet, provider } = (0, useProvider_1.default)();
    const multichainContext = (0, multichain_1.useMultichainContext)();
    const chainConfig = multichainContext?.chain.config ?? app_1.default;
    return react_1.default.useCallback(() => {
        if (!wallet || !provider) {
            throw new Error('Wallet or provider not found');
        }
        return provider.request({
            method: 'wallet_switchEthereumChain',
            params: [getParams(chainConfig)],
        });
    }, [wallet, provider, chainConfig]);
}
