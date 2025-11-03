"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getValuesArrayFromQuery;
function getValuesArrayFromQuery(val) {
    if (val === undefined) {
        return;
    }
    const valArray = [];
    if (typeof val === 'string') {
        valArray.push(...val.split(','));
    }
    if (Array.isArray(val)) {
        if (!val.length) {
            return;
        }
        val.forEach(el => valArray.push(...el.split(',')));
    }
    return valArray;
}
