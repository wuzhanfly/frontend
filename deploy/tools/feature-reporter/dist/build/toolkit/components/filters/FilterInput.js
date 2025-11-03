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
exports.FilterInput = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importStar(require("react"));
const Search_1 = __importDefault(require("icons-components/Search"));
const input_1 = require("../../chakra/input");
const input_group_1 = require("../../chakra/input-group");
const skeleton_1 = require("../../chakra/skeleton");
const ClearButton_1 = require("../buttons/ClearButton");
;
const FilterInput = ({ onChange, size = 'sm', placeholder, initialValue, type, name, loading = false, onFocus, onBlur, inputProps, ...rest }) => {
    const [filterQuery, setFilterQuery] = (0, react_2.useState)(initialValue || '');
    const inputRef = react_2.default.useRef(null);
    const handleFilterQueryChange = (0, react_2.useCallback)((event) => {
        const { value } = event.target;
        setFilterQuery(value);
        onChange?.(value);
    }, [onChange]);
    const handleFilterQueryClear = (0, react_2.useCallback)(() => {
        setFilterQuery('');
        onChange?.('');
        inputRef?.current?.focus();
    }, [onChange]);
    const startElement = <react_1.Icon boxSize={5}><Search_1.default /></react_1.Icon>;
    const endElement = <ClearButton_1.ClearButton onClick={handleFilterQueryClear} visible={filterQuery.length > 0}/>;
    return (<skeleton_1.Skeleton minW="250px" borderRadius="base" loading={loading} {...rest}>
      <input_group_1.InputGroup startElement={startElement} startElementProps={{ px: 2 }} endElement={endElement} endElementProps={{ w: '32px' }}>
        <input_1.Input ref={inputRef} size={size} value={filterQuery} onChange={handleFilterQueryChange} onFocus={onFocus} onBlur={onBlur} placeholder={placeholder} borderWidth="2px" textOverflow="ellipsis" whiteSpace="nowrap" type={type} name={name} {...inputProps}/>
      </input_group_1.InputGroup>
    </skeleton_1.Skeleton>);
};
exports.FilterInput = FilterInput;
