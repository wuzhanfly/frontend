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
exports.ChartLine = void 0;
const d3 = __importStar(require("d3"));
const react_1 = __importDefault(require("react"));
const animations_1 = require("../utils/animations");
const formatters_1 = require("../utils/formatters");
exports.ChartLine = react_1.default.memo(({ xScale, yScale, data, animation, strokeDasharray, ...props }) => {
    const dataPathRef = react_1.default.useRef(null);
    const incompleteDataPathRef = react_1.default.useRef(null);
    react_1.default.useEffect(() => {
        const animationFn = animations_1.ANIMATIONS[animation];
        const timeoutId = window.setTimeout(() => {
            dataPathRef.current && animationFn(dataPathRef.current);
            incompleteDataPathRef.current && animationFn(incompleteDataPathRef.current);
        }, 100);
        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [animation]);
    // Recalculate line length if scale has changed
    react_1.default.useEffect(() => {
        if (animation === 'left') {
            const totalLength = dataPathRef.current?.getTotalLength();
            d3.select(dataPathRef.current).attr('stroke-dasharray', `${totalLength},${totalLength}`);
        }
    }, [xScale, yScale, animation]);
    const line = d3.line()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.value))
        .curve(d3.curveMonotoneX);
    return (<>
      <path ref={incompleteDataPathRef} d={line((0, formatters_1.getIncompleteDataLineSource)(data)) || undefined} strokeWidth={1} strokeLinecap="round" fill="none" strokeDasharray="6 6" opacity={0} {...props}/>
      <path ref={dataPathRef} d={line(data.filter(({ isApproximate }) => !isApproximate)) || undefined} strokeWidth={1} strokeLinecap="round" strokeDasharray={strokeDasharray} fill="none" opacity={0} {...props}/>
    </>);
});
