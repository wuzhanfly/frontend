"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useProvider;
const react_1 = __importDefault(require("react"));
const types_1 = require("configs/app/features/types");
const app_1 = __importDefault(require("configs/app"));
const multichain_1 = require("lib/contexts/multichain");
function useProvider() {
    const [provider, setProvider] = react_1.default.useState();
    const [wallet, setWallet] = react_1.default.useState();
    const multichainContext = (0, multichain_1.useMultichainContext)();
    const feature = (multichainContext?.chain.config ?? app_1.default).features.web3Wallet;
    const wallets = (0, types_1.getFeaturePayload)(feature)?.wallets;
    const initializeProvider = react_1.default.useMemo(() => async () => {
        if (!feature.isEnabled || !wallets) {
            return;
        }
        if (!('ethereum' in window && window.ethereum)) {
            if (wallets.includes('metamask') && window.navigator.userAgent.includes('Firefox')) {
                const { WindowPostMessageStream } = (await Promise.resolve().then(() => __importStar(require('@metamask/post-message-stream'))));
                const { initializeProvider } = (await Promise.resolve().then(() => __importStar(require('@metamask/providers'))));
                // workaround for MetaMask in Firefox
                // Firefox blocks MetaMask injection script because of our CSP for 'script-src'
                // so we have to inject it manually while the issue is not fixed
                // https://github.com/MetaMask/metamask-extension/issues/3133#issuecomment-1025641185
                const metamaskStream = new WindowPostMessageStream({
                    name: 'metamask-inpage',
                    target: 'metamask-contentscript',
                });
                // this will initialize the provider and set it as window.ethereum
                initializeProvider({
                    connectionStream: metamaskStream,
                    shouldShimWeb3: true,
                });
            }
            else {
                return;
            }
        }
        // have to check again in case provider was not set as window.ethereum in the previous step for MM in FF
        // and also it makes typescript happy
        if (!('ethereum' in window && window.ethereum)) {
            return;
        }
        // if user has multiple wallets installed, they all are injected in the window.ethereum.providers array
        // if user has only one wallet, the provider is injected in the window.ethereum directly
        const providers = Array.isArray(window.ethereum.providers) ? window.ethereum.providers : [window.ethereum];
        for (const wallet of wallets) {
            const provider = providers.find((provider) => {
                return (
                // some wallets (e.g TokenPocket, Liquality, etc) try to look like MetaMask but they are not (not even close)
                // so we have to check in addition the presence of the provider._events property
                // found this hack in wagmi repo
                // https://github.com/wagmi-dev/wagmi/blob/399b9eab8cfd698b49bfaa8456598dad9b597e0e/packages/connectors/src/types.ts#L65
                // for now it's the only way to distinguish them
                (wallet === 'metamask' && provider.isMetaMask && Boolean(provider._events)) ||
                    (wallet === 'coinbase' && provider.isCoinbaseWallet) ||
                    (wallet === 'token_pocket' && provider.isTokenPocket));
            });
            if (provider) {
                setProvider(provider);
                setWallet(wallet);
                break;
            }
        }
    }, [feature.isEnabled, wallets]);
    react_1.default.useEffect(() => {
        initializeProvider();
    }, [initializeProvider]);
    return { provider, wallet };
}
