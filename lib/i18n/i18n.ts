import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 语言包导入
import addressesEn from './locales/en/addresses/text.json';
import commonEn from './locales/en/common/text.json';
import contractEn from './locales/en/contract/text.json';
import dashboardEn from './locales/en/dashboard/text.json';
import formEn from './locales/en/form/text.json';
import settingsEn from './locales/en/settings/text.json';
import sharedEn from './locales/en/shared/text.json';
import tokensEn from './locales/en/tokens/text.json';
import transactionsEn from './locales/en/transactions/text.json';
import validatorsEn from './locales/en/validators/text.json';
import addressesZh from './locales/zh/addresses/text.json';
import commonZh from './locales/zh/common/text.json';
import contractZh from './locales/zh/contract/text.json';
import dashboardZh from './locales/zh/dashboard/text.json';
import formZh from './locales/zh/form/text.json';
import settingsZh from './locales/zh/settings/text.json';
import sharedZh from './locales/zh/shared/text.json';
import tokensZh from './locales/zh/tokens/text.json';
import transactionsZh from './locales/zh/transactions/text.json';
import validatorsZh from './locales/zh/validators/text.json';

// 语言资源
const resources = {
  en: {
    common: commonEn,
    form: formEn,
    addresses: addressesEn,
    validators: validatorsEn,
    tokens: tokensEn,
    transactions: transactionsEn,
    contract: contractEn,
    shared: sharedEn,
    settings: settingsEn,
    dashboard: dashboardEn,
  },
  zh: {
    common: commonZh,
    form: formZh,
    addresses: addressesZh,
    validators: validatorsZh,
    tokens: tokensZh,
    transactions: transactionsZh,
    contract: contractZh,
    shared: sharedZh,
    settings: settingsZh,
    dashboard: dashboardZh,
  },
};

// 预先初始化i18n实例
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // 默认语言
    fallbackLng: 'en', // 回退语言
    interpolation: {
      escapeValue: false, // React已经安全地转义了
    },
    ns: [
      'common',
      'form',
      'addresses',
      'validators',
      'tokens',
      'transactions',
      'contract',
      'shared',
      'settings',
      'dashboard',
    ], // 命名空间
    defaultNS: 'common', // 默认命名空间
    debug: process.env.NODE_ENV === 'development', // 开发模式下启用调试
    // 确保语言包在其他组件之前加载
    initImmediate: false, // 同步初始化
    react: {
      useSuspense: false, // 禁用Suspense以避免加载问题
    },
  });

export default i18n;
