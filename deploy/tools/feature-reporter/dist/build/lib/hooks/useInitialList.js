"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useInitialList;
const react_1 = __importDefault(require("react"));
function useInitialList({ data, idFn, enabled }) {
    const [list, setList] = react_1.default.useState([]);
    react_1.default.useEffect(() => {
        if (enabled) {
            setList(data.map(idFn));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);
    const isNew = react_1.default.useCallback((data) => {
        return !list.includes(idFn(data));
    }, [list, idFn]);
    const getAnimationProp = react_1.default.useCallback((data) => {
        return isNew(data) ? 'fade-in 500ms linear' : undefined;
    }, [isNew]);
    return react_1.default.useMemo(() => {
        return {
            list,
            isNew,
            getAnimationProp,
        };
    }, [list, isNew, getAnimationProp]);
}
