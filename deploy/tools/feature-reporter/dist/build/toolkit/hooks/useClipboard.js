"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClipboard = useClipboard;
const usehooks_1 = require("@uidotdev/usehooks");
const react_1 = __importDefault(require("react"));
const useIsMobile_1 = __importDefault(require("lib/hooks/useIsMobile"));
const consts_1 = require("../utils/consts");
const useDisclosure_1 = require("./useDisclosure");
// NOTE: If you don't need the disclosure and the timeout features, please use the useCopyToClipboard hook directly
function useClipboard(text, timeout = consts_1.SECOND) {
    const flagTimeoutRef = react_1.default.useRef(null);
    const disclosureTimeoutRef = react_1.default.useRef(null);
    const [hasCopied, setHasCopied] = react_1.default.useState(false);
    const isMobile = (0, useIsMobile_1.default)();
    const [, copyToClipboard] = (0, usehooks_1.useCopyToClipboard)();
    const { open, onOpenChange } = (0, useDisclosure_1.useDisclosure)();
    const copy = react_1.default.useCallback(() => {
        copyToClipboard(text);
        setHasCopied(true);
        // there is no hover on mobile, so we need to open the disclosure manually after click
        isMobile && onOpenChange({ open: true });
        disclosureTimeoutRef.current = window.setTimeout(() => {
            onOpenChange({ open: false });
        }, timeout);
        // We need to wait for the disclosure to close before setting the flag to false
        flagTimeoutRef.current = window.setTimeout(() => {
            setHasCopied(false);
        }, timeout + 200);
    }, [text, copyToClipboard, timeout, onOpenChange, isMobile]);
    react_1.default.useEffect(() => {
        return () => {
            if (disclosureTimeoutRef.current) {
                window.clearTimeout(disclosureTimeoutRef.current);
            }
            if (flagTimeoutRef.current) {
                window.clearTimeout(flagTimeoutRef.current);
            }
        };
    }, []);
    return react_1.default.useMemo(() => {
        return {
            hasCopied,
            copy,
            disclosure: {
                open,
                onOpenChange,
            },
        };
    }, [hasCopied, copy, open, onOpenChange]);
}
