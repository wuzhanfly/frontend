"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
// config file will be downloaded at run-time and saved in the public folder
const widgets = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_ADDRESS_3RD_PARTY_WIDGETS'));
const configUrl = (0, utils_1.getExternalAssetFilePath)('NEXT_PUBLIC_ADDRESS_3RD_PARTY_WIDGETS_CONFIG_URL');
const title = 'Address 3rd party widgets';
const config = (() => {
    if (widgets && widgets.length > 0 && configUrl) {
        return Object.freeze({
            title,
            isEnabled: true,
            widgets,
            configUrl,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
