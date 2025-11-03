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
exports.default = useFetchReport;
const react_1 = __importDefault(require("react"));
const v = __importStar(require("valibot"));
const buildUrl_1 = __importDefault(require("lib/api/buildUrl"));
const useApiQuery_1 = __importDefault(require("lib/api/useApiQuery"));
const contract_1 = require("stubs/contract");
const schema_1 = require("./schema");
const RESOURCE_NAME = 'general:contract_solidity_scan_report';
const ERROR_NAME = 'Invalid response schema';
function useFetchReport({ hash }) {
    const query = (0, useApiQuery_1.default)(RESOURCE_NAME, {
        pathParams: { hash },
        queryOptions: {
            select: (response) => {
                const parsedResponse = v.safeParse(schema_1.SolidityScanSchema, response);
                if (!parsedResponse.success) {
                    throw Error(ERROR_NAME);
                }
                return parsedResponse.output;
            },
            enabled: Boolean(hash),
            placeholderData: contract_1.SOLIDITY_SCAN_REPORT,
            retry: 0,
        },
    });
    const errorMessage = query.error && 'message' in query.error ? query.error.message : undefined;
    react_1.default.useEffect(() => {
        if (errorMessage === ERROR_NAME) {
            fetch('/node-api/monitoring/invalid-api-schema', {
                method: 'POST',
                body: JSON.stringify({
                    resource: RESOURCE_NAME,
                    url: (0, buildUrl_1.default)(RESOURCE_NAME, { hash }, undefined, true),
                }),
            });
        }
    }, [errorMessage, hash]);
    return query;
}
