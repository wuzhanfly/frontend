"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentLoader = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
exports.ContentLoader = react_2.default.memo(({ text, ...props }) => {
    return (<react_1.Box display="inline-block" {...props}>
      <react_1.Box width="100%" height="6px" position="relative" _after={{
            content: `" "`,
            position: 'absolute',
            width: '60px',
            height: '6px',
            animation: `fromLeftToRight 700ms ease-in-out infinite alternate`,
            left: '0%',
            top: 0,
            backgroundColor: 'blue.300',
            borderRadius: 'full',
        }}/>
      <react_1.Text mt={6} color="text.secondary">
        {text || 'Loading data, please wait...'}
      </react_1.Text>
    </react_1.Box>);
});
