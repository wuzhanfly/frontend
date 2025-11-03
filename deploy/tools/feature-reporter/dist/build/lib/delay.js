"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = delay;
function delay(time) {
    return new Promise((resolve) => window.setTimeout(resolve, time));
}
