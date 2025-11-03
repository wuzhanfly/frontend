"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const value = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_ADDRESS_USERNAME_TAG'));
function checkApiUrlTemplate(apiUrlTemplate) {
    try {
        const testUrl = apiUrlTemplate.replace('{address}', '0x0000000000000000000000000000000000000000');
        new URL(testUrl).toString();
        return true;
    }
    catch (error) {
        return false;
    }
}
const title = 'User profile API';
const config = (() => {
    if (value && checkApiUrlTemplate(value.api_url_template)) {
        return Object.freeze({
            title,
            isEnabled: true,
            apiUrlTemplate: value.api_url_template,
            tagLinkTemplate: value.tag_link_template,
            tagIcon: value.tag_icon,
            tagBgColor: value.tag_bg_color,
            tagTextColor: value.tag_text_color,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
