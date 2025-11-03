"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = __importDefault(require("../apis"));
const chain_1 = __importDefault(require("../chain"));
const utils_1 = require("../utils");
const blockchainInteraction_1 = __importDefault(require("./blockchainInteraction"));
// config file will be downloaded at run-time and saved in the public folder
const enabled = (0, utils_1.getEnvValue)('NEXT_PUBLIC_MARKETPLACE_ENABLED');
const configUrl = (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_MARKETPLACE_CONFIG_URL');
const submitFormUrl = (0, utils_1.getEnvValue)('NEXT_PUBLIC_MARKETPLACE_SUBMIT_FORM');
const suggestIdeasFormUrl = (0, utils_1.getEnvValue)('NEXT_PUBLIC_MARKETPLACE_SUGGEST_IDEAS_FORM');
const categoriesUrl = (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_MARKETPLACE_CATEGORIES_URL');
const featuredApp = (0, utils_1.getEnvValue)('NEXT_PUBLIC_MARKETPLACE_FEATURED_APP');
const bannerContentUrl = (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_MARKETPLACE_BANNER_CONTENT_URL');
const bannerLinkUrl = (0, utils_1.getEnvValue)('NEXT_PUBLIC_MARKETPLACE_BANNER_LINK_URL');
const graphLinksUrl = (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_MARKETPLACE_GRAPH_LINKS_URL');
const essentialDappsConfig = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_MARKETPLACE_ESSENTIAL_DAPPS_CONFIG'));
const title = 'Marketplace';
const config = (() => {
    if (enabled === 'true' && chain_1.default.rpcUrls.length > 0 && submitFormUrl) {
        const props = {
            submitFormUrl,
            categoriesUrl,
            suggestIdeasFormUrl,
            featuredApp,
            banner: bannerContentUrl && bannerLinkUrl ? {
                contentUrl: bannerContentUrl,
                linkUrl: bannerLinkUrl,
            } : undefined,
            graphLinksUrl,
            essentialDapps: blockchainInteraction_1.default.isEnabled ? (essentialDappsConfig || undefined) : undefined,
        };
        if (configUrl) {
            return Object.freeze({
                title,
                isEnabled: true,
                configUrl,
                ...props,
            });
        }
        else if (apis_1.default.admin) {
            return Object.freeze({
                title,
                isEnabled: true,
                api: apis_1.default.admin,
                ...props,
            });
        }
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
