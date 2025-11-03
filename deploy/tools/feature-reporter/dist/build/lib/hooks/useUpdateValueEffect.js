"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// run effect only if value is updated since initial mount
const useUpdateValueEffect = (effect, value) => {
    const mountedRef = react_1.default.useRef(false);
    const valueRef = react_1.default.useRef(undefined);
    const isChangedRef = react_1.default.useRef(false);
    react_1.default.useEffect(() => {
        mountedRef.current = true;
        valueRef.current = value;
        return () => {
            mountedRef.current = false;
            valueRef.current = undefined;
            isChangedRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    react_1.default.useEffect(() => {
        if (mountedRef.current && (value !== valueRef.current || isChangedRef.current)) {
            isChangedRef.current = true;
            return effect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
};
exports.default = useUpdateValueEffect;
