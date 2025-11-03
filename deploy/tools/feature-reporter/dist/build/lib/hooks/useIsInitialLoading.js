"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useIsInitialLoading;
const react_1 = __importDefault(require("react"));
function useIsInitialLoading(isLoading) {
    const [isInitialLoading, setIsInitialLoading] = react_1.default.useState(Boolean(isLoading));
    react_1.default.useEffect(() => {
        if (!isLoading) {
            setIsInitialLoading(false);
        }
    }, [isLoading]);
    return isInitialLoading;
}
