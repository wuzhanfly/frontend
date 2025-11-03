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
exports.default = useWeb3Wallet;
const react_1 = require("@reown/appkit/react");
const react_2 = __importDefault(require("react"));
const wagmi_1 = require("wagmi");
const mixpanel = __importStar(require("lib/mixpanel/index"));
const useAccount_1 = __importDefault(require("lib/web3/useAccount"));
function useWeb3Wallet({ source, onConnect }) {
    const { open: openModal } = (0, react_1.useAppKit)();
    const { open: isOpen } = (0, react_1.useAppKitState)();
    const { disconnect } = (0, wagmi_1.useDisconnect)();
    const [isOpening, setIsOpening] = react_2.default.useState(false);
    const [isClientLoaded, setIsClientLoaded] = react_2.default.useState(false);
    const isConnectionStarted = react_2.default.useRef(false);
    react_2.default.useEffect(() => {
        setIsClientLoaded(true);
    }, []);
    const handleConnect = react_2.default.useCallback(async () => {
        setIsOpening(true);
        await openModal();
        setIsOpening(false);
        mixpanel.logEvent(mixpanel.EventTypes.WALLET_CONNECT, { Source: source, Status: 'Started' });
        isConnectionStarted.current = true;
    }, [openModal, source]);
    const handleAccountConnected = react_2.default.useCallback(({ isReconnected }) => {
        if (!isReconnected && isConnectionStarted.current) {
            mixpanel.logEvent(mixpanel.EventTypes.WALLET_CONNECT, { Source: source, Status: 'Connected' });
            mixpanel.userProfile.setOnce({
                'With Connected Wallet': true,
            });
            onConnect?.();
        }
        isConnectionStarted.current = false;
    }, [source, onConnect]);
    const handleDisconnect = react_2.default.useCallback(() => {
        disconnect();
    }, [disconnect]);
    (0, wagmi_1.useAccountEffect)({ onConnect: handleAccountConnected });
    const account = (0, useAccount_1.default)();
    const address = account.address;
    const isConnected = isClientLoaded && !account.isDisconnected && account.address !== undefined;
    return react_2.default.useMemo(() => ({
        connect: handleConnect,
        disconnect: handleDisconnect,
        isOpen: isOpening || isOpen,
        isConnected,
        isReconnecting: account.isReconnecting,
        address,
        openModal,
    }), [handleConnect, handleDisconnect, isOpening, isOpen, isConnected, account.isReconnecting, address, openModal]);
}
