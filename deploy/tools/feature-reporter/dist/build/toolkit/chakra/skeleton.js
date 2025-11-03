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
exports.Skeleton = exports.SkeletonText = exports.SkeletonCircle = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
exports.SkeletonCircle = React.forwardRef(function SkeletonCircle(props, ref) {
    const { size, ...rest } = props;
    return (<react_1.Circle size={size} asChild ref={ref}>
      <react_1.Skeleton {...rest}/>
    </react_1.Circle>);
});
exports.SkeletonText = React.forwardRef(function SkeletonText(props, ref) {
    const { noOfLines = 3, gap, ...rest } = props;
    return (<react_1.Stack gap={gap} width="full" ref={ref}>
        {Array.from({ length: noOfLines }).map((_, index) => (<react_1.Skeleton height="4" key={index} {...props} _last={{ maxW: '80%' }} {...rest}/>))}
      </react_1.Stack>);
});
exports.Skeleton = React.forwardRef(function Skeleton(props, ref) {
    const { loading = false, ...rest } = props;
    return (<react_1.Skeleton ref={ref} {...(loading ? { 'data-loading': true, state: 'loading' } : { variant: 'none' })} {...rest}/>);
});
