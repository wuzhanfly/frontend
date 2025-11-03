"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLUSTERS_API_RESOURCES = void 0;
exports.CLUSTERS_API_RESOURCES = {
    get_clusters_by_address: {
        path: '/v1/trpc/names.getNamesByOwnerAddress',
        pathParams: [],
    },
    get_cluster_by_name: {
        path: '/v1/trpc/names.get',
        pathParams: [],
    },
    get_cluster_by_id: {
        path: '/v1/trpc/clusters.getClusterById',
        pathParams: [],
    },
    get_leaderboard: {
        path: '/v1/trpc/names.leaderboard',
        pathParams: [],
    },
    get_directory: {
        path: '/v1/trpc/names.search',
        pathParams: [],
    },
};
