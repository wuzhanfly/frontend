"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tx_1 = require("types/views/tx");
const utils_1 = require("configs/app/utils");
const hiddenFields = (() => {
    const parsedValue = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_TX_HIDDEN_FIELDS')) || [];
    if (!Array.isArray(parsedValue)) {
        return undefined;
    }
    const result = tx_1.TX_FIELDS_IDS.reduce((result, item) => {
        result[item] = parsedValue.includes(item);
        return result;
    }, {});
    return result;
})();
const additionalFields = (() => {
    const parsedValue = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_TX_ADDITIONAL_FIELDS')) || [];
    if (!Array.isArray(parsedValue)) {
        return undefined;
    }
    const result = tx_1.TX_ADDITIONAL_FIELDS_IDS.reduce((result, item) => {
        result[item] = parsedValue.includes(item);
        return result;
    }, {});
    return result;
})();
const config = Object.freeze({
    hiddenFields,
    additionalFields,
    groupedFees: (0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_TX_GROUPED_FEES') === 'true',
});
exports.default = config;
