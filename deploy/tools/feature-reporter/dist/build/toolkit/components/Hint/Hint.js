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
exports.Hint = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const Info_1 = __importDefault(require("icons-components/Info"));
const icon_button_1 = require("../../chakra/icon-button");
const tooltip_1 = require("../../chakra/tooltip");
exports.Hint = React.memo(({ label, tooltipProps, isLoading, boxSize = 5, ...rest }) => {
    return (<tooltip_1.Tooltip content={label} positioning={{ placement: 'top' }} {...tooltipProps}>
      <icon_button_1.IconButton aria-label="hint" boxSize={boxSize} loadingSkeleton={isLoading} borderRadius="sm" variant="icon_secondary" {...rest}>
        <react_1.Icon boxSize={boxSize}>
          <Info_1.default />
        </react_1.Icon>
      </icon_button_1.IconButton>
    </tooltip_1.Tooltip>);
});
