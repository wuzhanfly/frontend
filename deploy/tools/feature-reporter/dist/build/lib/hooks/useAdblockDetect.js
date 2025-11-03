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
exports.default = useAdblockDetect;
const react_1 = require("react");
const app_1 = __importDefault(require("configs/app"));
const app_2 = require("lib/contexts/app");
const cookies = __importStar(require("lib/cookies"));
const isBrowser_1 = require("toolkit/utils/isBrowser");
const DEFAULT_URL = 'https://request-global.czilladx.com';
// in general, detect should work with any ad-provider url (that is alive)
// but we see some false-positive results in certain browsers
const TEST_URLS = {
    slise: 'https://v1.slise.xyz/serve',
    coinzilla: 'https://request-global.czilladx.com',
    adbutler: 'https://servedbyadbutler.com/app.js',
    none: DEFAULT_URL,
};
const feature = app_1.default.features.adsBanner;
function useAdblockDetect() {
    const hasAdblockCookie = cookies.get(cookies.NAMES.ADBLOCK_DETECTED, (0, app_2.useAppContext)().cookies);
    const provider = feature.isEnabled && feature.provider;
    (0, react_1.useEffect)(() => {
        if ((0, isBrowser_1.isBrowser)() && !hasAdblockCookie && provider) {
            const url = TEST_URLS[provider] || DEFAULT_URL;
            fetch(url, {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-store',
            })
                .then(() => {
                cookies.set(cookies.NAMES.ADBLOCK_DETECTED, 'false', { expires: 1 });
            })
                .catch(() => {
                cookies.set(cookies.NAMES.ADBLOCK_DETECTED, 'true', { expires: 1 });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
