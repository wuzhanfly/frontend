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
Object.defineProperty(exports, "__esModule", { value: true });
const promClient = __importStar(require("prom-client"));
const metrics = (() => {
    // eslint-disable-next-line no-restricted-properties
    if (process.env.PROMETHEUS_METRICS_ENABLED !== 'true') {
        return;
    }
    promClient.register.clear();
    const invalidApiSchema = new promClient.Counter({
        name: 'invalid_api_schema',
        help: 'Number of invalid external API schema events',
        labelNames: ['resource', 'url'],
    });
    const socialPreviewBotRequests = new promClient.Counter({
        name: 'social_preview_bot_requests_total',
        help: 'Number of incoming requests from social preview bots',
        labelNames: ['route', 'bot'],
    });
    const searchEngineBotRequests = new promClient.Counter({
        name: 'search_engine_bot_requests_total',
        help: 'Number of incoming requests from search engine bots',
        labelNames: ['route', 'bot'],
    });
    const apiRequestDuration = new promClient.Histogram({
        name: 'api_request_duration_seconds',
        help: 'Duration of requests to API in seconds',
        labelNames: ['route', 'code'],
        buckets: [0.2, 0.5, 1, 3, 10],
    });
    return { invalidApiSchema, socialPreviewBotRequests, searchEngineBotRequests, apiRequestDuration };
})();
exports.default = metrics;
