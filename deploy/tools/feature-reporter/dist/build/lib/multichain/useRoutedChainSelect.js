"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useRoutedChainSelect;
const router_1 = require("next/router");
const react_1 = __importDefault(require("react"));
const getChainValueFromQuery_1 = __importDefault(require("./getChainValueFromQuery"));
function useRoutedChainSelect(props) {
    const router = (0, router_1.useRouter)();
    const [value, setValue] = react_1.default.useState([(0, getChainValueFromQuery_1.default)(router.query)].filter(Boolean));
    const onValueChange = react_1.default.useCallback(({ value }) => {
        setValue(value);
        const nextQuery = props?.persistedParams ? props.persistedParams.reduce((acc, param) => ({ ...acc, [param]: router.query[param] }), {}) : router.query;
        router.push({
            pathname: router.pathname,
            query: {
                ...nextQuery,
                'chain-slug': value[0],
            },
        });
    }, [props?.persistedParams, router]);
    return react_1.default.useMemo(() => ({
        value,
        onValueChange,
    }), [value, onValueChange]);
}
