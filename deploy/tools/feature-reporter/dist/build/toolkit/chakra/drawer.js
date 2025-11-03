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
exports.DrawerActionTrigger = exports.DrawerTitle = exports.DrawerDescription = exports.DrawerBody = exports.DrawerHeader = exports.DrawerFooter = exports.DrawerTrigger = exports.DrawerRoot = exports.DrawerCloseTrigger = exports.DrawerContent = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const close_button_1 = require("./close-button");
exports.DrawerContent = React.forwardRef(function DrawerContent(props, ref) {
    const { children, portalled = true, portalRef, offset, backdrop = true, ...rest } = props;
    return (<react_1.Portal disabled={!portalled} container={portalRef}>
      {backdrop && <react_1.Drawer.Backdrop />}
      <react_1.Drawer.Positioner padding={offset}>
        <react_1.Drawer.Content ref={ref} {...rest} asChild={false}>
          {children}
        </react_1.Drawer.Content>
      </react_1.Drawer.Positioner>
    </react_1.Portal>);
});
exports.DrawerCloseTrigger = React.forwardRef(function DrawerCloseTrigger(props, ref) {
    return (<react_1.Drawer.CloseTrigger position="absolute" top="7" insetEnd="5" {...props} asChild>
      <close_button_1.CloseButton ref={ref}/>
    </react_1.Drawer.CloseTrigger>);
});
const EMPTY_ELEMENT = () => null;
const DrawerRoot = (props) => {
    const { initialFocusEl = EMPTY_ELEMENT, lazyMount = true, unmountOnExit = true, ...rest } = props;
    return <react_1.Drawer.Root {...rest} initialFocusEl={initialFocusEl} lazyMount={lazyMount} unmountOnExit={unmountOnExit}/>;
};
exports.DrawerRoot = DrawerRoot;
const DrawerTrigger = (props) => {
    const { asChild = true, ...rest } = props;
    return <react_1.Drawer.Trigger asChild={asChild} {...rest}/>;
};
exports.DrawerTrigger = DrawerTrigger;
exports.DrawerFooter = react_1.Drawer.Footer;
exports.DrawerHeader = react_1.Drawer.Header;
exports.DrawerBody = react_1.Drawer.Body;
exports.DrawerDescription = react_1.Drawer.Description;
exports.DrawerTitle = react_1.Drawer.Title;
exports.DrawerActionTrigger = react_1.Drawer.ActionTrigger;
