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
exports.PopoverBody = exports.PopoverHeader = exports.PopoverFooter = exports.PopoverDescription = exports.PopoverTitle = exports.PopoverTrigger = exports.PopoverRoot = exports.PopoverCloseTriggerWrapper = exports.PopoverCloseTrigger = exports.PopoverArrow = exports.PopoverContent = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const close_button_1 = require("./close-button");
exports.PopoverContent = React.forwardRef(function PopoverContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (<react_1.Portal disabled={!portalled} container={portalRef}>
      <react_1.Popover.Positioner>
        <react_1.Popover.Content ref={ref} {...rest}/>
      </react_1.Popover.Positioner>
    </react_1.Portal>);
});
exports.PopoverArrow = React.forwardRef(function PopoverArrow(props, ref) {
    return (<react_1.Popover.Arrow {...props} ref={ref}>
      <react_1.Popover.ArrowTip />
    </react_1.Popover.Arrow>);
});
exports.PopoverCloseTrigger = React.forwardRef(function PopoverCloseTrigger(props, ref) {
    return (<react_1.Popover.CloseTrigger position="absolute" top="1" insetEnd="1" {...props} asChild ref={ref}>
      <close_button_1.CloseButton />
    </react_1.Popover.CloseTrigger>);
});
exports.PopoverCloseTriggerWrapper = React.forwardRef(function PopoverCloseTriggerWrapper(props, ref) {
    const { disabled, ...rest } = props;
    if (disabled) {
        return props.children;
    }
    return (<react_1.Popover.CloseTrigger ref={ref} {...rest} asChild/>);
});
const PopoverRoot = (props) => {
    const positioning = {
        placement: 'bottom-start',
        overflowPadding: 4,
        ...props.positioning,
        offset: {
            mainAxis: 4,
            ...props.positioning?.offset,
        },
    };
    const { lazyMount = true, unmountOnExit = true, ...rest } = props;
    return (<react_1.Popover.Root autoFocus={false} lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...rest} positioning={positioning}/>);
};
exports.PopoverRoot = PopoverRoot;
exports.PopoverTrigger = React.forwardRef(function PopoverTrigger(props, ref) {
    const { asChild = true, ...rest } = props;
    return <react_1.Popover.Trigger asChild={asChild} ref={ref} {...rest}/>;
});
exports.PopoverTitle = react_1.Popover.Title;
exports.PopoverDescription = react_1.Popover.Description;
exports.PopoverFooter = react_1.Popover.Footer;
exports.PopoverHeader = react_1.Popover.Header;
exports.PopoverBody = react_1.Popover.Body;
