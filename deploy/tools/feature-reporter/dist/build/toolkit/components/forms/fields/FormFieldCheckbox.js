"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldCheckbox = void 0;
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const checkbox_1 = require("../../../chakra/checkbox");
const FormFieldCheckboxContent = ({ name, label, rules, onChange, readOnly, controllerProps, ...rest }) => {
    const { control } = (0, react_hook_form_1.useFormContext)();
    const { field, formState } = (0, react_hook_form_1.useController)({
        control,
        name,
        rules,
        ...controllerProps,
    });
    const isDisabled = formState.isSubmitting;
    const handleChange = react_1.default.useCallback(({ checked }) => {
        field.onChange(checked);
        onChange?.();
    }, [field, onChange]);
    return (<checkbox_1.Checkbox ref={field.ref} checked={field.value} onCheckedChange={handleChange} size="md" disabled={isDisabled} {...rest}>
      {label}
    </checkbox_1.Checkbox>);
};
exports.FormFieldCheckbox = react_1.default.memo(FormFieldCheckboxContent);
