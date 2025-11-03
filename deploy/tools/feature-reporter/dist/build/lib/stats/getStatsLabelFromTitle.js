"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getStatsLabelFromTitle;
function getStatsLabelFromTitle(title) {
    return title.replace(/\s*\([^)]*\)\s*$/, '');
}
