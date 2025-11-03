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
exports.default = useMixpanelInit;
const es_toolkit_1 = require("es-toolkit");
const mixpanel_browser_1 = __importDefault(require("mixpanel-browser"));
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const react_device_detect_1 = require("react-device-detect");
const app_1 = __importDefault(require("configs/app"));
const cookies = __importStar(require("lib/cookies"));
const dayjs_1 = __importDefault(require("lib/date/dayjs"));
const getQueryParamString_1 = __importDefault(require("lib/router/getQueryParamString"));
const userProfile = __importStar(require("./userProfile"));
function useMixpanelInit() {
    const [isInited, setIsInited] = react_1.default.useState(false);
    const router = (0, router_1.useRouter)();
    const debugFlagQuery = react_1.default.useRef((0, getQueryParamString_1.default)(router.query._mixpanel_debug));
    react_1.default.useEffect(() => {
        const feature = app_1.default.features.mixpanel;
        if (!feature.isEnabled) {
            return;
        }
        const debugFlagCookie = cookies.get(cookies.NAMES.MIXPANEL_DEBUG);
        const mixpanelConfig = {
            debug: Boolean(debugFlagQuery.current || debugFlagCookie),
            persistence: 'localStorage',
            ...feature.configOverrides,
        };
        const isAuth = Boolean(cookies.get(cookies.NAMES.API_TOKEN));
        const uuid = cookies.get(cookies.NAMES.UUID);
        mixpanel_browser_1.default.init(feature.projectToken, mixpanelConfig);
        mixpanel_browser_1.default.register({
            'Chain id': app_1.default.chain.id,
            Environment: app_1.default.app.isDev ? 'Dev' : 'Prod',
            Authorized: isAuth,
            'Viewport width': window.innerWidth,
            'Viewport height': window.innerHeight,
            Language: window.navigator.language,
            'Device type': (0, es_toolkit_1.capitalize)(react_device_detect_1.deviceType),
            'User id': uuid,
        });
        mixpanel_browser_1.default.identify(uuid);
        userProfile.set({
            'Device Type': (0, es_toolkit_1.capitalize)(react_device_detect_1.deviceType),
            ...(isAuth ? { 'With Account': true } : {}),
        });
        userProfile.setOnce({
            'First Time Join': (0, dayjs_1.default)().toISOString(),
        });
        setIsInited(true);
        if (debugFlagQuery.current && !debugFlagCookie) {
            cookies.set(cookies.NAMES.MIXPANEL_DEBUG, 'true');
        }
    }, []);
    return isInited;
}
