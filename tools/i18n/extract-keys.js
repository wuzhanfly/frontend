#!/usr/bin/env node

/**
 * 提取国际化内容脚本
 * 根据文档要求重新创建
 */

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  // 需要处理的目录
  TARGET_DIRS: ['ui', 'pages'],
  // 需要排除的目录
  EXCLUDE_DIRS: ['node_modules', '.next', 'dist', '.git', 'public', 'i18n', 'test'],
  // 文件扩展名
  FILE_EXTENSIONS: ['.tsx', '.ts'],
  // 需要排除的文本
  IGNORED_TEXTS: [
    '', ' ', '""', "''", 'null', 'undefined', 'true', 'false', 'id', 'key', 'class', 'className', 'style',
    'src', 'href', 'alt', 'role', 'htmlFor', 'type', 'value', 'children', 'react', 'next',
    'allow-forms allow-orientation-lock ', 'allow-same-origin allow-scripts ', 
    'min-content min-content min-content', 'opacity 0.2s'
  ],
  // 需要排除的模式
  EXCLUDE_PATTERNS: [
    /^\s*import\s+/, // 导入语句
    /^\s*export\s+/, // 导出语句
    /console\./, // 控制台输出
    /\/\//, // 单行注释
    /\/\*/, // 多行注释开始
    /\*\//, // 多行注释结束
    /^\s*\w+\s*:\s*\w+\s*$/, // 对象属性
    /0x[0-9a-fA-F]+/, // 地址
    /https?:\/\//, // URL
    /^\d+$/, // 纯数字
    /^[,.;:!?()[\]{}\-_]+$/, // 纯符号
    /^[a-z]+$/, // 单个HTML标签名
    /aria-label=/, // aria属性标签
    /title=/, // title属性标签
    /placeholder=/, // placeholder属性标签
    /id=/, // id属性值
    /className=/, // className属性值
    /className=/, // class属性值
    /htmlFor=/, // htmlFor属性值
    /type=/, // type属性值
    /role=/, // role属性值
    /src=/, // src属性值
    /href=/, // href属性值
    /alt=/, // alt属性值
    /value=/, // value属性值
    /children=/, // children属性值
    /\d+\s+\d+\s+\d+\s+\d+/, // SVG viewBox 值等坐标格式
    /^\d+\s+\d+\s+\d+$/, // 3个数字的坐标格式
  ],
  // 命名空间映射
  NAMESPACE_MAPPING: {
    'addresses': ['addresses', 'address', 'addressVerification'],
    'validators': ['validators', 'validator'],
    'tokens': ['tokens', 'token', 'tokenInfo', 'tokenInstance'],
    'transactions': ['transactions', 'transaction', 'tx', 'txnBatches', 'txnWithdrawals'],
    'contract': ['contract', 'contracts', 'contractVerification'],
    'settings': ['settings', 'setting'],
    'dashboard': ['dashboard'],
    'shared': ['shared', 'common'],
    'form': ['form'],
    'blocks': ['blocks', 'block', 'blockCountdown'],
    'api': ['api', 'apiDocs', 'apiKey'],
    'account': ['account', 'accounts', 'myProfile', 'privateTags', 'publicTags', 'watchlist'],
    'search': ['searchResults', 'advancedFilter'],
    'stats': ['stats', 'gasTracker'],
    'nft': ['nft', 'tokens', 'tokenTransfers', 'collections'],
    'staking': ['rewards', 'validators', 'deposits', 'withdrawals'],
    'governance': ['governance', 'votes', 'proposals'],
    'messaging': ['messages', 'interopMessages'],
    'bridge': ['deposits', 'withdrawals', 'operations', 'userOps'],
    'games': ['games', 'game'],
    'marketplace': ['marketplace', 'dapps'],
    'mud': ['mudWorlds', 'mud'],
    'clusters': ['cluster', 'clusters'],
    'names': ['nameDomain', 'nameServices'],
    'pools': ['pools', 'pool'],
    'blobs': ['blobs', 'blob'],
    'zeta': ['zetaChain', 'zeta'],
    'optimism': ['optimismSuperchain', 'op'],
    'epochs': ['epochs'],
    'csv': ['csvExport'],
    'visualize': ['sol2uml', 'visualize'],
    'dispute': ['disputeGames', 'disputes'],
    'output': ['outputRoots'],
    'megaeth': ['megaEth']
  }
};

// 提取硬编码字符串的正则表达式
const STRING_LITERAL_REGEX = /(["'`])((?!\1\1\1)(?:\1\1(?!.)|[^\\]|\\.)*?)\1/g;
const JSX_TEXT_REGEX = />([^<>\n]{2,}?)(?=<)/g;
// 仅提取需要国际化的JSX属性
const JSX_ATTR_REGEX = /\b(hint|placeholder|title|tooltip|aria-label|alt|label|helperText|emptyText|fallbackText|loadingText|prevLabel|nextLabel|linkText|description|summary|message|error|success|warning|info|caption|text|modal-title)=(["'])((?:(?!\2).)*)\2/gi;

/**
 * 检查文件是否应该被处理
 */
function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  
  // 排除测试文件
  if (filePath.endsWith('.pw.tsx') || filePath.endsWith('.test.tsx') || filePath.endsWith('.spec.tsx')) {
    return false;
  }
  
  return CONFIG.FILE_EXTENSIONS.includes(ext);
}

/**
 * 检查目录是否应该被排除
 */
function shouldExcludeDir(dirPath) {
  const dirName = path.basename(dirPath);
  return CONFIG.EXCLUDE_DIRS.includes(dirName);
}

/**
 * 检查是否为单个文件
 */
function isFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (error) {
    return false;
  }
}

/**
 * 检查是否为目录
 */
function isDirectory(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (error) {
    return false;
  }
}

/**
 * 检查文本是否应该被忽略
 */
function shouldIgnoreText(text) {
  const trimmed = text.trim();

  // 检查特定的技术性内容
  if (text.includes('allow-forms allow-orientation-lock') || 
      text.includes('allow-same-origin allow-scripts') ||
      text.includes('min-content min-content min-content') ||
      text.includes('opacity 0.2s') ||
      (text.includes('"network links-top"') && text.includes('"info links-bottom"') && 
       text.includes('"recaptcha links-bottom"'))) {
    return true;
  }

  // 检查长度
  if (trimmed.length < 2 || trimmed.length > 100) return true;

  // 检查是否在忽略列表中
  if (CONFIG.IGNORED_TEXTS.includes(trimmed.toLowerCase())) return true;

  // 检查是否匹配排除模式
  for (const pattern of CONFIG.EXCLUDE_PATTERNS) {
    if (pattern.test(trimmed)) return true;
  }
  
  // 检查是否为组件属性名称模式（以 _filter, _form, _input, _button, _modal 结尾）
  if (/\w+_(filter|form|input|button|modal|list|table|chart|graph|panel|dialog|popover|menu|dropdown|select|option|field|container|wrapper|header|footer|sidebar|nav|link|icon|image|avatar|card|grid|row|col|section|layout|container|group|item|element|component)$/.test(trimmed)) {
    return true;
  }

  // 检查是否为数字
  if (/^\d+$/.test(trimmed)) return true;

  // 检查是否为路径
  if (trimmed.includes('/') || trimmed.includes('\\')) return true;
  
  // 检查是否为URL或文件路径
  if (trimmed.includes('http://') || trimmed.includes('https://') || 
      trimmed.includes('www.') || trimmed.includes('.js') || 
      trimmed.includes('.ts') || trimmed.includes('.tsx') || 
      trimmed.includes('.css')) {
    return true;
  }

  // 检查是否为CSS相关值
  const cssValues = ['flex', 'block', 'inline', 'grid', 'absolute', 'relative', 'fixed', 'sticky', 'static',
    'center', 'left', 'right', 'top', 'bottom', '100vh', '100%', '50%', 'px', 'em', 'rem', 'vh', 'vw',
    'primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info',
    // 响应式尺寸值
    '2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs', '3xs', '4xs',
    // 字体大小值
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    // 文本装饰值
    'underline', 'overline', 'line-through', 'none',
    // 边框值
    'dashed', 'solid', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset',
    // 动画值
    'ease', 'ease-in', 'ease-out', 'ease-in-out',
    // 字体值
    'bold', 'italic', 'normal',
    // 定位值
    'inherit', 'initial', 'auto',
    // 颜色值
    'transparent', 'currentColor',
    // 尺寸值
    'fit-content', 'min-content', 'max-content'];
  if (cssValues.includes(trimmed.toLowerCase())) return true;

  // 检查是否为纯符号
  if (/^[,.;:!?()[\]{}\-_]+$/.test(trimmed)) return true;
  
  // 检查是否为操作符或技术符号
  const technicalSymbols = ['=>', '===', '!==', '>=', '<=', '&&', '||', '...', '??', '?.'];
  if (technicalSymbols.includes(trimmed)) return true;
  
  // 检查是否为大驼峰命名的属性和单词 (如 QueryWithPagesResult, SomeTypeName 等)
  // 包括可能带有前缀符号的情况
  const camelCasePattern = /[A-Z][a-zA-Z0-9]*[A-Z][a-zA-Z0-9]*/;
  if (camelCasePattern.test(trimmed) && 
      (trimmed.match(camelCasePattern)[0].length >= trimmed.length * 0.5)) {
    return true;
  }
  
  // 检查是否为CSS选择器模式 (如 &:hover svg, .class-name, #id-name 等)
  if (/^(&|\.)[a-zA-Z0-9_-]*[:\s.#][a-zA-Z0-9_-]/.test(trimmed)) {
    return true;
  }
  
  // 检查是否匹配代码结构模式 - 使用正则表达式
  const codePatterns = [
    // 操作符和代码结构
    /\s*=>\s*/,
    /\s*=\s*/,
    /\s*===\s*/,
    /\s*!==\s*/,
    /\s*>=\s*/,
    /\s*<=\s*/,
    /\s*>\s*(?!\s*\/)/,  // 避免匹配JSX关闭标签
    /\s*<\s*(?![a-zA-Z/])/,  // 避免匹配JSX开始标签
    /\s*\|\|\s*/,
    /\s*&&\s*/,
    /;\s*/,
    /<Button/,
    /\bsize=/,
    /\bcase\s+/,  // case 后面必须有空格
    /\bjustifyContent:/,
    /\balignItems:/,
    /^Button$/,  // 精确匹配纯粹的"Button"单词
    /\breturn\s+/,  // return 后面必须有空格
    /\bfor\s+/,  // for 后面必须有空格
    /\bwhile\s+/,  // while 后面必须有空格
    /&\s/,  // HTML实体或逻辑与
    /:\s*\n/,  // 冒号后换行
    /\n\s*:/,  // 换行后冒号
    /\s*\?\s*/,  // 三元操作符
    /\s*:\s*(?!\s*\w)/,  // 避免匹配对象属性中的冒号
    /\s*\+\s*/,  // 加号操作符
    /Record</,
    /Pick</,
    /Props/,
    /Array</,
    /_\w+\b/,  // Chakra UI 变体如 _dark, _lg, _md
    /\w+:\s*\w+\b/, // CSS 属性值如 lg:, md:
    /\bclassName=/,
    /\bstyle=/,
    /\boverflow=/,
    /\balignItems=/,
    /\bjustifyContent=/,
    /\bdisplay=/,
    /\s+from\s+/,  // ES6 import 语句
    /\bimport\s+/,  // import 关键字
    /\.(ts|tsx|js|jsx)\b/,  // 文件扩展名
    /\bit\(/,  // Jest/Testing test case
    /\btest\(/,  // Jest test function
    /\bdescribe\(/,  // Jest describe block
    /:\s*\)/,  // 函数参数列表结束
    /[\[\]{}()]/,  // 各种括号
    /===|!==|>=|<=|\|\||&&/,  // 比较和逻辑操作符
    // 类型定义相关
    /,\s*Record/,  // Record 类型
    /Record<string/,  // Record<string, ...>
    /Record<number/,  // Record<number, ...>
    /Record<boolean/,  // Record<boolean, ...>
    /<unknown/,  // 泛型 unknown 类型
    /ResourceError/,  // 特定类型名
    /useQuery</,  // React Query hook
    /Promise</,  // Promise 泛型
    /Array</,  // Array 泛型
    /Map</,  // Map 泛型
    /Set</,  // Set 泛型
    /Partial</,  // TypeScript Partial 工具类型
    /Required</,  // TypeScript Required 工具类型
    /Pick</,  // TypeScript Pick 工具类型
    /Omit</,  // TypeScript Omit 工具类型
    // SVG属性值模式 - viewBox坐标
    /\b\d+\s+\d+\s+\d+\s+\d+\b/,  // viewBox坐标格式
    // 小数模式
    /\b\d+\.\d+\b/,  // 简单小数
    /\b\d+\.\d{2}\b/,  // 两位小数
    // 十六进制模式
    /0x[0-9a-fA-F]+\b/,  // 十六进制数
    // 数学表示法
    /\d+\*{1,2}/,  // 包括 10*, 10** 等
    /\d+\^\d+/,  // 指数表示法
    /[eE][+-]\d+/,  // 科学计数法
    // 数值表示法
    /\d+\+/,  // 包括 40+, 10+ 等
    // CSS属性值和HTML属性名
    /border\.divider/,  // Chakra UI 边框颜色
    /data-\w+\b/,  // HTML data-* 属性
    // CSS Grid模板值
    /auto\s+\d+(px|%|fr)(\s+\w+)*/,  // 如 auto 24px
    /\d+(px|%|fr)\s+auto(\s+\w+)*/,  // 带auto的尺寸
    /repeat\(\d+,\s*\d+fr\)/,  // CSS Grid repeat 函数
    /\b\d+fr(\s+\d+fr)*\b/,  // fr 单位
    // CSS边框值
    /\d+px\s+solid(\s+\w+)?\b/,  // 边框定义
    // 技术性标识符模式
    /\w+_(filter|form|input|button|modal|list|table|chart|graph|panel|dialog|popover|menu|dropdown|select|option|field|container|wrapper|header|footer|sidebar|nav|link|icon|image|avatar|card|grid|row|col|section|layout|group|item|element|component|history|config|counters|name|url)\b/,  // 技术相关词缀
    // 查询键值模式 - 连字符分隔的技术键
    /[a-z]+-[a-z]+-[a-z]+-[a-z]+\b/,  // 连字符分隔的键
    // SVG属性模式
    /\b(rx|ry|cx|cy|r|x|y|width|height|fill|stroke|viewBox|d|points|x1|y1|x2|y2)=/,  // SVG属性
    // 冒号分隔的索引模式
    /\b\d+:\d+(:\d+)*\b/,  // 多级索引

    // CSP策略值 (注意可能包含尾随空格)
    /allow-forms\s+allow-orientation-lock\s*/,
    /allow-same-origin\s+allow-scripts\s*/,

    // CSS网格值
    /min-content\s+min-content\s+min-content/,

    // CSS过渡值
    /opacity\s+\d+\.\d+s/,
    /opacity\s+\d+s/,

    // CSS网格模板值
    /[\s\n]*"[a-zA-Z0-9\s-]+\n\s*"[a-zA-Z0-9\s-]+\n\s*"[a-zA-Z0-9\s-]+\n\s*"/,
    /[\s\n]*"[a-zA-Z0-9\s-]+\n\s*"[a-zA-Z0-9\s-]+\n\s*"[a-zA-Z0-9\s-]+\n\s*"[a-zA-Z0-9\s-]*[\s\n]*/,

    // 通用数值模式，如 '40+', '50+' 等
    /\d+\+\b$/,  // 以+结尾的数值
    // 日期格式
    /^\d{4}-\d{2}-\d{2}$/,  // 日期格式如 2022-11-02
    // 颜色值
    /^#[0-9a-fA-F]{3,6}$/,  // 颜色十六进制值如 #8465CB
    // 负数
    /^-\d+$/,  // 负数如 -1448410607186694
    // 驼峰命名的CSS变量和技术字段
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Color/,  // 以Color结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Bg/,  // 以Bg结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Text/,  // 以Text结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Icon/,  // 以Icon结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Url/,  // 以Url结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*URL/,  // 以URL结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*ID/,  // 以ID结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Status/,  // 以Status结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Handle/,  // 以Handle结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Deposit/,  // 以Deposit结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Description/,  // 以Description结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Title/,  // 以Title结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Action/,  // 以Action结尾的驼峰变量
    /[a-z][a-zA-Z]*[A-Z][a-zA-Z]*Button/,  // 以Button结尾的驼峰变量
    // 单独的十六进制前缀
    /^0x$/,
    // 日期格式
    /^\d{4}-\d{2}-\d{2}$/,
    // 颜色值
    /^#[0-9a-fA-F]{3,6}$/,
    // Chakra UI 颜色值
    /^[a-z]+Alpha\.\d+$/, // 如 blackAlpha.400
    // CSS word-break 属性值
    /^(normal|break-all|keep-all|break-spaces)$/, // 如 break-all, break-spaces
    // CSS white-space 属性值
    /^(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)$/,
    // CSS overflow-wrap 属性值
    /^(normal|break-word|anywhere)$/,
    // CSS text-align 属性值
    /^(left|right|center|justify|justify-all|start|end)$/,
    // CSS display 属性值
    /^(block|inline|inline-block|flex|inline-flex|grid|inline-grid|none|table|table-cell|table-column|table-column-group)$/,
    // CSS position 属性值
    /^(static|relative|absolute|fixed|sticky)$/,
    // CSS flex 相关属性值
    /^(flex-start|flex-end|center|space-between|space-around|space-evenly)$/,
    // CSS border 相关属性值
    /^(solid|dashed|dotted|double|groove|ridge|inset|outset)$/,
    // CSS 动画相关值
    /^(ease|ease-in|ease-out|ease-in-out)$/,
    // CSS 宽度/尺寸相关值
    /^(fit-content|min-content|max-content)$/,
    // CSS 颜色值模式 (如 blue.50)
    /^[a-zA-Z]+\.[0-9]+$/,
    // CSS 颜色调色板值模式 (如 colors.blue.500, colors.gray.200)
    /^colors\.[a-zA-Z]+\.[0-9]+$/,
    // CSS 路径值模式 (如 bg.primary, dialog.bg)
    /^[a-zA-Z]+\.[a-zA-Z]+$/,
    // CSS 颜色属性值
    /^(currentColor|transparent)$/,
    // 排序相关的值
    /^(ASC|DESC)$/i,
    // 技术缩写 (如 EOA)
    /^[A-Z]{2,4}$/,
    // 连字符分隔的技术键
    /^[a-z]+-[a-z]+-[a-z]+$/,
    // 连字符分隔的CSS值
    /^[a-z]+-[a-z]+$/,
    // CSS 尺寸值 (如 0 !important, 24px !important)
    /^\d+(px|em|rem|%|vh|vw|fr)?\s*(!important)?$/,
    // 多个CSS尺寸值 (如 4px 8px !important)
    /^\d+(px|em|rem|%|vh|vw|fr)?\s+\d+(px|em|rem|%|vh|vw|fr)?(\s+!important)?$/,
    // CSS flex 值 (如 1 1 auto)
    /^\d+\s+\d+\s+(auto|flex-start|flex-end|center|baseline|stretch)$/,
    // CSS 单值 (如 0 auto, auto 0)
    /^\d+\s+auto$/,
    /^auto\s+\d+$/,
    // CSS 边框值 (如 1px dashed lightpink)
    /^\d+(px|em|rem|%|vh|vw|fr)?\s+(solid|dashed|dotted|double|groove|ridge|inset|outset)\s+[a-zA-Z]+$/,
    // CSS 替换值 (如 $1 $2)
    /^\$\d+\s*\$\d+$/,
    // 技术标识符 (如 ERC-1155, EIP-1822)
    /^[A-Z]+-\d+$/,
    // 数字加字母的组合 (如 2d, key0)
    /^([a-zA-Z]+\d+|\d+[a-zA-Z]+)$/, // 修正了正则表达式
    // 单个字母加数字 (如 h2)
    /^[a-z]\d$/,
    // CSS伪类选择器 (如 &:active)
    /^&:[a-zA-Z]+$/,
    // 以下划线结尾的属性 (如 placeholder_, actual_)
    /^[a-zA-Z]+_$/,
    // React事件处理程序 (如 onMouseLeave, onClick, onChange)
    /^on[A-Z][a-zA-Z]*$/,
    // 技术参数名 (如 recaptcha-v2-response, api-key-v1)
    /^[a-z]+-[a-z0-9]+-[a-z0-9]+$/,
    // 驼峰命名的函数/变量名 (如 renderPage, requesterEmail)
    /^[a-z][a-zA-Z]*[A-Z][a-zA-Z]*$/,
    // CSS路径值 (如 selected.control.bg) - 多级路径
    /^[a-zA-Z]+\.[a-zA-Z.]+$/,
    // CSS路径值 (如 text_.secondary) - 包含下划线和点的路径
    /^[a-zA-Z]+_\.[a-zA-Z]+$/,
    // CSS变量 (如 --chakra-colors-black)
    /^--[a-zA-Z]+-[a-zA-Z-]+$/,
    // CSS样式值 (如 semibold !important, sm !important)
    /^(semibold|bold|normal|light|regular|thin|medium|extrabold|black|hairline|extralight|light|normal|regular|medium|semibold|bold|extrabold|black)\s*!\s*important$/,
    // 响应式/尺寸值 (如 sm !important)
    /^(xs|sm|md|lg|xl|2xl|3xl|4xl)\s*!\s*important$/,
    // CSS网格值 (如 span 2)
    /^span\s+\d+$/,
    // CSS属性列表 (如 width, padding)
    /^[a-zA-Z]+\s*,\s*[a-zA-Z\s*,]+$/,
    // 日期格式模板 (如 YYYY-MM-DD, YYYYMMDDTHHmmss, MMM D, MMM D, YYYY)
    /^(YYYY|MM|DD|HH|mm|ss)+([-T,:\s\w]+)?$/,
    // 文件扩展名 (如 .apng, .avif, .mp4)
    /^\.[a-z0-9]+$/,
    // CSS @规则 (如 @open)
    /^@[a-z]+$/,
    // 驼峰命名的变量名 (如 AppliedFiltersNum)
    /^[A-Z][a-zA-Z]*[A-Z][a-zA-Z]*$/,
    // 字体名称 (如 Arial, sans-serif, Helvetica, Arial, sans-serif)
    /^[A-Za-z]+(?:,\s*[A-Za-z-]+)+$/,
    // CSS值 (如 auto auto)
    /^(auto|none|initial|inherit)\s+(auto|none|initial|inherit)$/,
    // CSS属性列表 (如 background-color,color)
    /^[a-z-]+,[a-z-]+$/,
    // 哈希算法术语 (如 ripemd160hash, sha256hash)
    /^[a-z]+\d+hash$/,
    // 哈希值 (如 C-26660bf627543e46851)
    /^[A-Z]-[a-f0-9]+$/,
    // CSS Webkit前缀值 (如 -webkit-box)
    /^-webkit-[a-z]+$/,
    // 特定的技术术语
    /^Probation$/,
    // 图标类名 (如 codicon codicon-breadcrumb-separator)
    /^[a-z]+ [a-z-]+$/
  ];
  
  // 检查是否匹配代码结构模式 - 使用正则表达式
  for (const pattern of codePatterns) {
    if (pattern.test(trimmed)) return true;
  }
  
  // 检查是否为测试描述文本
  if (trimmed.startsWith('should ') || trimmed.startsWith('it ') || 
      trimmed.startsWith('describe ') || trimmed.startsWith('test ') ||
      trimmed.startsWith('expect ')) {
    return true;
  }
  
  // 检查是否为多行CSS网格模板值
  if (trimmed.includes('"network links-top"') && trimmed.includes('"info links-bottom"') && 
      trimmed.includes('"recaptcha links-bottom"')) {
    return true;
  }
  
  // 检查是否为CSP策略值（带空格）
  if (trimmed === 'allow-forms allow-orientation-lock ' || 
      trimmed === 'allow-same-origin allow-scripts ') {
    return true;
  }
  
  // 检查是否为技术术语
  const technicalTerms = [
    'hash', 'hex', 'bech32', 'abi', 'bytecode', 'json', 'api', 'url', 'http', 'https',
    'rpc', 'sdk', 'cli', 'css', 'html', 'jsx', 'tsx', 'js', 'ts', 'xml', 'sql', 'jwt', 'oauth',
    'uuid', 'id', 'uid', 'guid', 'sha256', 'md5', 'base64', 'utf-8', 'utf8', 'ascii', 'unicode'
  ];
  
  if (technicalTerms.includes(trimmed.toLowerCase()) || 
      technicalTerms.includes(trimmed.toLowerCase().replace(/\s+/g, ''))) {
    return true;
  }
  
  // 检查是否为技术短语
  const technicalPhrases = [
    '0x hash', 'address hash', 'base16', 'bech32', 'abi functionality', 'contract abi',
    'bytecode', 'deployed bytecode', 'contract bytecode', 'source code', 'json api',
    'should cast empty strings', 'should leave the arg if it is an empty array',
    'should transform all nested empty arrays to empty arrays', 'should transform form data to method args array',
    'should construct the new url with custom params and hash', 'should convert form data to requests body',
    'should handle error in custom url parsing', 'should handle error in target url parsing',
    'should handle url without query and hash', 'should sort transaction by age in ascending order if sorting is not provided',
    'should sort transactions by fee in descending order', 'should sort transactions by value in descending order',
    // CSP策略值
    'allow-forms allow-orientation-lock', 'allow-same-origin allow-scripts',
    // CSS网格值
    'min-content min-content min-content',
    // CSS过渡值
    'opacity 0.2s'
  ];
  
  for (const phrase of technicalPhrases) {
    if (trimmed.toLowerCase() === phrase) {
      return true;
    }
  }

  // 检查是否为数组或对象结构
  if (/^\[.*\]$/.test(trimmed) || /^\{.*\}$/.test(trimmed)) return true;

  // 检查是否为CSS/样式相关的技术文本
  if (trimmed.includes('px') || trimmed.includes('%') || trimmed.includes('vh') || trimmed.includes('vw') || 
      trimmed.includes('em') || trimmed.includes('rem')) {
    // 但保留包含这些单位的用户可读文本
    if (!/[a-zA-Z]/.test(trimmed.replace(/(px|%|vh|vw|em|rem)/g, '').trim())) {
      return true;
    }
  }

  // 检查是否为HTTP方法
  const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'CONNECT', 'TRACE'];
  if (httpMethods.includes(trimmed.toUpperCase()) && trimmed.length <= 6) {
    return true;
  }

  // 检查是否为React/Next.js技术属性值
  const reactNextJsTechValues = [
    'react', 'next', 'children', 'id', 'key', 'className', 'class', 'style', 
    'src', 'href', 'alt', 'role', 'htmlFor', 'type', 'value', 'tabIndex',
    'onClick', 'onChange', 'onSubmit', 'onFocus', 'onBlur', 'onKeyDown', 'onKeyUp',
    'ref', 'forwardRef', 'useRef', 'useState', 'useEffect', 'useCallback', 'useMemo',
    'component', 'as', 'asChild', 'variant', 'size', 'color', 'disabled', 'loading',
    'isDisabled', 'isLoading', 'isActive', 'isInvalid', 'isValid', 'isReadOnly',
    'autoFocus', 'autoComplete', 'autoCapitalize', 'autoCorrect', 'spellCheck',
    'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget',
    'target', 'rel', 'download', 'hrefLang', 'media', 'ping', 'referrerPolicy',
    'dir', 'lang', 'translate', 'accessKey', 'contentEditable', 'contextMenu',
    'draggable', 'hidden', 'inputMode', 'is', 'itemID', 'itemProp', 'itemRef',
    'itemScope', 'itemType', 'lang', 'nonce', 'slot', 'spellcheck', 'translate',
    'about', 'datatype', 'inlist', 'prefix', 'property', 'resource', 'typeof', 'vocab',
    'autoCapitalize', 'autoFocus', 'enterKeyHint', 'inputMode', 'isSafeRedirect',
    'suppressContentEditableWarning', 'suppressHydrationWarning', 'getLayout'
  ];
  
  if (reactNextJsTechValues.includes(trimmed.toLowerCase()) && trimmed.length < 30) {
    return true;
  }
  
  // 检查是否为React组件或Next.js相关技术值
  if ((trimmed.startsWith('React') || trimmed.startsWith('Next')) && trimmed.length < 30) {
    return true;
  }
  
  // 检查是否为CSS类名或样式相关值
  if ((trimmed.startsWith('.') && trimmed.includes('-')) || 
      (trimmed.includes('-') && trimmed.length < 30 && 
       (trimmed.includes('btn-') || trimmed.includes('card-') || trimmed.includes('nav-') || 
        trimmed.includes('text-') || trimmed.includes('bg-') || trimmed.includes('border-') ||
        trimmed.includes('flex-') || trimmed.includes('grid-') || trimmed.includes('gap-') ||
        trimmed.includes('p-') || trimmed.includes('m-') || trimmed.includes('w-') || 
        trimmed.includes('h-') || trimmed.includes('min-') || trimmed.includes('max-')))) {
    return true;
  }
  
  // 检查是否为常见的技术值
  const commonTechValues = ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'dark', 'light', 'large', 'small', 'medium'];
  if (commonTechValues.includes(trimmed.toLowerCase()) && trimmed.length < 15) {
    return true;
  }
  
  // 检查是否为布尔值或状态值
  const booleanValues = ['true', 'false', 'active', 'inactive', 'enabled', 'disabled', 'pending', 'loading'];
  if (booleanValues.includes(trimmed.toLowerCase()) && trimmed.length < 15) {
    return true;
  }

  return false;
}

/**
 * 检查文本是否包含特定模块关键词并确定合适的命名空间
 */
function determineNamespace(filePath) {
  // 检查文件路径来确定命名空间
  const path = filePath.toLowerCase();
  
  // 遍历命名空间映射配置来确定命名空间
  for (const [namespace, keywords] of Object.entries(CONFIG.NAMESPACE_MAPPING)) {
    for (const keyword of keywords) {
      if (path.includes('/' + keyword + '/') || path.includes('/' + keyword + '.')) {
        return namespace;
      }
    }
  }
  
  // 如果没有特定模块，返回默认命名空间
  return 'common';
}

/**
 * 生成翻译键
 */
function generateTranslationKey(text, context = '', filePath = '') {
  // 清理文本并生成键
  const cleanText = text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s\u4e00-\u9fff]/g, '') // 保留中文字符
    .replace(/\s+/g, '_');

  // 根据文件路径确定命名空间
  const namespace = determineNamespace(filePath);
  
  // 根据上下文生成不同的键
  if (context) {
    return `${namespace}.${context}.${cleanText.substring(0, 30)}`;
  }

  return `${namespace}.${cleanText.substring(0, 30)}`;
}

/**
 * 提取文件中的硬编码字符串
 */
function extractStringsFromFile(filePath) {
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
  
  const strings = [];
  let match;

  // 提取字符串字面量
  while ((match = STRING_LITERAL_REGEX.exec(content)) !== null) {
    const string = match[2]; // 更新索引：现在捕获组是第2个

    if (shouldIgnoreText(string)) continue;

    // 检查字符串是否在特定上下文中
    const context = content.substring(Math.max(0, match.index - 50), match.index + match[0].length).toLowerCase();

    // 过滤技术字符串
    if (context.includes('type') || context.includes('interface') || context.includes('export type') ||
        context.includes('status/') || context.includes('colorpalette') ||
        context.includes('id=') || context.includes('class=') || context.includes('className=') ||
        context.includes('import ') || context.includes(' from ') || context.includes('require(')) {
      continue;
    }

    strings.push({
      text: string,
      line: getLineNumber(content, match.index),
      key: generateTranslationKey(string, 'common', filePath),
      source: 'string_literal',
    });
  }

  // 重置正则表达式的索引
  STRING_LITERAL_REGEX.lastIndex = 0;

  // 提取JSX标签内的文本
  while ((match = JSX_TEXT_REGEX.exec(content)) !== null) {
    const string = match[1].trim();

    // 跳过空字符串或只包含空白
    if (!string || string.length < 2) continue;

    // 跳过包含特殊字符的标签内容
    if (string.includes('{') || string.includes('}')) continue;

    if (shouldIgnoreText(string)) continue;

    strings.push({
      text: string,
      line: getLineNumber(content, match.index),
      key: generateTranslationKey(string, 'common', filePath),
      source: 'jsx_text',
    });
  }

  // 重置正则表达式索引
  JSX_TEXT_REGEX.lastIndex = 0;

  // 提取JSX特定属性的值
  while ((match = JSX_ATTR_REGEX.exec(content)) !== null) {
    const string = match[2];
    const attribute = match[1];

    if (shouldIgnoreText(string)) continue;

    // 根据属性类型生成更具体的键
    const key = generateTranslationKey(string, `form.${attribute}`, filePath);

    strings.push({
      text: string,
      line: getLineNumber(content, match.index),
      key: key,
      attribute: attribute,
      source: 'jsx_attribute',
    });
  }

  // 重置正则表达式索引
  JSX_ATTR_REGEX.lastIndex = 0;

  return strings;
}

/**
 * 获取字符串在文件中的行号
 */
function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

/**
 * 递归遍历目录
 */
function walkDirectory(dirPath, callback) {
  if (shouldExcludeDir(dirPath)) {
    return;
  }

  let entries;
  try {
    entries = fs.readdirSync(dirPath, { withFileTypes: true });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
    return;
  }

  for (const entry of entries) {
    if (!entry || !entry.name) {
      continue; // 跳过无效条目
    }
    
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walkDirectory(fullPath, callback);
    } else if (entry.isFile() && shouldProcessFile(fullPath)) {
      callback(fullPath);
    }
  }
}

/**
 * 主函数
 */
function main() {
  const targetPath = process.argv[2] || './';
  const outputDir = process.argv[3] || './tools/i18n/extracted';

  console.log(`扫描路径: ${targetPath}`);

  const allStrings = [];
  const startTime = Date.now();

  if (isFile(targetPath) && shouldProcessFile(targetPath)) {
    // 处理单个文件
    console.log('处理单个文件');
    const strings = extractStringsFromFile(targetPath);
    if (strings.length > 0) {
      allStrings.push({
        file: targetPath,
        strings: strings,
      });
    }
  } else if (isDirectory(targetPath)) {
    // 处理目录
    console.log('处理目录');
    // 只处理配置中指定的目录
    let totalFileCount = 0;
    for (const dir of CONFIG.TARGET_DIRS) {
      const dirPath = path.join(targetPath, dir);
      if (isDirectory(dirPath)) {
        console.log(`扫描目录: ${dirPath}`);
        let fileCount = 0;
        walkDirectory(dirPath, (filePath) => {
          // 确保文件在目标目录中
          const relativePath = path.relative(targetPath, filePath);
          const isInTargetDir = CONFIG.TARGET_DIRS.some(targetDir => 
            relativePath.startsWith(targetDir + path.sep) || relativePath === targetDir
          );
          
          if (isInTargetDir && shouldProcessFile(filePath)) {
            fileCount++;
            totalFileCount++;
            const strings = extractStringsFromFile(filePath);
            if (strings.length > 0) {
              allStrings.push({
                file: filePath,
                strings: strings,
              });
            }
            
            // 每处理100个文件显示一次进度
            if (fileCount % 100 === 0) {
              console.log(`已处理 ${dir} 目录中的 ${fileCount} 个文件...`);
            }
          }
        });
        console.log(`总共扫描了 ${dir} 目录中的 ${fileCount} 个文件`);
      } else {
        console.log(`目录不存在: ${dirPath}`);
      }
    }
    console.log(`总共扫描了 ${totalFileCount} 个文件`);
  } else {
    console.error(`无效路径: ${targetPath}`);
    process.exit(1);
  }

  const extractionTime = Date.now() - startTime;
  console.log(`提取耗时: ${extractionTime}ms`);

  // 按模块分组
  console.log('按模块分组...');
  const moduleStrings = {};
  
  allStrings.forEach(fileEntry => {
    fileEntry.strings.forEach(str => {
      // 确定模块（命名空间）
      const namespace = str.key.split('.')[0];
      
      if (!moduleStrings[namespace]) {
        moduleStrings[namespace] = {};
      }
      
      // 如果键不存在，则添加
      if (!moduleStrings[namespace][str.key]) {
        moduleStrings[namespace][str.key] = {
          defaultMessage: str.text,
          source: [fileEntry.file + ':' + str.line]
        };
      } else {
        // 如果键已存在，添加源文件信息
        moduleStrings[namespace][str.key].source.push(fileEntry.file + ':' + str.line);
      }
    });
  });

  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 生成每个模块的文件
  let moduleCount = 0;
  Object.keys(moduleStrings).forEach(module => {
    const moduleData = moduleStrings[module];
    const outputPath = path.join(outputDir, `${module}.json`);
    
    fs.writeFileSync(outputPath, JSON.stringify(moduleData, null, 2));
    console.log(`已生成模块文件: ${outputPath}`);
    moduleCount++;
  });

  const endTime = Date.now();
  console.log(`总共生成了 ${moduleCount} 个模块文件`);
  console.log(`总耗时: ${endTime - startTime}ms`);
  console.log('提取完成！');
}

// 执行主函数
if (require.main === module) {
  main();
}
