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
exports.ChartArea = void 0;
const d3 = __importStar(require("d3"));
const react_1 = __importDefault(require("react"));
exports.ChartArea = react_1.default.memo(({ id, xScale, yScale, gradient, data, noAnimation, ...props }) => {
    const ref = react_1.default.useRef(null);
    const gradientId = `gradient-chart-area-${id}`;
    react_1.default.useEffect(() => {
        if (noAnimation) {
            d3.select(ref.current).attr('opacity', 1);
            return;
        }
        d3.select(ref.current).transition()
            .duration(750)
            .ease(d3.easeBackIn)
            .attr('opacity', 1);
    }, [noAnimation]);
    const d = react_1.default.useMemo(() => {
        const area = d3.area()
            .defined(({ isApproximate }) => !isApproximate)
            .x(({ date }) => xScale(date))
            .y1(({ value }) => yScale(value))
            .y0(() => yScale(yScale.domain()[0]))
            .curve(d3.curveMonotoneX);
        return area(data) || undefined;
    }, [xScale, yScale, data]);
    return (<>
      <path ref={ref} d={d} fill={`url(#${gradientId})`} opacity={0} data-name={id || 'gradient-chart-area'} {...props}/>
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={gradient.startColor}/>
          <stop offset="100%" stopColor={gradient.stopColor}/>
        </linearGradient>
      </defs>
    </>);
});
