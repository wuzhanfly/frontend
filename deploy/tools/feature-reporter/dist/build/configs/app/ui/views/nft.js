"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("configs/app/utils");
const marketplaces = (() => {
    const marketplaces = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_NFT_MARKETPLACES')) || [];
    const isValid = marketplaces.every(marketplace => marketplace.collection_url || marketplace.instance_url);
    if (!isValid) {
        return [];
    }
    return marketplaces;
})();
const config = Object.freeze({
    marketplaces,
    verifiedFetch: {
        isEnabled: (0, utils_1.getEnvValue)('NEXT_PUBLIC_HELIA_VERIFIED_FETCH_ENABLED') === 'false' ? false : true,
    },
});
exports.default = config;
