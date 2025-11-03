"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useAdaptiveTabs;
const react_1 = __importDefault(require("react"));
function useAdaptiveTabs(tabs, disabled) {
    // to avoid flickering we set initial value to undefined
    // so there will be no displayed tabs initially
    const [tabsCut, setTabsCut] = react_1.default.useState(disabled ? tabs.length : undefined);
    const [tabsRefs, setTabsRefs] = react_1.default.useState([]);
    const listRef = react_1.default.useRef(null);
    const rightSlotRef = react_1.default.useRef(null);
    const leftSlotRef = react_1.default.useRef(null);
    const calculateCut = react_1.default.useCallback(() => {
        const listWidth = listRef.current?.getBoundingClientRect().width;
        const rightSlotWidth = rightSlotRef.current?.getBoundingClientRect().width || 0;
        const leftSlotWidth = leftSlotRef.current?.getBoundingClientRect().width || 0;
        const tabWidths = tabsRefs.map((tab) => tab.current?.getBoundingClientRect().width);
        const menuWidth = tabWidths[tabWidths.length - 1];
        if (!listWidth || !menuWidth) {
            return tabs.length;
        }
        const { visibleNum } = tabWidths.slice(0, -1).reduce((result, item, index, array) => {
            if (!item) {
                return result;
            }
            if (result.visibleNum < index) {
                // means that we haven't increased visibleNum on the previous iteration, so there is no space left
                // we skip now till the end of the loop
                return result;
            }
            if (index === array.length - 1) {
                // last element
                if (result.accWidth + item < listWidth - rightSlotWidth - leftSlotWidth) {
                    return { visibleNum: result.visibleNum + 1, accWidth: result.accWidth + item };
                }
            }
            else {
                if (result.accWidth + item + menuWidth < listWidth - rightSlotWidth - leftSlotWidth) {
                    return { visibleNum: result.visibleNum + 1, accWidth: result.accWidth + item };
                }
            }
            return result;
        }, { visibleNum: 0, accWidth: 0 });
        return visibleNum;
    }, [tabs.length, tabsRefs]);
    react_1.default.useEffect(() => {
        setTabsRefs(tabs.map((_, index) => tabsRefs[index] || react_1.default.createRef()));
        setTabsCut(disabled ? tabs.length : undefined);
        // update refs only when disabled prop changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled]);
    react_1.default.useEffect(() => {
        if (tabsRefs.length > 0 && !disabled) {
            setTabsCut(calculateCut());
        }
    }, [calculateCut, disabled, tabsRefs]);
    return react_1.default.useMemo(() => {
        return {
            tabsCut,
            tabsRefs,
            listRef,
            rightSlotRef,
            leftSlotRef,
        };
    }, [tabsCut, tabsRefs]);
}
