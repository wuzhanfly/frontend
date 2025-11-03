"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useTimeAgoIncrement;
const react_1 = __importDefault(require("react"));
const dayjs_1 = __importDefault(require("lib/date/dayjs"));
const consts_1 = require("toolkit/utils/consts");
function getUnits(diff) {
    if (diff < consts_1.MINUTE) {
        return [consts_1.SECOND, consts_1.MINUTE];
    }
    if (diff < consts_1.HOUR) {
        return [consts_1.MINUTE, consts_1.HOUR];
    }
    if (diff < consts_1.DAY) {
        return [consts_1.HOUR, consts_1.DAY];
    }
    return [consts_1.DAY, 2 * consts_1.DAY];
}
function getUpdateParams(ts) {
    const timeDiff = Date.now() - new Date(ts).getTime();
    const [unit, higherUnit] = getUnits(timeDiff);
    if (unit === consts_1.DAY) {
        return { interval: consts_1.DAY };
    }
    const leftover = unit - timeDiff % unit;
    return {
        startTimeout: unit === consts_1.SECOND ?
            0 :
            // here we assume that in current dayjs locale time difference is rounded by Math.round function
            // so we have to update displayed value whenever time comes over the middle of the unit interval
            // since it will be rounded to the upper bound
            (leftover < unit / 2 ? leftover + unit / 2 : leftover - unit / 2) + consts_1.SECOND,
        endTimeout: higherUnit - timeDiff + consts_1.SECOND,
        interval: unit,
    };
}
function useTimeAgoIncrement(ts, isEnabled) {
    const [value, setValue] = react_1.default.useState(ts ? (0, dayjs_1.default)(ts).fromNow() : null);
    react_1.default.useEffect(() => {
        if (ts !== null) {
            const timeouts = [];
            const intervals = [];
            const startIncrement = () => {
                const { startTimeout, interval, endTimeout } = getUpdateParams(ts);
                if (!startTimeout && !endTimeout) {
                    return;
                }
                let intervalId;
                const startTimeoutId = window.setTimeout(() => {
                    setValue((0, dayjs_1.default)(ts).fromNow());
                    intervalId = window.setInterval(() => {
                        setValue((0, dayjs_1.default)(ts).fromNow());
                    }, interval);
                    intervals.push(intervalId);
                }, startTimeout);
                const endTimeoutId = window.setTimeout(() => {
                    window.clearInterval(intervalId);
                    startIncrement();
                }, endTimeout);
                timeouts.push(startTimeoutId);
                timeouts.push(endTimeoutId);
            };
            setValue((0, dayjs_1.default)(ts).fromNow());
            isEnabled && startIncrement();
            !isEnabled && setValue((0, dayjs_1.default)(ts).fromNow());
            return () => {
                timeouts.forEach(window.clearTimeout);
                intervals.forEach(window.clearInterval);
            };
        }
    }, [isEnabled, ts]);
    return value;
}
