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
exports.default = useAddChainClick;
const react_1 = __importDefault(require("react"));
const mixpanel = __importStar(require("lib/mixpanel/index"));
const toaster_1 = require("toolkit/chakra/toaster");
const useAddChain_1 = __importDefault(require("./useAddChain"));
const useProvider_1 = __importDefault(require("./useProvider"));
const useSwitchChain_1 = __importDefault(require("./useSwitchChain"));
function useAddChainClick() {
    const { provider, wallet } = (0, useProvider_1.default)();
    const addChain = (0, useAddChain_1.default)();
    const switchChain = (0, useSwitchChain_1.default)();
    return react_1.default.useCallback(async () => {
        if (!wallet || !provider) {
            return;
        }
        try {
            await addChain();
            await switchChain();
            toaster_1.toaster.success({
                title: 'Success',
                description: 'Successfully added network to your wallet',
            });
            mixpanel.logEvent(mixpanel.EventTypes.ADD_TO_WALLET, {
                Target: 'network',
                Wallet: wallet,
            });
        }
        catch (error) {
            toaster_1.toaster.error({
                title: 'Error',
                description: error?.message || 'Something went wrong',
            });
        }
    }, [addChain, provider, wallet, switchChain]);
}
