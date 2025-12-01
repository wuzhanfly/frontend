import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import * as cookies from 'lib/cookies';

import SettingLangItem from './SettingLangItem';

const SettingsLangSwitch = () => {
  const { t, i18n } = useTranslation();
  const [ activeLang, setActiveLang ] = React.useState<string>('en');

  React.useEffect(() => {
    const initialLang = cookies.get(cookies.NAMES.LANGUAGE) || 'en';
    setActiveLang(initialLang);
  }, []);

  const handleLanguageChange = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const lang = event.currentTarget.getAttribute('data-value');

    if (!lang) {
      return;
    }

    // 更新语言cookie
    cookies.set(cookies.NAMES.LANGUAGE, lang);

    // 更新当前语言状态
    setActiveLang(lang);

    // 切换语言
    i18n.changeLanguage(lang);
  }, [ i18n ]);

  const activeLanguage = activeLang;

  // 语言选项数据
  const LANGUAGES = [
    { id: 'en', label: t('settings.common.english'), flag: t('settings.common.flag_us') },
    { id: 'zh-CN', label: t('settings.common.chinese'), flag: t('settings.common.flag_china') },
  ];

  return (
    <div>
      { /* 语言切换部分 */ }
      <Box fontWeight={ 600 } mt={ 4 }>{ t('settings.common.language') }</Box>
      <Box color="text.secondary" mt={ 1 } mb={ 2 }>{ LANGUAGES.find(lang => lang.id === activeLanguage)?.label }</Box>
      <Flex>
        { LANGUAGES.map((lang) => (
          <SettingLangItem
            key={ lang.id }
            label={ lang.label }
            value={ lang.id }
            bg="transparent"
            isActive={ lang.id === activeLanguage }
            onClick={ handleLanguageChange }
            isLanguage={ true }
          />
        )) }
      </Flex>
    </div>
  );
};

export default React.memo(SettingsLangSwitch);
