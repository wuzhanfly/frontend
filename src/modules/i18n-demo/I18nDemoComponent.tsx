// 示例组件，演示如何使用国际化功能
import React from 'react';
import { useTranslation } from 'react-i18next';

const I18nDemoComponent: React.FC = () => {
  const { t, i18n } = useTranslation(['common', 'account']);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('common:welcome_message', 'Welcome to our app')}</h1>
      <p>{t('account:account_settings', 'Account Settings')}</p>
      <p>{t('common:items_count', 'Items count: {{count}}', { count: 5 })}</p>
      
      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('zh-CN')}>中文</button>
      </div>
    </div>
  );
};

export default I18nDemoComponent;