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
exports.useChartBrushX = useChartBrushX;
const react_1 = require("@chakra-ui/react");
const d3 = __importStar(require("d3"));
const react_2 = __importDefault(require("react"));
const color_mode_1 = require("../../../chakra/color-mode");
function useChartBrushX({ limits, anchor, setRange }) {
    const brushRef = react_2.default.useRef(undefined);
    const [brushSelectionBg] = (0, react_1.useToken)('colors', (0, color_mode_1.useColorModeValue)('blackAlpha.400', 'whiteAlpha.500'));
    react_2.default.useEffect(() => {
        if (!anchor || brushRef.current || limits[1][0] === 0) {
            return;
        }
        const svgEl = d3.select(anchor).select('g');
        brushRef.current = d3.brushX()
            .extent(limits);
        brushRef.current.on('end', (event) => {
            setRange(event.selection);
        });
        const gBrush = svgEl?.append('g')
            .attr('class', 'ChartBrush')
            .call(brushRef.current);
        gBrush.select('.selection')
            .attr('stroke', 'none')
            .attr('fill', brushSelectionBg);
    }, [anchor, brushSelectionBg, limits, setRange]);
}
