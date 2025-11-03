"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const TruncatedTextTooltip_1 = require("../components/truncation/TruncatedTextTooltip");
const skeleton_1 = require("./skeleton");
exports.Badge = react_2.default.forwardRef(function Badge(props, ref) {
    const { loading, startElement, children, asChild = true, truncated = false, endElement, ...rest } = props;
    const child = <react_1.chakra.span overflow="hidden" textOverflow="ellipsis">{children}</react_1.chakra.span>;
    const childrenElement = truncated ? (<TruncatedTextTooltip_1.TruncatedTextTooltip label={children}>
        {child}
      </TruncatedTextTooltip_1.TruncatedTextTooltip>) : child;
    return (<skeleton_1.Skeleton loading={loading} asChild={asChild} ref={ref}>
        <react_1.Badge display="inline-flex" alignItems="center" whiteSpace="nowrap" {...rest}>
          {startElement}
          {childrenElement}
          {endElement}
        </react_1.Badge>
      </skeleton_1.Skeleton>);
});
