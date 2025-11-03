"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const items = (0, utils_1.parseEnvJson)((0, utils_1.getEnvValue)('NEXT_PUBLIC_DEFI_DROPDOWN_ITEMS')) || [];
const title = 'DeFi dropdown';
const config = items.length > 0 ?
    Object.freeze({
        title,
        isEnabled: true,
        items,
    }) :
    Object.freeze({
        title,
        isEnabled: false,
    });
exports.default = config;
