"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useIsSafeAddress;
const react_query_1 = require("@tanstack/react-query");
const app_1 = __importDefault(require("configs/app"));
const useFetch_1 = __importDefault(require("lib/hooks/useFetch"));
const feature = app_1.default.features.safe;
function useIsSafeAddress(hash) {
    const fetch = (0, useFetch_1.default)();
    const { data } = (0, react_query_1.useQuery)({
        queryKey: ['external:safe_transaction_api', hash],
        queryFn: async () => {
            if (!feature.isEnabled || !hash) {
                return Promise.reject();
            }
            return fetch(`${feature.apiUrl}/${hash}`);
        },
        enabled: feature.isEnabled && Boolean(hash),
        refetchOnMount: false,
    });
    return Boolean(data);
}
