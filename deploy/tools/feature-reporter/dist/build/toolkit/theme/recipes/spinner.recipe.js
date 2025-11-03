"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipe = void 0;
const react_1 = require("@chakra-ui/react");
exports.recipe = (0, react_1.defineRecipe)({
    base: {
        display: 'inline-block',
        borderColor: 'selected.option.bg',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderRadius: 'full',
        width: 'var(--spinner-size)',
        height: 'var(--spinner-size)',
        animation: 'spin',
        animationDuration: 'slowest',
        '--spinner-track-color': '{colors.spinner.track}',
        borderBottomColor: 'var(--spinner-track-color)',
        borderInlineStartColor: 'var(--spinner-track-color)',
    },
    variants: {
        size: {
            inherit: { '--spinner-size': '1em' },
            xs: { '--spinner-size': 'sizes.3' },
            sm: { '--spinner-size': 'sizes.4' },
            md: { '--spinner-size': 'sizes.5' },
            lg: { '--spinner-size': 'sizes.8' },
            xl: { '--spinner-size': 'sizes.10' },
        },
    },
    defaultVariants: {
        size: 'md',
    },
});
