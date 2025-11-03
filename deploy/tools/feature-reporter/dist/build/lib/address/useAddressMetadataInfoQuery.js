"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useAddressMetadataInfoQuery;
const app_1 = __importDefault(require("configs/app"));
const useApiQuery_1 = __importDefault(require("lib/api/useApiQuery"));
const multichain_1 = require("lib/contexts/multichain");
const parseMetaPayload_1 = __importDefault(require("./parseMetaPayload"));
function useAddressMetadataInfoQuery(addresses, isEnabled = true) {
    const resource = 'metadata:info';
    const multichainContext = (0, multichain_1.useMultichainContext)();
    const feature = multichainContext?.chain?.config.features.addressMetadata || app_1.default.features.addressMetadata;
    const chainId = multichainContext?.chain?.config.chain.id || app_1.default.chain.id;
    return (0, useApiQuery_1.default)(resource, {
        queryParams: {
            addresses,
            chainId,
            tagsLimit: '20',
        },
        queryOptions: {
            enabled: isEnabled && addresses.length > 0 && feature.isEnabled && Boolean(chainId),
            select: (data) => {
                const addresses = Object.entries(data.addresses)
                    .map(([address, { tags, reputation }]) => {
                    const formattedTags = tags.map((tag) => ({ ...tag, meta: (0, parseMetaPayload_1.default)(tag.meta) }));
                    return [address.toLowerCase(), { tags: formattedTags, reputation }];
                })
                    .reduce((result, item) => {
                    result[item[0]] = item[1];
                    return result;
                }, {});
                return { addresses };
            },
        },
    });
}
