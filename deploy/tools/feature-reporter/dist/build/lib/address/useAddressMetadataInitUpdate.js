"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useAddressMetadataInitUpdate;
const react_1 = __importDefault(require("react"));
const app_1 = __importDefault(require("configs/app"));
const useApiFetch_1 = __importDefault(require("lib/api/useApiFetch"));
const feature = app_1.default.features.addressMetadata;
const TXS_THRESHOLD = 500;
function useAddressMetadataInitUpdate({ address, counters, isEnabled }) {
    const apiFetch = (0, useApiFetch_1.default)();
    react_1.default.useEffect(() => {
        if (feature.isEnabled &&
            feature.isAddressTagsUpdateEnabled &&
            address &&
            isEnabled &&
            counters?.transactions_count && Number(counters.transactions_count) > TXS_THRESHOLD) {
            apiFetch('metadata:address_submit', {
                fetchParams: {
                    method: 'POST',
                    body: {
                        addresses: [address],
                    },
                },
            });
        }
    }, [address, apiFetch, counters?.transactions_count, isEnabled]);
}
