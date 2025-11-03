"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useSwitchOrAddChain;
const compat_1 = require("es-toolkit/compat");
const react_1 = __importDefault(require("react"));
const getErrorObj_1 = __importDefault(require("lib/errors/getErrorObj"));
const useAddChain_1 = __importDefault(require("./useAddChain"));
const useProvider_1 = __importDefault(require("./useProvider"));
const useSwitchChain_1 = __importDefault(require("./useSwitchChain"));
function useSwitchOrAddChain() {
    const { wallet, provider } = (0, useProvider_1.default)();
    const addChain = (0, useAddChain_1.default)();
    const switchChain = (0, useSwitchChain_1.default)();
    return react_1.default.useCallback(async () => {
        if (!wallet || !provider) {
            return;
        }
        try {
            return switchChain();
        }
        catch (error) {
            const errorObj = (0, getErrorObj_1.default)(error);
            const code = (0, compat_1.get)(errorObj, 'code');
            const originalErrorCode = (0, compat_1.get)(errorObj, 'data.originalError.code');
            // This error code indicates that the chain has not been added to Wallet.
            if (code === 4902 || originalErrorCode === 4902) {
                return addChain();
            }
            throw error;
        }
    }, [addChain, provider, wallet, switchChain]);
}
