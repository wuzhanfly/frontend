"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BECH_32_SEPARATOR = exports.DATA_PART_REGEXP = void 0;
exports.toBech32Address = toBech32Address;
exports.isBech32Address = isBech32Address;
exports.fromBech32Address = fromBech32Address;
const base_1 = require("@scure/base");
const app_1 = __importDefault(require("configs/app"));
const bytesToHex_1 = __importDefault(require("lib/bytesToHex"));
const hexToBytes_1 = __importDefault(require("lib/hexToBytes"));
exports.DATA_PART_REGEXP = /^[\da-z]{38}$/;
exports.BECH_32_SEPARATOR = '1'; // https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki#bech32
function toBech32Address(hash) {
    if (app_1.default.UI.views.address.hashFormat.bech32Prefix) {
        try {
            const words = base_1.bech32.toWords((0, hexToBytes_1.default)(hash));
            return base_1.bech32.encode(app_1.default.UI.views.address.hashFormat.bech32Prefix, words);
        }
        catch (error) { }
    }
    return hash;
}
function isBech32Address(hash) {
    if (!app_1.default.UI.views.address.hashFormat.bech32Prefix) {
        return false;
    }
    if (!hash.startsWith(`${app_1.default.UI.views.address.hashFormat.bech32Prefix}${exports.BECH_32_SEPARATOR}`)) {
        return false;
    }
    const strippedHash = hash.replace(`${app_1.default.UI.views.address.hashFormat.bech32Prefix}${exports.BECH_32_SEPARATOR}`, '');
    return exports.DATA_PART_REGEXP.test(strippedHash);
}
function fromBech32Address(hash) {
    if (app_1.default.UI.views.address.hashFormat.bech32Prefix) {
        try {
            const { words, prefix } = base_1.bech32.decode(hash);
            if (prefix !== app_1.default.UI.views.address.hashFormat.bech32Prefix) {
                return hash;
            }
            const bytes = base_1.bech32.fromWords(words);
            return (0, bytesToHex_1.default)(bytes);
        }
        catch (error) { }
    }
    return hash;
}
