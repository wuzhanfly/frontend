"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const useIsMobile_1 = __importDefault(require("lib/hooks/useIsMobile"));
const skeleton_1 = require("../../chakra/skeleton");
const tabs_1 = require("../../chakra/tabs");
const useIsSticky_1 = require("../../hooks/useIsSticky");
const AdaptiveTabsMenu_1 = __importDefault(require("./AdaptiveTabsMenu"));
const useAdaptiveTabs_1 = __importDefault(require("./useAdaptiveTabs"));
const useScrollToActiveTab_1 = __importDefault(require("./useScrollToActiveTab"));
const utils_1 = require("./utils");
const HIDDEN_ITEM_STYLES = {
    position: 'absolute',
    top: '-9999px',
    left: '-9999px',
    visibility: 'hidden',
};
const getItemStyles = (index, tabsCut, isLoading) => {
    if (tabsCut === undefined || isLoading) {
        return HIDDEN_ITEM_STYLES;
    }
    return index < tabsCut ? {} : HIDDEN_ITEM_STYLES;
};
const getMenuStyles = (tabsLength, tabsCut, isLoading) => {
    if (tabsCut === undefined || isLoading) {
        return HIDDEN_ITEM_STYLES;
    }
    return tabsCut >= tabsLength ? HIDDEN_ITEM_STYLES : {};
};
const AdaptiveTabsList = (props) => {
    const { tabs, activeTab, listProps, rightSlot, rightSlotProps, leftSlot, leftSlotProps, stickyEnabled, isLoading, variant, } = props;
    const isMobile = (0, useIsMobile_1.default)();
    const tabsList = react_2.default.useMemo(() => {
        return [...tabs, utils_1.menuButton];
    }, [tabs]);
    const { tabsCut, tabsRefs, listRef, rightSlotRef, leftSlotRef } = (0, useAdaptiveTabs_1.default)(tabsList, isLoading || isMobile);
    const isSticky = (0, useIsSticky_1.useIsSticky)(listRef, 5, stickyEnabled);
    const activeTabIndex = tabsList.findIndex((tab) => (0, utils_1.getTabValue)(tab) === activeTab) ?? 0;
    (0, useScrollToActiveTab_1.default)({ activeTabIndex, listRef, tabsRefs, isMobile, isLoading });
    if (tabs.length === 1 && !leftSlot && !rightSlot) {
        return null;
    }
    const isReady = !isLoading && tabsCut !== undefined;
    return (<tabs_1.TabsList ref={listRef} flexWrap="nowrap" alignItems="center" whiteSpace="nowrap" bgColor={{ _light: 'white', _dark: 'black' }} marginBottom={6} mx={{ base: '-12px', lg: 'unset' }} px={{ base: '12px', lg: 'unset' }} w={{ base: 'calc(100% + 24px)', lg: '100%' }} overflowX={{ base: 'auto', lg: 'initial' }} overscrollBehaviorX="contain" css={{
            scrollSnapType: 'x mandatory',
            scrollPaddingInline: '12px', // mobile page padding
            // hide scrollbar
            '&::-webkit-scrollbar': {
                display: 'none',
            },
            '-ms-overflow-style': 'none', /* IE and Edge */
            scrollbarWidth: 'none', /* Firefox */
        }} {...(props.stickyEnabled ? {
        position: 'sticky',
        boxShadow: { base: isSticky ? 'md' : 'none', lg: 'none' },
        top: 0,
        zIndex: { base: 'sticky2', lg: 'docked' },
    } : {})} {...(typeof listProps === 'function' ? listProps({ isSticky, activeTab }) : listProps)}>
      {leftSlot && (<react_1.Box ref={leftSlotRef} {...leftSlotProps} flexGrow={leftSlotProps?.widthAllocation === 'available' && tabsCut !== undefined ? 1 : undefined}>
          {leftSlot}
        </react_1.Box>)}
      {tabs.length > 1 && tabsList.map((tab, index) => {
            const value = (0, utils_1.getTabValue)(tab);
            const ref = tabsRefs[index];
            if (tab.id === 'menu') {
                return (<AdaptiveTabsMenu_1.default key="menu" ref={ref} tabs={tabs} tabsCut={tabsCut ?? 0} isActive={activeTabIndex > 0 && tabsCut !== undefined && tabsCut > 0 && activeTabIndex >= tabsCut} {...getMenuStyles(tabs.length, tabsCut, isLoading)}/>);
            }
            return (<tabs_1.TabsTrigger key={value} value={value} ref={ref} scrollSnapAlign="start" flexShrink={0} {...getItemStyles(index, tabsCut, isLoading)}>
            {typeof tab.title === 'function' ? tab.title() : tab.title}
            <tabs_1.TabsCounter count={tab.count}/>
          </tabs_1.TabsTrigger>);
        })}
      {tabs.slice(0, isReady ? 0 : 5).map((tab, index) => {
            const value = `${(0, utils_1.getTabValue)(tab)}-pre`;
            return (<tabs_1.TabsTrigger key={value} value={value} flexShrink={0} bgColor={activeTabIndex === index && (variant === 'solid' || variant === undefined) ?
                    { _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' } :
                    undefined}>
            <skeleton_1.Skeleton loading>
              {typeof tab.title === 'function' ? tab.title() : tab.title}
              <tabs_1.TabsCounter count={tab.count}/>
            </skeleton_1.Skeleton>
          </tabs_1.TabsTrigger>);
        })}
      {rightSlot ? (<react_1.Box ref={rightSlotRef} ml="auto" {...rightSlotProps} flexGrow={rightSlotProps?.widthAllocation === 'available' && tabsCut !== undefined ? 1 : undefined}>
            {rightSlot}
          </react_1.Box>) :
            null}
    </tabs_1.TabsList>);
};
exports.default = react_2.default.memo(AdaptiveTabsList);
