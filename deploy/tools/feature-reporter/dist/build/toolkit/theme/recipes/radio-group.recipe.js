"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipe = void 0;
const react_1 = require("@chakra-ui/react");
const radiomark_recipe_1 = require("./radiomark.recipe");
exports.recipe = (0, react_1.defineSlotRecipe)({
    slots: ['item', 'itemControl', 'itemText', 'root'],
    base: {
        root: {
            display: 'flex',
        },
        item: {
            display: 'inline-flex',
            alignItems: 'center',
            position: 'relative',
            fontWeight: 'normal',
            cursor: 'pointer',
            _disabled: {
                cursor: 'disabled',
            },
            _readOnly: {
                cursor: 'default',
            },
        },
        itemControl: radiomark_recipe_1.recipe.base,
        itemText: {
            userSelect: 'none',
            textStyle: 'md',
            _disabled: {
                opacity: 'control.disabled',
            },
        },
    },
    variants: {
        variant: {
            solid: {
                itemControl: radiomark_recipe_1.recipe.variants?.variant?.solid,
            },
        },
        size: {
            md: {
                item: { textStyle: 'md', gap: '2' },
                itemControl: radiomark_recipe_1.recipe.variants?.size?.md,
            },
        },
        orientation: {
            vertical: {
                root: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    rowGap: '12px',
                },
            },
            horizontal: {
                root: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: '32px',
                },
            },
        },
    },
    defaultVariants: {
        size: 'md',
        variant: 'solid',
        orientation: 'vertical',
    },
});
