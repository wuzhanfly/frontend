"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getItemIndex;
const DEFAULT_PAGE_SIZE = 50;
function getItemIndex(index, page, pageSize = DEFAULT_PAGE_SIZE) {
    return (page - 1) * pageSize + index + 1;
}
;
