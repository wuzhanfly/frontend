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
exports.useRenderContent = useRenderContent;
const d3 = __importStar(require("d3"));
const es_toolkit_1 = require("es-toolkit");
const react_1 = __importDefault(require("react"));
const utils_1 = require("./utils");
const ChartTooltipContent = ({ children }) => {
    return <g className="ChartTooltip__content">{children}</g>;
};
exports.default = react_1.default.memo(ChartTooltipContent);
function useRenderContent(ref, { chart, transitionDuration }) {
    return react_1.default.useCallback((x, y) => {
        const tooltipContent = d3.select(ref.current).select('.ChartTooltip__content');
        const transformAttributeFn = (_, i, nodes) => {
            const node = nodes[i];
            const { width: nodeWidth, height: nodeHeight } = node?.getBoundingClientRect() || { width: 0, height: 0 };
            const [translateX, translateY] = calculatePosition({
                canvasWidth: chart.width || 0,
                canvasHeight: chart.height || 0,
                nodeWidth,
                nodeHeight,
                pointX: x,
                pointY: y,
                offset: utils_1.POINT_SIZE,
            });
            return `translate(${translateX}, ${translateY})`;
        };
        if (transitionDuration) {
            tooltipContent
                .transition()
                .duration(transitionDuration)
                .ease(d3.easeLinear)
                .attr('transform', transformAttributeFn);
        }
        else {
            tooltipContent
                .attr('transform', transformAttributeFn);
        }
    }, [chart.height, chart.width, ref, transitionDuration]);
}
function calculatePosition({ pointX, pointY, canvasWidth, canvasHeight, nodeWidth, nodeHeight, offset }) {
    // right
    if (pointX + offset + nodeWidth <= canvasWidth) {
        const x = pointX + offset;
        const y = (0, es_toolkit_1.clamp)(pointY - nodeHeight / 2, 0, canvasHeight - nodeHeight);
        return [x, y];
    }
    // left
    if (nodeWidth + offset <= pointX) {
        const x = pointX - offset - nodeWidth;
        const y = (0, es_toolkit_1.clamp)(pointY - nodeHeight / 2, 0, canvasHeight - nodeHeight);
        return [x, y];
    }
    // top
    if (nodeHeight + offset <= pointY) {
        const x = (0, es_toolkit_1.clamp)(pointX - nodeWidth / 2, 0, canvasWidth - nodeWidth);
        const y = pointY - offset - nodeHeight;
        return [x, y];
    }
    // bottom
    if (pointY + offset + nodeHeight <= canvasHeight) {
        const x = (0, es_toolkit_1.clamp)(pointX - nodeWidth / 2, 0, canvasWidth - nodeWidth);
        const y = pointY + offset;
        return [x, y];
    }
    const x = (0, es_toolkit_1.clamp)(pointX / 2, 0, canvasWidth - nodeWidth);
    const y = (0, es_toolkit_1.clamp)(pointY / 2, 0, canvasHeight - nodeHeight);
    return [x, y];
}
