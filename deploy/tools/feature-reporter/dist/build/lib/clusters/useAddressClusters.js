"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAddressClusters = useAddressClusters;
const app_1 = __importDefault(require("configs/app"));
const useApiQuery_1 = __importDefault(require("lib/api/useApiQuery"));
const feature = app_1.default.features.nameServices;
function useAddressClusters(addressHash, isEnabled = true) {
    return (0, useApiQuery_1.default)('clusters:get_clusters_by_address', {
        queryParams: {
            input: JSON.stringify({
                address: addressHash,
            }),
        },
        queryOptions: {
            enabled: Boolean(addressHash) && feature.isEnabled && feature.clusters.isEnabled && isEnabled,
        },
    });
}
