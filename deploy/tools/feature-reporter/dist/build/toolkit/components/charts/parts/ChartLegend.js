"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartLegend = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
exports.ChartLegend = react_2.default.memo(({ data, selectedIndexes, onItemClick, ...props }) => {
    const handleItemClick = react_2.default.useCallback((event) => {
        const itemIndex = event.currentTarget.getAttribute('data-index');
        onItemClick?.(Number(itemIndex));
    }, [onItemClick]);
    return (<react_1.Box display="flex" columnGap={3} {...props}>
      {data.map((item, index) => {
            const isSelected = selectedIndexes?.includes(index);
            const lineColor = (() => {
                const lineChart = item.charts.find((chart) => chart.type === 'line');
                const areaChart = item.charts.find((chart) => chart.type === 'area');
                return (lineChart?.color || areaChart?.gradient.startColor || 'transparent');
            })();
            return (<react_1.Box key={item.name} data-index={index} display="flex" alignItems="center" columnGap={1} p="2px" onClick={handleItemClick} cursor="pointer">
            <react_1.Circle size={2} bgColor={isSelected ? lineColor : 'transparent'} borderWidth={2} borderColor={lineColor}/>
            <react_1.Text fontSize="xs" color="text.secondary">
              {item.name}
            </react_1.Text>
          </react_1.Box>);
        })}
    </react_1.Box>);
});
