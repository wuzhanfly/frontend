"use strict";
'use client';
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
exports.SelectAsync = exports.Select = exports.SelectItemText = exports.SelectLabel = exports.SelectItemGroup = exports.SelectRoot = exports.SelectValueText = exports.SelectItem = exports.SelectContent = exports.SelectClearTrigger = exports.SelectControl = void 0;
const react_1 = require("@chakra-ui/react");
const usehooks_1 = require("@uidotdev/usehooks");
const React = __importStar(require("react"));
const EastMini_1 = __importDefault(require("icons-components/arrows/EastMini"));
const Check_1 = __importDefault(require("icons-components/Check"));
const FilterInput_1 = require("../components/filters/FilterInput");
const close_button_1 = require("./close-button");
const skeleton_1 = require("./skeleton");
;
exports.SelectControl = React.forwardRef(function SelectControl(props, ref) {
    // NOTE: here defaultValue means the "default" option of the select, not its initial value
    const { children, noIndicator, triggerProps, loading, defaultValue, ...rest } = props;
    const context = (0, react_1.useSelectContext)();
    const isDefaultValue = Array.isArray(defaultValue) ? context.value.every((item) => defaultValue.includes(item)) : context.value === defaultValue;
    return (<skeleton_1.Skeleton loading={loading} asChild>
      <react_1.Select.Control {...rest}>
        <react_1.Select.Trigger ref={ref} className="group peer" {...triggerProps} data-default-value={isDefaultValue}>{children}</react_1.Select.Trigger>
        {(!noIndicator) && (<react_1.Select.IndicatorGroup>
            {!noIndicator && (<react_1.Select.Indicator transform="rotate(-90deg)" _open={{ transform: 'rotate(90deg)' }} flexShrink={0}>
                <react_1.Icon boxSize={5}><EastMini_1.default /></react_1.Icon>
              </react_1.Select.Indicator>)}
          </react_1.Select.IndicatorGroup>)}
      </react_1.Select.Control>
    </skeleton_1.Skeleton>);
});
exports.SelectClearTrigger = React.forwardRef(function SelectClearTrigger(props, ref) {
    return (<react_1.Select.ClearTrigger asChild {...props} ref={ref}>
      <close_button_1.CloseButton pointerEvents="auto"/>
    </react_1.Select.ClearTrigger>);
});
exports.SelectContent = React.forwardRef(function SelectContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (<react_1.Portal disabled={!portalled} container={portalRef}>
      <react_1.Select.Positioner>
        <react_1.Select.Content {...rest} ref={ref}/>
      </react_1.Select.Positioner>
    </react_1.Portal>);
});
exports.SelectItem = React.forwardRef(function SelectItem(props, ref) {
    const { item, children, ...rest } = props;
    const startElement = item.icon;
    return (<react_1.Select.Item key={item.value} item={item} {...rest} ref={ref}>
      {startElement}
      {children}
      <react_1.Select.ItemIndicator asChild>
        <react_1.Icon boxSize={5} flexShrink={0} ml="auto"><Check_1.default /></react_1.Icon>
      </react_1.Select.ItemIndicator>
    </react_1.Select.Item>);
});
exports.SelectValueText = React.forwardRef(function SelectValueText(props, ref) {
    const { children, size, required, invalid, errorText, mode, ...rest } = props;
    const context = (0, react_1.useSelectContext)();
    const content = (() => {
        const items = context.selectedItems;
        const placeholder = `${props.placeholder}${required ? '*' : ''}${invalid && errorText ? ` - ${errorText}` : ''}`;
        if (items.length === 0)
            return placeholder;
        if (children)
            return children(items);
        if (items.length === 1) {
            const item = items[0];
            if (!item)
                return placeholder;
            const label = size === 'lg' ? (<react_1.Box textStyle="xs" color={invalid ? 'field.placeholder.error' : 'field.placeholder'} display="-webkit-box">
          {placeholder}
        </react_1.Box>) : null;
            return (<>
          {label}
          <react_1.Flex display="inline-flex" alignItems="center" flexWrap="nowrap" gap={1}>
            {item.icon}
            {mode !== 'compact' && (<span style={{
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                    }}>
                {item.renderLabel ? item.renderLabel() : context.collection.stringifyItem(item)}
              </span>)}
          </react_1.Flex>
        </>);
        }
        // FIXME: we don't have multiple selection in the select yet
        return `${items.length} selected`;
    })();
    return (<react_1.Select.ValueText ref={ref} {...rest}>
      {content}
    </react_1.Select.ValueText>);
});
exports.SelectRoot = React.forwardRef(function SelectRoot(props, ref) {
    const { lazyMount = true, unmountOnExit = true, ...rest } = props;
    return (<react_1.Select.Root ref={ref} lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...rest} positioning={{ sameWidth: false, ...props.positioning, offset: { mainAxis: 4, ...props.positioning?.offset } }}>
      {props.asChild ? (props.children) : (<>
          <react_1.Select.HiddenSelect />
          {props.children}
        </>)}
    </react_1.Select.Root>);
});
exports.SelectItemGroup = React.forwardRef(function SelectItemGroup(props, ref) {
    const { children, label, ...rest } = props;
    return (<react_1.Select.ItemGroup {...rest} ref={ref}>
      <react_1.Select.ItemGroupLabel>{label}</react_1.Select.ItemGroupLabel>
      {children}
    </react_1.Select.ItemGroup>);
});
exports.SelectLabel = react_1.Select.Label;
exports.SelectItemText = react_1.Select.ItemText;
exports.Select = React.forwardRef((props, ref) => {
    const { collection, placeholder, portalled = true, loading, errorText, contentProps, mode, ...rest } = props;
    return (<exports.SelectRoot ref={ref} collection={collection} {...rest}>
      <exports.SelectControl loading={loading}>
        <exports.SelectValueText placeholder={placeholder} size={props.size} required={props.required} invalid={props.invalid} errorText={errorText} mode={mode}/>
      </exports.SelectControl>
      <exports.SelectContent portalled={portalled} {...contentProps}>
        {collection.items.map((item) => (<exports.SelectItem item={item} key={item.value}>
            {item.renderLabel ? item.renderLabel() : item.label}
          </exports.SelectItem>))}
      </exports.SelectContent>
    </exports.SelectRoot>);
});
exports.SelectAsync = React.forwardRef((props, ref) => {
    const { placeholder, portalled = true, loading, loadOptions, extraControls, onValueChange, errorText, mode, ...rest } = props;
    const [collection, setCollection] = React.useState((0, react_1.createListCollection)({ items: [] }));
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState([]);
    const debouncedInputValue = (0, usehooks_1.useDebounce)(inputValue, 300);
    React.useEffect(() => {
        loadOptions(debouncedInputValue, value).then(setCollection);
    }, [debouncedInputValue, loadOptions, value]);
    const handleFilterChange = React.useCallback((value) => {
        setInputValue(value);
    }, []);
    const handleValueChange = React.useCallback(({ value, items }) => {
        setValue(value);
        onValueChange?.({ value, items });
    }, [onValueChange]);
    return (<exports.SelectRoot ref={ref} collection={collection} onValueChange={handleValueChange} {...rest}>
      <exports.SelectControl loading={loading}>
        <exports.SelectValueText placeholder={placeholder} size={props.size} required={props.required} invalid={props.invalid} errorText={errorText} mode={mode}/>
      </exports.SelectControl>
      <exports.SelectContent portalled={portalled}>
        <react_1.Box px="4">
          <FilterInput_1.FilterInput placeholder="Search" initialValue={inputValue} onChange={handleFilterChange} inputProps={{ pl: '9' }}/>
          {extraControls}
        </react_1.Box>
        {collection.items.map((item) => (<exports.SelectItem item={item} key={item.value}>
            {item.renderLabel ? item.renderLabel() : item.label}
          </exports.SelectItem>))}
      </exports.SelectContent>
    </exports.SelectRoot>);
});
