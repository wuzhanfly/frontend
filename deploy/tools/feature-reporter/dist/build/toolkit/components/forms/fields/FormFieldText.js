"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldText = void 0;
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const field_1 = require("../../../chakra/field");
const input_1 = require("../../../chakra/input");
const input_group_1 = require("../../../chakra/input-group");
const textarea_1 = require("../../../chakra/textarea");
const getFormFieldErrorText_1 = require("../utils/getFormFieldErrorText");
const FormFieldTextContent = ({ name, placeholder, rules, onBlur, group, inputProps, asComponent, size: sizeProp, disabled, floating: floatingProp, controllerProps, ...restProps }) => {
    const defaultSize = asComponent === 'Textarea' ? '2xl' : 'lg';
    const size = sizeProp || defaultSize;
    const floating = floatingProp !== undefined ? floatingProp : size === defaultSize;
    const { control } = (0, react_hook_form_1.useFormContext)();
    const { field, fieldState, formState } = (0, react_hook_form_1.useController)({
        control,
        name,
        rules: { ...rules, required: restProps.required },
        ...controllerProps,
    });
    const handleBlur = react_1.default.useCallback(() => {
        field.onBlur();
        onBlur?.();
    }, [field, onBlur]);
    const input = asComponent === 'Textarea' ? (<textarea_1.Textarea {...field} autoComplete="off" flexGrow={1} {...inputProps} onBlur={handleBlur}/>) : (<input_1.Input {...field} autoComplete="off" 
    // for non-floating field label, we pass placeholder to the input component
    placeholder={!floating ? placeholder : undefined} {...inputProps} onBlur={handleBlur}/>);
    const content = group ? (<input_group_1.InputGroup {...group} endElement={typeof group.endElement === 'function' ? group.endElement({ field }) : group.endElement}>
      {input}
    </input_group_1.InputGroup>) : input;
    return (<field_1.Field 
    // for floating field label, we pass placeholder value to the label
    label={floating ? placeholder : undefined} errorText={(0, getFormFieldErrorText_1.getFormFieldErrorText)(fieldState.error)} invalid={Boolean(fieldState.error)} disabled={formState.isSubmitting || disabled} size={size} floating={floating} {...restProps}>
      {content}
    </field_1.Field>);
};
exports.FormFieldText = react_1.default.memo(FormFieldTextContent);
