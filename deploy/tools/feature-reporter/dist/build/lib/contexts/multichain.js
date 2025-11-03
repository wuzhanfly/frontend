"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultichainContext = void 0;
exports.MultichainProvider = MultichainProvider;
exports.useMultichainContext = useMultichainContext;
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const multichain_1 = __importDefault(require("configs/multichain"));
const getQueryParamString_1 = __importDefault(require("lib/router/getQueryParamString"));
exports.MultichainContext = react_1.default.createContext(null);
function MultichainProvider({ children, chainSlug: chainSlugProp, level: levelProp }) {
    const router = (0, router_1.useRouter)();
    const chainSlugQueryParam = router.pathname.includes('chain-slug') ? (0, getQueryParamString_1.default)(router.query['chain-slug']) : undefined;
    const [chainSlug, setChainSlug] = react_1.default.useState(chainSlugProp ?? chainSlugQueryParam);
    const [level, setLevel] = react_1.default.useState(levelProp);
    react_1.default.useEffect(() => {
        if (chainSlugProp) {
            setChainSlug(chainSlugProp);
        }
    }, [chainSlugProp]);
    react_1.default.useEffect(() => {
        setLevel(levelProp);
    }, [levelProp]);
    const chain = react_1.default.useMemo(() => {
        const config = (0, multichain_1.default)();
        if (!config) {
            return;
        }
        if (!chainSlug) {
            return;
        }
        return config.chains.find((chain) => chain.slug === chainSlug);
    }, [chainSlug]);
    const value = react_1.default.useMemo(() => {
        if (!chain) {
            return null;
        }
        return {
            chain,
            level,
        };
    }, [chain, level]);
    return (<exports.MultichainContext.Provider value={value}>
      {children}
    </exports.MultichainContext.Provider>);
}
function useMultichainContext(disabled = !multichain_1.default) {
    const context = react_1.default.useContext(exports.MultichainContext);
    if (context === undefined || disabled) {
        return null;
    }
    return context;
}
