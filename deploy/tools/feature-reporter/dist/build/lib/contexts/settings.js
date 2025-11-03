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
exports.SettingsContext = void 0;
exports.SettingsContextProvider = SettingsContextProvider;
exports.useSettingsContext = useSettingsContext;
const react_1 = __importDefault(require("react"));
const address_1 = require("types/views/address");
const cookies = __importStar(require("lib/cookies"));
const app_1 = require("./app");
exports.SettingsContext = react_1.default.createContext(null);
function SettingsContextProvider({ children }) {
    const { cookies: appCookies } = (0, app_1.useAppContext)();
    const initialAddressFormat = cookies.get(cookies.NAMES.ADDRESS_FORMAT, appCookies);
    const [addressFormat, setAddressFormat] = react_1.default.useState(initialAddressFormat && address_1.ADDRESS_FORMATS.includes(initialAddressFormat) ? initialAddressFormat : 'base16');
    const [timeFormat, setTimeFormat] = react_1.default.useState(cookies.get(cookies.NAMES.TIME_FORMAT, appCookies) || 'relative');
    const toggleAddressFormat = react_1.default.useCallback(() => {
        setAddressFormat(prev => {
            const nextValue = prev === 'base16' ? 'bech32' : 'base16';
            cookies.set(cookies.NAMES.ADDRESS_FORMAT, nextValue);
            return nextValue;
        });
    }, []);
    const toggleTimeFormat = react_1.default.useCallback(() => {
        setTimeFormat(prev => {
            const nextValue = prev === 'relative' ? 'absolute' : 'relative';
            cookies.set(cookies.NAMES.TIME_FORMAT, nextValue);
            return nextValue;
        });
    }, []);
    const value = react_1.default.useMemo(() => {
        return {
            addressFormat,
            toggleAddressFormat,
            timeFormat,
            toggleTimeFormat,
        };
    }, [addressFormat, toggleAddressFormat, timeFormat, toggleTimeFormat]);
    return (<exports.SettingsContext.Provider value={value}>
      {children}
    </exports.SettingsContext.Provider>);
}
function useSettingsContext(disabled) {
    const context = react_1.default.useContext(exports.SettingsContext);
    if (context === undefined || disabled) {
        return null;
    }
    return context;
}
