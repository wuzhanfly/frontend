"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClientRect = useClientRect;
const es_toolkit_1 = require("es-toolkit");
const react_1 = __importDefault(require("react"));
function useClientRect() {
    const [rect, setRect] = react_1.default.useState(null);
    const nodeRef = react_1.default.useRef(null);
    const ref = react_1.default.useCallback((node) => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
        if (nodeRef && 'current' in nodeRef) {
            nodeRef.current = node;
        }
    }, []);
    react_1.default.useEffect(() => {
        const content = window.document.querySelector('main');
        if (!content) {
            return;
        }
        const resizeHandler = (0, es_toolkit_1.debounce)(() => {
            setRect(nodeRef.current?.getBoundingClientRect() ?? null);
        }, 100);
        const resizeObserver = new ResizeObserver(resizeHandler);
        resizeObserver.observe(content);
        resizeObserver.observe(window.document.body);
        return function cleanup() {
            resizeObserver.unobserve(content);
            resizeObserver.unobserve(window.document.body);
        };
    }, []);
    return [rect, ref];
}
