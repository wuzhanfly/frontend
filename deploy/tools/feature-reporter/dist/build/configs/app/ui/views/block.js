"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("types/views/block");
const utils_1 = require("configs/app/utils");
const blockHiddenFields = (() => {
    const parsedValue = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_BLOCK_HIDDEN_FIELDS')) || [];
    if (!Array.isArray(parsedValue)) {
        return undefined;
    }
    const result = block_1.BLOCK_FIELDS_IDS.reduce((result, item) => {
        result[item] = parsedValue.includes(item);
        return result;
    }, {});
    return result;
})();
const config = Object.freeze({
    hiddenFields: blockHiddenFields,
    pendingUpdateAlertEnabled: (0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_BLOCK_PENDING_UPDATE_ALERT_ENABLED') !== 'false',
});
exports.default = config;
