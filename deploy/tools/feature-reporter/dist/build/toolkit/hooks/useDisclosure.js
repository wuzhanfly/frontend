"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDisclosure = useDisclosure;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
function useDisclosure(props) {
    const { open, onOpen, onClose, onToggle } = (0, react_1.useDisclosure)(props);
    const onOpenChange = react_2.default.useCallback(({ open }) => {
        if (open) {
            onOpen();
        }
        else {
            onClose();
        }
    }, [onOpen, onClose]);
    return react_2.default.useMemo(() => ({
        open,
        onOpenChange,
        onClose,
        onOpen,
        onToggle,
    }), [open, onOpenChange, onClose, onOpen, onToggle]);
}
