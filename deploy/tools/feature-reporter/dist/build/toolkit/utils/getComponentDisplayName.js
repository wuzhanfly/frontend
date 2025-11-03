"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getComponentDisplayName;
function getComponentDisplayName(type) {
    if (typeof type === 'string') {
        return;
    }
    if ('displayName' in type) {
        return type.displayName;
    }
}
