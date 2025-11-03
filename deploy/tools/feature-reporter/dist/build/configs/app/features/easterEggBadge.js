"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const badgeClaimLink = (0, utils_1.getEnvValue)('NEXT_PUBLIC_GAME_BADGE_CLAIM_LINK');
const title = 'Easter egg badge';
const config = (() => {
    if (badgeClaimLink) {
        return Object.freeze({
            title,
            isEnabled: true,
            badgeClaimLink,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
