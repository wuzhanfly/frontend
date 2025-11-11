import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 语言包导入
import commonEn from './locales/en/common/text.json';
import formEn from './locales/en/form/text.json';
import commonZh from './locales/zh/common/text.json';
import formZh from './locales/zh/form/text.json';

// 语言资源
const resources = {
  en: {
    common: commonEn,
    form: formEn
  },
  zh: {
    common: commonZh,
    form: formZh
  }
};

// 预先初始化i18n实例
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // 默认语言
    fallbackLng: 'en', // 回退语言
    interpolation: {
      escapeValue: false // React已经安全地转义了
    },
    ns: ['common', 'form'], // 命名空间
    defaultNS: 'common', // 默认命名空间
    debug: process.env.NODE_ENV === 'development', // 开发模式下启用调试
    // 确保语言包在其他组件之前加载
    initImmediate: false, // 同步初始化
    react: {
      useSuspense: false // 禁用Suspense以避免加载问题
    }
  });

export default i18n;