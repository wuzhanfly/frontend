"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsibleList = exports.CollapsibleDetails = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const react_scroll_1 = require("react-scroll");
const useUpdateEffect_1 = require("../hooks/useUpdateEffect");
const link_1 = require("./link");
const SCROLL_CONFIG = {
    duration: 500,
    smooth: true,
};
const CUT_ID = 'CollapsibleDetails';
const CollapsibleDetails = (props) => {
    const { children, id = CUT_ID, onClick, isExpanded: isExpandedProp = false, text: textProp, loading, noScroll, ...rest } = props;
    const [isExpanded, setIsExpanded] = react_2.default.useState(isExpandedProp);
    const handleClick = react_2.default.useCallback((event) => {
        setIsExpanded((flag) => !flag);
        if (!noScroll) {
            react_scroll_1.scroller.scrollTo(id, SCROLL_CONFIG);
        }
        onClick?.(event);
    }, [id, noScroll, onClick]);
    (0, useUpdateEffect_1.useUpdateEffect)(() => {
        setIsExpanded(isExpandedProp);
        isExpandedProp && !noScroll && react_scroll_1.scroller.scrollTo(id, SCROLL_CONFIG);
    }, [isExpandedProp, id, noScroll]);
    const text = isExpanded ? (textProp?.[1] ?? 'Hide details') : (textProp?.[0] ?? 'View details');
    return (<>
      <link_1.Link textStyle="sm" textDecorationLine="underline" textDecorationStyle="dashed" w="fit-content" onClick={handleClick} loading={loading} {...rest}>
        <react_scroll_1.Element name={id}>{text}</react_scroll_1.Element>
      </link_1.Link>
      {isExpanded && children}
    </>);
};
exports.CollapsibleDetails = CollapsibleDetails;
const CollapsibleList = (props) => {
    const CUT_LENGTH = 3;
    const { items, renderItem, triggerProps, cutLength = CUT_LENGTH, ...rest } = props;
    const [isExpanded, setIsExpanded] = react_2.default.useState(false);
    const handleToggle = react_2.default.useCallback(() => {
        setIsExpanded((flag) => !flag);
    }, []);
    return (<react_1.Flex flexDir="column" w="100%" {...rest}>
      {items.slice(0, isExpanded ? undefined : cutLength).map(renderItem)}
      {items.length > cutLength && (<link_1.Link textStyle="sm" textDecorationLine="underline" textDecorationStyle="dashed" w="fit-content" minW="auto" onClick={handleToggle} {...triggerProps}>
          {isExpanded ? 'Hide' : 'Show all'}
        </link_1.Link>)}
    </react_1.Flex>);
};
exports.CollapsibleList = CollapsibleList;
