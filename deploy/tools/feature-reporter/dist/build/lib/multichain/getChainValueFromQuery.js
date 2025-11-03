"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getChainValueFromQuery;
const multichain_1 = __importDefault(require("configs/multichain"));
const getQueryParamString_1 = __importDefault(require("lib/router/getQueryParamString"));
function getChainValueFromQuery(query) {
    const config = (0, multichain_1.default)();
    if (!config) {
        return undefined;
    }
    const queryParam = (0, getQueryParamString_1.default)(query['chain-slug']);
    return queryParam || config.chains[0].slug;
}
