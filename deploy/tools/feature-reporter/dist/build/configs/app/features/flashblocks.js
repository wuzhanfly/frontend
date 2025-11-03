"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const megaEth_1 = __importDefault(require("./megaEth"));
const title = 'Flashblocks';
const socketUrl = (0, utils_1.getEnvValue)('NEXT_PUBLIC_FLASHBLOCKS_SOCKET_URL');
const config = (() => {
    if (megaEth_1.default.isEnabled && megaEth_1.default.socketUrl.rpc) {
        return Object.freeze({
            title,
            isEnabled: true,
            socketUrl: megaEth_1.default.socketUrl.rpc,
            type: 'megaEth',
            name: 'mini-block',
        });
    }
    if (socketUrl) {
        return Object.freeze({
            title,
            isEnabled: true,
            socketUrl,
            type: 'optimism',
            name: 'flashblock',
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
