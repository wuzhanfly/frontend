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
exports.ChartSelectionX = void 0;
const react_1 = require("@chakra-ui/react");
const d3 = __importStar(require("d3"));
const dayjs_1 = __importDefault(require("dayjs"));
const minMax_1 = __importDefault(require("dayjs/plugin/minMax"));
const react_2 = __importDefault(require("react"));
dayjs_1.default.extend(minMax_1.default);
const SELECTION_THRESHOLD = 2;
exports.ChartSelectionX = react_2.default.memo(({ anchorEl, height, scale, data, onSelect }) => {
    const [borderColor] = (0, react_1.useToken)('colors', 'blue.200');
    const ref = react_2.default.useRef(null);
    const isActive = react_2.default.useRef(false);
    const startX = react_2.default.useRef(undefined);
    const endX = react_2.default.useRef(undefined);
    const getIndexByX = react_2.default.useCallback((x) => {
        const xDate = scale.invert(x);
        const bisectDate = d3.bisector((d) => d.date).left;
        return bisectDate(data[0].items, xDate, 1);
    }, [data, scale]);
    const drawSelection = react_2.default.useCallback((x0, x1) => {
        const diffX = x1 - x0;
        d3.select(ref.current)
            .attr('opacity', 1);
        d3.select(ref.current)
            .select('.ChartSelectionX__line_left')
            .attr('x1', x0)
            .attr('x2', x0);
        d3.select(ref.current)
            .select('.ChartSelectionX__line_right')
            .attr('x1', x1)
            .attr('x2', x1);
        d3.select(ref.current)
            .select('.ChartSelectionX__rect')
            .attr('x', diffX > 0 ? x0 : diffX + x0)
            .attr('width', Math.abs(diffX));
    }, []);
    const handleSelect = react_2.default.useCallback((x0, x1) => {
        const startDate = scale.invert(x0);
        const endDate = scale.invert(x1);
        const xStep = (0, dayjs_1.default)(data[0].items[1].date).diff((0, dayjs_1.default)(data[0].items[0].date));
        if (Math.abs((0, dayjs_1.default)(startDate).diff(endDate)) > SELECTION_THRESHOLD * xStep) {
            onSelect([dayjs_1.default.min((0, dayjs_1.default)(startDate), (0, dayjs_1.default)(endDate)).toDate(), dayjs_1.default.max((0, dayjs_1.default)(startDate), (0, dayjs_1.default)(endDate)).toDate()]);
        }
    }, [onSelect, scale, data]);
    const cleanUp = react_2.default.useCallback(() => {
        isActive.current = false;
        startX.current = undefined;
        endX.current = undefined;
        d3.select(ref.current).attr('opacity', 0);
    }, []);
    const handelMouseUp = react_2.default.useCallback(() => {
        if (!isActive.current) {
            return;
        }
        if (startX.current && endX.current) {
            handleSelect(startX.current, endX.current);
        }
        cleanUp();
    }, [cleanUp, handleSelect]);
    react_2.default.useEffect(() => {
        if (!anchorEl) {
            return;
        }
        const anchorD3 = d3.select(anchorEl);
        anchorD3
            .on('mousedown.selectionX', (event) => {
            const [x] = d3.pointer(event, anchorEl);
            isActive.current = true;
            startX.current = x;
        }, { passive: true })
            .on('mousemove.selectionX', (event) => {
            if (isActive.current) {
                const [x] = d3.pointer(event, anchorEl);
                startX.current && drawSelection(startX.current, x);
                endX.current = x;
            }
        }, { passive: true })
            .on('mouseup.selectionX', handelMouseUp)
            .on('touchstart.selectionX', (event) => {
            const pointers = d3.pointers(event, anchorEl);
            isActive.current = pointers.length === 2;
        }, { passive: true })
            .on('touchmove.selectionX', (event) => {
            if (isActive.current) {
                const pointers = d3.pointers(event, anchorEl);
                if (pointers.length === 2 && Math.abs(pointers[0][0] - pointers[1][0]) > 5) {
                    drawSelection(pointers[0][0], pointers[1][0]);
                    startX.current = pointers[0][0];
                    endX.current = pointers[1][0];
                }
            }
        }, { passive: true })
            .on('touchend.selectionX', handelMouseUp, { passive: true });
        d3.select('body').on('mouseup.selectionX', function (event) {
            const isOutside = startX.current !== undefined && event.target !== anchorD3.node();
            if (isOutside) {
                handelMouseUp();
            }
        });
        return () => {
            anchorD3.on('.selectionX', null);
            d3.select('body').on('.selectionX', null);
        };
    }, [anchorEl, cleanUp, drawSelection, getIndexByX, handelMouseUp, handleSelect]);
    return (<g className="ChartSelectionX" ref={ref} opacity={0}>
      <rect className="ChartSelectionX__rect" width={0} height={height} fill="rgba(66, 153, 225, 0.1)"/>
      <line className="ChartSelectionX__line ChartSelectionX__line_left" x1={0} x2={0} y1={0} y2={height} stroke={borderColor}/>
      <line className="ChartSelectionX__line ChartSelectionX__line_right" x1={0} x2={0} y1={0} y2={height} stroke={borderColor}/>
    </g>);
});
