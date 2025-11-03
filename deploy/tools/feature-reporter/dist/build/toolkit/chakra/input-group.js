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
exports.InputGroup = void 0;
const react_1 = require("@chakra-ui/react");
const es_toolkit_1 = require("es-toolkit");
const React = __importStar(require("react"));
const getComponentDisplayName_1 = __importDefault(require("../utils/getComponentDisplayName"));
exports.InputGroup = React.forwardRef(function InputGroup(props, ref) {
    const { startElement, startElementProps, endElement, endElementProps, children, startOffset, endOffset, ...rest } = props;
    const startElementRef = React.useRef(null);
    const endElementRef = React.useRef(null);
    const [groupRef, setGroupRef] = React.useState(null);
    const [inlinePaddings, setInlinePaddings] = React.useState();
    const calculateInlinePaddings = React.useCallback(() => {
        const startWidth = startElementRef.current?.getBoundingClientRect().width ?? 0;
        const endWidth = endElementRef.current?.getBoundingClientRect().width ?? 0;
        setInlinePaddings({
            start: startWidth,
            end: endWidth,
        });
    }, []);
    React.useEffect(() => {
        if (!groupRef)
            return;
        let timeoutId;
        const intersectionObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry && entry.isIntersecting) {
                // Small delay to ensure rendering is complete
                timeoutId = setTimeout(calculateInlinePaddings, 50);
            }
        }, { threshold: 0.01 });
        intersectionObserver.observe(groupRef);
        return () => {
            intersectionObserver.disconnect();
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [calculateInlinePaddings, groupRef]);
    React.useEffect(() => {
        calculateInlinePaddings();
        const resizeHandler = (0, es_toolkit_1.debounce)(calculateInlinePaddings, 300);
        const resizeObserver = new ResizeObserver(resizeHandler);
        if (groupRef) {
            resizeObserver.observe(groupRef);
        }
        return function cleanup() {
            resizeObserver.disconnect();
        };
    }, [calculateInlinePaddings]);
    // Combine refs for the Group component
    const combinedRef = React.useCallback((node) => {
        setGroupRef(node);
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref && 'current' in ref) {
            ref.current = node;
        }
    }, [ref]);
    return (<react_1.Group ref={combinedRef} w="100%" {...rest}>
        {startElement && (<react_1.InputElement pointerEvents="none" ref={startElementRef} px={0} color="input.element" {...startElementProps}>
            {startElement}
          </react_1.InputElement>)}
        {React.Children.map(children, (child) => {
            if ((0, getComponentDisplayName_1.default)(child.type) !== 'FieldInput') {
                return child;
            }
            return React.cloneElement(child, {
                ...(startElement && { ps: startOffset ?? (inlinePaddings?.start ? `${inlinePaddings.start}px` : undefined) }),
                ...(endElement && { pe: endOffset ?? (inlinePaddings?.end ? `${inlinePaddings.end}px` : undefined) }),
                // hide input value and placeholder for the first render
                value: inlinePaddings ? child.props.value : undefined,
                placeholder: inlinePaddings ? child.props.placeholder : undefined,
            });
        })}
        {endElement && (<react_1.InputElement placement="end" ref={endElementRef} px={0} color="input.element" {...endElementProps}>
            {endElement}
          </react_1.InputElement>)}
      </react_1.Group>);
});
exports.InputGroup.displayName = 'InputGroup';
