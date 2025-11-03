"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useAccountWithDomain;
const react_1 = __importDefault(require("react"));
const app_1 = __importDefault(require("configs/app"));
const useApiQuery_1 = __importDefault(require("lib/api/useApiQuery"));
const useAccount_1 = __importDefault(require("./useAccount"));
const feature = app_1.default.features.nameServices;
function useAccountWithDomain(isEnabled) {
    const { address, isConnecting } = (0, useAccount_1.default)();
    const isQueryEnabled = feature.isEnabled && feature.ens.isEnabled && Boolean(address) && Boolean(isEnabled);
    const domainQuery = (0, useApiQuery_1.default)('bens:address_domain', {
        pathParams: {
            chainId: app_1.default.chain.id,
            address,
        },
        queryOptions: {
            enabled: isQueryEnabled,
            refetchOnMount: false,
        },
    });
    return react_1.default.useMemo(() => {
        return {
            address: isEnabled ? address : undefined,
            domain: domainQuery.data?.domain?.name,
            isLoading: (isQueryEnabled && domainQuery.isLoading) || isConnecting,
        };
    }, [address, domainQuery.data?.domain?.name, domainQuery.isLoading, isEnabled, isQueryEnabled, isConnecting]);
}
