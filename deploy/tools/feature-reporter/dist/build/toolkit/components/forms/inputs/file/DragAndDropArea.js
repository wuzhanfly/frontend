"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragAndDropArea = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const utils_1 = require("./utils");
exports.DragAndDropArea = (0, react_1.chakra)(({ onDrop, children, className, isDisabled, fullFilePath, isInvalid }) => {
    const [isDragOver, setIsDragOver] = react_2.default.useState(false);
    const handleDrop = react_2.default.useCallback(async (event) => {
        event.preventDefault();
        if (isDisabled) {
            return;
        }
        const fileEntries = await (0, utils_1.getAllFileEntries)(event.dataTransfer.items);
        const files = await Promise.all(fileEntries.map((fileEntry) => (0, utils_1.convertFileEntryToFile)(fileEntry, fullFilePath)));
        onDrop(files);
        setIsDragOver(false);
    }, [isDisabled, onDrop, fullFilePath]);
    const handleDragOver = react_2.default.useCallback((event) => {
        event.preventDefault();
    }, []);
    const handleDragEnter = react_2.default.useCallback((event) => {
        event.preventDefault();
        setIsDragOver(true);
    }, []);
    const handleDragLeave = react_2.default.useCallback((event) => {
        event.preventDefault();
        setIsDragOver(false);
    }, []);
    const handleClick = react_2.default.useCallback((event) => {
        if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, [isDisabled]);
    return (<react_1.Center className={className} w="100%" minH="120px" borderWidth="2px" borderRadius="base" borderStyle="dashed" borderColor={isDragOver ? 'input.border.hover' : 'input.border'} cursor="pointer" textAlign="center" {...(isDisabled ? { 'data-disabled': true } : {})} {...(isInvalid ? { 'data-invalid': true } : {})} color="input.placeholder" _disabled={{ opacity: 'control.disabled' }} _invalid={{ borderColor: 'input.border.error', color: 'input.placeholder.error' }} _hover={{ borderColor: 'input.border.hover' }} onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
      {children}
    </react_1.Center>);
});
