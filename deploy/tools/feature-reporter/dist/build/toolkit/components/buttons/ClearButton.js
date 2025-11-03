"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearButton = void 0;
const react_1 = __importDefault(require("react"));
const close_button_1 = require("../../chakra/close-button");
const ClearButton = ({ disabled, visible = true, ...rest }) => {
    return (<close_button_1.CloseButton disabled={disabled || !visible} aria-label="Clear" title="Clear" opacity={visible ? 1 : 0} visibility={visible ? 'visible' : 'hidden'} color={{ _light: 'gray.300', _dark: 'whiteAlpha.300' }} {...rest}/>);
};
exports.ClearButton = ClearButton;
