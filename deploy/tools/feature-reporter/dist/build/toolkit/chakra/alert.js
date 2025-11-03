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
exports.Alert = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const InfoFilled_1 = __importDefault(require("icons-components/InfoFilled"));
const close_button_1 = require("./close-button");
const skeleton_1 = require("./skeleton");
exports.Alert = React.forwardRef(function Alert(props, ref) {
    const { title, children, icon, closable, onClose, startElement, endElement, loading, size, showIcon = false, descriptionProps, ...rest } = props;
    const [isOpen, setIsOpen] = React.useState(true);
    const defaultIcon = <react_1.Icon boxSize={5}><InfoFilled_1.default /></react_1.Icon>;
    const iconElement = (() => {
        if (startElement !== undefined) {
            return startElement;
        }
        if (!showIcon && icon === undefined) {
            return null;
        }
        return <react_1.Alert.Indicator>{icon || defaultIcon}</react_1.Alert.Indicator>;
    })();
    const handleClose = React.useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose]);
    if (closable && !isOpen) {
        return null;
    }
    return (<skeleton_1.Skeleton loading={loading} asChild>
        <react_1.Alert.Root ref={ref} size={size ?? { base: 'sm', lg: 'md' }} {...rest}>
          {iconElement}
          {children ? (<react_1.Alert.Content>
              {title && <react_1.Alert.Title>{title}</react_1.Alert.Title>}
              <react_1.Alert.Description display="inline-flex" flexWrap="wrap" {...descriptionProps}>{children}</react_1.Alert.Description>
            </react_1.Alert.Content>) : (<react_1.Alert.Title flex="1">{title}</react_1.Alert.Title>)}
          {endElement}
          {closable && (<close_button_1.CloseButton pos="relative" 
        // default size for mobile is "sm", and for desktop is "md"
        m={{ base: size === 'md' ? 0.5 : 0, lg: size === 'sm' ? 0 : 0.5 }} alignSelf="flex-start" onClick={handleClose}/>)}
        </react_1.Alert.Root>
      </skeleton_1.Skeleton>);
});
