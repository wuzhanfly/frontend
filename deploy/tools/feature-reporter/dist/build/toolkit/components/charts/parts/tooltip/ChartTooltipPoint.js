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
exports.useRenderPoints = useRenderPoints;
const react_1 = require("@chakra-ui/react");
const d3 = __importStar(require("d3"));
const react_2 = __importDefault(require("react"));
const color_mode_1 = require("../../../../chakra/color-mode");
const utils_1 = require("./utils");
const ChartTooltipPoint = () => {
    const bgColor = (0, react_1.useToken)('colors', (0, color_mode_1.useColorModeValue)('black', 'white'));
    const borderColor = (0, react_1.useToken)('colors', (0, color_mode_1.useColorModeValue)('white', 'black'));
    return (<circle className="ChartTooltip__point" r={utils_1.POINT_SIZE / 2} opacity={1} fill={bgColor[0]} stroke={borderColor[0]} strokeWidth={4}/>);
};
exports.default = react_2.default.memo(ChartTooltipPoint);
function useRenderPoints(ref, params) {
    return react_2.default.useCallback((x) => {
        const xDate = params.xScale.invert(x);
        const bisectDate = d3.bisector((d) => d.date).left;
        let baseXPos = 0;
        let baseYPos = 0;
        const currentPoints = [];
        d3.select(ref.current)
            .selectAll('.ChartTooltip__point')
            .attr('transform', (_, elementIndex) => {
            const datum = params.data[elementIndex];
            const index = bisectDate(datum.items, xDate, 1);
            const d0 = datum.items[index - 1];
            const d1 = datum.items[index];
            const d = (() => {
                if (!d0) {
                    return d1;
                }
                if (!d1) {
                    return d0;
                }
                return xDate.getTime() - d0.date.getTime() > d1.date.getTime() - xDate.getTime() ? d1 : d0;
            })();
            if (d?.date === undefined && d?.value === undefined) {
                // move point out of container
                return 'translate(-100,-100)';
            }
            const xPos = params.xScale(d.date);
            const yPos = params.yScale(d.value);
            if (elementIndex === 0) {
                baseXPos = xPos;
                baseYPos = yPos;
            }
            currentPoints.push({ item: d, datumIndex: elementIndex });
            return `translate(${xPos}, ${yPos})`;
        });
        return {
            x: baseXPos,
            y: baseYPos,
            currentPoints,
        };
    }, [ref, params]);
}
