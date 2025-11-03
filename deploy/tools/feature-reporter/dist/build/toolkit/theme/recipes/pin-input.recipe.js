"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipe = void 0;
const react_1 = require("@chakra-ui/react");
const entries_1 = require("../utils/entries");
const input_recipe_1 = require("./input.recipe");
const { variants } = input_recipe_1.recipe;
exports.recipe = (0, react_1.defineSlotRecipe)({
    slots: ['input'],
    base: {
        input: {
            ...input_recipe_1.recipe.base,
            textAlign: 'center',
            width: 'var(--input-height)',
        },
    },
    variants: {
        size: {
            md: {
                input: {
                    boxSize: 10,
                    borderRadius: 'base',
                },
            },
        },
        variant: (0, entries_1.mapEntries)(variants.variant, (key, value) => [
            key,
            { input: value },
        ]),
    },
    defaultVariants: {
        size: 'md',
        variant: 'outline',
    },
});
