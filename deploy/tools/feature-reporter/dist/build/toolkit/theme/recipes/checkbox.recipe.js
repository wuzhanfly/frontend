"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipe = void 0;
const react_1 = require("@chakra-ui/react");
const checkmark_recipe_1 = require("./checkmark.recipe");
exports.recipe = (0, react_1.defineSlotRecipe)({
    slots: ['root', 'control', 'label'],
    className: 'chakra-checkbox',
    base: {
        root: {
            display: 'inline-flex',
            gap: '2',
            alignItems: 'center',
            verticalAlign: 'top',
            position: 'relative',
            cursor: 'pointer',
            _disabled: {
                cursor: 'disabled',
            },
            _readOnly: {
                cursor: 'default',
            },
        },
        control: checkmark_recipe_1.recipe.base,
        label: {
            fontWeight: 'normal',
            userSelect: 'none',
            flexGrow: 1,
            _disabled: {
                opacity: 'control.disabled',
            },
        },
    },
    variants: {
        size: {
            md: {
                root: { gap: '2' },
                label: { textStyle: 'md' },
                control: checkmark_recipe_1.recipe.variants?.size?.md,
            },
        },
        variant: {
            solid: {
                control: checkmark_recipe_1.recipe.variants?.variant?.solid,
            },
        },
    },
    defaultVariants: {
        variant: 'solid',
        size: 'md',
    },
});
