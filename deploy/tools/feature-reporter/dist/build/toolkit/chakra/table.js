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
exports.TableHeaderSticky = exports.TableColumnHeaderSortable = exports.TableColumnHeader = exports.TableCell = exports.TableRow = exports.TableHeader = exports.TableBody = exports.TableRoot = void 0;
const react_1 = require("@chakra-ui/react");
const es_toolkit_1 = require("es-toolkit");
const React = __importStar(require("react"));
const East_1 = __importDefault(require("icons-components/arrows/East"));
const link_1 = require("./link");
exports.TableRoot = react_1.Table.Root;
exports.TableBody = react_1.Table.Body;
exports.TableHeader = react_1.Table.Header;
exports.TableRow = react_1.Table.Row;
const TableCell = (props) => {
    const { isNumeric, ...rest } = props;
    return <react_1.Table.Cell textAlign={isNumeric ? 'right' : undefined} {...rest}/>;
};
exports.TableCell = TableCell;
const TableColumnHeader = (props) => {
    const { isNumeric, ...rest } = props;
    return <react_1.Table.ColumnHeader textAlign={isNumeric ? 'right' : undefined} {...rest}/>;
};
exports.TableColumnHeader = TableColumnHeader;
const TableColumnHeaderSortable = (props) => {
    const { sortField, sortValue, onSortToggle, children, disabled, indicatorPosition = 'left', contentAfter, ...rest } = props;
    const handleSortToggle = React.useCallback(() => {
        onSortToggle(sortField);
    }, [onSortToggle, sortField]);
    return (<exports.TableColumnHeader {...rest}>
      <link_1.Link onClick={disabled ? undefined : handleSortToggle} position="relative">
        {sortValue.includes(sortField) && (<react_1.Icon w={4} h="100%" transform={sortValue.toLowerCase().includes('asc') ? 'rotate(-90deg)' : 'rotate(90deg)'} position="absolute" left={indicatorPosition === 'left' ? -5 : undefined} right={indicatorPosition === 'right' ? -5 : undefined} top={0}>
            <East_1.default />
          </react_1.Icon>)}
        {children}
      </link_1.Link>
      {contentAfter}
    </exports.TableColumnHeader>);
};
exports.TableColumnHeaderSortable = TableColumnHeaderSortable;
const TableHeaderSticky = (props) => {
    const { top, children, ...rest } = props;
    const ref = React.useRef(null);
    const [isStuck, setIsStuck] = React.useState(false);
    const handleScroll = React.useCallback(() => {
        if (Number(ref.current?.getBoundingClientRect().y) <= (top || 0)) {
            setIsStuck(true);
        }
        else {
            setIsStuck(false);
        }
    }, [top]);
    React.useEffect(() => {
        const throttledHandleScroll = (0, es_toolkit_1.throttle)(handleScroll, 300);
        window.addEventListener('scroll', throttledHandleScroll);
        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
        };
    }, [handleScroll]);
    return (<exports.TableHeader ref={ref} position="sticky" top={top ? `${top}px` : 0} backgroundColor={{ _light: 'white', _dark: 'black' }} boxShadow={isStuck ? 'action_bar' : 'none'} zIndex="1" {...rest}>
      {children}
    </exports.TableHeader>);
};
exports.TableHeaderSticky = TableHeaderSticky;
