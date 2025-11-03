"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update;
const generate_1 = __importDefault(require("./generate"));
function update(route, apiData) {
    const { title, description } = (0, generate_1.default)(route, apiData);
    window.document.title = title;
    window.document.querySelector('meta[name="description"]')?.setAttribute('content', description);
}
