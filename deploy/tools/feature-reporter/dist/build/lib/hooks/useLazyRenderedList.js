"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLazyRenderedList;
const es_toolkit_1 = require("es-toolkit");
const react_1 = __importDefault(require("react"));
const react_intersection_observer_1 = require("react-intersection-observer");
const STEP = 10;
const MIN_ITEMS_NUM = 50;
function useLazyRenderedList(list, isEnabled, minItemsNum = MIN_ITEMS_NUM) {
    const [renderedItemsNum, setRenderedItemsNum] = react_1.default.useState(minItemsNum);
    const { ref, inView } = (0, react_intersection_observer_1.useInView)({
        rootMargin: '200px',
        triggerOnce: false,
        skip: !isEnabled || list.length <= minItemsNum,
    });
    react_1.default.useEffect(() => {
        if (inView) {
            setRenderedItemsNum((prev) => (0, es_toolkit_1.clamp)(prev + STEP, 0, list.length));
        }
    }, [inView, list.length]);
    return { cutRef: ref, renderedItemsNum };
}
