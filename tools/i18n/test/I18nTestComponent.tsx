import React from 'react';
import { useTranslation } from 'react-i18next';

// 测试React和Next.js常用组件的文本提取
const I18nTestComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* 基本文本节点 */}
      <h1>Welcome to our application</h1>
      <p>This is a sample text for internationalization testing</p>
      
      {/* 表单元素 */}
      <form>
        <label htmlFor="username">Username</label>
        <input 
          id="username"
          type="text" 
          placeholder="Enter your username" 
          title="Please enter your username"
          aria-label="Username input field"
          hint="Username should be unique"
        />
        
        <label htmlFor="email">Email Address</label>
        <input 
          id="email"
          type="email" 
          placeholder="Enter your email" 
          title="Please enter your valid email address"
          aria-label="Email input field"
          hint="We'll never share your email"
          data-testid="email-input"
        />
        
        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password" 
          placeholder="Enter your password" 
          title="Password must be at least 8 characters"
          aria-label="Password input field"
          hint="Use a strong password with numbers and symbols"
        />
        
        <button 
          type="submit" 
          title="Click to submit the form"
          aria-label="Submit button"
          hint="Submit your form after filling all required fields"
        >
          Submit Form
        </button>
      </form>
      
      {/* Chakra UI 和其他组件库常用属性 */}
      <div 
        className="tooltip-container"
        title="This is a tooltip"
        hint="This is a hint message"
        tooltip="This is a tooltip message"
        data-label="Tooltip container"
      >
        <span>Hover for more information</span>
      </div>
      
      {/* 错误和提示信息 */}
      <div className="error-message" data-testid="error-message">
        Error occurred while processing your request
      </div>
      
      <div className="success-message">
        Operation completed successfully
      </div>
      
      <div className="warning-message">
        Please review your input before submitting
      </div>
      
      <div className="info-message">
        Additional information is available
      </div>
      
      {/* 描述性文本 */}
      <div className="description">
        <h2>Product Description</h2>
        <p>This product offers excellent features and performance</p>
      </div>
      
      {/* 链接文本 */}
      <nav>
        <a href="/home" title="Go to homepage" hint="Navigate to the home page">Home</a>
        <a href="/about" title="Learn more about us" hint="Learn more about our company">About Us</a>
        <a href="/contact" title="Contact our support team" hint="Reach out to our support team">Contact</a>
      </nav>
      
      {/* 表格标题和内容 */}
      <table>
        <thead>
          <tr>
            <th data-label="Name column">Name</th>
            <th data-label="Email column">Email</th>
            <th data-label="Status column">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
      
      {/* 按钮和交互元素 */}
      <div className="actions">
        <button 
          className="primary-button"
          title="Save your changes"
          hint="Save all the changes you made"
        >
          Save Changes
        </button>
        
        <button 
          className="secondary-button"
          title="Cancel and discard changes"
          hint="Cancel and return to the previous page"
        >
          Cancel
        </button>
        
        <button 
          className="delete-button"
          title="Delete this item permanently"
          hint="This action cannot be undone"
        >
          Delete
        </button>
      </div>
      
      {/* 提示和帮助文本 */}
      <div className="hints">
        <p data-testid="hint-text">Hint: Fields marked with * are required</p>
        <p className="helper-text">Helper: Password should contain at least one number</p>
        <p className="validation-message">Validation: Please enter a valid email address</p>
      </div>
      
      {/* 常见UI库属性 */}
      <div 
        tooltip="This is a tooltip" 
        hint="This is a hint" 
        helper="This is a helper text"
        description="This is a description"
        summary="This is a summary"
        caption="This is a caption"
      >
        UI Component with various text attributes
      </div>
    </div>
  );
};

export default I18nTestComponent;