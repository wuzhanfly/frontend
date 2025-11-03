"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clusters_1 = require("types/api/clusters");
const pageUtils_1 = require("./pageUtils");
describe('pageUtils', () => {
    describe('getViewModeOrderBy', () => {
        it('should return RANK_ASC for leaderboard view regardless of search', () => {
            expect((0, pageUtils_1.getViewModeOrderBy)('leaderboard', false)).toBe(clusters_1.ClustersOrderBy.RANK_ASC);
            expect((0, pageUtils_1.getViewModeOrderBy)('leaderboard', true)).toBe(clusters_1.ClustersOrderBy.RANK_ASC);
        });
        it('should return NAME_ASC for directory view with search term', () => {
            expect((0, pageUtils_1.getViewModeOrderBy)('directory', true)).toBe(clusters_1.ClustersOrderBy.NAME_ASC);
        });
        it('should return CREATED_AT_DESC for directory view without search term', () => {
            expect((0, pageUtils_1.getViewModeOrderBy)('directory', false)).toBe(clusters_1.ClustersOrderBy.CREATED_AT_DESC);
        });
    });
    describe('shouldShowDirectoryView', () => {
        it('should return true for directory view mode', () => {
            expect((0, pageUtils_1.shouldShowDirectoryView)('directory', false)).toBe(true);
            expect((0, pageUtils_1.shouldShowDirectoryView)('directory', true)).toBe(true);
        });
        it('should return true for leaderboard mode with search term', () => {
            expect((0, pageUtils_1.shouldShowDirectoryView)('leaderboard', true)).toBe(true);
        });
        it('should return false for leaderboard mode without search term', () => {
            expect((0, pageUtils_1.shouldShowDirectoryView)('leaderboard', false)).toBe(false);
        });
    });
    describe('transformLeaderboardData', () => {
        const mockLeaderboardData = {
            result: {
                data: [
                    { name: 'cluster1', rank: 1 },
                    { name: 'cluster2', rank: 2 },
                ],
            },
        };
        it('should return empty array when showDirectoryView is true', () => {
            expect((0, pageUtils_1.transformLeaderboardData)(mockLeaderboardData, true)).toEqual([]);
        });
        it('should return empty array when data is null', () => {
            expect((0, pageUtils_1.transformLeaderboardData)(null, false)).toEqual([]);
        });
        it('should return transformed data when valid', () => {
            const result = (0, pageUtils_1.transformLeaderboardData)(mockLeaderboardData, false);
            expect(result).toEqual([
                { name: 'cluster1', rank: 1 },
                { name: 'cluster2', rank: 2 },
            ]);
        });
        it('should return empty array for invalid data structure', () => {
            expect((0, pageUtils_1.transformLeaderboardData)({ invalid: 'data' }, false)).toEqual([]);
            expect((0, pageUtils_1.transformLeaderboardData)({ result: { data: 'not-array' } }, false)).toEqual([]);
        });
    });
    describe('transformAddressDataToDirectory', () => {
        const mockAddressData = [
            {
                name: 'test-cluster',
                isTestnet: false,
                createdAt: '2023-01-01',
                owner: '0x123',
                totalWeiAmount: '1000',
                updatedAt: '2023-01-02',
                updatedBy: '0x456',
                clusterId: 'test-cluster-id',
                expiresAt: '2024-01-01',
            },
        ];
        const mockClusterDetails = {
            result: {
                data: {
                    wallets: [
                        { chainIds: ['1', '137'] },
                        { chainIds: ['1', '56'] },
                    ],
                },
            },
        };
        it('should transform address data with unique chain IDs', () => {
            const result = (0, pageUtils_1.transformAddressDataToDirectory)(mockAddressData, mockClusterDetails);
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                name: 'test-cluster',
                isTestnet: false,
                createdAt: '2023-01-01',
                owner: '0x123',
                totalWeiAmount: '1000',
                updatedAt: '2023-01-02',
                updatedBy: '0x456',
                chainIds: ['1', '137', '56'],
            });
        });
        it('should handle missing cluster details', () => {
            const result = (0, pageUtils_1.transformAddressDataToDirectory)(mockAddressData, null);
            expect(result[0].chainIds).toEqual([]);
        });
        it('should handle empty wallets array', () => {
            const emptyDetails = { result: { data: { wallets: [] } } };
            const result = (0, pageUtils_1.transformAddressDataToDirectory)(mockAddressData, emptyDetails);
            expect(result[0].chainIds).toEqual([]);
        });
    });
    describe('transformFullDirectoryData', () => {
        it('should return empty array when showDirectoryView is false', () => {
            const result = (0, pageUtils_1.transformFullDirectoryData)({}, {}, 'address', false);
            expect(result).toEqual([]);
        });
        it('should return empty array when data is null', () => {
            const result = (0, pageUtils_1.transformFullDirectoryData)(null, {}, 'address', true);
            expect(result).toEqual([]);
        });
        it('should transform address-type data', () => {
            const mockData = {
                result: {
                    data: [{ name: 'cluster1', owner: '0x123' }],
                },
            };
            const mockDetails = {
                result: { data: { wallets: [{ chainIds: ['1'] }] } },
            };
            const result = (0, pageUtils_1.transformFullDirectoryData)(mockData, mockDetails, 'address', true);
            expect(result).toHaveLength(1);
            expect(result[0].name).toBe('cluster1');
        });
        it('should transform cluster_name-type data', () => {
            const mockData = {
                result: {
                    data: {
                        items: [{ name: 'cluster1' }, { name: 'cluster2' }],
                    },
                },
            };
            const result = (0, pageUtils_1.transformFullDirectoryData)(mockData, {}, 'cluster_name', true);
            expect(result).toEqual([{ name: 'cluster1' }, { name: 'cluster2' }]);
        });
    });
    describe('applyDirectoryPagination', () => {
        const mockData = Array.from({ length: 100 }, (_, i) => ({ name: `cluster${i}` }));
        it('should apply pagination for address input type', () => {
            const result = (0, pageUtils_1.applyDirectoryPagination)(mockData, 'address', 2, 20);
            expect(result).toHaveLength(20);
            expect(result[0].name).toBe('cluster20');
            expect(result[19].name).toBe('cluster39');
        });
        it('should return all data for cluster_name input type', () => {
            const result = (0, pageUtils_1.applyDirectoryPagination)(mockData, 'cluster_name', 2, 20);
            expect(result).toHaveLength(100);
            expect(result[0].name).toBe('cluster0');
        });
        it('should handle last page correctly', () => {
            const result = (0, pageUtils_1.applyDirectoryPagination)(mockData, 'address', 5, 20);
            expect(result).toHaveLength(20);
            expect(result[0].name).toBe('cluster80');
        });
        it('should handle page beyond data length', () => {
            const result = (0, pageUtils_1.applyDirectoryPagination)(mockData, 'address', 10, 20);
            expect(result).toHaveLength(0);
        });
    });
    describe('calculateHasNextPage', () => {
        const mockDirectoryData = {
            result: {
                data: {
                    total: 100,
                },
            },
        };
        it('should return true for address type with more data', () => {
            const result = (0, pageUtils_1.calculateHasNextPage)({}, 0, 200, true, 'address', 2, false, 50);
            expect(result).toBe(true);
        });
        it('should return false for address type at end', () => {
            const result = (0, pageUtils_1.calculateHasNextPage)({}, 0, 100, true, 'address', 2, false, 50);
            expect(result).toBe(false);
        });
        it('should return false for cluster_name type with search term', () => {
            const result = (0, pageUtils_1.calculateHasNextPage)(mockDirectoryData, 0, 0, true, 'cluster_name', 1, true, 50);
            expect(result).toBe(false);
        });
        it('should return true for cluster_name type without search and more pages', () => {
            const result = (0, pageUtils_1.calculateHasNextPage)(mockDirectoryData, 0, 0, true, 'cluster_name', 1, false, 50);
            expect(result).toBe(true);
        });
        it('should return true for leaderboard with full page', () => {
            const result = (0, pageUtils_1.calculateHasNextPage)({}, 50, 0, false, 'cluster_name', 1, false, 50);
            expect(result).toBe(true);
        });
        it('should return false for leaderboard with partial page', () => {
            const result = (0, pageUtils_1.calculateHasNextPage)({}, 25, 0, false, 'cluster_name', 1, false, 50);
            expect(result).toBe(false);
        });
    });
    describe('isValidViewMode', () => {
        it('should return true for valid view modes', () => {
            expect((0, pageUtils_1.isValidViewMode)('leaderboard')).toBe(true);
            expect((0, pageUtils_1.isValidViewMode)('directory')).toBe(true);
        });
        it('should return false for invalid view modes', () => {
            expect((0, pageUtils_1.isValidViewMode)('invalid')).toBe(false);
            expect((0, pageUtils_1.isValidViewMode)('')).toBe(false);
            expect((0, pageUtils_1.isValidViewMode)('grid')).toBe(false);
        });
    });
    describe('getDefaultViewMode', () => {
        it('should return directory as default', () => {
            expect((0, pageUtils_1.getDefaultViewMode)()).toBe('directory');
        });
    });
    describe('getCurrentDataLength', () => {
        it('should return directory data length when showing directory view', () => {
            expect((0, pageUtils_1.getCurrentDataLength)(true, 25, 50)).toBe(25);
        });
        it('should return leaderboard data length when showing leaderboard view', () => {
            expect((0, pageUtils_1.getCurrentDataLength)(false, 25, 50)).toBe(50);
        });
        it('should handle zero lengths', () => {
            expect((0, pageUtils_1.getCurrentDataLength)(true, 0, 10)).toBe(0);
            expect((0, pageUtils_1.getCurrentDataLength)(false, 10, 0)).toBe(0);
        });
    });
});
