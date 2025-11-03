"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isNeedProxy;
const app_1 = __importDefault(require("configs/app"));
// FIXME
// I was not able to figure out how to send CORS with credentials from localhost
// unsuccessfully tried different ways, even custom local dev domain
// so for local development we have to use next.js api as proxy server
function isNeedProxy() {
    if (app_1.default.app.useProxy) {
        return true;
    }
    return app_1.default.app.host === 'localhost' && app_1.default.app.host !== app_1.default.apis.general.host;
}
