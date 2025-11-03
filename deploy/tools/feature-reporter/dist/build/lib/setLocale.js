"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const old = Number.prototype.toLocaleString;
Number.prototype.toLocaleString = function (locale, ...args) {
    return old.call(this, 'en', ...args);
};
