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
exports.Rating = void 0;
const react_1 = require("@chakra-ui/react");
const React = __importStar(require("react"));
const StarFilled_1 = __importDefault(require("icons-components/StarFilled"));
const StarOutline_1 = __importDefault(require("icons-components/StarOutline"));
exports.Rating = React.forwardRef(function Rating(props, ref) {
    const { count = 5, label: labelProp, defaultValue, onValueChange, readOnly, ...rest } = props;
    const store = (0, react_1.useRatingGroup)({ count, defaultValue, onValueChange, readOnly });
    const highlightedIndex = store.hovering && !readOnly ? store.hoveredValue : store.value;
    const label = Array.isArray(labelProp) ? labelProp[highlightedIndex - 1] : labelProp;
    return (<react_1.RatingGroup.RootProvider ref={ref} value={store} {...rest}>
        <react_1.RatingGroup.HiddenInput />
        <react_1.RatingGroup.Control>
          {Array.from({ length: count }).map((_, index) => {
            const icon = index < highlightedIndex ?
                <react_1.Icon boxSize={5}><StarFilled_1.default /></react_1.Icon> :
                <react_1.Icon boxSize={5}><StarOutline_1.default /></react_1.Icon>;
            return (<react_1.RatingGroup.Item key={index} index={index + 1}>
                <react_1.RatingGroup.ItemIndicator icon={icon} cursor={readOnly ? 'default' : 'pointer'}/>
              </react_1.RatingGroup.Item>);
        })}
        </react_1.RatingGroup.Control>
        {label && <react_1.RatingGroup.Label>{label}</react_1.RatingGroup.Label>}
      </react_1.RatingGroup.RootProvider>);
});
