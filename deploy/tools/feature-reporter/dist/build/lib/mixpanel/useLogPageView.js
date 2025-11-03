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
exports.default = useLogPageView;
const navigation_1 = require("next/navigation");
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const app_1 = __importDefault(require("configs/app"));
const cookies = __importStar(require("lib/cookies"));
const getQueryParamString_1 = __importDefault(require("lib/router/getQueryParamString"));
const colorTheme_1 = require("lib/settings/colorTheme");
const color_mode_1 = require("toolkit/chakra/color-mode");
const getPageType_1 = __importDefault(require("./getPageType"));
const getTabName_1 = __importDefault(require("./getTabName"));
const logEvent_1 = __importDefault(require("./logEvent"));
const utils_1 = require("./utils");
function useLogPageView(isInited) {
    const router = (0, router_1.useRouter)();
    const pathname = (0, navigation_1.usePathname)();
    const tab = (0, getQueryParamString_1.default)(router.query.tab);
    const page = (0, getQueryParamString_1.default)(router.query.page);
    const id = (0, getQueryParamString_1.default)(router.query.id);
    const { colorMode } = (0, color_mode_1.useColorMode)();
    react_1.default.useEffect(() => {
        if (!app_1.default.features.mixpanel.isEnabled || !isInited) {
            return;
        }
        const cookieColorTheme = cookies.get(cookies.NAMES.COLOR_THEME);
        (0, logEvent_1.default)(utils_1.EventTypes.PAGE_VIEW, {
            'Page type': (0, getPageType_1.default)(router.pathname),
            Tab: (0, getTabName_1.default)(tab),
            Page: page || undefined,
            Source: router.pathname === '/essential-dapps/[id]' ? id : undefined,
            'Color mode': colorMode,
            'Color theme': cookieColorTheme || (0, colorTheme_1.getDefaultColorTheme)(colorMode),
        });
        // these are only deps that should trigger the effect
        // in some scenarios page type is not changing (e.g navigation from one address page to another),
        // but we still want to log page view
        // so we use pathname from 'next/navigation' instead of router.pathname from 'next/router' as deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInited, page, pathname, tab, colorMode]);
}
