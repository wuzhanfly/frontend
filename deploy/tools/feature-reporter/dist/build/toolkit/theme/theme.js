"use strict";
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
exports.customConfig = void 0;
const react_1 = require("@chakra-ui/react");
const animations_1 = require("./foundations/animations");
const borders = __importStar(require("./foundations/borders"));
const breakpoints_1 = __importDefault(require("./foundations/breakpoints"));
const colors_1 = __importDefault(require("./foundations/colors"));
const durations_1 = __importDefault(require("./foundations/durations"));
const semanticTokens_1 = __importDefault(require("./foundations/semanticTokens"));
const shadows_1 = __importDefault(require("./foundations/shadows"));
const typography_1 = require("./foundations/typography");
const zIndex_1 = __importDefault(require("./foundations/zIndex"));
const globalCss_1 = __importDefault(require("./globalCss"));
const recipes_1 = require("./recipes");
exports.customConfig = (0, react_1.defineConfig)({
    globalCss: globalCss_1.default,
    theme: {
        breakpoints: breakpoints_1.default,
        keyframes: animations_1.keyframes,
        recipes: recipes_1.recipes,
        slotRecipes: recipes_1.slotRecipes,
        semanticTokens: semanticTokens_1.default,
        textStyles: typography_1.textStyles,
        tokens: {
            ...borders,
            colors: colors_1.default,
            durations: durations_1.default,
            fonts: typography_1.fonts,
            shadows: shadows_1.default,
            zIndex: zIndex_1.default,
            fontWeights: {
                normal: { value: '400' },
                medium: { value: '500' },
                semibold: { value: '600' },
                bold: { value: '700' },
            },
        },
    },
});
exports.default = (0, react_1.createSystem)(react_1.defaultConfig, exports.customConfig);
