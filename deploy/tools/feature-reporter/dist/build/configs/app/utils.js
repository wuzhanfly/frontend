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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildExternalAssetFilePath = exports.getExternalAssetFilePath = exports.parseEnvJson = exports.getEnvValue = exports.replaceQuotes = void 0;
const isBrowser_1 = require("toolkit/utils/isBrowser");
const regexp = __importStar(require("toolkit/utils/regexp"));
const replaceQuotes = (value) => value?.replaceAll('\'', '"');
exports.replaceQuotes = replaceQuotes;
const getEnvValue = (envName) => {
    // eslint-disable-next-line no-restricted-properties
    const envs = ((0, isBrowser_1.isBrowser)() ? window.__envs : process.env) ?? {};
    if ((0, isBrowser_1.isBrowser)() && envs.NEXT_PUBLIC_APP_INSTANCE === 'pw') {
        const storageValue = localStorage.getItem(envName);
        if (typeof storageValue === 'string') {
            return storageValue;
        }
    }
    return (0, exports.replaceQuotes)(envs[envName]);
};
exports.getEnvValue = getEnvValue;
const parseEnvJson = (env) => {
    try {
        return JSON.parse(env || 'null');
    }
    catch (error) {
        return null;
    }
};
exports.parseEnvJson = parseEnvJson;
const getExternalAssetFilePath = (envName) => {
    const parsedValue = (0, exports.getEnvValue)(envName);
    if (!parsedValue) {
        return;
    }
    return (0, exports.buildExternalAssetFilePath)(envName, parsedValue);
};
exports.getExternalAssetFilePath = getExternalAssetFilePath;
const buildExternalAssetFilePath = (name, value) => {
    try {
        const fileName = name.replace(/^NEXT_PUBLIC_/, '').replace(/_URL$/, '').toLowerCase();
        const fileExtension = getAssetFileExtension(value);
        if (!fileExtension) {
            throw new Error('Cannot get file path');
        }
        return `/assets/configs/${fileName}.${fileExtension}`;
    }
    catch (error) {
        return;
    }
};
exports.buildExternalAssetFilePath = buildExternalAssetFilePath;
function getAssetFileExtension(value) {
    try {
        const url = new URL(value);
        return url.pathname.match(regexp.FILE_EXTENSION)?.[1];
    }
    catch (error) {
        return (0, exports.parseEnvJson)(value) ? 'json' : undefined;
    }
}
