"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClustersData = useClustersData;
const react_1 = __importDefault(require("react"));
const clusters_1 = require("types/api/clusters");
const useApiQuery_1 = __importDefault(require("lib/api/useApiQuery"));
const detectInputType_1 = require("lib/clusters/detectInputType");
const clusters_2 = require("stubs/clusters");
function useClustersData(debouncedSearchTerm, viewMode, page) {
    const ITEMS_PER_PAGE = 50;
    const inputType = react_1.default.useMemo(() => {
        if (!debouncedSearchTerm)
            return 'cluster_name';
        return (0, detectInputType_1.detectInputType)(debouncedSearchTerm);
    }, [debouncedSearchTerm]);
    const showDirectoryView = viewMode === 'directory' || Boolean(debouncedSearchTerm);
    const leaderboardQuery = (0, useApiQuery_1.default)('clusters:get_leaderboard', {
        queryParams: {
            input: JSON.stringify({
                offset: (page - 1) * ITEMS_PER_PAGE,
                limit: ITEMS_PER_PAGE,
                orderBy: clusters_1.ClustersOrderBy.RANK_ASC,
            }),
        },
        queryOptions: {
            enabled: !showDirectoryView,
            placeholderData: (previousData) => {
                if (previousData)
                    return previousData;
                return {
                    result: {
                        data: Array(ITEMS_PER_PAGE).fill(clusters_2.CLUSTER_ITEM),
                    },
                };
            },
        },
    });
    const getDirectoryOrderBy = react_1.default.useMemo(() => {
        if (debouncedSearchTerm) {
            return clusters_1.ClustersOrderBy.NAME_ASC;
        }
        return clusters_1.ClustersOrderBy.CREATED_AT_DESC;
    }, [debouncedSearchTerm]);
    const directoryQuery = (0, useApiQuery_1.default)('clusters:get_directory', {
        queryParams: {
            input: JSON.stringify({
                offset: (page - 1) * ITEMS_PER_PAGE,
                limit: ITEMS_PER_PAGE,
                orderBy: getDirectoryOrderBy,
                query: debouncedSearchTerm || '',
            }),
        },
        queryOptions: {
            enabled: showDirectoryView && inputType === 'cluster_name',
            placeholderData: (previousData) => {
                if (previousData)
                    return previousData;
                return {
                    result: {
                        data: {
                            total: 1000,
                            items: Array(ITEMS_PER_PAGE).fill(clusters_2.CLUSTER_ITEM),
                        },
                    },
                };
            },
        },
    });
    const addressQuery = (0, useApiQuery_1.default)('clusters:get_clusters_by_address', {
        queryParams: {
            input: JSON.stringify({
                address: debouncedSearchTerm,
            }),
        },
        queryOptions: {
            enabled: showDirectoryView && inputType === 'address',
            placeholderData: (previousData) => {
                if (previousData)
                    return previousData;
                return {
                    result: {
                        data: Array(ITEMS_PER_PAGE).fill(clusters_2.CLUSTER_ITEM),
                    },
                };
            },
        },
    });
    const clusterDetailsQuery = (0, useApiQuery_1.default)('clusters:get_cluster_by_id', {
        queryParams: {
            input: JSON.stringify({
                id: addressQuery.data?.result?.data?.[0]?.clusterId || '',
            }),
        },
        queryOptions: {
            enabled: (showDirectoryView &&
                inputType === 'address' &&
                Boolean(addressQuery.data?.result?.data?.[0]?.clusterId)),
        },
    });
    const { data, isError, isPlaceholderData: isLoading } = (() => {
        if (!showDirectoryView)
            return leaderboardQuery;
        if (inputType === 'address')
            return addressQuery;
        return directoryQuery;
    })();
    return {
        data,
        clusterDetails: clusterDetailsQuery.data,
        isError,
        isLoading,
        isClusterDetailsLoading: clusterDetailsQuery.isLoading,
    };
}
