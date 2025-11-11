// i18n-ready
import React from 'react';
import { useTranslation } from 'react-i18next';


const TestComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* JSX文本节点 */}
      <h1>{t('common.welcome_to_our_application')}</h1>
      <p>{t('common.this_is_a_sample_text_that_sho')}</p>
      <p>{t('common.another_paragraph_with_some_co')}</p>
      
      {/* 带有可翻译属性的元素 */}
      <input 
        type="text" 
        placeholder={t('form.placeholder.enter_your_name')} 
        title={t('form.title.please_enter_your_full_name')}
        aria-label={t('form.aria-label.user_name_input')}
      />
      
      <button 
        title={t('form.title.click_to_submit')} 
        aria-label={t('form.aria-label.submit_button')}
      >
        Submit
      </button>
      
      <div 
        title={t('form.title.information_tooltip')} 
        aria-label={t('form.aria-label.info_container')}
      >
        <span>{t('common.total_items_5')}</span>
      </div>
      
      {/* 复杂的JSX结构 */}
      <section>
        <h2>{t('common.settings')}</h2>
        <form>
          <label htmlFor="email">{t('common.email_address')}</label>
          <input 
            id="email"
            type="email" 
            placeholder={t('form.placeholder.enter_your_email')} 
            title={t('form.title.email_input_field')}
          />
          <button type="submit">{t('common.save_changes')}</button>
        </form>
      </section>
      
      {/* 包含特殊字符的文本 */}
      <div>
        <span>{t('common.loading')}</span>
        <span>{t('common.error_occurred')}</span>
        <span>{t('common.success_message')}</span>
      </div>
      
      {/* 包含数字和特殊字符的文本 */}
      <div>
        <span>{t('common.page_1_of_10')}</span>
        <span>{t('common.100_complete')}</span>
      </div>
      
      {/* 选择器和按钮 */}
      <select title={t('form.title.choose_an_option')}>
        <option value="1">{t('common.option_1')}</option>
        <option value="2">{t('common.option_2')}</option>
        <option value="3">{t('common.option_3')}</option>
      </select>
      
      <textarea 
        placeholder={t('form.placeholder.enter_your_message')} 
        title={t('form.title.message_input')} 
        aria-label={t('form.aria-label.text_area_input')}
      />
      
      {/* 导航元素 */}
      <nav>
        <a href="#" title={t('form.title.home_page')}>{t('common.home')}</a>
        <a href="#" title={t('form.title.about_us')}>{t('common.about')}</a>
        <a href="#" title={t('form.title.contact_information')}>{t('common.contact')}</a>
      </nav>
      
      {/* 工具提示和辅助功能 */}
      <div 
        role="tooltip" 
        aria-label={t('form.aria-label.tooltip_content')}
      >
        Tooltip text
      </div>
      
      {/* 表格相关文本 */}
      <table>
        <thead>
          <tr>
            <th>{t('common.name')}</th>
            <th>{t('common.email')}</th>
            <th>{t('common.status')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t('common.john_doe')}</td>
            <td>{t('common.johnexamplecom')}</td>
            <td>{t('common.active')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TestComponent;