"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewModeOrderBy = getViewModeOrderBy;
exports.shouldShowDirectoryView = shouldShowDirectoryView;
exports.transformLeaderboardData = transformLeaderboardData;
exports.transformAddressDataToDirectory = transformAddressDataToDirectory;
exports.transformFullDirectoryData = transformFullDirectoryData;
exports.applyDirectoryPagination = applyDirectoryPagination;
exports.calculateHasNextPage = calculateHasNextPage;
exports.isValidViewMode = isValidViewMode;
exports.getDefaultViewMode = getDefaultViewMode;
exports.getCurrentDataLength = getCurrentDataLength;
const clusters_1 = require("types/api/clusters");
function getViewModeOrderBy(viewMode, hasSearchTerm) {
    if (viewMode === 'leaderboard')
        return clusters_1.ClustersOrderBy.RANK_ASC;
    if (hasSearchTerm)
        return clusters_1.ClustersOrderBy.NAME_ASC;
    return clusters_1.ClustersOrderBy.CREATED_AT_DESC;
}
function shouldShowDirectoryView(viewMode, hasSearchTerm) {
    return viewMode === 'directory' || hasSearchTerm;
}
function transformLeaderboardData(data, showDirectoryView) {
    if (!data || showDirectoryView)
        return [];
    if (data && typeof data === 'object' && 'result' in data) {
        const result = data.result;
        if (result && typeof result === 'object' && 'data' in result && Array.isArray(result.data)) {
            return result.data;
        }
    }
    return [];
}
function transformAddressDataToDirectory(addressData, clusterDetails) {
    const clusterDetailsData = clusterDetails &&
        typeof clusterDetails === 'object' &&
        'result' in clusterDetails &&
        clusterDetails.result &&
        typeof clusterDetails.result === 'object' &&
        'data' in clusterDetails.result ? clusterDetails.result.data : null;
    const allChainIds = clusterDetailsData &&
        typeof clusterDetailsData === 'object' &&
        'wallets' in clusterDetailsData &&
        Array.isArray(clusterDetailsData.wallets) ?
        clusterDetailsData.wallets.flatMap((wallet) => {
            if (wallet && typeof wallet === 'object' && 'chainIds' in wallet && Array.isArray(wallet.chainIds)) {
                return wallet.chainIds;
            }
            return [];
        }) : [];
    const uniqueChainIds = [...new Set(allChainIds)];
    return addressData.map((item) => ({
        name: item.name,
        isTestnet: item.isTestnet,
        createdAt: item.createdAt,
        owner: item.owner,
        totalWeiAmount: item.totalWeiAmount,
        updatedAt: item.updatedAt,
        updatedBy: item.updatedBy,
        chainIds: uniqueChainIds,
    }));
}
function transformFullDirectoryData(data, clusterDetails, inputType, showDirectoryView) {
    if (!showDirectoryView || !data)
        return [];
    if (inputType === 'address') {
        const addressData = data &&
            typeof data === 'object' &&
            'result' in data &&
            data.result &&
            typeof data.result === 'object' &&
            'data' in data.result ? data.result.data : null;
        if (addressData && Array.isArray(addressData)) {
            return transformAddressDataToDirectory(addressData, clusterDetails);
        }
    }
    else {
        const apiData = data &&
            typeof data === 'object' &&
            'result' in data &&
            data.result &&
            typeof data.result === 'object' &&
            'data' in data.result ? data.result.data : null;
        if (apiData && typeof apiData === 'object' && 'items' in apiData && Array.isArray(apiData.items)) {
            return apiData.items;
        }
    }
    return [];
}
function applyDirectoryPagination(fullDirectoryData, inputType, page, limit = 50) {
    if (inputType === 'address') {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return fullDirectoryData.slice(startIndex, endIndex);
    }
    return fullDirectoryData;
}
function calculateHasNextPage(data, leaderboardDataLength, fullDirectoryDataLength, showDirectoryView, inputType, page, hasSearchTerm, limit = 50) {
    if (showDirectoryView) {
        if (inputType === 'address') {
            return page * limit < fullDirectoryDataLength;
        }
        else {
            if (hasSearchTerm)
                return false;
            const apiData = data &&
                typeof data === 'object' &&
                'result' in data &&
                data.result &&
                typeof data.result === 'object' &&
                'data' in data.result ? data.result.data : null;
            if (apiData && typeof apiData === 'object' && 'total' in apiData && typeof apiData.total === 'number') {
                return (page * limit) < apiData.total;
            }
            return false;
        }
    }
    return leaderboardDataLength === limit;
}
function isValidViewMode(value) {
    return value === 'leaderboard' || value === 'directory';
}
function getDefaultViewMode() {
    return 'directory';
}
function getCurrentDataLength(showDirectoryView, directoryDataLength, leaderboardDataLength) {
    return showDirectoryView ? directoryDataLength : leaderboardDataLength;
}
