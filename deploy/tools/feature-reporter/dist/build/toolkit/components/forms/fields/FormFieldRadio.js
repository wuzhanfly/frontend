"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldRadio = void 0;
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const radio_1 = require("../../../chakra/radio");
const FormFieldRadioContent = ({ name, options, itemProps, onValueChange, disabled, controllerProps, ...rest }) => {
    const { control } = (0, react_hook_form_1.useFormContext)();
    const { field, formState } = (0, react_hook_form_1.useController)({
        control,
        name,
        ...controllerProps,
    });
    const handleValueChange = react_1.default.useCallback(({ value }) => {
        field.onChange(value);
        onValueChange?.({ value });
    }, [field, onValueChange]);
    return (<radio_1.RadioGroup ref={field.ref} name={field.name} value={field.value} onValueChange={handleValueChange} disabled={formState.isSubmitting || disabled} {...rest}>
      {options.map(({ value, label }) => (<radio_1.Radio key={value} value={value} inputProps={{ onBlur: field.onBlur }} {...itemProps}>
          {label}
        </radio_1.Radio>))}
    </radio_1.RadioGroup>);
};
exports.FormFieldRadio = react_1.default.memo(FormFieldRadioContent);
