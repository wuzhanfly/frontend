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
exports.TabsCounter = exports.TabsContent = exports.TabsTrigger = exports.TabsList = exports.TabsRoot = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
exports.TabsRoot = React.forwardRef(function TabsRoot(props, ref) {
    const { lazyMount = true, unmountOnExit = true, ...rest } = props;
    return <react_1.Tabs.Root ref={ref} {...rest} lazyMount={lazyMount} unmountOnExit={unmountOnExit}/>;
});
exports.TabsList = react_1.Tabs.List;
exports.TabsTrigger = React.forwardRef(function TabsTrigger(props, ref) {
    return <react_1.Tabs.Trigger ref={ref} className="group" {...props}/>;
});
exports.TabsContent = react_1.Tabs.Content;
const TabsCounter = ({ count }) => {
    const COUNTER_OVERLOAD = 50;
    if (count === undefined || count === null) {
        return null;
    }
    return (<react_1.chakra.span color={count > 0 ? 'text.secondary' : { _light: 'blackAlpha.400', _dark: 'whiteAlpha.400' }} _groupHover={{
            color: 'inherit',
        }}>
      {count > COUNTER_OVERLOAD ? `${COUNTER_OVERLOAD}+` : count}
    </react_1.chakra.span>);
};
exports.TabsCounter = TabsCounter;
