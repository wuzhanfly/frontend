import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface I18nProviderProps {
  children: ReactNode;
}

const I18nInitializer: React.FC<I18nProviderProps> = ({ children }) => {
  const { i18n, ready } = useTranslation();
  const [ isInitialized, setIsInitialized ] = useState(false);

  useEffect(() => {
    if (ready) {
      setIsInitialized(true);
    }
  }, [ ready ]);

  // 在 i18n 完全加载之前显示加载状态
  if (!isInitialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading translations...</div>
      </div>
    );
  }

  return <div>{ children }</div>;
};

export default I18nInitializer;