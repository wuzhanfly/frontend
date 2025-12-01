import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 从 localStorage 获取保存的语言设置
const getStoredLanguage = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return localStorage.getItem('i18nextLng') || localStorage.getItem('language');
  } catch (error) {
    console.error('Failed to read language from localStorage:', error);
    return null;
  }
};

// 语言包导入 - 使用总引入文件
import combinedEn from './locales/en/common';
import combinedZh from './locales/zh-CN/common';

// 语言资源
const resources = {
  en: {
    common: combinedEn,
  },
  zh: {
    common: combinedZh,
  },
};

// 初始化i18n实例
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage() || 'en', // 优先使用本地存储的语言，默认为英文
    fallbackLng: 'en', // 回退语言
    supportedLngs: [ 'en', 'zh-CN' ], // 支持的语言
    interpolation: {
      escapeValue: false, // React已经安全地转义了
    },
    ns: [ 'common' ], // 命名空间
    defaultNS: 'common', // 默认命名空间
    // debug: process.env.NODE_ENV === 'development', // 开发模式下启用调试
    // 确保语言包在其他组件之前加载
    initImmediate: false, // 同步初始化
    react: {
      useSuspense: false, // 禁用Suspense以避免加载问题
    },
  });

export default i18n;
