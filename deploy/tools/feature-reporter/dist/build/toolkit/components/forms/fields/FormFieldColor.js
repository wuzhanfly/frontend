"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldColor = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const field_1 = require("../../../chakra/field");
const input_1 = require("../../../chakra/input");
const input_group_1 = require("../../../chakra/input-group");
const getFormFieldErrorText_1 = require("../utils/getFormFieldErrorText");
const color_1 = require("../validators/color");
const FormFieldColorContent = ({ name, placeholder, rules, onBlur, group, inputProps, size = 'lg', disabled, sampleDefaultBgColor, controllerProps, ...restProps }) => {
    const { control } = (0, react_hook_form_1.useFormContext)();
    const { field, fieldState, formState } = (0, react_hook_form_1.useController)({
        control,
        name,
        rules: {
            ...rules,
            required: restProps.required,
            validate: color_1.colorValidator,
            maxLength: 7,
        },
        ...controllerProps,
    });
    const [value, setValue] = react_2.default.useState('');
    const handleChange = react_2.default.useCallback((event) => {
        const nextValue = (() => {
            const value = event.target.value;
            if (value) {
                if (value.length === 1 && value[0] !== '#') {
                    return `#${value}`;
                }
            }
            return value;
        })();
        setValue(nextValue);
        field.onChange(nextValue);
    }, [field]);
    const handleBlur = react_2.default.useCallback(() => {
        field.onBlur();
        onBlur?.();
    }, [field, onBlur]);
    const endElement = (<react_1.Circle size="30px" bgColor={field.value && (0, color_1.colorValidator)(field.value) === true ? field.value : sampleDefaultBgColor} borderColor="gray.300" borderWidth="1px" mx="15px"/>);
    return (<field_1.Field label={placeholder} errorText={(0, getFormFieldErrorText_1.getFormFieldErrorText)(fieldState.error)} invalid={Boolean(fieldState.error)} disabled={formState.isSubmitting || disabled} size={size} floating {...restProps}>
      <input_group_1.InputGroup {...group} endElement={endElement}>
        <input_1.Input {...field} autoComplete="off" onBlur={handleBlur} onChange={handleChange} value={value} {...inputProps}/>
      </input_group_1.InputGroup>
    </field_1.Field>);
};
exports.FormFieldColor = react_2.default.memo(FormFieldColorContent);
