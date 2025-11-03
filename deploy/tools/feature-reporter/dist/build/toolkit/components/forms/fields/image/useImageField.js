"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useImageField = useImageField;
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const url_1 = require("../../validators/url");
function useImageField({ name, isRequired, }) {
    const { trigger, formState, control } = (0, react_hook_form_1.useFormContext)();
    const imageLoadError = react_1.default.useRef(false);
    const fieldValue = (0, react_hook_form_1.useWatch)({ name, control, exact: true });
    const fieldError = formState.errors[name];
    const [value, setValue] = react_1.default.useState(fieldValue);
    const validator = react_1.default.useCallback(() => {
        return imageLoadError.current ? 'Unable to load image' : true;
    }, []);
    const onLoad = react_1.default.useCallback(() => {
        imageLoadError.current = false;
        trigger(name);
    }, [name, trigger]);
    const onError = react_1.default.useCallback(() => {
        imageLoadError.current = true;
        trigger(name);
    }, [name, trigger]);
    const onBlur = react_1.default.useCallback(() => {
        if (!isRequired && !fieldValue) {
            imageLoadError.current = false;
            trigger(name);
            setValue(undefined);
            return;
        }
        const isValidUrl = (0, url_1.urlValidator)(fieldValue);
        isValidUrl === true && setValue(fieldValue);
    }, [fieldValue, isRequired, name, trigger]);
    return react_1.default.useMemo(() => {
        return {
            input: {
                isRequired,
                rules: {
                    required: isRequired,
                    validate: {
                        preview: validator,
                    },
                },
                onBlur,
            },
            preview: {
                src: fieldError?.type === 'url' ? undefined : value,
                isInvalid: fieldError?.type === 'preview',
                onLoad,
                onError,
            },
        };
    }, [fieldError?.type, isRequired, onBlur, onError, onLoad, validator, value]);
}
