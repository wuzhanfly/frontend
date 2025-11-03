"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClusterPagination = useClusterPagination;
const router_1 = require("next/router");
const react_1 = require("react");
const getQueryParamString_1 = __importDefault(require("lib/router/getQueryParamString"));
const useQueryParams_1 = require("lib/router/useQueryParams");
function useClusterPagination(hasNextPage, isLoading) {
    const router = (0, router_1.useRouter)();
    const { updateQuery } = (0, useQueryParams_1.useQueryParams)();
    const page = parseInt((0, getQueryParamString_1.default)(router.query.page) || '1', 10);
    const onNextPageClick = (0, react_1.useCallback)(() => {
        updateQuery({ page: (page + 1).toString() });
    }, [updateQuery, page]);
    const onPrevPageClick = (0, react_1.useCallback)(() => {
        updateQuery({ page: page === 2 ? undefined : (page - 1).toString() });
    }, [updateQuery, page]);
    const resetPage = (0, react_1.useCallback)(() => {
        updateQuery({ page: undefined });
    }, [updateQuery]);
    const pagination = (0, react_1.useMemo)(() => ({
        page,
        onNextPageClick,
        onPrevPageClick,
        resetPage,
        hasPages: page > 1,
        hasNextPage,
        canGoBackwards: page > 1,
        isLoading,
        isVisible: page > 1 || hasNextPage,
    }), [page, onNextPageClick, onPrevPageClick, resetPage, hasNextPage, isLoading]);
    return {
        page,
        pagination,
    };
}
