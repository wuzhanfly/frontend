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
exports.Switch = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
exports.Switch = React.forwardRef(function Switch(props, ref) {
    const { inputProps, children, rootRef, trackLabel, thumbLabel, labelProps, ...rest } = props;
    return (<react_1.Switch.Root ref={rootRef} {...rest}>
        <react_1.Switch.HiddenInput ref={ref} {...inputProps}/>
        <react_1.Switch.Control>
          <react_1.Switch.Thumb>
            {thumbLabel && (<react_1.Switch.ThumbIndicator fallback={thumbLabel?.off}>
                {thumbLabel?.on}
              </react_1.Switch.ThumbIndicator>)}
          </react_1.Switch.Thumb>
          {trackLabel && (<react_1.Switch.Indicator fallback={trackLabel.off}>
              {trackLabel.on}
            </react_1.Switch.Indicator>)}
        </react_1.Switch.Control>
        {children != null && (<react_1.Switch.Label {...labelProps}>{children}</react_1.Switch.Label>)}
      </react_1.Switch.Root>);
});
