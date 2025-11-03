"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = __importDefault(require("../apis"));
const utils_1 = require("../utils");
const title = 'ZetaChain transactions';
const chainsConfigUrl = (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_ZETACHAIN_SERVICE_CHAINS_CONFIG_URL');
const externalSearchConfig = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_ZETACHAIN_EXTERNAL_SEARCH_CONFIG'));
const config = (() => {
    if (apis_1.default.zetachain && chainsConfigUrl && externalSearchConfig) {
        return Object.freeze({
            title,
            isEnabled: true,
            chainsConfigUrl,
            externalSearchConfig,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
