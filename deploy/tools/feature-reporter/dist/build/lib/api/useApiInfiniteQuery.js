"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useApiInfiniteQuery;
const react_query_1 = require("@tanstack/react-query");
const useApiFetch_1 = __importDefault(require("./useApiFetch"));
const useApiQuery_1 = require("./useApiQuery");
function useApiInfiniteQuery({ resourceName, queryOptions, pathParams, }) {
    const apiFetch = (0, useApiFetch_1.default)();
    return (0, react_query_1.useInfiniteQuery)({
        queryKey: (0, useApiQuery_1.getResourceKey)(resourceName, { pathParams }),
        queryFn: (context) => {
            const queryParams = 'pageParam' in context ? (context.pageParam || undefined) : undefined;
            return apiFetch(resourceName, { pathParams, queryParams });
        },
        initialPageParam: null,
        getNextPageParam: (lastPage) => {
            return lastPage.next_page_params;
        },
        ...queryOptions,
    });
}
