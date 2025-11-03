"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useViewportSize = useViewportSize;
const es_toolkit_1 = require("es-toolkit");
const react_1 = require("react");
function useViewportSize(debounceTime = 100) {
    const [viewportSize, setViewportSize] = (0, react_1.useState)({ width: 0, height: 0 });
    (0, react_1.useEffect)(() => {
        setViewportSize({ width: window.innerWidth, height: window.innerHeight });
        const resizeHandler = (0, es_toolkit_1.debounce)(() => {
            setViewportSize({ width: window.innerWidth, height: window.innerHeight });
        }, debounceTime);
        const resizeObserver = new ResizeObserver(resizeHandler);
        resizeObserver.observe(document.body);
        return function cleanup() {
            resizeObserver.unobserve(document.body);
        };
    }, [debounceTime]);
    return viewportSize;
}
