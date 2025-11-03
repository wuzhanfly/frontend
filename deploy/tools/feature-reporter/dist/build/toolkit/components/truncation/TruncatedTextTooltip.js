"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruncatedTextTooltip = void 0;
const es_toolkit_1 = require("es-toolkit");
const react_1 = __importDefault(require("react"));
const use_font_face_observer_1 = __importDefault(require("use-font-face-observer"));
const tooltip_1 = require("../../chakra/tooltip");
const useDisclosure_1 = require("../../hooks/useDisclosure");
const typography_1 = require("../../theme/foundations/typography");
exports.TruncatedTextTooltip = react_1.default.memo(({ children, label, placement, interactive }) => {
    const childRef = react_1.default.useRef(null);
    const [isTruncated, setTruncated] = react_1.default.useState(false);
    const { open, onToggle, onOpen, onClose } = (0, useDisclosure_1.useDisclosure)();
    const isFontFaceLoaded = (0, use_font_face_observer_1.default)([
        { family: typography_1.BODY_TYPEFACE },
    ]);
    const updatedTruncateState = react_1.default.useCallback(() => {
        if (childRef.current) {
            const scrollWidth = childRef.current.scrollWidth;
            const clientWidth = childRef.current.clientWidth;
            if (scrollWidth > clientWidth) {
                setTruncated(true);
            }
            else {
                setTruncated(false);
            }
        }
    }, []);
    // FIXME: that should be useLayoutEffect, but it keeps complaining about SSR
    // let's keep it as it is until the first issue
    react_1.default.useEffect(() => {
        updatedTruncateState();
    }, [updatedTruncateState, isFontFaceLoaded]);
    // we want to do recalculation when isFontFaceLoaded flag is changed
    // but we don't want to create more resize event listeners
    // that's why there are separate useEffect hooks
    react_1.default.useEffect(() => {
        const handleResize = (0, es_toolkit_1.debounce)(updatedTruncateState, 1000);
        window.addEventListener('resize', handleResize);
        return function cleanup() {
            window.removeEventListener('resize', handleResize);
        };
    }, [updatedTruncateState]);
    // as for now it supports only one child
    // and it is not cleared how to manage case with two or more children
    const child = react_1.default.Children.only(children);
    const handleClick = react_1.default.useCallback((event) => {
        event.stopPropagation();
        onToggle();
    }, [onToggle]);
    const modifiedChildren = react_1.default.cloneElement(child, {
        ref: childRef,
        onClick: handleClick,
        onMouseEnter: onOpen,
        onMouseLeave: onClose,
    });
    if (isTruncated) {
        return (<tooltip_1.Tooltip content={label} contentProps={{ maxW: { base: 'calc(100vw - 8px)', lg: '400px' } }} positioning={{ placement }} open={open} interactive={interactive}>
        {modifiedChildren}
      </tooltip_1.Tooltip>);
    }
    return modifiedChildren;
});
