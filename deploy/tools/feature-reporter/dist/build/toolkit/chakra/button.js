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
exports.ButtonGroupRadio = exports.ButtonGroup = exports.Button = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const skeleton_1 = require("./skeleton");
exports.Button = React.forwardRef(function Button(props, ref) {
    const { loading, disabled, loadingText, children, expanded, selected, highlighted, loadingSkeleton = false, ...rest } = props;
    const content = (() => {
        if (loading && !loadingText) {
            return (<>
            <react_1.AbsoluteCenter display="inline-flex">
              <react_1.Spinner size="inherit" color="inherit"/>
            </react_1.AbsoluteCenter>
            <react_1.Span opacity={0}>{children}</react_1.Span>
          </>);
        }
        if (loading && loadingText) {
            return (<>
            <react_1.Spinner size="inherit" color="inherit"/>
            {loadingText}
          </>);
        }
        return children;
    })();
    return (<skeleton_1.Skeleton loading={loadingSkeleton} asChild ref={ref}>
        <react_1.Button {...(expanded ? { 'data-expanded': true } : {})} {...(selected ? { 'data-selected': true } : {})} {...(highlighted ? { 'data-highlighted': true } : {})} {...(loading ? { 'data-loading': true } : {})} {...(loadingSkeleton ? { 'data-loading-skeleton': true } : {})} disabled={!loadingSkeleton && (loading || disabled)} {...rest}>
          {content}
        </react_1.Button>
      </skeleton_1.Skeleton>);
});
exports.ButtonGroup = React.forwardRef(function ButtonGroup(props, ref) {
    const { ...rest } = props;
    return (<react_1.ButtonGroup ref={ref} {...rest}/>);
});
exports.ButtonGroupRadio = React.forwardRef(function ButtonGroupRadio(props, ref) {
    const { children, onChange, variant = 'segmented', defaultValue, loading = false, equalWidth = false, ...rest } = props;
    const firstChildValue = React.useMemo(() => {
        const firstChild = Array.isArray(children) ? children[0] : undefined;
        return typeof firstChild?.props.value === 'string' ? firstChild.props.value : undefined;
    }, [children]);
    const [value, setValue] = React.useState(defaultValue ?? firstChildValue);
    const handleItemClick = React.useCallback((event) => {
        const value = event.currentTarget.value;
        setValue(value);
        onChange?.(value);
    }, [onChange]);
    const clonedChildren = React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            onClick: handleItemClick,
            selected: value === child.props.value,
            variant,
        });
    });
    const childrenLength = React.Children.count(children);
    return (<skeleton_1.Skeleton loading={loading}>
        <react_1.ButtonGroup ref={ref} gap={0} {...(equalWidth ? {
        display: 'grid',
        gridTemplateColumns: `repeat(${childrenLength}, 1fr)`,
    } : {})} {...rest}>
          {clonedChildren}
        </react_1.ButtonGroup>
      </skeleton_1.Skeleton>);
});
