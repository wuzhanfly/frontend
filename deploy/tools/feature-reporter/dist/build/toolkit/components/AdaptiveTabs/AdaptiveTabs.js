"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const tabs_1 = require("../../chakra/tabs");
const useViewportSize_1 = require("../../hooks/useViewportSize");
const AdaptiveTabsList_1 = __importDefault(require("./AdaptiveTabsList"));
const utils_1 = require("./utils");
const AdaptiveTabs = (props) => {
    const { tabs, onValueChange, defaultValue, isLoading, listProps, rightSlot, rightSlotProps, leftSlot, leftSlotProps, stickyEnabled, size, variant, ...rest } = props;
    const [activeTab, setActiveTab] = react_1.default.useState(defaultValue || (0, utils_1.getTabValue)(tabs[0]));
    const handleTabChange = react_1.default.useCallback(({ value }) => {
        if (isLoading) {
            return;
        }
        onValueChange ? onValueChange({ value }) : setActiveTab(value);
    }, [isLoading, onValueChange]);
    const viewportSize = (0, useViewportSize_1.useViewportSize)();
    react_1.default.useEffect(() => {
        if (defaultValue) {
            setActiveTab(defaultValue);
        }
    }, [defaultValue]);
    return (<tabs_1.TabsRoot position="relative" value={activeTab} onValueChange={handleTabChange} size={size} variant={variant} {...rest}>
      <AdaptiveTabsList_1.default 
    // the easiest and most readable way to achieve correct tab's cut recalculation when
    //    - screen is resized or
    //    - tabs list is changed when API data is loaded
    // is to do full re-render of the tabs list
    // so we use screenWidth + tabIds as a key for the TabsList component
    key={isLoading + '_' + viewportSize.width + '_' + tabs.map((tab) => tab.id).join(':')} tabs={tabs} listProps={listProps} leftSlot={leftSlot} leftSlotProps={leftSlotProps} rightSlot={rightSlot} rightSlotProps={rightSlotProps} stickyEnabled={stickyEnabled} activeTab={activeTab} isLoading={isLoading} variant={variant}/>
      {tabs.map((tab) => {
            const value = (0, utils_1.getTabValue)(tab);
            return (<tabs_1.TabsContent padding={0} key={value} value={value}>
            {tab.component}
          </tabs_1.TabsContent>);
        })}
    </tabs_1.TabsRoot>);
};
exports.default = react_1.default.memo(AdaptiveTabs);
