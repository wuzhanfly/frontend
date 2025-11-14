import React from 'react';
import { useTranslation } from 'react-i18next';

const I18nTestComponent = () => {
  const { t, i18n, ready } = useTranslation();

  if (!ready) {
    return <div>Loading translations...</div>;
  }

  return (
    <div>
      <h1>t('common:welcome')</h1>
      <p>t('common:loading')</p>
      <p>Current language: {i18n.language}</p>
      <button onClick={() => i18n.changeLanguage('zh')}>
        切换到中文
      </button>
      <button onClick={() => i18n.changeLanguage('en')}>
        切换到英文
      </button>
    </div>
  );
};

export default I18nTestComponent;