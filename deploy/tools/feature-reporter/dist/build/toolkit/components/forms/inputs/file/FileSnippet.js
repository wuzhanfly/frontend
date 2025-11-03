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
exports.FileSnippet = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const Json_1 = __importDefault(require("icons-components/files/Json"));
const Placeholder_1 = __importDefault(require("icons-components/files/Placeholder"));
const Sol_1 = __importDefault(require("icons-components/files/Sol"));
const Yul_1 = __importDefault(require("icons-components/files/Yul"));
const close_button_1 = require("../../../../chakra/close-button");
const Hint_1 = require("../../../../components/Hint/Hint");
const FILE_ICONS = {
    '.json': <Json_1.default />,
    '.sol': <Sol_1.default />,
    '.yul': <Yul_1.default />,
};
function getFileExtension(fileName) {
    const chunks = fileName.split('.');
    if (chunks.length === 1) {
        return '';
    }
    return '.' + chunks[chunks.length - 1];
}
exports.FileSnippet = (0, react_1.chakra)(({ file, className, index, onRemove, isDisabled, error }) => {
    const handleRemove = React.useCallback((event) => {
        event.stopPropagation();
        onRemove?.(index);
    }, [index, onRemove]);
    const fileExtension = getFileExtension(file.name);
    const fileIcon = FILE_ICONS[fileExtension] || <Placeholder_1.default />;
    return (<react_1.Flex maxW="300px" overflow="hidden" className={className} alignItems="center" textAlign="left" columnGap={2}>
      <react_1.Icon boxSize="48px" color={error ? 'text.error' : 'initial'}>
        {fileIcon}
      </react_1.Icon>
      <react_1.Box maxW="calc(100% - 58px - 24px)">
        <react_1.Flex alignItems="center">
          <react_1.Text fontWeight={600} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" color={error ? 'text.error' : 'initial'}>
            {file.name}
          </react_1.Text>
          {Boolean(error) && <Hint_1.Hint label={error} ml={1} color="text.error"/>}
          <close_button_1.CloseButton aria-label="Remove" ml={2} onClick={handleRemove} disabled={isDisabled}/>
        </react_1.Flex>
        <react_1.Text color="text.secondary" textStyle="sm" mt={1}>
          {file.size.toLocaleString(undefined, { notation: 'compact', maximumFractionDigits: 2, unit: 'byte', unitDisplay: 'narrow', style: 'unit' })}
        </react_1.Text>
      </react_1.Box>
    </react_1.Flex>);
});
