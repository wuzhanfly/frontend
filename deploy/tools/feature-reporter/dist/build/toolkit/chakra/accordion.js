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
exports.AccordionItem = exports.AccordionRoot = exports.AccordionItemContent = exports.AccordionItemTrigger = void 0;
exports.useAccordion = useAccordion;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const react_scroll_1 = require("react-scroll");
const EastMini_1 = __importDefault(require("icons-components/arrows/EastMini"));
exports.AccordionItemTrigger = React.forwardRef(function AccordionItemTrigger(props, ref) {
    const { children, indicatorPlacement: indicatorPlacementProp, variant, noIndicator, ...rest } = props;
    const indicatorPlacement = variant === 'faq' ? 'start' : (indicatorPlacementProp ?? 'end');
    const indicator = variant === 'faq' ? (<react_1.Accordion.ItemIndicator asChild rotate="0deg" position="relative" _before={{
            content: '""',
            position: 'absolute',
            display: 'block',
            bgColor: '{currentColor}',
            w: '100%',
            h: '2px',
            borderRadius: '2px',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
        }} _after={{
            content: '""',
            position: 'absolute',
            display: 'block',
            bgColor: '{currentColor}',
            w: '2px',
            h: '100%',
            borderRadius: '2px',
            left: '50%',
            top: '0',
            transform: 'translateX(-50%)',
            transition: 'transform 0.2s ease-in-out',
        }} _open={{
            _after: {
                transform: 'translateX(-50%) rotate(90deg)',
            },
        }}>
      <div />
    </react_1.Accordion.ItemIndicator>) : (<react_1.Accordion.ItemIndicator rotate={{ base: '180deg', _open: '270deg' }} display="flex">
      <react_1.Icon boxSize={5}><EastMini_1.default /></react_1.Icon>
    </react_1.Accordion.ItemIndicator>);
    return (<react_1.Accordion.ItemTrigger className="group" {...rest} ref={ref}>
      {indicatorPlacement === 'start' && !noIndicator && indicator}
      {children}
      {indicatorPlacement === 'end' && !noIndicator && indicator}
    </react_1.Accordion.ItemTrigger>);
});
exports.AccordionItemContent = React.forwardRef(function AccordionItemContent(props, ref) {
    return (<react_1.Accordion.ItemContent>
      <react_1.Accordion.ItemBody {...props} ref={ref}/>
    </react_1.Accordion.ItemContent>);
});
const AccordionRoot = (props) => {
    const { multiple = true, ...rest } = props;
    return <react_1.Accordion.Root multiple={multiple} {...rest}/>;
};
exports.AccordionRoot = AccordionRoot;
exports.AccordionItem = react_1.Accordion.Item;
function useAccordion(items) {
    const [value, setValue] = React.useState([]);
    const onValueChange = React.useCallback(({ value }) => {
        setValue(value);
    }, []);
    const scrollToItemFromUrl = React.useCallback(() => {
        const hash = window.location.hash.replace('#', '');
        if (!hash) {
            return;
        }
        const itemToScroll = items.find((item) => item.id === hash);
        if (itemToScroll) {
            react_scroll_1.scroller.scrollTo(itemToScroll.id, {
                duration: 500,
                smooth: true,
                offset: -100,
            });
            setValue([itemToScroll.id]);
        }
    }, [items]);
    return React.useMemo(() => {
        return {
            value,
            onValueChange,
            scrollToItemFromUrl,
        };
    }, [value, onValueChange, scrollToItemFromUrl]);
}
