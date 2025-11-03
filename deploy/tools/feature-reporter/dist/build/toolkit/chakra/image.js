"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const skeleton_1 = require("./skeleton");
exports.Image = react_2.default.forwardRef(function Image(props, ref) {
    const { fallback, src, onLoad, onError, ...rest } = props;
    const [loading, setLoading] = react_2.default.useState(true);
    const [error, setError] = react_2.default.useState(false);
    const handleLoadError = react_2.default.useCallback((event) => {
        setError(true);
        setLoading(false);
        onError?.(event);
    }, [onError]);
    const handleLoadSuccess = react_2.default.useCallback((event) => {
        setLoading(false);
        onLoad?.(event);
    }, [onLoad]);
    if (!src && fallback) {
        if (react_2.default.isValidElement(fallback)) {
            return react_2.default.cloneElement(fallback, rest);
        }
        return fallback;
    }
    if (error) {
        if (react_2.default.isValidElement(fallback)) {
            return react_2.default.cloneElement(fallback, rest);
        }
        return fallback;
    }
    return (<>
        {loading && <skeleton_1.Skeleton loading {...rest}/>}
        <react_1.Image ref={ref} src={src} onError={handleLoadError} onLoad={handleLoadSuccess} {...rest} display={loading ? 'none' : rest.display || 'block'}/>
      </>);
});
