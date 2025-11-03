"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const es_toolkit_1 = require("es-toolkit");
const app_1 = __importDefault(require("configs/app"));
// for easy .env update
// const NETWORK_EXPLORERS = JSON.stringify([
//   {
//     title: 'Anyblock',
//     baseUrl: 'https://explorer.anyblock.tools',
//     paths: {
//       tx: '/ethereum/ethereum/goerli/transaction',
//       address: '/ethereum/ethereum/goerli/address'
//     },
//   },
//   {
//     title: 'Etherscan',
//     baseUrl: 'https://goerli.etherscan.io/',
//     paths: {
//       tx: '/tx',
//       address: '/address',
//     },
//   },
// ]).replaceAll('"', '\'');
const stripTrailingSlash = (str) => str[str.length - 1] === '/' ? str.slice(0, -1) : str;
const addLeadingSlash = (str) => str[0] === '/' ? str : '/' + str;
const networkExplorers = (() => {
    return app_1.default.UI.explorers.items.map((explorer) => ({
        ...explorer,
        baseUrl: stripTrailingSlash(explorer.baseUrl),
        paths: (0, es_toolkit_1.mapValues)(explorer.paths, (value) => value ? stripTrailingSlash(addLeadingSlash(value)) : value),
    }));
})();
exports.default = networkExplorers;
