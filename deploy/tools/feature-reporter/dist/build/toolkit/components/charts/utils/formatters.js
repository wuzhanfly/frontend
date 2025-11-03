"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncompleteDataLineSource = void 0;
const getIncompleteDataLineSource = (data) => {
    const result = [];
    for (let index = 0; index < data.length; index++) {
        const current = data[index];
        if (current.isApproximate) {
            const prev = data[index - 1];
            const next = data[index + 1];
            prev && !prev.isApproximate && result.push(prev);
            result.push(current);
            next && !next.isApproximate && result.push(next);
        }
    }
    return result;
};
exports.getIncompleteDataLineSource = getIncompleteDataLineSource;
