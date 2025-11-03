"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateEffect = void 0;
const react_1 = __importDefault(require("react"));
const useFirstMountState_1 = require("./useFirstMountState");
// React effect hook that ignores the first invocation (e.g. on mount). The signature is exactly the same as the useEffect hook.
const useUpdateEffect = (effect, deps) => {
    const isFirstMount = (0, useFirstMountState_1.useFirstMountState)();
    react_1.default.useEffect(() => {
        if (!isFirstMount) {
            return effect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};
exports.useUpdateEffect = useUpdateEffect;
