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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressCircleRoot = exports.ProgressCircleValueText = exports.ProgressCircleRing = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
exports.ProgressCircleRing = React.forwardRef(function ProgressCircleRing(props, ref) {
    const { trackColor, cap, color, ...rest } = props;
    return (<react_1.ProgressCircle.Circle {...rest} ref={ref}>
      <react_1.ProgressCircle.Track stroke={trackColor}/>
      <react_1.ProgressCircle.Range stroke={color} strokeLinecap={cap}/>
    </react_1.ProgressCircle.Circle>);
});
exports.ProgressCircleValueText = React.forwardRef(function ProgressCircleValueText(props, ref) {
    return (<react_1.AbsoluteCenter>
      <react_1.ProgressCircle.ValueText {...props} ref={ref}/>
    </react_1.AbsoluteCenter>);
});
exports.ProgressCircleRoot = react_1.ProgressCircle.Root;
