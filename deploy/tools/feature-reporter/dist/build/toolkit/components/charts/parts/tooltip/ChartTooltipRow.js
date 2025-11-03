"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRenderRows = useRenderRows;
const react_1 = require("@chakra-ui/react");
const d3 = __importStar(require("d3"));
const react_2 = __importDefault(require("react"));
const utils_1 = require("./utils");
const ChartTooltipRow = ({ label, lineNum, children }) => {
    const labelColor = (0, react_1.useToken)('colors', 'blue.100');
    const textColor = (0, react_1.useToken)('colors', 'white');
    return (<g className="ChartTooltip__row" transform={(0, utils_1.calculateRowTransformValue)(lineNum)}>
      {children || (<>
          <text className="ChartTooltip__label" transform="translate(0,0)" dominantBaseline="hanging" fill={labelColor[0]}>
            {label}
          </text>
          <text className="ChartTooltip__value" transform={`translate(${utils_1.LABEL_WIDTH},0)`} dominantBaseline="hanging" fill={textColor[0]}/>
        </>)}
    </g>);
};
exports.default = react_2.default.memo(ChartTooltipRow);
function useRenderRows(ref, { data, xScale, minWidth }) {
    return react_2.default.useCallback((x, currentPoints) => {
        // update "transform" prop of all rows
        const isIncompleteData = currentPoints.some(({ item }) => item.isApproximate);
        d3.select(ref.current)
            .selectAll('.ChartTooltip__row')
            .attr('transform', (_, index) => {
            return (0, utils_1.calculateRowTransformValue)(index - (isIncompleteData ? 0 : 1));
        });
        // update date and indicators value
        // here we assume that the first value element contains the date
        const valueNodes = d3.select(ref.current)
            .selectAll('.ChartTooltip__value')
            .text((_, index) => {
            if (index === 0) {
                const date = xScale.invert(x);
                const dateValue = data[0].items.find((item) => item.date.getTime() === date.getTime())?.dateLabel;
                const dateValueFallback = d3.timeFormat('%e %b %Y')(xScale.invert(x));
                return dateValue || dateValueFallback;
            }
            const { datumIndex, item } = currentPoints.find(({ datumIndex }) => datumIndex === index - 1) || {};
            if (datumIndex === undefined || !item) {
                return null;
            }
            const value = data[datumIndex]?.valueFormatter?.(item.value) ?? item.value.toLocaleString(undefined, { minimumSignificantDigits: 1 });
            const units = data[datumIndex]?.units ? ` ${data[datumIndex]?.units}` : '';
            return value + units;
        })
            .nodes();
        const valueWidths = valueNodes.map((node) => node?.getBoundingClientRect?.().width);
        const maxValueWidth = Math.max(...valueWidths);
        const maxRowWidth = Math.max(minWidth, 2 * utils_1.PADDING + utils_1.LABEL_WIDTH + maxValueWidth);
        return { width: maxRowWidth };
    }, [data, minWidth, ref, xScale]);
}
