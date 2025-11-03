"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldCheckboxGroup = void 0;
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const checkbox_1 = require("../../../chakra/checkbox");
const FormFieldCheckboxGroupContent = (props) => {
    const { name, options, disabled, controllerProps, itemProps, rules, onChange, ...rest } = props;
    const { control } = (0, react_hook_form_1.useFormContext)();
    const { field, formState } = (0, react_hook_form_1.useController)({
        control,
        name,
        rules,
        ...controllerProps,
    });
    const handleChange = react_1.default.useCallback((value) => {
        field.onChange(value);
        onChange?.();
    }, [field, onChange]);
    return (<checkbox_1.CheckboxGroup ref={field.ref} name={field.name} value={field.value} onValueChange={handleChange} disabled={formState.isSubmitting || disabled} {...rest}>
      {options.map(({ value, label }) => (<checkbox_1.Checkbox key={value} value={value} {...itemProps}>
          {label}
        </checkbox_1.Checkbox>))}
    </checkbox_1.CheckboxGroup>);
};
exports.FormFieldCheckboxGroup = react_1.default.memo(FormFieldCheckboxGroupContent);
