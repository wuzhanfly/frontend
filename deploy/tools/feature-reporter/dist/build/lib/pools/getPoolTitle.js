"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolTitle = void 0;
const getPoolTitle = (pool) => {
    return `${pool.base_token_symbol} / ${pool.quote_token_symbol} ${pool.fee ? `(${pool.fee}%)` : ''}`;
};
exports.getPoolTitle = getPoolTitle;
