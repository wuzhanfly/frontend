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
exports.DialogActionTrigger = exports.DialogTrigger = exports.DialogDescription = exports.DialogTitle = exports.DialogBackdrop = exports.DialogBody = exports.DialogFooter = exports.DialogRoot = exports.DialogHeader = exports.DialogCloseTrigger = exports.DialogContent = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const BackToButton_1 = require("../components/buttons/BackToButton");
const close_button_1 = require("./close-button");
exports.DialogContent = React.forwardRef(function DialogContent(props, ref) {
    const { children, portalled = true, portalRef, backdrop = true, ...rest } = props;
    return (<react_1.Portal disabled={!portalled} container={portalRef}>
      {backdrop && <react_1.Dialog.Backdrop />}
      <react_1.Dialog.Positioner>
        <react_1.Dialog.Content ref={ref} {...rest} asChild={false}>
          {children}
        </react_1.Dialog.Content>
      </react_1.Dialog.Positioner>
    </react_1.Portal>);
});
exports.DialogCloseTrigger = React.forwardRef(function DialogCloseTrigger(props, ref) {
    return (<react_1.Dialog.CloseTrigger {...props} asChild>
      <close_button_1.CloseButton ref={ref}>
        {props.children}
      </close_button_1.CloseButton>
    </react_1.Dialog.CloseTrigger>);
});
exports.DialogHeader = React.forwardRef(function DialogHeader(props, ref) {
    const { startElement: startElementProp, onBackToClick, ...rest } = props;
    const startElement = startElementProp ?? (onBackToClick && <BackToButton_1.BackToButton onClick={onBackToClick}/>);
    return (<react_1.Dialog.Header ref={ref} {...rest}>
      {startElement}
      <react_1.Dialog.Title>{props.children}</react_1.Dialog.Title>
      <exports.DialogCloseTrigger ml="auto"/>
    </react_1.Dialog.Header>);
});
exports.DialogRoot = react_1.Dialog.Root;
exports.DialogFooter = react_1.Dialog.Footer;
exports.DialogBody = react_1.Dialog.Body;
exports.DialogBackdrop = react_1.Dialog.Backdrop;
exports.DialogTitle = react_1.Dialog.Title;
exports.DialogDescription = react_1.Dialog.Description;
exports.DialogTrigger = react_1.Dialog.Trigger;
exports.DialogActionTrigger = react_1.Dialog.ActionTrigger;
