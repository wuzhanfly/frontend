"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const utils_1 = require("./utils");
const defaultImageUrl = '/static/og_image.png';
const meta = Object.freeze({
    promoteBlockscoutInTitle: (0, utils_1.getEnvValue)('NEXT_PUBLIC_PROMOTE_BLOCKSCOUT_IN_TITLE') === 'false' ? false : true,
    og: {
        description: (0, utils_1.getEnvValue)('NEXT_PUBLIC_OG_DESCRIPTION') || '',
        imageUrl: app_1.default.baseUrl + ((0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_OG_IMAGE_URL') || defaultImageUrl),
        enhancedDataEnabled: (0, utils_1.getEnvValue)('NEXT_PUBLIC_OG_ENHANCED_DATA_ENABLED') === 'true',
    },
    seo: {
        enhancedDataEnabled: (0, utils_1.getEnvValue)('NEXT_PUBLIC_SEO_ENHANCED_DATA_ENABLED') === 'true',
    },
});
exports.default = meta;
