"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const Dots_1 = __importDefault(require("icons-components/Dots"));
const icon_button_1 = require("../../chakra/icon-button");
const popover_1 = require("../../chakra/popover");
const tabs_1 = require("../../chakra/tabs");
const utils_1 = require("./utils");
const AdaptiveTabsMenu = ({ tabs, tabsCut, isActive, ...props }, ref) => {
    return (<popover_1.PopoverRoot positioning={{ placement: 'bottom-end' }}>
      <popover_1.PopoverTrigger>
        <icon_button_1.IconButton 
    // we use "div" so the :last-of-type pseudo-class targets the last tab and not the menu trigger
    as="div" variant="plain" color="tabs.solid.fg" _hover={{
            color: 'hover',
        }} _expanded={{
            color: 'selected.control.text',
            bg: 'selected.control.bg',
        }} ref={ref} expanded={isActive} px="18px" aria-label="Open tabs menu" {...props}>
          <react_1.Icon boxSize={5}><Dots_1.default /></react_1.Icon>
        </icon_button_1.IconButton>
      </popover_1.PopoverTrigger>
      <popover_1.PopoverContent>
        <popover_1.PopoverBody display="flex" flexDir="column" rowGap={2} px={0}>
          {tabs.slice(tabsCut).map((tab) => {
            const value = (0, utils_1.getTabValue)(tab);
            return (<popover_1.PopoverCloseTriggerWrapper key={value}>
                <tabs_1.TabsTrigger className="group" value={value} w="100%" py="5px" borderRadius="none" fontWeight="normal" color="tabs.solid.fg" _hover={{
                    bg: 'selected.control.bg',
                }}>
                  {typeof tab.title === 'function' ? tab.title() : tab.title}
                  <tabs_1.TabsCounter count={tab.count}/>
                </tabs_1.TabsTrigger>
              </popover_1.PopoverCloseTriggerWrapper>);
        })}
        </popover_1.PopoverBody>
      </popover_1.PopoverContent>
    </popover_1.PopoverRoot>);
};
exports.default = react_2.default.memo(react_2.default.forwardRef(AdaptiveTabsMenu));
