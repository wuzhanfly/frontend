"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("configs/app/utils");
const config = Object.freeze({
    hideScamTokensEnabled: (0, utils_1.getEnvValue)('NEXT_PUBLIC_VIEWS_TOKEN_SCAM_TOGGLE_ENABLED') === 'true',
});
exports.default = config;
