"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const lib_1 = require("jest/lib");
const useClusterSearch_1 = require("./useClusterSearch");
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
const mockUseRouter = router_1.useRouter;
describe('useClusterSearch', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return search term from router query', () => {
        mockUseRouter.mockReturnValue({
            query: { q: 'test-search' },
        });
        const { result } = (0, lib_1.renderHook)(() => (0, useClusterSearch_1.useClusterSearch)());
        expect(result.current.searchTerm).toBe('test-search');
    });
    it('should debounce search term', () => {
        mockUseRouter.mockReturnValue({
            query: { q: 'test' },
        });
        const { result } = (0, lib_1.renderHook)(() => (0, useClusterSearch_1.useClusterSearch)());
        expect(result.current.debouncedSearchTerm).toBe('test');
    });
    it('should handle empty query', () => {
        mockUseRouter.mockReturnValue({
            query: {},
        });
        const { result } = (0, lib_1.renderHook)(() => (0, useClusterSearch_1.useClusterSearch)());
        expect(result.current.searchTerm).toBe('');
        expect(result.current.debouncedSearchTerm).toBe('');
    });
});
