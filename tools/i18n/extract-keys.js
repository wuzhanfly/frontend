#!/usr/bin/env node

/**
 * 键值对提取工具
 * 用于从TypeScript/TSX文件中提取硬编码的字符串文本
 */

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  // 需要处理的目录
  TARGET_DIRS: [ 'ui', 'pages', 'components', 'toolkit' ],
  // 需要排除的目录
  EXCLUDE_DIRS: [ 'node_modules', '.next', 'dist', '.git', 'public', 'i18n', 'test' ],
  // 文件扩展名
  FILE_EXTENSIONS: [ '.tsx', '.ts' ],
  // 需要排除的文本
  IGNORED_TEXTS: [
    '', ' ', 'null', 'undefined', 'true', 'false', 'id', 'key', 'class', 'className', 'style',
    'src', 'href', 'alt', 'role', 'htmlFor', 'type', 'value', 'children', 'react', 'next',
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
  ],
};

// 提取硬编码字符串的正则表达式
const STRING_LITERAL_REGEX = /['"`]([^'`"]{2,})['"`]/g;
const JSX_TEXT_REGEX = />([^<>\n]{2,})(?=<)/g;
const JSX_ATTR_REGEX = /\b(placeholder|title|hint|tooltip|aria-label|alt|label|helperText|emptyText|fallbackText|loadingText|prevLabel|nextLabel|linkText|description|summary|message|error|success|warning|info|caption|text|modal-title|data-testid|data-label)=["']([^"']{2,})["']/gi;

/**
 * 检查文件是否应该被处理
 */
function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
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

  // 检查长度
  if (trimmed.length < 2 || trimmed.length > 100) return true;

  // 检查是否在忽略列表中
  if (CONFIG.IGNORED_TEXTS.includes(trimmed.toLowerCase())) return true;

  // 检查是否匹配排除模式
  for (const pattern of CONFIG.EXCLUDE_PATTERNS) {
    if (pattern.test(trimmed)) return true;
  }

  // 检查是否为数字
  if (/^\d+$/.test(trimmed)) return true;

  // 检查是否为路径
  if (trimmed.includes('/') || trimmed.includes('\\')) return true;

  // 检查是否为CSS相关值
  const cssValues = [ 'flex', 'block', 'inline', 'grid', 'absolute', 'relative', 'fixed', 'sticky', 'static',
    'center', 'left', 'right', 'top', 'bottom', '100vh', '100%', '50%', 'px', 'em', 'rem', 'vh', 'vw',
    'primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info' ];
  if (cssValues.includes(trimmed.toLowerCase())) return true;

  // 检查是否为纯符号
  if (/^[,.;:!?()[\]{}\-_]+$/.test(trimmed)) return true;

  return false;
}

/**
 * 生成翻译键
 */
function generateTranslationKey(text, context = '') {
  // 清理文本并生成键
  const cleanText = text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s\u4e00-\u9fff]/g, '') // 保留中文字符
    .replace(/\s+/g, '_');

  // 根据上下文生成不同的键
  if (context) {
    return `${ context }.${ cleanText.substring(0, 30) }`;
  }

  return cleanText.substring(0, 30);
}

/**
 * 提取文件中的硬编码字符串
 */
function extractStringsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const strings = [];
    let match;

    // 提取字符串字面量
    while ((match = STRING_LITERAL_REGEX.exec(content)) !== null) {
      const string = match[1];

      if (shouldIgnoreText(string)) continue;

      // 检查字符串是否在特定上下文中
      const context = content.substring(Math.max(0, match.index - 50), match.index + string.length + 50).toLowerCase();

      // 过滤技术字符串
      if (context.includes('type') || context.includes('interface') || context.includes('export type') ||
          context.includes('status/') || context.includes('colorpalette') ||
          context.includes('id=') || context.includes('class=') || context.includes('className=')) {
        continue;
      }

      strings.push({
        text: string,
        line: getLineNumber(content, match.index),
        key: generateTranslationKey(string, 'common'),
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
        key: generateTranslationKey(string, 'common'),
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
      const key = generateTranslationKey(string, `form.${ attribute }`);

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
  } catch (error) {
    console.error(`Error reading file ${ filePath }:`, error.message);
    return [];
  }
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

  const entries = fs.readdirSync(dirPath, { withFileType: true });

  for (const entry of entries) {
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
  const outputFile = process.argv[3] || './i18n-extracted-keys.json';

  console.log(`扫描目录: ${ targetPath }`);

  const allStrings = [];

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
    CONFIG.TARGET_DIRS.forEach(dir => {
      const dirPath = path.join(targetPath, dir);
      if (fs.existsSync(dirPath)) {
        console.log(`扫描目录: ${ dir }`);
        walkDirectory(dirPath, (filePath) => {
          const strings = extractStringsFromFile(filePath);
          if (strings.length > 0) {
            allStrings.push({
              file: filePath,
              strings: strings,
            });
          }
        });
      }
    });
  } else {
    console.error(`无效路径: ${ targetPath }`);
    process.exit(1);
  }

  // 去重并按键排序
  const uniqueStrings = new Map();
  allStrings.forEach(fileEntry => {
    fileEntry.strings.forEach(str => {
      if (!uniqueStrings.has(str.key)) {
        uniqueStrings.set(str.key, {
          text: str.text,
          source: str.source,
          attribute: str.attribute,
          files: [ fileEntry.file ],
        });
      } else {
        const existing = uniqueStrings.get(str.key);
        if (!existing.files.includes(fileEntry.file)) {
          existing.files.push(fileEntry.file);
        }
      }
    });
  });

  // 转换为数组并排序
  const result = Array.from(uniqueStrings.entries()).map(([ key, value ]) => ({
    key: key,
    text: value.text,
    source: value.source,
    attribute: value.attribute,
    files: value.files,
  })).sort((a, b) => a.key.localeCompare(b.key));

  // 输出结果
  const output = {
    extractedAt: new Date().toISOString(),
    totalKeys: result.length,
    keys: result,
  };

  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  console.log(`提取了 ${ result.length } 个唯一键`);
  console.log(`结果保存到: ${ outputFile }`);
}

// 执行主函数
if (require.main === module) {
  main();
}
