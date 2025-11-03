"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldSwitch = void 0;
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const switch_1 = require("../../../chakra/switch");
const FormFieldSwitchContent = ({ name, placeholder, onCheckedChange, rules, controllerProps, disabled, ...rest }) => {
    const { control } = (0, react_hook_form_1.useFormContext)();
    const { field, formState } = (0, react_hook_form_1.useController)({
        control,
        name,
        rules,
        ...controllerProps,
    });
    const handleCheckedChange = react_1.default.useCallback(({ checked }) => {
        field.onChange(checked);
        onCheckedChange?.({ checked });
    }, [field, onCheckedChange]);
    return (<switch_1.Switch name={field.name} checked={field.value} onCheckedChange={handleCheckedChange} disabled={formState.isSubmitting || disabled} inputProps={{ onBlur: field.onBlur }} {...rest}>
      {placeholder}
    </switch_1.Switch>);
};
exports.FormFieldSwitch = react_1.default.memo(FormFieldSwitchContent);
