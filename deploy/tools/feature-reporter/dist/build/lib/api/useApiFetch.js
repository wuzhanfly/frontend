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
exports.default = useApiFetch;
const react_query_1 = require("@tanstack/react-query");
const es_toolkit_1 = require("es-toolkit");
const react_1 = __importDefault(require("react"));
const app_1 = __importDefault(require("configs/app"));
const isBodyAllowed_1 = __importDefault(require("lib/api/isBodyAllowed"));
const isNeedProxy_1 = __importDefault(require("lib/api/isNeedProxy"));
const useApiQuery_1 = require("lib/api/useApiQuery");
const cookies = __importStar(require("lib/cookies"));
const useFetch_1 = __importDefault(require("lib/hooks/useFetch"));
const buildUrl_1 = __importDefault(require("./buildUrl"));
const getResourceParams_1 = __importDefault(require("./getResourceParams"));
function needCredentials(apiName) {
    if (!['general'].includes(apiName)) {
        return false;
    }
    // currently, the cookies are used only for the following features
    if (app_1.default.features.account.isEnabled ||
        app_1.default.UI.views.token.hideScamTokensEnabled) {
        return true;
    }
    return false;
}
function useApiFetch() {
    const fetch = (0, useFetch_1.default)();
    const queryClient = (0, react_query_1.useQueryClient)();
    const { token: csrfToken } = queryClient.getQueryData((0, useApiQuery_1.getResourceKey)('general:csrf')) || {};
    return react_1.default.useCallback((resourceName, { pathParams, queryParams, fetchParams, logError, chain } = {}) => {
        const apiToken = cookies.get(cookies.NAMES.API_TOKEN);
        const { api, apiName, resource } = (0, getResourceParams_1.default)(resourceName, chain);
        const url = (0, buildUrl_1.default)(resourceName, pathParams, queryParams, undefined, chain);
        const withBody = (0, isBodyAllowed_1.default)(fetchParams?.method);
        const headers = (0, es_toolkit_1.pickBy)({
            'x-endpoint': (0, isNeedProxy_1.default)() ? api.endpoint : undefined,
            Authorization: ['admin', 'contractInfo'].includes(apiName) ? apiToken : undefined,
            'x-csrf-token': withBody && csrfToken ? csrfToken : undefined,
            ...resource.headers,
            ...fetchParams?.headers,
        }, Boolean);
        return fetch(url, {
            credentials: needCredentials(apiName) ? 'include' : 'same-origin',
            headers,
            ...(fetchParams ? (0, es_toolkit_1.omit)(fetchParams, ['headers']) : {}),
        }, {
            resource: resource.path,
            logError,
        });
    }, [fetch, csrfToken]);
}
