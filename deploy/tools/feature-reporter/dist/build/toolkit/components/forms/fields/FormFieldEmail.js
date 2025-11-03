"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldEmail = void 0;
const react_1 = __importDefault(require("react"));
const email_1 = require("../validators/email");
const FormFieldText_1 = require("./FormFieldText");
const FormFieldEmailContent = (props) => {
    const rules = react_1.default.useMemo(() => ({
        ...props.rules,
        pattern: email_1.EMAIL_REGEXP,
    }), [props.rules]);
    return (<FormFieldText_1.FormFieldText {...props} placeholder={props.placeholder || 'Email'} rules={rules}/>);
};
exports.FormFieldEmail = react_1.default.memo(FormFieldEmailContent);
