"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = highlightText;
const xss_1 = __importDefault(require("xss"));
const escapeRegExp_1 = __importDefault(require("lib/escapeRegExp"));
function highlightText(text, query) {
    const regex = new RegExp('(' + (0, escapeRegExp_1.default)(query) + ')', 'gi');
    return (0, xss_1.default)(text.replace(regex, '<mark>$1</mark>'));
}
