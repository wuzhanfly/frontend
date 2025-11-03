"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useFetch;
const react_1 = __importDefault(require("react"));
const isBodyAllowed_1 = __importDefault(require("lib/api/isBodyAllowed"));
const rollbar_1 = require("lib/rollbar");
function useFetch() {
    const rollbar = (0, rollbar_1.useRollbar)();
    return react_1.default.useCallback((path, params, meta) => {
        const _body = params?.body;
        const isFormData = _body instanceof FormData;
        const withBody = (0, isBodyAllowed_1.default)(params?.method);
        const body = (() => {
            if (!withBody) {
                return;
            }
            if (isFormData) {
                return _body;
            }
            return JSON.stringify(_body);
        })();
        const reqParams = {
            ...params,
            body,
            headers: {
                ...(withBody && !isFormData ? { 'Content-type': 'application/json' } : undefined),
                ...params?.headers,
            },
        };
        return fetch(path, reqParams).then(response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            if (!response.ok) {
                const error = {
                    status: response.status,
                    statusText: response.statusText,
                    rateLimits: {
                        bypassOptions: response.headers.get('bypass-429-option'),
                        reset: response.headers.get('x-ratelimit-reset'),
                    },
                };
                if (meta?.logError && rollbar) {
                    rollbar.warn('Client fetch failed', {
                        resource: meta?.resource,
                        status_code: error.status,
                        status_text: error.statusText,
                    });
                }
                if (!isJson) {
                    return response.text().then((textError) => Promise.reject({
                        ...error,
                        payload: textError,
                    }));
                }
                return response.json().then((jsonError) => Promise.reject({
                    ...error,
                    payload: jsonError,
                }), () => {
                    return Promise.reject(error);
                });
            }
            else {
                if (isJson) {
                    return response.json();
                }
                return Promise.resolve();
            }
        });
    }, [rollbar]);
}
