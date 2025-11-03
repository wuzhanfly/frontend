"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isMetaKey;
function isMetaKey(event) {
    return event.metaKey || event.getModifierState('Meta');
}
