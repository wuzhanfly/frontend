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
exports.RewardsContextProvider = RewardsContextProvider;
exports.useRewardsContext = useRewardsContext;
const react_query_1 = require("@tanstack/react-query");
const usehooks_1 = require("@uidotdev/usehooks");
const router_1 = require("next/router");
const react_1 = __importStar(require("react"));
const wagmi_1 = require("wagmi");
const app_1 = __importDefault(require("configs/app"));
const useApiFetch_1 = __importDefault(require("lib/api/useApiFetch"));
const useApiQuery_1 = __importStar(require("lib/api/useApiQuery"));
const cookies = __importStar(require("lib/cookies"));
const decodeJWT_1 = __importDefault(require("lib/decodeJWT"));
const getErrorMessage_1 = __importDefault(require("lib/errors/getErrorMessage"));
const getErrorObjPayload_1 = __importDefault(require("lib/errors/getErrorObjPayload"));
const getQueryParamString_1 = __importDefault(require("lib/router/getQueryParamString"));
const removeQueryParam_1 = __importDefault(require("lib/router/removeQueryParam"));
const useAccount_1 = __importDefault(require("lib/web3/useAccount"));
const toaster_1 = require("toolkit/chakra/toaster");
const consts_1 = require("toolkit/utils/consts");
const useProfileQuery_1 = __importDefault(require("ui/snippets/auth/useProfileQuery"));
const feature = app_1.default.features.rewards;
const defaultQueryResult = {
    data: undefined,
    isLoading: false,
    isPending: false,
    isFetching: false,
    isError: false,
    refetch: () => Promise.resolve({}),
};
const initialState = {
    balancesQuery: defaultQueryResult,
    dailyRewardQuery: defaultQueryResult,
    referralsQuery: defaultQueryResult,
    rewardsConfigQuery: defaultQueryResult,
    checkUserQuery: defaultQueryResult,
    apiToken: undefined,
    isInitialized: false,
    isLoginModalOpen: false,
    openLoginModal: () => { },
    closeLoginModal: () => { },
    saveApiToken: () => { },
    login: async () => ({ isNewUser: false }),
    claim: async () => { },
};
const RewardsContext = (0, react_1.createContext)(initialState);
// Message to sign for the rewards program
function getMessageToSign(address, nonce, isLogin, refCode) {
    const signInText = 'Sign-In for the Blockscout Merits program.';
    const signUpText = 'Sign-Up for the Blockscout Merits program. I accept Terms of Service: https://merits.blockscout.com/terms. I love capybaras.';
    const referralText = refCode ? ` Referral code: ${refCode}` : '';
    const body = isLogin ? signInText : signUpText + referralText;
    const urlObj = window.location.hostname === 'localhost' && app_1.default.apis.rewards ?
        new URL(app_1.default.apis.rewards.endpoint) :
        window.location;
    return [
        `${urlObj.hostname} wants you to sign in with your Ethereum account:`,
        address,
        '',
        body,
        '',
        `URI: ${urlObj.origin}`,
        'Version: 1',
        `Chain ID: ${app_1.default.chain.id}`,
        `Nonce: ${nonce}`,
        `Issued At: ${new Date().toISOString()}`,
        `Expiration Time: ${new Date(Date.now() + consts_1.YEAR).toISOString()}`,
    ].join('\n');
}
// Get the registered address from the JWT token
function getRegisteredAddress(token) {
    const decodedToken = (0, decodeJWT_1.default)(token);
    return decodedToken?.payload.sub;
}
function RewardsContextProvider({ children }) {
    const router = (0, router_1.useRouter)();
    const queryClient = (0, react_query_1.useQueryClient)();
    const apiFetch = (0, useApiFetch_1.default)();
    const { address } = (0, useAccount_1.default)();
    const { signMessageAsync } = (0, wagmi_1.useSignMessage)();
    const { switchChainAsync } = (0, wagmi_1.useSwitchChain)();
    const profileQuery = (0, useProfileQuery_1.default)();
    const [isLoginModalOpen, setIsLoginModalOpen] = (0, usehooks_1.useToggle)(false);
    const [isInitialized, setIsInitialized] = (0, usehooks_1.useToggle)(false);
    const [apiToken, setApiToken] = react_1.default.useState();
    // Initialize state with the API token from cookies
    (0, react_1.useEffect)(() => {
        if (!profileQuery.isLoading) {
            const token = cookies.get(cookies.NAMES.REWARDS_API_TOKEN);
            const registeredAddress = getRegisteredAddress(token || '');
            if (registeredAddress === profileQuery.data?.address_hash) {
                setApiToken(token);
            }
            setIsInitialized(true);
        }
    }, [setIsInitialized, profileQuery]);
    // Save the API token to cookies and state
    const saveApiToken = (0, react_1.useCallback)((token) => {
        if (token) {
            cookies.set(cookies.NAMES.REWARDS_API_TOKEN, token, { expires: 365 });
        }
        else {
            cookies.remove(cookies.NAMES.REWARDS_API_TOKEN);
        }
        setApiToken(token);
    }, []);
    const [queryOptions, fetchParams] = (0, react_1.useMemo)(() => [
        { enabled: Boolean(apiToken) && feature.isEnabled },
        { headers: { Authorization: `Bearer ${apiToken}` } },
    ], [apiToken]);
    const balancesQuery = (0, useApiQuery_1.default)('rewards:user_balances', { queryOptions, fetchParams });
    const dailyRewardQuery = (0, useApiQuery_1.default)('rewards:user_daily_check', { queryOptions, fetchParams });
    const referralsQuery = (0, useApiQuery_1.default)('rewards:user_referrals', { queryOptions, fetchParams });
    const rewardsConfigQuery = (0, useApiQuery_1.default)('rewards:config', { queryOptions: { enabled: feature.isEnabled } });
    const checkUserQuery = (0, useApiQuery_1.default)('rewards:check_user', { queryOptions: { enabled: feature.isEnabled }, pathParams: { address } });
    // Reset queries when the API token is removed
    (0, react_1.useEffect)(() => {
        if (isInitialized && !apiToken) {
            queryClient.resetQueries({ queryKey: (0, useApiQuery_1.getResourceKey)('rewards:user_balances'), exact: true });
            queryClient.resetQueries({ queryKey: (0, useApiQuery_1.getResourceKey)('rewards:user_daily_check'), exact: true });
            queryClient.resetQueries({ queryKey: (0, useApiQuery_1.getResourceKey)('rewards:user_referrals'), exact: true });
        }
    }, [isInitialized, apiToken, queryClient]);
    // Handle 401 error
    (0, react_1.useEffect)(() => {
        if (apiToken && balancesQuery.error?.status === 401) {
            saveApiToken(undefined);
        }
    }, [balancesQuery.error, apiToken, saveApiToken]);
    // Check if the profile address is the same as the registered address
    (0, react_1.useEffect)(() => {
        const registeredAddress = getRegisteredAddress(apiToken || '');
        if (registeredAddress && !profileQuery.isLoading && profileQuery.data?.address_hash !== registeredAddress) {
            setApiToken(undefined);
        }
    }, [apiToken, profileQuery, setApiToken]);
    // Handle referral code in the URL
    (0, react_1.useEffect)(() => {
        const refCode = (0, getQueryParamString_1.default)(router.query.ref);
        if (refCode && isInitialized) {
            cookies.set(cookies.NAMES.REWARDS_REFERRAL_CODE, refCode);
            (0, removeQueryParam_1.default)(router, 'ref');
            if (!apiToken) {
                setIsLoginModalOpen(true);
            }
        }
    }, [router, apiToken, isInitialized, setIsLoginModalOpen]);
    const errorToast = (0, react_1.useCallback)((error) => {
        const apiError = (0, getErrorObjPayload_1.default)(error);
        toaster_1.toaster.error({
            title: 'Error',
            description: apiError?.message || (0, getErrorMessage_1.default)(error) || 'Something went wrong. Try again later.',
        });
    }, []);
    // Login to the rewards program
    const login = (0, react_1.useCallback)(async (refCode) => {
        try {
            if (!address) {
                throw new Error();
            }
            const [nonceResponse, checkCodeResponse] = await Promise.all([
                apiFetch('rewards:nonce'),
                refCode ?
                    apiFetch('rewards:check_ref_code', { pathParams: { code: refCode } }) :
                    Promise.resolve({ valid: true, reward: undefined }),
            ]);
            if (!checkCodeResponse.valid) {
                return {
                    invalidRefCodeError: true,
                    isNewUser: false,
                };
            }
            await switchChainAsync({ chainId: Number(app_1.default.chain.id) });
            const message = getMessageToSign(address, nonceResponse.nonce, checkUserQuery.data?.exists, refCode);
            const signature = await signMessageAsync({ message });
            const loginResponse = await apiFetch('rewards:login', {
                fetchParams: {
                    method: 'POST',
                    body: {
                        nonce: nonceResponse.nonce,
                        message,
                        signature,
                    },
                },
            });
            saveApiToken(loginResponse.token);
            return {
                isNewUser: loginResponse.created,
                reward: checkCodeResponse.reward,
            };
        }
        catch (_error) {
            errorToast(_error);
            throw _error;
        }
    }, [address, apiFetch, checkUserQuery.data?.exists, switchChainAsync, signMessageAsync, saveApiToken, errorToast]);
    // Claim daily reward
    const claim = (0, react_1.useCallback)(async () => {
        try {
            await apiFetch('rewards:user_daily_claim', {
                fetchParams: {
                    method: 'POST',
                    ...fetchParams,
                },
            });
        }
        catch (_error) {
            errorToast(_error);
            throw _error;
        }
    }, [apiFetch, errorToast, fetchParams]);
    const openLoginModal = react_1.default.useCallback(() => {
        setIsLoginModalOpen(true);
    }, [setIsLoginModalOpen]);
    const closeLoginModal = react_1.default.useCallback(() => {
        setIsLoginModalOpen(false);
    }, [setIsLoginModalOpen]);
    const value = (0, react_1.useMemo)(() => {
        if (!feature.isEnabled) {
            return initialState;
        }
        return {
            balancesQuery,
            dailyRewardQuery,
            referralsQuery,
            rewardsConfigQuery,
            checkUserQuery,
            apiToken,
            saveApiToken,
            isInitialized,
            isLoginModalOpen,
            openLoginModal,
            closeLoginModal,
            login,
            claim,
        };
    }, [
        balancesQuery, dailyRewardQuery, checkUserQuery,
        apiToken, login, claim, referralsQuery, rewardsConfigQuery, isInitialized, saveApiToken,
        isLoginModalOpen, openLoginModal, closeLoginModal,
    ]);
    return (<RewardsContext.Provider value={value}>
      {children}
    </RewardsContext.Provider>);
}
function useRewardsContext() {
    return (0, react_1.useContext)(RewardsContext);
}
