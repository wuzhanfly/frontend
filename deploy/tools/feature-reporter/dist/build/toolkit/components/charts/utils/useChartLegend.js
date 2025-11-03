"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChartLegend = useChartLegend;
const es_toolkit_1 = require("es-toolkit");
const react_1 = __importDefault(require("react"));
function useChartLegend(dataLength) {
    const [selectedLines, setSelectedLines] = react_1.default.useState((0, es_toolkit_1.range)(dataLength));
    const handleLegendItemClick = react_1.default.useCallback((index) => {
        const nextSelectedLines = selectedLines.includes(index) ? selectedLines.filter((item) => item !== index) : [...selectedLines, index];
        setSelectedLines(nextSelectedLines);
    }, [selectedLines]);
    return {
        selectedLines,
        handleLegendItemClick,
    };
}
