"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldAddress = void 0;
const react_1 = __importDefault(require("react"));
const address_1 = require("../validators/address");
const FormFieldText_1 = require("./FormFieldText");
const FormFieldAddressContent = (props) => {
    const rules = react_1.default.useMemo(() => ({
        ...props.rules,
        validate: {
            ...props.rules?.validate,
            address: address_1.addressValidator,
        },
    }), [props.rules]);
    return (<FormFieldText_1.FormFieldText {...props} placeholder={props.placeholder || 'Address (0x...)'} rules={rules}/>);
};
exports.FormFieldAddress = react_1.default.memo(FormFieldAddressContent);
