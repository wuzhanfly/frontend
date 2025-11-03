"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useEtherscanRedirects;
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const getQueryParamString_1 = __importDefault(require("./getQueryParamString"));
function useEtherscanRedirects() {
    const router = (0, router_1.useRouter)();
    // The browser does not send the segment hash (or anchor) to the server,
    // so we have to handle such redirects for the etherscan-like links on the client side.
    react_1.default.useEffect(() => {
        const segmentHash = window.location.hash;
        if (segmentHash) {
            switch (router.route) {
                case '/tx/[hash]': {
                    const hash = (0, getQueryParamString_1.default)(router.query.hash);
                    switch (segmentHash) {
                        case '#statechange':
                            router.replace({
                                pathname: '/tx/[hash]',
                                query: { hash, tab: 'state' },
                            });
                            break;
                        case '#eventlog':
                            router.replace({
                                pathname: '/tx/[hash]',
                                query: { hash, tab: 'logs' },
                            });
                            break;
                        case '#aa':
                            router.replace({
                                pathname: '/tx/[hash]',
                                query: { hash, tab: 'user_ops' },
                            });
                            break;
                        case '#internal':
                            router.replace({
                                pathname: '/tx/[hash]',
                                query: { hash, tab: 'internal' },
                            });
                            break;
                    }
                    break;
                }
                case '/address/[hash]': {
                    const hash = (0, getQueryParamString_1.default)(router.query.hash);
                    switch (segmentHash) {
                        case '#internaltx':
                            router.replace({
                                pathname: '/address/[hash]',
                                query: { hash, tab: 'internal_txns' },
                            });
                            break;
                        case '#tokentxns':
                            router.replace({
                                pathname: '/address/[hash]',
                                query: { hash, tab: 'token_transfers' },
                            });
                            break;
                        case '#asset-tokens':
                            router.replace({
                                pathname: '/address/[hash]',
                                query: { hash, tab: 'tokens' },
                            });
                            break;
                        case '#asset-nfts':
                            router.replace({
                                pathname: '/address/[hash]',
                                query: { hash, tab: 'tokens_nfts' },
                            });
                            break;
                        case '#aatx':
                            router.replace({
                                pathname: '/address/[hash]',
                                query: { hash, tab: 'user_ops' },
                            });
                            break;
                        case '#code':
                            router.replace({
                                pathname: '/address/[hash]',
                                query: { hash, tab: 'contract' },
                            });
                            break;
                        case '#readContract':
                            router.replace({
                                pathname: '/address/[hash]',
                                query: { hash, tab: 'read_contract' },
                            });
                            break;
                        case '#writeContract':
                            router.replace({
                                pathname: '/address/[hash]',
                                query: { hash, tab: 'write_contract' },
                            });
                            break;
                    }
                    break;
                }
                case '/token/[hash]': {
                    const hash = (0, getQueryParamString_1.default)(router.query.hash);
                    switch (segmentHash) {
                        case '#balances':
                            router.replace({
                                pathname: '/token/[hash]',
                                query: { hash, tab: 'holders' },
                            });
                            break;
                    }
                    break;
                }
                case '/stats': {
                    switch (segmentHash) {
                        case '#section-contracts-data':
                            router.replace({
                                pathname: '/stats',
                                hash: 'contracts',
                            });
                            break;
                    }
                    break;
                }
                default:
                    break;
            }
        }
        // run only on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
