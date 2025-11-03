"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getTabName;
const es_toolkit_1 = require("es-toolkit");
function getTabName(tab) {
    return tab !== '' ? (0, es_toolkit_1.capitalize)(tab.replaceAll('_', ' ')) : 'Default';
}
