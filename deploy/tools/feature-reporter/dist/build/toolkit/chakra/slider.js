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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
exports.Slider = React.forwardRef(function Slider(props, ref) {
    const { marks: marksProp, label, showValue, ...rest } = props;
    const value = props.defaultValue ?? props.value;
    const marks = marksProp?.map((mark) => {
        if (typeof mark === 'number')
            return { value: mark, label: undefined };
        return mark;
    });
    const hasMarkLabel = Boolean(marks?.some((mark) => mark.label));
    return (<react_1.Slider.Root ref={ref} thumbAlignment="center" {...rest}>
        {label && !showValue && (<react_1.Slider.Label>{label}</react_1.Slider.Label>)}
        {label && showValue && (<react_1.HStack justify="space-between">
            <react_1.Slider.Label>{label}</react_1.Slider.Label>
            <react_1.Slider.ValueText />
          </react_1.HStack>)}
        <react_1.Slider.Control data-has-mark-label={hasMarkLabel || undefined}>
          <react_1.Slider.Track>
            <react_1.Slider.Range />
          </react_1.Slider.Track>
          <SliderThumbs value={value}/>
          <SliderMarks marks={marks}/>
        </react_1.Slider.Control>
      </react_1.Slider.Root>);
});
function SliderThumbs(props) {
    const { value } = props;
    return (<react_1.For each={value}>
      {(_, index) => (<react_1.Slider.Thumb key={index} index={index}>
          <react_1.Slider.HiddenInput />
        </react_1.Slider.Thumb>)}
    </react_1.For>);
}
const SliderMarks = React.forwardRef(function SliderMarks(props, ref) {
    const { marks } = props;
    if (!marks?.length)
        return null;
    return (<react_1.Slider.MarkerGroup ref={ref}>
        {marks.map((mark, index) => {
            const value = typeof mark === 'number' ? mark : mark.value;
            const label = typeof mark === 'number' ? undefined : mark.label;
            return (<react_1.Slider.Marker key={index} value={value}>
              <react_1.Slider.MarkerIndicator />
              {label}
            </react_1.Slider.Marker>);
        })}
      </react_1.Slider.MarkerGroup>);
});
