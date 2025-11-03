"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("jest/lib");
const getQueryParamString_1 = __importDefault(require("lib/router/getQueryParamString"));
const useQueryParams_1 = require("lib/router/useQueryParams");
const useClusterPagination_1 = require("../clusters/useClusterPagination");
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
jest.mock('lib/router/useQueryParams');
jest.mock('lib/router/getQueryParamString');
const { useRouter } = require('next/router');
const mockUseRouter = useRouter;
const mockUseQueryParams = useQueryParams_1.useQueryParams;
const mockGetQueryParamString = getQueryParamString_1.default;
describe('useClusterPagination', () => {
    const mockUpdateQuery = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseRouter.mockReturnValue({
            query: {},
        });
        mockUseQueryParams.mockReturnValue({
            updateQuery: mockUpdateQuery,
        });
    });
    describe('page calculation', () => {
        it('should default to page 1 when no page param', () => {
            mockGetQueryParamString.mockReturnValue('');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            expect(result.current.page).toBe(1);
            expect(result.current.pagination.page).toBe(1);
        });
        it('should parse page from query param', () => {
            mockGetQueryParamString.mockReturnValue('3');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            expect(result.current.page).toBe(3);
            expect(result.current.pagination.page).toBe(3);
        });
        it('should handle invalid page param gracefully', () => {
            mockGetQueryParamString.mockReturnValue('invalid');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            expect(result.current.page).toBeNaN();
        });
    });
    describe('navigation functions', () => {
        beforeEach(() => {
            mockGetQueryParamString.mockReturnValue('2');
        });
        it('should increment page on next click', () => {
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            (0, lib_1.act)(() => {
                result.current.pagination.onNextPageClick();
            });
            expect(mockUpdateQuery).toHaveBeenCalledWith({ page: '3' });
        });
        it('should decrement page on prev click', () => {
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            (0, lib_1.act)(() => {
                result.current.pagination.onPrevPageClick();
            });
            expect(mockUpdateQuery).toHaveBeenCalledWith({ page: undefined });
        });
        it('should handle prev click from page 3', () => {
            mockGetQueryParamString.mockReturnValue('3');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            (0, lib_1.act)(() => {
                result.current.pagination.onPrevPageClick();
            });
            expect(mockUpdateQuery).toHaveBeenCalledWith({ page: '2' });
        });
        it('should reset page to undefined', () => {
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            (0, lib_1.act)(() => {
                result.current.pagination.resetPage();
            });
            expect(mockUpdateQuery).toHaveBeenCalledWith({ page: undefined });
        });
    });
    describe('pagination state', () => {
        it('should set hasPages true when page > 1', () => {
            mockGetQueryParamString.mockReturnValue('2');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            expect(result.current.pagination.hasPages).toBe(true);
        });
        it('should set hasPages false when page = 1', () => {
            mockGetQueryParamString.mockReturnValue('1');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            expect(result.current.pagination.hasPages).toBe(false);
        });
        it('should set canGoBackwards true when page > 1', () => {
            mockGetQueryParamString.mockReturnValue('2');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            expect(result.current.pagination.canGoBackwards).toBe(true);
        });
        it('should set canGoBackwards false when page = 1', () => {
            mockGetQueryParamString.mockReturnValue('1');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            expect(result.current.pagination.canGoBackwards).toBe(false);
        });
        it('should pass through hasNextPage prop', () => {
            mockGetQueryParamString.mockReturnValue('1');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(false, false));
            expect(result.current.pagination.hasNextPage).toBe(false);
        });
        it('should pass through isLoading prop', () => {
            mockGetQueryParamString.mockReturnValue('1');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, true));
            expect(result.current.pagination.isLoading).toBe(true);
        });
    });
    describe('pagination visibility', () => {
        it('should be visible when page > 1', () => {
            mockGetQueryParamString.mockReturnValue('2');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(false, false));
            expect(result.current.pagination.isVisible).toBe(true);
        });
        it('should be visible when hasNextPage is true', () => {
            mockGetQueryParamString.mockReturnValue('1');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            expect(result.current.pagination.isVisible).toBe(true);
        });
        it('should not be visible when page = 1 and no next page', () => {
            mockGetQueryParamString.mockReturnValue('1');
            const { result } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(false, false));
            expect(result.current.pagination.isVisible).toBe(false);
        });
    });
    describe('function stability', () => {
        it('should not recreate functions when dependencies do not change', () => {
            mockGetQueryParamString.mockReturnValue('2');
            const { result, rerender } = (0, lib_1.renderHook)(() => (0, useClusterPagination_1.useClusterPagination)(true, false));
            const firstOnNext = result.current.pagination.onNextPageClick;
            const firstOnPrev = result.current.pagination.onPrevPageClick;
            const firstReset = result.current.pagination.resetPage;
            rerender();
            expect(result.current.pagination.onNextPageClick).toBe(firstOnNext);
            expect(result.current.pagination.onPrevPageClick).toBe(firstOnPrev);
            expect(result.current.pagination.resetPage).toBe(firstReset);
        });
    });
});
