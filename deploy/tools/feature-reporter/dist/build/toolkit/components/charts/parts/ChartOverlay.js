"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartOverlay = void 0;
const react_1 = __importDefault(require("react"));
exports.ChartOverlay = react_1.default.forwardRef(({ width, height, children }, ref) => {
    return (<g className="ChartOverlay">
      {children}
      <rect ref={ref} width={width} height={height} opacity={0}/>
    </g>);
});
