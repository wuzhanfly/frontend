"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsSticky = useIsSticky;
const es_toolkit_1 = require("es-toolkit");
const react_1 = __importDefault(require("react"));
function useIsSticky(ref, offset = 0, isEnabled = true) {
    const [isSticky, setIsSticky] = react_1.default.useState(false);
    const handleScroll = react_1.default.useCallback(() => {
        if (Number(ref.current?.getBoundingClientRect().y) < offset) {
            setIsSticky(true);
        }
        else {
            setIsSticky(false);
        }
    }, [ref, offset]);
    react_1.default.useEffect(() => {
        if (!isEnabled) {
            return;
        }
        const throttledHandleScroll = (0, es_toolkit_1.throttle)(handleScroll, 300);
        window.addEventListener('scroll', throttledHandleScroll);
        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
        };
        // replicate componentDidMount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnabled]);
    return isSticky;
}
