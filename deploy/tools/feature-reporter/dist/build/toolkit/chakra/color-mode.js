"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorModeProvider = ColorModeProvider;
exports.useColorMode = useColorMode;
exports.useColorModeValue = useColorModeValue;
const next_themes_1 = require("next-themes");
const React = __importStar(require("react"));
const app_1 = __importDefault(require("configs/app"));
function ColorModeProvider(props) {
    return (<next_themes_1.ThemeProvider attribute="class" scriptProps={{ 'data-cfasync': 'false' }} defaultTheme={app_1.default.UI.colorTheme.default?.colorMode} disableTransitionOnChange {...props}/>);
}
function useColorMode() {
    const { resolvedTheme, setTheme } = (0, next_themes_1.useTheme)();
    const toggleColorMode = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };
    return {
        colorMode: resolvedTheme,
        setColorMode: setTheme,
        toggleColorMode,
    };
}
function useColorModeValue(light, dark) {
    const { colorMode } = useColorMode();
    return colorMode === 'dark' ? dark : light;
}
