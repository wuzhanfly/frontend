// eslint-disable-next-line no-restricted-imports
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import i18n from 'i18next';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';
import 'dayjs/locale/zh-cn';

import * as cookies from 'lib/cookies';
import { nbsp } from 'toolkit/utils/htmlEntities';

const relativeTimeConfig = {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'ss', r: 59, d: 'second' },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 6, d: 'day' },
    { l: 'w', r: 1 },
    { l: 'ww', r: 4, d: 'week' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y', r: 17 },
    { l: 'yy', d: 'year' },
  ],
};

dayjs.extend(relativeTime, relativeTimeConfig);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(weekOfYear);
dayjs.extend(minMax);

dayjs.updateLocale('en', {
  formats: {
    llll: `MMM DD YYYY HH:mm:ss A (Z${ nbsp }UTC)`,
    lll: 'MMM D, YYYY h:mm A',
  },
  relativeTime: {
    s: '1s',
    ss: '%ds',
    future: 'in %s',
    past: '%s ago',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    w: '1w',
    ww: '%dw',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
});

// 中文配置
dayjs.updateLocale('zh', {
  formats: {
    llll: `YYYY年 M月 D日 HH:mm:ss A (Z${ nbsp }UTC)`,
    lll: 'YYYY年M月D日 h:mm A',
  },
  relativeTime: {
    s: '1秒',
    ss: '%d秒',
    future: '在 %s 后',
    past: '%s 前',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    w: '1周',
    ww: '%d周',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年',
  },
});

// dayjs.locale('en');

// 根据 i18n 当前语言设置 dayjs locale
function setDayjsLocale() {
  const currentLang = cookies.get(cookies.NAMES.LANGUAGE) || 'en';
  dayjs.locale(currentLang.split('-')[0]); // 处理 en-US 格式
}

// 初始化
setDayjsLocale();

// 监听语言变化
i18n.on('languageChanged', setDayjsLocale);

export default dayjs;
