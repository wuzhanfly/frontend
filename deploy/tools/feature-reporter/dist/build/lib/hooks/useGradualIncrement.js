"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGradualIncrement;
const react_1 = __importDefault(require("react"));
const DURATION = 300;
function useGradualIncrement(initialValue) {
    const [num, setNum] = react_1.default.useState(initialValue);
    const queue = react_1.default.useRef(0);
    const timeoutId = react_1.default.useRef(0);
    const delay = react_1.default.useRef(0);
    const incrementDelayed = react_1.default.useCallback(() => {
        if (queue.current === 0) {
            return;
        }
        queue.current--;
        setNum(prev => prev + 1);
        timeoutId.current = 0;
    }, []);
    const increment = react_1.default.useCallback((inc) => {
        if (inc < 1) {
            return;
        }
        queue.current += inc;
        if (!timeoutId.current) {
            timeoutId.current = window.setTimeout(incrementDelayed, 0);
        }
    }, [incrementDelayed]);
    react_1.default.useEffect(() => {
        if (queue.current > 0 && !timeoutId.current) {
            if (!delay.current) {
                delay.current = DURATION / queue.current;
            }
            else if (delay.current > DURATION / queue.current) {
                // in case if queue size is increased since last DOM update
                delay.current = DURATION / queue.current;
            }
            timeoutId.current = window.setTimeout(incrementDelayed, delay.current);
        }
    }, [incrementDelayed, num]);
    react_1.default.useEffect(() => {
        return () => {
            window.clearTimeout(timeoutId.current);
        };
    }, []);
    return [num, increment];
}
