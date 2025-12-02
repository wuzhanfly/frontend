import type { ReactNode } from 'react';
import React from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';

interface GlobalI18nProviderProps {
  children: ReactNode;
}

/**
 * 全局国际化提供者组件
 * 确保语言包在其他组件之前加载
 */
const GlobalI18nProvider: React.FC<GlobalI18nProviderProps> = ({ children }) => {
  // const [ isI18nReady, setIsI18nReady ] = useState(false);
  // const [ , setLanguageChange ] = useState(0);

  // useEffect(() => {
  //   // 确保i18n实例完全初始化
  //   const handleInitialized = () => {
  //     setIsI18nReady(true);
  //   };

  //   if (i18n.isInitialized) {
  //     handleInitialized();
  //   } else {
  //     i18n.on('initialized', handleInitialized);
  //   }

  //   // 监听语言变化并强制重新渲染
  //   const handleLanguageChange = () => {
  //     setLanguageChange(prev => prev + 1);
  //   };

  //   i18n.on('languageChanged', handleLanguageChange);

  //   // 清理事件监听器
  //   return () => {
  //     i18n.off('initialized', handleInitialized);
  //     i18n.off('languageChanged', handleLanguageChange);
  //   };
  // }, []);

  // // 在i18n完全加载之前显示加载状态或渲染空内容
  // if (!isI18nReady) {
  //   return (
  //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  //       <div>Loading translations...</div>
  //     </div>
  //   );
  // }

  return (
    <I18nextProvider i18n={ i18n }>
      { children }
    </I18nextProvider>
  );
};

export default GlobalI18nProvider;
