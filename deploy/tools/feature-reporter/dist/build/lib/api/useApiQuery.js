"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourceKey = getResourceKey;
exports.default = useApiQuery;
const react_query_1 = require("@tanstack/react-query");
const multichain_1 = __importDefault(require("configs/multichain"));
const multichain_2 = require("lib/contexts/multichain");
const useApiFetch_1 = __importDefault(require("./useApiFetch"));
function getResourceKey(resource, { pathParams, queryParams, chainSlug } = {}) {
    if (pathParams || queryParams) {
        return [resource, chainSlug, { ...pathParams, ...queryParams }].filter(Boolean);
    }
    return [resource, chainSlug].filter(Boolean);
}
function useApiQuery(resource, { queryOptions, pathParams, queryParams, fetchParams, logError, chainSlug, chain: chainProp } = {}) {
    const apiFetch = (0, useApiFetch_1.default)();
    const { chain } = (0, multichain_2.useMultichainContext)() || (chainProp && { chain: chainProp }) ||
        { chain: chainSlug ? (0, multichain_1.default)()?.chains.find((chain) => chain.slug === chainSlug) : undefined };
    return (0, react_query_1.useQuery)({
        queryKey: queryOptions?.queryKey || getResourceKey(resource, { pathParams, queryParams, chainSlug: chain?.slug }),
        queryFn: async ({ signal }) => {
            // all errors and error typing is handled by react-query
            // so error response will never go to the data
            // that's why we are safe here to do type conversion "as Promise<ResourcePayload<R>>"
            return apiFetch(resource, { pathParams, queryParams, chain, logError, fetchParams: { ...fetchParams, signal } });
        },
        ...queryOptions,
    });
}
