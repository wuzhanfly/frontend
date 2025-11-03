"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = Provider;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const theme_1 = __importDefault(require("../theme/theme"));
const color_mode_1 = require("./color-mode");
function Provider(props) {
    return (<react_1.ChakraProvider value={theme_1.default}>
      <color_mode_1.ColorModeProvider {...props}/>
    </react_1.ChakraProvider>);
}
