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
exports.default = useAddressProfileApiQuery;
const react_query_1 = require("@tanstack/react-query");
const v = __importStar(require("valibot"));
const app_1 = __importDefault(require("configs/app"));
const useFetch_1 = __importDefault(require("lib/hooks/useFetch"));
const feature = app_1.default.features.addressProfileAPI;
const AddressInfoSchema = v.object({
    user_profile: v.object({
        username: v.union([v.string(), v.null()]),
    }),
});
const ERROR_NAME = 'Invalid response schema';
function useAddressProfileApiQuery(hash, isEnabled = true) {
    const fetch = (0, useFetch_1.default)();
    return (0, react_query_1.useQuery)({
        queryKey: ['username_api', hash],
        queryFn: async () => {
            if (!feature.isEnabled || !hash) {
                return Promise.reject();
            }
            return fetch(feature.apiUrlTemplate.replace('{address}', hash));
        },
        enabled: isEnabled && Boolean(hash),
        refetchOnMount: false,
        select: (response) => {
            const parsedResponse = v.safeParse(AddressInfoSchema, response);
            if (!parsedResponse.success) {
                throw Error(ERROR_NAME);
            }
            return parsedResponse.output;
        },
    });
}
