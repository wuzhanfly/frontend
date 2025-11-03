"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("toolkit/utils/url");
const utils_1 = require("./utils");
const generalApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_API_HOST');
    const apiSchema = (0, utils_1.getEnvValue)('NEXT_PUBLIC_API_PROTOCOL') || 'https';
    const apiPort = (0, utils_1.getEnvValue)('NEXT_PUBLIC_API_PORT');
    const apiEndpoint = [
        apiSchema || 'https',
        '://',
        apiHost,
        apiPort && ':' + apiPort,
    ].filter(Boolean).join('');
    const socketSchema = (0, utils_1.getEnvValue)('NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL') || 'wss';
    const socketEndpoint = [
        socketSchema,
        '://',
        apiHost,
        apiPort && ':' + apiPort,
    ].filter(Boolean).join('');
    return Object.freeze({
        endpoint: apiEndpoint,
        basePath: (0, url_1.stripTrailingSlash)((0, utils_1.getEnvValue)('NEXT_PUBLIC_API_BASE_PATH') || ''),
        socketEndpoint: socketEndpoint,
        host: apiHost ?? '',
        protocol: apiSchema ?? 'https',
        port: apiPort,
    });
})();
const adminApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_ADMIN_SERVICE_API_HOST');
    if (!apiHost) {
        return;
    }
    return Object.freeze({
        endpoint: apiHost,
    });
})();
const bensApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_NAME_SERVICE_API_HOST');
    if (!apiHost) {
        return;
    }
    return Object.freeze({
        endpoint: apiHost,
    });
})();
const contractInfoApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_CONTRACT_INFO_API_HOST');
    if (!apiHost) {
        return;
    }
    return Object.freeze({
        endpoint: apiHost,
    });
})();
const metadataApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_METADATA_SERVICE_API_HOST');
    if (!apiHost) {
        return;
    }
    return Object.freeze({
        endpoint: apiHost,
    });
})();
const rewardsApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_REWARDS_SERVICE_API_HOST');
    if (!apiHost) {
        return;
    }
    return Object.freeze({
        endpoint: apiHost,
    });
})();
const multichainApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_MULTICHAIN_AGGREGATOR_API_HOST');
    if (!apiHost) {
        return;
    }
    try {
        const url = new URL(apiHost);
        return Object.freeze({
            endpoint: apiHost,
            socketEndpoint: `wss://${url.host}`,
            basePath: (0, url_1.stripTrailingSlash)((0, utils_1.getEnvValue)('NEXT_PUBLIC_MULTICHAIN_AGGREGATOR_BASE_PATH') || ''),
        });
    }
    catch (error) {
        return;
    }
})();
const statsApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_STATS_API_HOST');
    if (!apiHost) {
        return;
    }
    return Object.freeze({
        endpoint: apiHost,
        basePath: (0, url_1.stripTrailingSlash)((0, utils_1.getEnvValue)('NEXT_PUBLIC_STATS_API_BASE_PATH') || ''),
    });
})();
const tacApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_TAC_OPERATION_LIFECYCLE_API_HOST');
    if (!apiHost) {
        return;
    }
    return Object.freeze({
        endpoint: apiHost,
    });
})();
const userOpsApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_USER_OPS_INDEXER_API_HOST');
    if (!apiHost) {
        return;
    }
    return Object.freeze({
        endpoint: apiHost,
    });
})();
const visualizeApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_VISUALIZE_API_HOST');
    if (!apiHost) {
        return;
    }
    return Object.freeze({
        endpoint: apiHost,
        basePath: (0, url_1.stripTrailingSlash)((0, utils_1.getEnvValue)('NEXT_PUBLIC_VISUALIZE_API_BASE_PATH') || ''),
    });
})();
const clustersApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_CLUSTERS_API_HOST');
    if (!apiHost) {
        return;
    }
    return Object.freeze({
        endpoint: apiHost,
    });
})();
const zetachainApi = (() => {
    const apiHost = (0, utils_1.getEnvValue)('NEXT_PUBLIC_ZETACHAIN_SERVICE_API_HOST');
    if (!apiHost) {
        return;
    }
    try {
        const url = new URL(apiHost);
        return Object.freeze({
            endpoint: apiHost,
            socketEndpoint: `wss://${url.host}/socket`,
        });
    }
    catch (error) {
        return;
    }
})();
const apis = Object.freeze({
    general: generalApi,
    admin: adminApi,
    bens: bensApi,
    clusters: clustersApi,
    contractInfo: contractInfoApi,
    metadata: metadataApi,
    multichain: multichainApi,
    rewards: rewardsApi,
    stats: statsApi,
    tac: tacApi,
    userOps: userOpsApi,
    visualize: visualizeApi,
    zetachain: zetachainApi,
});
exports.default = apis;
