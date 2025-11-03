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
exports.default = useGetCsrfToken;
const react_query_1 = require("@tanstack/react-query");
const buildUrl_1 = __importDefault(require("lib/api/buildUrl"));
const isNeedProxy_1 = __importDefault(require("lib/api/isNeedProxy"));
const useApiQuery_1 = require("lib/api/useApiQuery");
const cookies = __importStar(require("lib/cookies"));
const useFetch_1 = __importDefault(require("lib/hooks/useFetch"));
function useGetCsrfToken() {
    const nodeApiFetch = (0, useFetch_1.default)();
    return (0, react_query_1.useQuery)({
        queryKey: (0, useApiQuery_1.getResourceKey)('general:csrf'),
        queryFn: async () => {
            if (!(0, isNeedProxy_1.default)()) {
                const url = (0, buildUrl_1.default)('general:csrf');
                const apiResponse = await fetch(url, { credentials: 'include' });
                const csrfFromHeader = apiResponse.headers.get('x-bs-account-csrf');
                if (!csrfFromHeader) {
                    // I am not sure should we log this error or not
                    // so I commented it out for now
                    // rollbar?.warn('Client fetch failed', {
                    //   resource: 'csrf',
                    //   status_code: 500,
                    //   status_text: 'Unable to obtain csrf token from header',
                    // });
                    return;
                }
                return { token: csrfFromHeader };
            }
            return nodeApiFetch('/node-api/csrf');
        },
        enabled: Boolean(cookies.get(cookies.NAMES.API_TOKEN)),
    });
}
