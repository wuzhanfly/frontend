"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formatLanguageName;
function formatLanguageName(language) {
    return language.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}
