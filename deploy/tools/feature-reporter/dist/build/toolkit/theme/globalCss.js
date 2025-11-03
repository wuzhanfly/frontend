"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_entity_1 = __importDefault(require("./globals/address-entity"));
const entity_1 = __importDefault(require("./globals/entity"));
const recaptcha_1 = __importDefault(require("./globals/recaptcha"));
const scrollbar_1 = __importDefault(require("./globals/scrollbar"));
const webkitAutofillOverrides = {
    WebkitTextFillColor: 'var(--chakra-colors-input-fg)',
    '-webkit-box-shadow': '0 0 0px 1000px var(--chakra-colors-input-bg) inset',
    transition: 'background-color 5000s ease-in-out 0s',
};
const webkitAutofillRules = {
    '&:-webkit-autofill': webkitAutofillOverrides,
    '&:-webkit-autofill:hover': webkitAutofillOverrides,
    '&:-webkit-autofill:focus': webkitAutofillOverrides,
};
const globalCss = {
    body: {
        bg: 'global.body.bg',
        color: 'global.body.fg',
        WebkitTapHighlightColor: 'transparent',
        fontVariantLigatures: 'no-contextual',
        focusRingStyle: 'hidden',
    },
    mark: {
        bg: 'global.mark.bg',
        color: 'inherit',
    },
    'svg *::selection': {
        color: 'none',
        background: 'none',
    },
    form: {
        w: '100%',
    },
    input: {
        // hide number input arrows in Google Chrome
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
        },
        ...webkitAutofillRules,
    },
    textarea: {
        ...webkitAutofillRules,
    },
    select: {
        ...webkitAutofillRules,
    },
    ...recaptcha_1.default,
    ...scrollbar_1.default,
    ...entity_1.default,
    ...address_entity_1.default,
};
exports.default = globalCss;
