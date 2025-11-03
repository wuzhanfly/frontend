"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getChainTooltipText;
function getChainTooltipText(chain, prefix = '') {
    return `${prefix}${chain.config.chain.name} (Chain ID ${chain.config.chain.id})`;
}
