"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = exports.c = exports.b = exports.a = exports.SORTING_FIELDS = exports.resourceKey = exports.RESOURCES = void 0;
const admin_1 = require("./services/admin");
const bens_1 = require("./services/bens");
const clusters_1 = require("./services/clusters");
const contractInfo_1 = require("./services/contractInfo");
const general_1 = require("./services/general");
const metadata_1 = require("./services/metadata");
const multichain_1 = require("./services/multichain");
const rewards_1 = require("./services/rewards");
const stats_1 = require("./services/stats");
const tac_operation_lifecycle_1 = require("./services/tac-operation-lifecycle");
const userOps_1 = require("./services/userOps");
const visualize_1 = require("./services/visualize");
const zetaChain_1 = require("./services/zetaChain");
exports.RESOURCES = {
    admin: admin_1.ADMIN_API_RESOURCES,
    bens: bens_1.BENS_API_RESOURCES,
    clusters: clusters_1.CLUSTERS_API_RESOURCES,
    contractInfo: contractInfo_1.CONTRACT_INFO_API_RESOURCES,
    general: general_1.GENERAL_API_RESOURCES,
    metadata: metadata_1.METADATA_API_RESOURCES,
    multichain: multichain_1.MULTICHAIN_API_RESOURCES,
    rewards: rewards_1.REWARDS_API_RESOURCES,
    stats: stats_1.STATS_API_RESOURCES,
    tac: tac_operation_lifecycle_1.TAC_OPERATION_LIFECYCLE_API_RESOURCES,
    userOps: userOps_1.USER_OPS_API_RESOURCES,
    visualize: visualize_1.VISUALIZE_API_RESOURCES,
    zetachain: zetaChain_1.ZETA_CHAIN_API_RESOURCES,
    // external API resources
    // there is no type definition for them, use valibot to parse the response
    external: {
        gas_hawk_saving_potential: {
            path: '/api/v2/gas-hawk-saving-potential',
        },
        safe_transaction_api: {
            path: '',
        },
    },
};
const resourceKey = (x) => x;
exports.resourceKey = resourceKey;
/* eslint-enable @stylistic/indent */
exports.SORTING_FIELDS = ['sort', 'order'];
// TESTS
exports.a = [{
        api_key: '123',
        name: '123',
    }];
exports.b = 'general:addresses';
exports.c = [];
exports.d = {
    chainId: '1',
    address: '123',
};
