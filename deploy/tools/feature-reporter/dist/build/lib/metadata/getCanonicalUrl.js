"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCanonicalUrl;
const app_1 = __importDefault(require("configs/app"));
const CANONICAL_ROUTES = [
    '/',
    '/txs',
    '/ops',
    '/verified-contracts',
    '/name-services',
    '/withdrawals',
    '/tokens',
    '/stats',
    '/api-docs',
    '/gas-tracker',
    '/apps',
];
function getCanonicalUrl(pathname) {
    if (CANONICAL_ROUTES.includes(pathname)) {
        return app_1.default.app.baseUrl + pathname;
    }
}
