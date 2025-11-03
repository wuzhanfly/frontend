"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textStyles = exports.fonts = exports.HEADING_TYPEFACE = exports.BODY_TYPEFACE = void 0;
const app_1 = __importDefault(require("configs/app"));
exports.BODY_TYPEFACE = app_1.default.UI.fonts.body?.name ?? 'Inter, InterFallback';
exports.HEADING_TYPEFACE = app_1.default.UI.fonts.heading?.name ?? 'Poppins';
exports.fonts = {
    heading: { value: `${exports.HEADING_TYPEFACE}, sans-serif` },
    body: { value: `${exports.BODY_TYPEFACE}, sans-serif` },
};
exports.textStyles = {
    heading: {
        xl: {
            value: {
                fontSize: '32px',
                lineHeight: '40px',
                fontWeight: '500',
                letterSpacing: '-0.5px',
                fontFamily: 'heading',
            },
        },
        lg: {
            value: {
                fontSize: '24px',
                lineHeight: '32px',
                fontWeight: '500',
                fontFamily: 'heading',
            },
        },
        md: {
            value: {
                fontSize: '18px',
                lineHeight: '24px',
                fontWeight: '500',
                fontFamily: 'heading',
            },
        },
        sm: {
            value: {
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: '500',
                fontFamily: 'heading',
            },
        },
        xs: {
            value: {
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '600',
                fontFamily: 'heading',
            },
        },
    },
    text: {
        xl: {
            value: {
                fontSize: '20px',
                lineHeight: '28px',
                fontWeight: '400',
                fontFamily: 'body',
            },
        },
        md: {
            value: {
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: '400',
                fontFamily: 'body',
            },
        },
        sm: {
            value: {
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '400',
                fontFamily: 'body',
            },
        },
        xs: {
            value: {
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '400',
                fontFamily: 'body',
            },
        },
    },
};
