"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getConfirmationString;
function getConfirmationString(durations) {
    if (durations.length === 0) {
        return '';
    }
    const [lower, upper] = durations.map((time) => time / 1000);
    if (!upper) {
        return `Confirmed within ${lower.toLocaleString()} secs`;
    }
    if (lower === 0) {
        return `Confirmed within <= ${upper.toLocaleString()} secs`;
    }
    return `Confirmed within ${lower.toLocaleString()} - ${upper.toLocaleString()} secs`;
}
