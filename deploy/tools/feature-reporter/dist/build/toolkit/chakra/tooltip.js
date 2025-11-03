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
exports.Tooltip = void 0;
const react_1 = require("@chakra-ui/react");
const usehooks_1 = require("@uidotdev/usehooks");
const React = __importStar(require("react"));
const app_1 = __importDefault(require("configs/app"));
const useIsMobile_1 = __importDefault(require("lib/hooks/useIsMobile"));
exports.Tooltip = React.forwardRef(function Tooltip(props, ref) {
    const { showArrow: showArrowProp, onOpenChange, variant, selected, children, disabled, disableOnMobile, portalled = true, content, contentProps, portalRef, defaultOpen = false, lazyMount = true, unmountOnExit = true, triggerProps, closeDelay = 100, openDelay = 100, interactive, ...rest } = props;
    const [open, setOpen] = React.useState(defaultOpen);
    const timeoutRef = React.useRef(null);
    const isMobile = (0, useIsMobile_1.default)();
    const handleOpenChange = React.useCallback((details) => {
        setOpen(details.open);
        onOpenChange?.(details);
    }, [onOpenChange]);
    const handleOpenChangeManual = React.useCallback((nextOpen) => {
        timeoutRef.current && window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            setOpen(nextOpen);
            onOpenChange?.({ open: nextOpen });
        }, nextOpen ? openDelay : closeDelay);
    }, [closeDelay, openDelay, onOpenChange]);
    const handleClickAway = React.useCallback((event) => {
        if (interactive) {
            const closest = event.target?.closest('.chakra-tooltip__positioner');
            if (closest) {
                return;
            }
        }
        handleOpenChangeManual(false);
    }, [interactive, handleOpenChangeManual]);
    const triggerRef = (0, usehooks_1.useClickAway)(handleClickAway);
    const handleTriggerClick = React.useCallback(() => {
        handleOpenChangeManual(!open);
    }, [handleOpenChangeManual, open]);
    const handleContentClick = React.useCallback((event) => {
        // otherwise, the event will be propagated to the trigger
        // and if the trigger is a link, navigation will be triggered
        event.stopPropagation();
        if (interactive) {
            const closestLink = event.target?.closest('a');
            if (closestLink) {
                handleOpenChangeManual(false);
            }
        }
    }, [interactive, handleOpenChangeManual]);
    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    if (disabled || (disableOnMobile && isMobile))
        return children;
    const defaultShowArrow = variant === 'popover' ? false : true;
    const showArrow = showArrowProp !== undefined ? showArrowProp : defaultShowArrow;
    const positioning = {
        ...rest.positioning,
        overflowPadding: 4,
        offset: {
            mainAxis: 4,
            ...rest.positioning?.offset,
        },
    };
    return (<react_1.Tooltip.Root openDelay={openDelay} 
    // FIXME: chakra closes tooltip too fast, so Playwright is not able to make a screenshot of its content
    // so we need to increase the close delay in Playwright environment
    closeDelay={app_1.default.app.isPw ? 10000 : closeDelay} open={open} onOpenChange={handleOpenChange} closeOnClick={false} closeOnPointerDown={false} variant={variant} lazyMount={lazyMount} unmountOnExit={unmountOnExit} interactive={interactive} {...rest} positioning={positioning}>
        <react_1.Tooltip.Trigger ref={open ? triggerRef : null} asChild onClick={isMobile ? handleTriggerClick : undefined} {...triggerProps}>
          {children}
        </react_1.Tooltip.Trigger>
        <react_1.Portal disabled={!portalled} container={portalRef}>
          <react_1.Tooltip.Positioner>
            <react_1.Tooltip.Content ref={ref} onClick={interactive ? handleContentClick : undefined} {...(selected ? { 'data-selected': true } : {})} {...contentProps}>
              {showArrow && (<react_1.Tooltip.Arrow>
                  <react_1.Tooltip.ArrowTip />
                </react_1.Tooltip.Arrow>)}
              {content}
            </react_1.Tooltip.Content>
          </react_1.Tooltip.Positioner>
        </react_1.Portal>
      </react_1.Tooltip.Root>);
});
