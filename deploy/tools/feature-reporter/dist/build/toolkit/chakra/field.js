"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const getComponentDisplayName_1 = __importDefault(require("../utils/getComponentDisplayName"));
const htmlEntities_1 = require("../utils/htmlEntities");
exports.Field = React.forwardRef(function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } = props;
    // A floating field cannot be without a label.
    if (rest.floating && label) {
        const injectedProps = {
            className: 'peer',
            placeholder: ' ',
            size: rest.size,
            floating: rest.floating,
            bgColor: rest.bgColor,
            disabled: rest.disabled,
            readOnly: rest.readOnly,
        };
        const labelElement = (<react_1.Field.Label bgColor={rest.bgColor}>
          {label}
          <react_1.Field.RequiredIndicator fallback={optionalText}/>
          {errorText && (<react_1.Field.ErrorText ml="2px">-{htmlEntities_1.space}{errorText}</react_1.Field.ErrorText>)}
        </react_1.Field.Label>);
        const helperTextElement = helperText && (<react_1.Field.HelperText>{helperText}</react_1.Field.HelperText>);
        const child = React.Children.only(children);
        const isInputGroup = (0, getComponentDisplayName_1.default)(child.type) === 'InputGroup';
        if (isInputGroup) {
            const inputElement = React.cloneElement(React.Children.only(child.props.children), injectedProps);
            const groupInputElement = React.cloneElement(child, {}, inputElement, labelElement);
            return (<react_1.Field.Root pos="relative" w="full" ref={ref} {...rest}>
            {groupInputElement}
            {helperTextElement}
          </react_1.Field.Root>);
        }
        const inputElement = React.cloneElement(child, injectedProps);
        return (<react_1.Field.Root pos="relative" w="full" ref={ref} {...rest}>
          {inputElement}
          {labelElement}
          {helperTextElement}
        </react_1.Field.Root>);
    }
    // Pass size value to the input component
    const injectedProps = {
        size: rest.size,
    };
    const child = React.Children.only(children);
    const clonedChild = React.cloneElement(child, injectedProps);
    return (<react_1.Field.Root ref={ref} {...rest}>
        {label && (<react_1.Field.Label>
            {label}
            <react_1.Field.RequiredIndicator fallback={optionalText}/>
          </react_1.Field.Label>)}
        {clonedChild}
        {helperText && (<react_1.Field.HelperText>{helperText}</react_1.Field.HelperText>)}
        {errorText && (<react_1.Field.ErrorText>{errorText}</react_1.Field.ErrorText>)}
      </react_1.Field.Root>);
});
