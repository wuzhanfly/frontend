"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterOwnedClusters = filterOwnedClusters;
exports.getTotalRecordsDisplay = getTotalRecordsDisplay;
exports.getClusterLabel = getClusterLabel;
exports.getClustersToShow = getClustersToShow;
exports.getGridRows = getGridRows;
exports.hasMoreClusters = hasMoreClusters;
function filterOwnedClusters(clusters, ownerAddress) {
    return clusters.filter((cluster) => cluster.owner && cluster.owner.toLowerCase() === ownerAddress.toLowerCase());
}
function getTotalRecordsDisplay(count) {
    return count > 40 ? '40+' : count.toString();
}
function getClusterLabel(count) {
    return count > 1 ? 'Clusters' : 'Cluster';
}
function getClustersToShow(clusters, maxItems = 10) {
    return clusters.slice(0, maxItems);
}
function getGridRows(itemCount, maxRows = 5) {
    return Math.min(itemCount, maxRows);
}
function hasMoreClusters(totalCount, displayCount) {
    return totalCount > displayCount;
}
