import React from 'react';
import { useTranslation } from 'react-i18next';

interface I18nExampleProps {
  title?: string;
}

const I18nExample: React.FC<I18nExampleProps> = ({ title = 'i18n Example Component' }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{t('common:welcome')} - {title}</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => changeLanguage('en')} style={{ marginRight: '10px' }}>
          English
        </button>
        <button onClick={() => changeLanguage('zh')}>
          中文
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>{t('common:dashboard')}</h2>
        <p>{t('common:loading')}</p>
        <p>{t('common:success')}</p>
        <p>{t('common:error')}</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>{t('form:label.email')}</h3>
        <input 
          type="email" 
          placeholder={t('form:placeholder.email')}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button style={{ padding: '8px 16px' }}>
          {t('form:button.submit')}
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>{t('form:title.settings')}</h3>
        <p>{t('form:helper.email')}</p>
        <p>{t('form:error.required')}</p>
      </div>
      
      <div>
        <h3>{t('common:status')}</h3>
        <span>{t('common:active')}</span> | <span>{t('common:inactive')}</span>
      </div>
    </div>
  );
};

export default I18nExample;