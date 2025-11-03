"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = void 0;
const react_1 = __importDefault(require("react"));
const button_1 = require("./button");
exports.IconButton = react_1.default.forwardRef(function IconButton(props, ref) {
    const { size, variant = 'plain', children, ...rest } = props;
    // FIXME: I have to clone the children instead of using _icon props because of style overrides
    // in some pw tests for some reason the _icon style will be applied before the style of child (IconSvg component)
    const child = react_1.default.Children.only(children);
    const clonedChildren = size ? react_1.default.cloneElement(child, { boxSize: size === '2xs_alt' ? 3 : 5 }) : child;
    const sizeStyle = (() => {
        switch (size) {
            case '2xs': {
                return {
                    _icon: { boxSize: 5 },
                    boxSize: 5,
                    borderRadius: 'sm',
                };
            }
            case '2xs_alt': {
                return {
                    _icon: { boxSize: 3 },
                    boxSize: 5,
                    borderRadius: 'sm',
                };
            }
            case 'md': {
                return {
                    _icon: { boxSize: 5 },
                    boxSize: 8,
                };
            }
            default:
                return {};
        }
    })();
    return (<button_1.Button ref={ref} display="inline-flex" justifyContent="center" alignItems="center" p={0} minW="auto" flexShrink="0" variant={variant} {...sizeStyle} {...rest}>
        {clonedChildren}
      </button_1.Button>);
});
