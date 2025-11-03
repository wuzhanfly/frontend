"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExternalSearchItem = getExternalSearchItem;
const app_1 = __importDefault(require("configs/app"));
const zetaChainFeature = app_1.default.features.zetachain;
function getExternalSearchItem(hash) {
    if (!zetaChainFeature.isEnabled) {
        return null;
    }
    const externalSearchConfig = zetaChainFeature.externalSearchConfig;
    const externalSearchConfigItem = externalSearchConfig.find((item) => {
        try {
            return new RegExp(item.regex).test(hash);
        }
        catch {
            return false;
        }
    });
    if (externalSearchConfigItem) {
        return {
            url: externalSearchConfigItem.template.replace('{hash}', hash),
            name: externalSearchConfigItem.name,
        };
    }
    return null;
}
