"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressHighlightContext = void 0;
exports.AddressHighlightProvider = AddressHighlightProvider;
exports.useAddressHighlightContext = useAddressHighlightContext;
const react_1 = __importDefault(require("react"));
exports.AddressHighlightContext = react_1.default.createContext(null);
function AddressHighlightProvider({ children }) {
    const timeoutId = react_1.default.useRef(null);
    const hashRef = react_1.default.useRef(null);
    const onMouseEnter = react_1.default.useCallback((event) => {
        const hash = event.currentTarget.getAttribute('data-hash');
        if (hash) {
            hashRef.current = hash;
            timeoutId.current = window.setTimeout(() => {
                // for better performance we update DOM-nodes directly bypassing React reconciliation
                const nodes = window.document.querySelectorAll(`[data-hash="${hashRef.current}"]`);
                for (const node of nodes) {
                    node.classList.add('address-entity_highlighted');
                }
            }, 100);
        }
    }, []);
    const onMouseLeave = react_1.default.useCallback(() => {
        if (hashRef.current) {
            const nodes = window.document.querySelectorAll(`[data-hash="${hashRef.current}"]`);
            for (const node of nodes) {
                node.classList.remove('address-entity_highlighted');
            }
            hashRef.current = null;
        }
        typeof timeoutId.current === 'number' && window.clearTimeout(timeoutId.current);
    }, []);
    const value = react_1.default.useMemo(() => {
        return {
            onMouseEnter,
            onMouseLeave,
        };
    }, [onMouseEnter, onMouseLeave]);
    react_1.default.useEffect(() => {
        return () => {
            typeof timeoutId.current === 'number' && window.clearTimeout(timeoutId.current);
        };
    }, []);
    return (<exports.AddressHighlightContext.Provider value={value}>
      {children}
    </exports.AddressHighlightContext.Provider>);
}
function useAddressHighlightContext(disabled) {
    const context = react_1.default.useContext(exports.AddressHighlightContext);
    if (context === undefined || disabled) {
        return null;
    }
    return context;
}
