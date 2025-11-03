"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLOR_THEMES = void 0;
exports.getThemeHexWithOverrides = getThemeHexWithOverrides;
exports.getDefaultColorTheme = getDefaultColorTheme;
const app_1 = __importDefault(require("configs/app"));
const getNestedValue = (obj, property) => {
    const keys = property.split('.');
    let current = obj;
    for (const key of keys) {
        const value = current[key];
        if (value === undefined) {
            return undefined;
        }
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            current = value;
        }
        else {
            return value;
        }
    }
};
function getThemeHexWithOverrides(colorThemeId) {
    const defaultHex = exports.COLOR_THEMES.find((theme) => theme.id === colorThemeId)?.hex;
    if (!defaultHex) {
        return;
    }
    const overrides = app_1.default.UI.colorTheme.overrides;
    if (colorThemeId === 'light') {
        const value = getNestedValue(overrides, 'bg.primary._light.value');
        return typeof value === 'string' ? value : defaultHex;
    }
    if (colorThemeId === 'dark') {
        const value = getNestedValue(overrides, 'bg.primary._dark.value');
        return typeof value === 'string' ? value : defaultHex;
    }
    return defaultHex;
}
;
function getDefaultColorTheme(colorMode) {
    const colorTheme = exports.COLOR_THEMES.filter((theme) => theme.colorMode === colorMode).slice(-1)[0];
    return colorTheme.id;
}
exports.COLOR_THEMES = [
    {
        id: 'light',
        label: 'Light',
        colorMode: 'light',
        hex: '#FFFFFF',
        sampleBg: 'linear-gradient(154deg, #EFEFEF 50%, rgba(255, 255, 255, 0.00) 330.86%)',
    },
    {
        id: 'dim',
        label: 'Dim',
        colorMode: 'dark',
        hex: '#232B37',
        sampleBg: 'linear-gradient(152deg, #232B37 50%, rgba(255, 255, 255, 0.00) 290.71%)',
    },
    {
        id: 'midnight',
        label: 'Midnight',
        colorMode: 'dark',
        hex: '#1B2E48',
        sampleBg: 'linear-gradient(148deg, #1B3F71 50%, rgba(255, 255, 255, 0.00) 312.35%)',
    },
    {
        id: 'dark',
        label: 'Dark',
        colorMode: 'dark',
        hex: '#101112',
        sampleBg: 'linear-gradient(161deg, #000 9.37%, #383838 92.52%)',
    },
];
