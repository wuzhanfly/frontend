import i18n from 'i18next';

/**
 * 国际化工具类
 * 用于语言切换和国际化相关操作
 */
class I18nUtils {
  /**
   * 获取当前语言
   */
  getCurrentLanguage = (): string => {
    return i18n.language;
  };

  /**
   * 切换语言
   * @param language 语言代码 ('en' 或 'zh')
   */
  changeLanguage = async(language: string): Promise<void> => {
    try {
      await i18n.changeLanguage(language);
      // 保存语言设置到 localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('i18nextLng', language);
          localStorage.setItem('language', language);
        } catch (error) {
          console.error('Failed to save language to localStorage:', error);
        }
      }
      console.log(`Language changed to ${ language }`);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  /**
   * 获取支持的语言列表
   */
  getSupportedLanguages = (): Array<string> => {
    const supportedLngs = i18n.options.supportedLngs;
    if (Array.isArray(supportedLngs)) {
      return supportedLngs.filter((lang): lang is string => typeof lang === 'string');
    }
    return [];
  };

  /**
   * 检查语言是否支持
   * @param language 语言代码
   */
  isLanguageSupported = (language: string): boolean => {
    const supported = this.getSupportedLanguages();
    return supported.includes(language);
  };
}

// 创建国际化工具实例
export const i18nUtils = new I18nUtils();

// 导出 t 函数用于翻译
export const t = i18n.t.bind(i18n);

// 导出 i18n 实例
export { i18n };
