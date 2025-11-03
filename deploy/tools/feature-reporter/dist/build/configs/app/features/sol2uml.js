"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apis_1 = __importDefault(require("../apis"));
const title = 'Solidity to UML diagrams';
const config = (() => {
    if (apis_1.default.visualize) {
        return Object.freeze({
            title,
            isEnabled: true,
        });
    }
    return Object.freeze({
        title,
        isEnabled: false,
    });
})();
exports.default = config;
