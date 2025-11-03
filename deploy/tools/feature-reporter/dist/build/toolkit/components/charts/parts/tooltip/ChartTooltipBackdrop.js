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
exports.useRenderBackdrop = useRenderBackdrop;
const react_1 = require("@chakra-ui/react");
const d3 = __importStar(require("d3"));
const react_2 = __importDefault(require("react"));
const utils_1 = require("./utils");
const ChartTooltipBackdrop = () => {
    const bgColor = (0, react_1.useToken)('colors', 'blackAlpha.900');
    return (<rect className="ChartTooltip__backdrop" rx={12} ry={12} fill={bgColor[0]}/>);
};
exports.default = react_2.default.memo(ChartTooltipBackdrop);
function useRenderBackdrop(ref, { seriesNum, transitionDuration }) {
    return react_2.default.useCallback((width, isIncompleteData) => {
        const height = (0, utils_1.calculateContainerHeight)(seriesNum, isIncompleteData);
        if (transitionDuration) {
            d3.select(ref.current)
                .select('.ChartTooltip__backdrop')
                .transition()
                .duration(transitionDuration)
                .ease(d3.easeLinear)
                .attr('width', width)
                .attr('height', height);
        }
        else {
            d3.select(ref.current)
                .select('.ChartTooltip__backdrop')
                .attr('width', width)
                .attr('height', height);
        }
    }, [ref, seriesNum, transitionDuration]);
}
