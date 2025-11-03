"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldError = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
exports.FormFieldError = (0, react_1.chakra)(({ message, className }) => {
    return <react_1.Box className={className} color="text.error" textStyle="sm" mt={2} wordBreak="break-word">{message}</react_1.Box>;
});
