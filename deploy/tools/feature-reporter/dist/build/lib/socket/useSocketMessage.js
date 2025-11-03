"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useSocketMessage;
const react_1 = require("react");
function useSocketMessage({ channel, event, handler }) {
    const handlerRef = (0, react_1.useRef)(handler);
    handlerRef.current = handler;
    (0, react_1.useEffect)(() => {
        if (channel === undefined || event === undefined) {
            return;
        }
        const ref = channel.on(event, (message) => {
            handlerRef.current?.(message);
        });
        return () => {
            channel.off(event, ref);
        };
    }, [channel, event]);
}
