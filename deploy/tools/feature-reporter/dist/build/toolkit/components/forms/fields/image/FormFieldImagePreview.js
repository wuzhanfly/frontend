"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldImagePreview = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const image_1 = require("../../../../chakra/image");
const skeleton_1 = require("../../../../chakra/skeleton");
exports.FormFieldImagePreview = (0, react_1.chakra)(react_2.default.memo(({ src, isInvalid, onError, onLoad, className, fallback: fallbackProp, colorMode, }) => {
    const skeleton = <skeleton_1.Skeleton loading className={[className, colorMode === 'dark' ? 'dark' : undefined].filter(Boolean).join(' ')} w="100%" h="100%"/>;
    const fallback = (() => {
        if (src && !isInvalid) {
            return skeleton;
        }
        return fallbackProp;
    })();
    return (<image_1.Image key={src} className={className} src={src} alt="Image preview" w="auto" h="100%" fallback={fallback} onError={onError} onLoad={onLoad}/>);
}));
