"use strict";
'use client';
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
exports.MenuTrigger = exports.MenuItemCommand = exports.MenuItemText = exports.MenuItem = exports.MenuSeparator = exports.MenuRoot = exports.MenuContextTrigger = exports.MenuRadioItemGroup = exports.MenuTriggerItem = exports.MenuItemGroup = exports.MenuRadioItem = exports.MenuCheckboxItem = exports.MenuArrow = exports.MenuContent = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const lu_1 = require("react-icons/lu");
exports.MenuContent = React.forwardRef(function MenuContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (<react_1.Portal disabled={!portalled} container={portalRef}>
        <react_1.Menu.Positioner>
          <react_1.Menu.Content ref={ref} {...rest}/>
        </react_1.Menu.Positioner>
      </react_1.Portal>);
});
exports.MenuArrow = React.forwardRef(function MenuArrow(props, ref) {
    return (<react_1.Menu.Arrow ref={ref} {...props}>
      <react_1.Menu.ArrowTip />
    </react_1.Menu.Arrow>);
});
exports.MenuCheckboxItem = React.forwardRef(function MenuCheckboxItem(props, ref) {
    return (<react_1.Menu.CheckboxItem ps="8" ref={ref} {...props}>
      <react_1.AbsoluteCenter axis="horizontal" insetStart="4" asChild>
        <react_1.Menu.ItemIndicator>
          <lu_1.LuCheck />
        </react_1.Menu.ItemIndicator>
      </react_1.AbsoluteCenter>
      {props.children}
    </react_1.Menu.CheckboxItem>);
});
exports.MenuRadioItem = React.forwardRef(function MenuRadioItem(props, ref) {
    const { children, ...rest } = props;
    return (<react_1.Menu.RadioItem ps="8" ref={ref} {...rest}>
      <react_1.AbsoluteCenter axis="horizontal" insetStart="4" asChild>
        <react_1.Menu.ItemIndicator>
          <lu_1.LuCheck />
        </react_1.Menu.ItemIndicator>
      </react_1.AbsoluteCenter>
      <react_1.Menu.ItemText>{children}</react_1.Menu.ItemText>
    </react_1.Menu.RadioItem>);
});
exports.MenuItemGroup = React.forwardRef(function MenuItemGroup(props, ref) {
    const { title, children, ...rest } = props;
    return (<react_1.Menu.ItemGroup ref={ref} {...rest}>
      {title && (<react_1.Menu.ItemGroupLabel userSelect="none">
          {title}
        </react_1.Menu.ItemGroupLabel>)}
      {children}
    </react_1.Menu.ItemGroup>);
});
exports.MenuTriggerItem = React.forwardRef(function MenuTriggerItem(props, ref) {
    const { startIcon, children, ...rest } = props;
    return (<react_1.Menu.TriggerItem ref={ref} {...rest}>
      {startIcon}
      {children}
      <lu_1.LuChevronRight />
    </react_1.Menu.TriggerItem>);
});
exports.MenuRadioItemGroup = react_1.Menu.RadioItemGroup;
exports.MenuContextTrigger = react_1.Menu.ContextTrigger;
const MenuRoot = (props) => {
    const { lazyMount = true, unmountOnExit = true, ...rest } = props;
    const positioning = {
        placement: 'bottom-start',
        ...props.positioning,
        offset: {
            mainAxis: 4,
            ...props.positioning?.offset,
        },
    };
    return <react_1.Menu.Root {...rest} positioning={positioning} lazyMount={lazyMount} unmountOnExit={unmountOnExit}/>;
};
exports.MenuRoot = MenuRoot;
exports.MenuSeparator = react_1.Menu.Separator;
exports.MenuItem = react_1.Menu.Item;
exports.MenuItemText = react_1.Menu.ItemText;
exports.MenuItemCommand = react_1.Menu.ItemCommand;
exports.MenuTrigger = react_1.Menu.Trigger;
