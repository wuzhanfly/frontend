"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const es_toolkit_1 = require("es-toolkit");
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const AdaptiveTabs_1 = __importDefault(require("../AdaptiveTabs/AdaptiveTabs"));
const utils_1 = require("../AdaptiveTabs/utils");
const useActiveTabFromQuery_1 = __importDefault(require("./useActiveTabFromQuery"));
const RoutedTabs = (props) => {
    const { tabs, onValueChange, preservedParams, ...rest } = props;
    const router = (0, router_1.useRouter)();
    const activeTab = (0, useActiveTabFromQuery_1.default)(props.tabs, props.defaultTabId);
    const tabsRef = react_1.default.useRef(null);
    const handleValueChange = react_1.default.useCallback(({ value }) => {
        const nextTab = tabs.find((tab) => (0, utils_1.getTabValue)(tab) === value);
        if (!nextTab) {
            return;
        }
        const queryForPathname = (0, es_toolkit_1.pickBy)(router.query, (_, key) => {
            if (preservedParams?.includes(String(key))) {
                return true;
            }
            return router.pathname.includes(`[${key}]`);
        });
        router.push({ pathname: router.pathname, query: { ...queryForPathname, tab: value } }, undefined, { shallow: true });
        onValueChange?.({ value });
    }, [tabs, router, onValueChange, preservedParams]);
    react_1.default.useEffect(() => {
        if (router.query.scroll_to_tabs) {
            tabsRef?.current?.scrollIntoView(true);
            delete router.query.scroll_to_tabs;
            router.push({
                pathname: router.pathname,
                query: router.query,
            }, undefined, { shallow: true });
        }
        // replicate componentDidMount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<AdaptiveTabs_1.default {...rest} tabs={tabs} onValueChange={handleValueChange} defaultValue={activeTab ? (0, utils_1.getTabValue)(activeTab) : (0, utils_1.getTabValue)(tabs[0])}/>);
};
exports.default = react_1.default.memo(RoutedTabs);
