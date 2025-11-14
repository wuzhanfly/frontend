import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import config from 'configs/app';
import * as cookies from 'lib/cookies';
import { IDENTICONS } from 'lib/settings/identIcon';

import SettingsSample from './SettingsSample';

const SettingsIdentIcon = () => {
  const { t, i18n } = useTranslation();
  const [ activeId, setActiveId ] = React.useState<string>();
  const [ activeLang, setActiveLang ] = React.useState<string>('en');

  React.useEffect(() => {
    const initialId = cookies.get(cookies.NAMES.ADDRESS_IDENTICON_TYPE) || config.UI.views.address.identiconType;
    const initialLang = cookies.get(cookies.NAMES.LANGUAGE) || 'en';
    setActiveId(initialId);
    setActiveLang(initialLang);
  }, []);

  const handleSelect = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const id = event.currentTarget.getAttribute('data-value');

    if (!id) {
      return;
    }

    cookies.set(cookies.NAMES.ADDRESS_IDENTICON_TYPE, id);
    window.location.reload();
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
  }, [i18n]);

  const activeIdenticon = IDENTICONS.find((identicon) => identicon.id === activeId);
  const activeLanguage = activeLang;

  // 语言选项数据
  const LANGUAGES = [
    { id: 'en', label: t('settings.common.english'), flag: t('settings.common.flag_us') },
    { id: 'zh', label: t('settings.common.chinese'), flag: t('settings.common.flag_china') },
  ];

  return (
    <div>
      <Box fontWeight={ 600 }>{ t('settings.common.settings') }</Box>
      <Box color="text.secondary" mt={ 1 } mb={ 2 }>{ activeIdenticon?.label }</Box>
      <Flex mb={ 3 }>
        { IDENTICONS.map((identicon) => (
          <SettingsSample
            key={ identicon.id }
            label={ identicon.label }
            value={ identicon.id }
            bg={ identicon.sampleBg }
            isActive={ identicon.id === activeId }
            onClick={ handleSelect }
          />
        )) }
      </Flex>
      
      {/* 语言切换部分 */}
      <Box fontWeight={ 600 } mt={ 4 }>{ t('settings.common.language') }</Box>
      <Box color="text.secondary" mt={ 1 } mb={ 2 }>{LANGUAGES.find(lang => lang.id === activeLanguage)?.label}</Box>
      <Flex>
        { LANGUAGES.map((lang) => (
          <SettingsSample
            key={ lang.id }
            label={ lang.label }
            value={ lang.id }
            bg="transparent"
            isActive={ lang.id === activeLanguage }
            onClick={ handleLanguageChange }
            isLanguage={true}
          />
        )) }
      </Flex>
    </div>
  );
};

export default React.memo(SettingsIdentIcon);