"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimeChartController = useTimeChartController;
const react_1 = __importDefault(require("react"));
const useClientRect_1 = require("../../../hooks/useClientRect");
const calculateInnerSize_1 = require("./calculateInnerSize");
const timeChartAxis_1 = require("./timeChartAxis");
function useTimeChartController({ data, margin, axesConfig }) {
    const [rect, ref] = (0, useClientRect_1.useClientRect)();
    // we need to recalculate the axis scale whenever the rect width changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const axesParams = react_1.default.useMemo(() => (0, timeChartAxis_1.getAxesParams)(data, axesConfig), [data, axesConfig, rect?.width]);
    const chartMargin = react_1.default.useMemo(() => {
        const PIXELS_PER_DIGIT = 8;
        const leftShift = axesConfig?.y?.noLabel ? 0 : PIXELS_PER_DIGIT * axesParams.y.labelFormatParams.maxLabelLength;
        return {
            ...margin,
            left: (margin?.left ?? 0) + leftShift,
        };
    }, [axesParams.y.labelFormatParams.maxLabelLength, margin, axesConfig?.y?.noLabel]);
    const { innerWidth, innerHeight } = (0, calculateInnerSize_1.calculateInnerSize)(rect, chartMargin);
    const xScale = react_1.default.useMemo(() => {
        return axesParams.x.scale.range([0, innerWidth]);
    }, [axesParams.x.scale, innerWidth]);
    const yScale = react_1.default.useMemo(() => {
        return axesParams.y.scale.range([innerHeight, 0]);
    }, [axesParams.y.scale, innerHeight]);
    return react_1.default.useMemo(() => {
        return {
            rect,
            ref,
            chartMargin,
            innerWidth,
            innerHeight,
            axes: {
                x: {
                    tickFormatter: axesParams.x.tickFormatter,
                    scale: xScale,
                },
                y: {
                    tickFormatter: axesParams.y.tickFormatter,
                    scale: yScale,
                },
            },
        };
    }, [axesParams.x.tickFormatter, axesParams.y.tickFormatter, chartMargin, innerHeight, innerWidth, rect, ref, xScale, yScale]);
}
