"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
exports.default = useQueryClientConfig;
const react_query_1 = require("@tanstack/react-query");
const react_1 = __importDefault(require("react"));
const getErrorObjPayload_1 = __importDefault(require("lib/errors/getErrorObjPayload"));
const getErrorObjStatusCode_1 = __importDefault(require("lib/errors/getErrorObjStatusCode"));
const retry = (failureCount, error) => {
    const errorPayload = (0, getErrorObjPayload_1.default)(error);
    const status = errorPayload?.status || (0, getErrorObjStatusCode_1.default)(error);
    if (status && status >= 400 && status < 500) {
        // don't do retry for client error responses
        return false;
    }
    return failureCount < 2;
};
exports.retry = retry;
function useQueryClientConfig() {
    const [queryClient] = react_1.default.useState(() => new react_query_1.QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: exports.retry,
                throwOnError: (error, query) => {
                    const status = (0, getErrorObjStatusCode_1.default)(error);
                    // we don't catch error only for "Too many requests" response
                    if (status !== 429) {
                        return false;
                    }
                    const EXTERNAL_API_RESOURCES = [
                        'general:contract_solidity_scan_report',
                        'general:address_xstar_score',
                        'general:address_3rd_party_info',
                        'general:noves_transaction',
                        'general:noves_address_history',
                        'general:noves_describe_txs',
                        // these resources are not proxied by the backend
                        'external:safe_transaction_api',
                        'external:gas_hawk_saving_potential',
                    ];
                    const isExternalApiResource = EXTERNAL_API_RESOURCES.some((resource) => query.queryKey[0] === resource);
                    return !isExternalApiResource;
                },
            },
        },
    }));
    return queryClient;
}
