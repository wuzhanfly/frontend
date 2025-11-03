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
exports.useRenderTitle = useRenderTitle;
const react_1 = require("@chakra-ui/react");
const d3 = __importStar(require("d3"));
const react_2 = __importDefault(require("react"));
const types_1 = require("../../types");
const ChartTooltipRow_1 = __importDefault(require("./ChartTooltipRow"));
const ChartTooltipTitle = ({ resolution = types_1.Resolution.DAY }) => {
    const titleColor = (0, react_1.useToken)('colors', 'yellow.300');
    const resolutionTitle = types_1.RESOLUTION_LABELS.find(({ id }) => id === resolution)?.title || 'day';
    return (<ChartTooltipRow_1.default lineNum={0}>
      <text className="ChartTooltip__title" transform="translate(0,0)" fill={titleColor[0]} opacity={0} dominantBaseline="hanging">
        {`Incomplete ${resolutionTitle.toLowerCase()}`}
      </text>
    </ChartTooltipRow_1.default>);
};
exports.default = react_2.default.memo(ChartTooltipTitle);
function useRenderTitle(ref) {
    return react_2.default.useCallback((isVisible) => {
        d3.select(ref.current)
            .select('.ChartTooltip__title')
            .attr('opacity', isVisible ? 1 : 0);
    }, [ref]);
}
