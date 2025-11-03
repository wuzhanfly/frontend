"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCheckedSummedAddress;
const viem_1 = require("viem");
const app_1 = __importDefault(require("configs/app"));
const ERC1191_CHAIN_IDS = [
    '30', // RSK Mainnet
    '31', // RSK Testnet
];
function getCheckedSummedAddress(address) {
    try {
        return (0, viem_1.getAddress)(address, 
        // We need to pass chainId to getAddress to make it work correctly for chains that support ERC-1191
        // https://eips.ethereum.org/EIPS/eip-1191#usage--table
        ERC1191_CHAIN_IDS.includes(app_1.default.chain.id ?? '') ? Number(app_1.default.chain.id) : undefined);
    }
    catch (error) {
        return address;
    }
}
