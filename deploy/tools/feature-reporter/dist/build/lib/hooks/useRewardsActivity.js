"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useRewardsActivity;
const react_1 = require("react");
const app_1 = __importDefault(require("configs/app"));
const useApiFetch_1 = __importDefault(require("lib/api/useApiFetch"));
const useApiQuery_1 = __importDefault(require("lib/api/useApiQuery"));
const rewards_1 = require("lib/contexts/rewards");
const consts_1 = require("toolkit/utils/consts");
const useProfileQuery_1 = __importDefault(require("ui/snippets/auth/useProfileQuery"));
const feature = app_1.default.features.rewards;
const LAST_EXPLORE_TIME_KEY = 'rewards_activity_last_explore_time';
function useRewardsActivity() {
    const { apiToken } = (0, rewards_1.useRewardsContext)();
    const apiFetch = (0, useApiFetch_1.default)();
    const lastExploreTime = (0, react_1.useRef)(0);
    const profileQuery = (0, useProfileQuery_1.default)();
    const checkActivityPassQuery = (0, useApiQuery_1.default)('rewards:user_check_activity_pass', {
        queryOptions: {
            enabled: feature.isEnabled && Boolean(apiToken) && Boolean(profileQuery.data?.address_hash),
        },
        queryParams: {
            address: profileQuery.data?.address_hash ?? '',
        },
    });
    (0, react_1.useEffect)(() => {
        try {
            const storedTime = window.localStorage.getItem(LAST_EXPLORE_TIME_KEY);
            if (storedTime) {
                lastExploreTime.current = Number(storedTime);
            }
        }
        catch { }
    }, []);
    const makeRequest = (0, react_1.useCallback)(async (endpoint, params) => {
        if (!apiToken || !checkActivityPassQuery.data?.is_valid) {
            return;
        }
        try {
            return await apiFetch(endpoint, {
                fetchParams: {
                    method: 'POST',
                    body: params,
                    headers: { Authorization: `Bearer ${apiToken}` },
                },
            });
        }
        catch { }
    }, [apiFetch, checkActivityPassQuery.data, apiToken]);
    const trackTransaction = (0, react_1.useCallback)(async (from, to, chainId) => {
        return (await makeRequest('rewards:user_activity_track_tx', {
            from_address: from,
            to_address: to,
            chain_id: chainId || app_1.default.chain.id || '',
        }));
    }, [makeRequest]);
    const trackTransactionConfirm = (0, react_1.useCallback)((hash, token) => makeRequest('rewards:user_activity_track_tx_confirm', { tx_hash: hash, token }), [makeRequest]);
    const trackContract = (0, react_1.useCallback)(async (address) => makeRequest('rewards:user_activity_track_contract', {
        address,
        chain_id: app_1.default.chain.id ?? '',
    }), [makeRequest]);
    const trackUsage = (0, react_1.useCallback)((action) => {
        // check here because this function is called on page load
        if (!apiToken || !checkActivityPassQuery.data?.is_valid) {
            return;
        }
        if (action === 'explore') {
            const now = Date.now();
            if (now - lastExploreTime.current < 5 * consts_1.MINUTE) {
                return;
            }
            lastExploreTime.current = now;
            try {
                window.localStorage.setItem(LAST_EXPLORE_TIME_KEY, String(now));
            }
            catch { }
        }
        return makeRequest('rewards:user_activity_track_usage', {
            action,
            chain_id: app_1.default.chain.id ?? '',
        });
    }, [makeRequest, apiToken, checkActivityPassQuery.data]);
    return {
        trackTransaction,
        trackTransactionConfirm,
        trackContract,
        trackUsage,
    };
}
