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
exports.Tag = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const TruncatedTextTooltip_1 = require("../components/truncation/TruncatedTextTooltip");
const htmlEntities_1 = require("../utils/htmlEntities");
const close_button_1 = require("./close-button");
const skeleton_1 = require("./skeleton");
exports.Tag = React.forwardRef(function Tag(props, ref) {
    const { startElement, endElement, endElementProps, label, onClose, closable = Boolean(onClose), children, truncated = false, loading, selected, ...rest } = props;
    const labelElement = label ? (<react_1.chakra.span color="text.secondary">{label}:{htmlEntities_1.nbsp}</react_1.chakra.span>) : null;
    const contentElement = truncated ? (<TruncatedTextTooltip_1.TruncatedTextTooltip label={children}>
        <react_1.Tag.Label>{labelElement}{children}</react_1.Tag.Label>
      </TruncatedTextTooltip_1.TruncatedTextTooltip>) : <react_1.Tag.Label>{labelElement}{children}</react_1.Tag.Label>;
    return (<skeleton_1.Skeleton loading={loading} asChild>
        <react_1.Tag.Root ref={ref} {...(selected && { 'data-selected': true })} {...rest}>
          {startElement && (<react_1.Tag.StartElement _empty={{ display: 'none' }}>{startElement}</react_1.Tag.StartElement>)}
          {contentElement}
          {endElement && (<react_1.Tag.EndElement {...endElementProps}>{endElement}</react_1.Tag.EndElement>)}
          {closable && (<react_1.Tag.EndElement>
              <react_1.Tag.CloseTrigger onClick={onClose} asChild>
                <close_button_1.CloseButton />
              </react_1.Tag.CloseTrigger>
            </react_1.Tag.EndElement>)}
        </react_1.Tag.Root>
      </skeleton_1.Skeleton>);
});
