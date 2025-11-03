"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChartZoom = useChartZoom;
const react_1 = __importDefault(require("react"));
function useChartZoom() {
    const [isZoomResetInitial, setIsZoomResetInitial] = react_1.default.useState(true);
    const [zoomRange, setZoomRange] = react_1.default.useState();
    const handleZoom = react_1.default.useCallback((range) => {
        setZoomRange(range);
        setIsZoomResetInitial(false);
    }, []);
    const handleZoomReset = react_1.default.useCallback(() => {
        setZoomRange(undefined);
        setIsZoomResetInitial(true);
    }, []);
    return {
        isZoomResetInitial,
        zoomRange,
        handleZoom,
        handleZoomReset,
    };
}
