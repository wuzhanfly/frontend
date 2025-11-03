"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldSelectAsync = void 0;
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const select_1 = require("../../../chakra/select");
const getFormFieldErrorText_1 = require("../utils/getFormFieldErrorText");
const FormFieldSelectAsyncContent = (props) => {
    const { name, rules, size = 'lg', controllerProps, ...rest } = props;
    const { control } = (0, react_hook_form_1.useFormContext)();
    const { field, fieldState, formState } = (0, react_hook_form_1.useController)({
        control,
        name,
        rules,
        ...controllerProps,
    });
    const isDisabled = formState.isSubmitting;
    const handleChange = react_1.default.useCallback(({ value }) => {
        field.onChange(value);
    }, [field]);
    const handleBlur = react_1.default.useCallback(() => {
        field.onBlur();
    }, [field]);
    return (<select_1.SelectAsync ref={field.ref} name={field.name} value={field.value} onBlur={field.onBlur} onValueChange={handleChange} onInteractOutside={handleBlur} disabled={isDisabled} invalid={Boolean(fieldState.error)} errorText={(0, getFormFieldErrorText_1.getFormFieldErrorText)(fieldState.error)} size={size} positioning={{ sameWidth: true }} {...rest}/>);
};
exports.FormFieldSelectAsync = react_1.default.memo(FormFieldSelectAsyncContent);
