"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseMetadata;
const attributesParser_1 = __importDefault(require("./metadata/attributesParser"));
function parseMetadata(raw) {
    if (!raw) {
        return;
    }
    const parsed = {};
    if ('name' in raw && typeof raw.name === 'string') {
        parsed.name = raw.name;
    }
    if ('description' in raw && typeof raw.description === 'string') {
        parsed.description = raw.description;
    }
    if ('attributes' in raw && Array.isArray(raw.attributes)) {
        parsed.attributes = (0, attributesParser_1.default)(raw.attributes);
    }
    if (Object.keys(parsed).length === 0) {
        return;
    }
    return parsed;
}
