"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heading = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
exports.Heading = react_2.default.forwardRef(function Heading(props, ref) {
    const { level, ...rest } = props;
    const textStyle = (() => {
        switch (level) {
            case '1':
                return { base: 'heading.md', lg: 'heading.xl' };
            case '2':
                return { base: 'heading.sm', lg: 'heading.lg' };
            case '3':
                return { base: 'heading.xs', lg: 'heading.md' };
        }
    })();
    const as = (() => {
        switch (level) {
            case '1':
                return 'h1';
            case '2':
                return 'h2';
            case '3':
                return 'h3';
        }
    })();
    return <react_1.Heading ref={ref} color="heading" textStyle={textStyle} as={as} {...rest}/>;
});
