"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipe = void 0;
const react_1 = require("@chakra-ui/react");
exports.recipe = (0, react_1.defineRecipe)({
    base: {
        display: 'flex',
        gap: 0,
        borderRadius: 'sm',
        overflow: 'hidden',
        _disabled: {
            opacity: 'control.disabled',
        },
        minWidth: 'auto',
    },
    variants: {
        visual: {
            plain: {
                bg: 'transparent',
                color: 'closeButton.fg',
                border: 'none',
                _hover: {
                    bg: 'transparent',
                    color: 'hover',
                },
            },
        },
        size: {
            md: { boxSize: 5 },
        },
    },
    defaultVariants: {
        size: 'md',
        visual: 'plain',
    },
});
