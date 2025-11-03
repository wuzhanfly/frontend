"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_TYPE_IDS = exports.NFT_TOKEN_TYPE_IDS = exports.TOKEN_TYPES = exports.NFT_TOKEN_TYPES = void 0;
exports.getTokenTypeName = getTokenTypeName;
const app_1 = __importDefault(require("configs/app"));
const tokenStandardName = app_1.default.chain.tokenStandard;
exports.NFT_TOKEN_TYPES = {
    'ERC-721': `${tokenStandardName}-721`,
    'ERC-1155': `${tokenStandardName}-1155`,
    'ERC-404': `${tokenStandardName}-404`,
};
exports.TOKEN_TYPES = {
    'ERC-20': `${tokenStandardName}-20`,
    ...exports.NFT_TOKEN_TYPES,
};
exports.NFT_TOKEN_TYPE_IDS = ['ERC-721', 'ERC-1155', 'ERC-404'];
exports.TOKEN_TYPE_IDS = ['ERC-20', ...exports.NFT_TOKEN_TYPE_IDS];
function getTokenTypeName(typeId) {
    return exports.TOKEN_TYPES[typeId];
}
