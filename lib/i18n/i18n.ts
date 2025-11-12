import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 语言包导入 - 英文
import accountEn from './en/account/common.json';
import addressesEn from './en/addresses/common.json';
import apiEn from './en/api/common.json';
import blobsEn from './en/blobs/common.json';
import blocksEn from './en/blocks/common.json';
import bridgeEn from './en/bridge/common.json';
import clustersEn from './en/clusters/common.json';
import commonEn from './en/common/common.json';
import dashboardEn from './en/dashboard/common.json';
import epochsEn from './en/epochs/common.json';
import gamesEn from './en/games/common.json';
import marketplaceEn from './en/marketplace/common.json';
import messagingEn from './en/messaging/common.json';
import poolsEn from './en/pools/common.json';
import settingsEn from './en/settings/common.json';
import sharedEn from './en/shared/common.json';
import stakingEn from './en/staking/common.json';
import statsEn from './en/stats/common.json';
import tokensEn from './en/tokens/common.json';
import transactionsEn from './en/transactions/common.json';
import validatorsEn from './en/validators/common.json';
import visualizeEn from './en/visualize/common.json';
// 语言包导入 - 中文
import accountZh from './zh-CN/account/common.json';
import addressesZh from './zh-CN/addresses/common.json';
import apiZh from './zh-CN/api/common.json';
import blobsZh from './zh-CN/blobs/common.json';
import blocksZh from './zh-CN/blocks/common.json';
import bridgeZh from './zh-CN/bridge/common.json';
import clustersZh from './zh-CN/clusters/common.json';
import commonZh from './zh-CN/common/common.json';
import dashboardZh from './zh-CN/dashboard/common.json';
import epochsZh from './zh-CN/epochs/common.json';
import gamesZh from './zh-CN/games/common.json';
import marketplaceZh from './zh-CN/marketplace/common.json';
import messagingZh from './zh-CN/messaging/common.json';
import poolsZh from './zh-CN/pools/common.json';
import settingsZh from './zh-CN/settings/common.json';
import sharedZh from './zh-CN/shared/common.json';
import stakingZh from './zh-CN/staking/common.json';
import statsZh from './zh-CN/stats/common.json';
import tokensZh from './zh-CN/tokens/common.json';
import transactionsZh from './zh-CN/transactions/common.json';
import validatorsZh from './zh-CN/validators/common.json';
import visualizeZh from './zh-CN/visualize/common.json';

// 语言资源
const resources = {
  en: {
    account: accountEn,
    addresses: addressesEn,
    api: apiEn,
    blobs: blobsEn,
    blocks: blocksEn,
    bridge: bridgeEn,
    clusters: clustersEn,
    common: commonEn,
    dashboard: dashboardEn,
    epochs: epochsEn,
    games: gamesEn,
    marketplace: marketplaceEn,
    messaging: messagingEn,
    pools: poolsEn,
    settings: settingsEn,
    shared: sharedEn,
    staking: stakingEn,
    stats: statsEn,
    tokens: tokensEn,
    transactions: transactionsEn,
    validators: validatorsEn,
    visualize: visualizeEn,
  },
  zh: {
    account: accountZh,
    addresses: addressesZh,
    api: apiZh,
    blobs: blobsZh,
    blocks: blocksZh,
    bridge: bridgeZh,
    clusters: clustersZh,
    common: commonZh,
    dashboard: dashboardZh,
    epochs: epochsZh,
    games: gamesZh,
    marketplace: marketplaceZh,
    messaging: messagingZh,
    pools: poolsZh,
    settings: settingsZh,
    shared: sharedZh,
    staking: stakingZh,
    stats: statsZh,
    tokens: tokensZh,
    transactions: transactionsZh,
    validators: validatorsZh,
    visualize: visualizeZh,
  },
};

// 初始化i18n实例
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // 默认语言
    fallbackLng: 'en', // 回退语言
    supportedLngs: ['en', 'zh'], // 支持的语言
    interpolation: {
      escapeValue: false, // React已经安全地转义了
    },
    ns: [
      'account',
      'addresses',
      'api',
      'blobs',
      'blocks',
      'bridge',
      'clusters',
      'common',
      'dashboard',
      'epochs',
      'games',
      'marketplace',
      'messaging',
      'pools',
      'settings',
      'shared',
      'staking',
      'stats',
      'tokens',
      'transactions',
      'validators',
      'visualize',
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