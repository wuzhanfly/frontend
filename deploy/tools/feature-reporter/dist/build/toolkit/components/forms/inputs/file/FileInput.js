"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInput = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const input_1 = require("../../../../chakra/input");
const FileInputContent = ({ children, accept, multiple, field }) => {
    const ref = react_2.default.useRef(null);
    react_2.default.useEffect(() => {
        if (!multiple && field.value?.length === 0 && ref.current?.value) {
            ref.current.value = '';
        }
    }, [field.value?.length, multiple]);
    const onChange = react_2.default.useCallback((files) => {
        field.onChange([...(field.value || []), ...files]);
    }, [field]);
    const handleInputChange = react_2.default.useCallback((event) => {
        const fileList = event.target.files;
        if (!fileList) {
            return;
        }
        const files = Array.from(fileList);
        onChange(files);
        field.onBlur();
    }, [onChange, field]);
    const handleClick = react_2.default.useCallback(() => {
        ref.current?.click();
    }, []);
    const handleInputBlur = react_2.default.useCallback(() => {
        field.onBlur();
    }, [field]);
    const injectedProps = react_2.default.useMemo(() => ({
        onChange,
    }), [onChange]);
    const content = typeof children === 'function' ? children(injectedProps) : children;
    return (<react_1.Box onClick={handleClick}>
      <react_1.VisuallyHidden>
        <input_1.Input type="file" onChange={handleInputChange} onBlur={handleInputBlur} ref={ref} accept={accept} multiple={multiple} name={field.name}/>
      </react_1.VisuallyHidden>
      {content}
    </react_1.Box>);
};
exports.FileInput = react_2.default.memo(FileInputContent);
