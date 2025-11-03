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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LABEL_LENGTH = exports.MAXIMUM_SIGNIFICANT_DIGITS_LIMIT = exports.DEFAULT_MAXIMUM_FRACTION_DIGITS = exports.DEFAULT_MAXIMUM_SIGNIFICANT_DIGITS = void 0;
exports.getAxesParams = getAxesParams;
const d3 = __importStar(require("d3"));
const es_toolkit_1 = require("es-toolkit");
const consts_1 = require("../../../utils/consts");
exports.DEFAULT_MAXIMUM_SIGNIFICANT_DIGITS = 2;
exports.DEFAULT_MAXIMUM_FRACTION_DIGITS = 3;
exports.MAXIMUM_SIGNIFICANT_DIGITS_LIMIT = 8;
exports.DEFAULT_LABEL_LENGTH = 5;
function getAxesParams(data, axesConfig) {
    const { labelFormatParams: labelFormatParamsY, scale: yScale } = getAxisParamsY(data, axesConfig?.y);
    return {
        x: {
            scale: getAxisParamsX(data).scale,
            tickFormatter: tickFormatterX,
        },
        y: {
            scale: yScale,
            labelFormatParams: labelFormatParamsY,
            tickFormatter: getTickFormatterY(labelFormatParamsY),
        },
    };
}
function getAxisParamsX(data) {
    const min = d3.min(data, ({ items }) => d3.min(items, ({ date }) => date)) ?? new Date();
    const max = d3.max(data, ({ items }) => d3.max(items, ({ date }) => date)) ?? new Date();
    const scale = d3.scaleTime().domain([min, max]);
    return { min, max, scale };
}
const tickFormatterX = (axis) => (d) => {
    let format;
    const scale = axis.scale();
    const extent = scale.domain();
    const span = Number(extent[1]) - Number(extent[0]);
    if (span > 2 * consts_1.YEAR) {
        format = d3.timeFormat('%Y');
    }
    else if (span > 4 * consts_1.MONTH) {
        format = d3.timeFormat('%b \'%y');
    }
    else if (span > 2 * consts_1.DAY) {
        format = d3.timeFormat('%d %b');
    }
    else {
        format = d3.timeFormat('%H:%M');
    }
    return format(d);
};
function getAxisParamsY(data, config) {
    const DEFAULT_TICKS_NUM = 3;
    const min = d3.min(data, ({ items }) => d3.min(items, ({ value }) => value)) ?? 0;
    const max = d3.max(data, ({ items }) => d3.max(items, ({ value }) => value)) ?? 0;
    const scale = config?.nice ?
        d3.scaleLinear()
            .domain([config?.scale?.min ?? min, max])
            .nice(config?.ticks ?? DEFAULT_TICKS_NUM) :
        d3.scaleLinear()
            .domain([config?.scale?.min ?? min, max]);
    const ticks = scale.ticks(config?.ticks ?? DEFAULT_TICKS_NUM);
    const labelFormatParams = getYLabelFormatParams(ticks);
    return { min, max, scale, labelFormatParams };
}
const getTickFormatterY = (params) => () => (d) => {
    const num = Number(d);
    return num.toLocaleString(undefined, params);
};
function getYLabelFormatParams(ticks, maximumSignificantDigits = exports.DEFAULT_MAXIMUM_SIGNIFICANT_DIGITS) {
    const params = {
        maximumFractionDigits: exports.DEFAULT_MAXIMUM_FRACTION_DIGITS,
        maximumSignificantDigits,
        notation: 'compact',
    };
    const uniqTicksStr = (0, es_toolkit_1.uniq)(ticks.map((tick) => tick.toLocaleString(undefined, params)));
    const maxLabelLength = (0, es_toolkit_1.maxBy)(uniqTicksStr, (items) => items.length)?.length ?? exports.DEFAULT_LABEL_LENGTH;
    if (uniqTicksStr.length === ticks.length || maximumSignificantDigits === exports.MAXIMUM_SIGNIFICANT_DIGITS_LIMIT) {
        return { ...params, maxLabelLength };
    }
    return getYLabelFormatParams(ticks, maximumSignificantDigits + 1);
}
