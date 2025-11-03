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
exports.ChartAxis = void 0;
const react_1 = require("@chakra-ui/react");
const d3 = __importStar(require("d3"));
const react_2 = __importDefault(require("react"));
const color_mode_1 = require("../../../chakra/color-mode");
exports.ChartAxis = react_2.default.memo(({ type, scale, ticks, tickFormatGenerator, noAnimation, anchorEl, ...props }) => {
    const ref = react_2.default.useRef(null);
    const textColor = (0, react_1.useToken)('colors', (0, color_mode_1.useColorModeValue)('blackAlpha.600', 'whiteAlpha.500'));
    react_2.default.useEffect(() => {
        if (!ref.current) {
            return;
        }
        const axisGenerator = type === 'left' ? d3.axisLeft : d3.axisBottom;
        const axis = axisGenerator(scale).ticks(ticks);
        if (tickFormatGenerator) {
            axis.tickFormat(tickFormatGenerator(axis));
        }
        const axisGroup = d3.select(ref.current);
        if (noAnimation) {
            axisGroup.call(axis);
        }
        else {
            axisGroup.transition().duration(750).ease(d3.easeLinear).call(axis);
        }
        axisGroup.select('.domain').remove();
        axisGroup.selectAll('line').remove();
        axisGroup.selectAll('text')
            .attr('opacity', 1)
            .attr('color', textColor)
            .style('font-size', '12px');
    }, [scale, ticks, tickFormatGenerator, noAnimation, type, textColor]);
    react_2.default.useEffect(() => {
        if (!anchorEl) {
            return;
        }
        const anchorD3 = d3.select(anchorEl);
        anchorD3
            .on('mouseout.axisX', () => {
            d3.select(ref.current)
                .selectAll('text')
                .style('font-weight', 'normal');
        })
            .on('mousemove.axisX', (event) => {
            const [x] = d3.pointer(event, anchorEl);
            const xDate = scale.invert(x);
            const textElements = d3.select(ref.current).selectAll('text');
            const data = textElements.data();
            const index = d3.bisector((d) => d).left(data, xDate);
            textElements
                .style('font-weight', (_, i) => i === index - 1 ? 'bold' : 'normal');
        });
        return () => {
            anchorD3.on('mouseout.axisX mousemove.axisX', null);
        };
    }, [anchorEl, scale]);
    return <g ref={ref} {...props}/>;
});
