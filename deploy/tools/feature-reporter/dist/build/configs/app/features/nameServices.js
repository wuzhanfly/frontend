"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = __importDefault(require("../apis"));
const utils_1 = require("../utils");
const title = 'Name services integration';
const config = (() => {
    if (apis_1.default.bens || apis_1.default.clusters) {
        return Object.freeze({
            title,
            isEnabled: true,
            ens: {
                isEnabled: apis_1.default.bens ? true : false,
            },
            clusters: {
                isEnabled: apis_1.default.clusters ? true : false,
                cdnUrl: (0, utils_1.getEnvValue)('NEXT_PUBLIC_CLUSTERS_CDN_URL') || 'https://cdn.clusters.xyz',
            },
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
