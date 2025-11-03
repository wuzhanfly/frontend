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
exports.PinInput = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
exports.PinInput = React.forwardRef(function PinInput(props, ref) {
    const { count = 6, inputProps, rootRef, attached, placeholder = ' ', bgColor, ...rest } = props;
    return (<react_1.PinInput.Root ref={rootRef} placeholder={placeholder} {...rest}>
        <react_1.PinInput.HiddenInput ref={ref} {...inputProps}/>
        <react_1.PinInput.Control>
          <react_1.Group attached={attached}>
            {Array.from({ length: count }).map((_, index) => (<react_1.PinInput.Input key={index} index={index} bgColor={bgColor}/>))}
          </react_1.Group>
        </react_1.PinInput.Control>
      </react_1.PinInput.Root>);
});
