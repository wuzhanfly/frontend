"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClusterSearch = useClusterSearch;
const router_1 = require("next/router");
const useDebounce_1 = __importDefault(require("lib/hooks/useDebounce"));
const getQueryParamString_1 = __importDefault(require("lib/router/getQueryParamString"));
function useClusterSearch() {
    const router = (0, router_1.useRouter)();
    const searchTerm = (0, getQueryParamString_1.default)(router.query.q);
    const debouncedSearchTerm = (0, useDebounce_1.default)(searchTerm || '', 300);
    return {
        searchTerm,
        debouncedSearchTerm,
    };
}
