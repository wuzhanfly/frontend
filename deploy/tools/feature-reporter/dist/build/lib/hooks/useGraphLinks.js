"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGraphLinks;
const react_query_1 = require("@tanstack/react-query");
const app_1 = __importDefault(require("configs/app"));
const useFetch_1 = __importDefault(require("lib/hooks/useFetch"));
const feature = app_1.default.features.marketplace;
function useGraphLinks() {
    const fetch = (0, useFetch_1.default)();
    return (0, react_query_1.useQuery)({
        queryKey: ['graph-links'],
        queryFn: async () => fetch((feature.isEnabled && feature.graphLinksUrl) ? feature.graphLinksUrl : '', undefined, { resource: 'graph-links' }),
        enabled: feature.isEnabled && Boolean(feature.graphLinksUrl),
        staleTime: Infinity,
        placeholderData: {},
    });
}
