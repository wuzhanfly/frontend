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
exports.initGrowthBook = void 0;
const growthbook_react_1 = require("@growthbook/growthbook-react");
const app_1 = __importDefault(require("configs/app"));
const mixpanel = __importStar(require("lib/mixpanel"));
const consts_1 = require("./consts");
const initGrowthBook = (uuid) => {
    const feature = app_1.default.features.growthBook;
    if (!feature.isEnabled) {
        return;
    }
    return new growthbook_react_1.GrowthBook({
        apiHost: 'https://cdn.growthbook.io',
        clientKey: feature.clientKey,
        enableDevMode: app_1.default.app.isDev,
        attributes: {
            id: uuid,
            chain_id: app_1.default.chain.id,
        },
        trackingCallback: (experiment, result) => {
            if (isExperimentStarted(experiment.key)) {
                return;
            }
            saveExperimentInStorage(experiment.key);
            mixpanel.logEvent(mixpanel.EventTypes.EXPERIMENT_STARTED, {
                'Experiment name': experiment.key,
                'Variant name': result.value,
                Source: 'growthbook',
            });
        },
    });
};
exports.initGrowthBook = initGrowthBook;
function getStorageValue() {
    const item = window.localStorage.getItem(consts_1.STORAGE_KEY);
    if (!item) {
        return;
    }
    try {
        const parsedValue = JSON.parse(item);
        if (Array.isArray(parsedValue)) {
            return parsedValue;
        }
    }
    catch {
        return;
    }
}
function isExperimentStarted(key) {
    const items = getStorageValue() ?? [];
    return items.some((item) => item === key);
}
function saveExperimentInStorage(key) {
    const items = getStorageValue() ?? [];
    const newItems = [key, ...items].slice(0, consts_1.STORAGE_LIMIT);
    try {
        window.localStorage.setItem(consts_1.STORAGE_KEY, JSON.stringify(newItems));
    }
    catch (error) { }
}
