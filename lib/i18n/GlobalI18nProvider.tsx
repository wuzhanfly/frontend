import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
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
  const [isI18nReady, setIsI18nReady] = useState(false);

  useEffect(() => {
    // 确保i18n实例完全初始化
    if (i18n.isInitialized) {
      setIsI18nReady(true);
    } else {
      const handleInitialized = () => {
        setIsI18nReady(true);
      };
      
      i18n.on('initialized', handleInitialized);
      
      // 清理事件监听器
      return () => {
        i18n.off('initialized', handleInitialized);
      };
    }
  }, []);

  // 在i18n完全加载之前显示加载状态或渲染空内容
  if (!isI18nReady) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading translations...</div>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default GlobalI18nProvider;