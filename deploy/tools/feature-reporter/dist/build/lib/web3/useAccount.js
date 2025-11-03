"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wagmi_1 = require("wagmi");
const app_1 = __importDefault(require("configs/app"));
function useAccountFallback() {
    return {
        address: undefined,
        addresses: undefined,
        chain: undefined,
        chainId: undefined,
        connector: undefined,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        isReconnecting: false,
        status: 'disconnected',
    };
}
const hook = app_1.default.features.blockchainInteraction.isEnabled ? wagmi_1.useAccount : useAccountFallback;
exports.default = hook;
