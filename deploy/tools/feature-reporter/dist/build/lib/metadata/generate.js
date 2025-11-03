"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
const app_1 = __importDefault(require("configs/app"));
const getNetworkTitle_1 = __importDefault(require("lib/networks/getNetworkTitle"));
const units_1 = require("lib/units");
const compileValue_1 = __importDefault(require("./compileValue"));
const getCanonicalUrl_1 = __importDefault(require("./getCanonicalUrl"));
const getPageOgType_1 = __importDefault(require("./getPageOgType"));
const templates = __importStar(require("./templates"));
function generate(route, apiData = null) {
    const idCap = route.pathname === '/essential-dapps/[id]' && typeof route.query?.id === 'string' ?
        route.query.id.charAt(0).toUpperCase() + route.query.id.slice(1) : undefined;
    const params = {
        ...route.query,
        ...apiData,
        network_name: app_1.default.chain.name,
        network_title: (0, getNetworkTitle_1.default)(),
        network_gwei: units_1.currencyUnits.gwei,
        id_cap: idCap,
    };
    const title = (0, compileValue_1.default)(templates.title.make(route.pathname, Boolean(apiData)), params);
    const description = (0, compileValue_1.default)(templates.description.make(route.pathname, Boolean(apiData)), params);
    const pageOgType = (0, getPageOgType_1.default)(route.pathname);
    return {
        title: title,
        description,
        opengraph: {
            title: title,
            description: pageOgType !== 'Regular page' ? app_1.default.meta.og.description : '',
            imageUrl: pageOgType !== 'Regular page' ? app_1.default.meta.og.imageUrl : '',
        },
        canonical: (0, getCanonicalUrl_1.default)(route.pathname),
    };
}
