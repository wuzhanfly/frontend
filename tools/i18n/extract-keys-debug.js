#!/usr/bin/env node

/**
 * 键值对提取工具 - 调试版本
 */

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  // 文件扩展名
  FILE_EXTENSIONS: [ '.tsx', '.ts' ],
};

/**
 * 检查文件是否应该被处理
 */
function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  console.log(`检查文件扩展名: ${filePath}, 扩展名: ${ext}, 是否处理: ${CONFIG.FILE_EXTENSIONS.includes(ext)}`);
  return CONFIG.FILE_EXTENSIONS.includes(ext);
}

/**
 * 检查目录是否应该被排除
 */
function shouldExcludeDir(dirPath) {
  const dirName = path.basename(dirPath);
  const EXCLUDE_DIRS = [ 'node_modules', '.next', 'dist', '.git', 'public', 'i18n', 'test' ];
  const excluded = CONFIG.EXCLUDE_DIRS && CONFIG.EXCLUDE_DIRS.includes(dirName) || EXCLUDE_DIRS.includes(dirName);
  console.log(`检查目录排除: ${dirPath}, 目录名: ${dirName}, 是否排除: ${excluded}`);
  return excluded;
}

/**
 * 检查是否为目录
 */
function isDirectory(filePath) {
  try {
    const isDir = fs.statSync(filePath).isDirectory();
    console.log(`检查是否为目录: ${filePath}, 结果: ${isDir}`);
    return isDir;
  } catch (error) {
    console.log(`检查目录失败: ${filePath}, 错误: ${error.message}`);
    return false;
  }
}

/**
 * 检查文本是否应该被忽略
 */
function shouldIgnoreText(text) {
  const trimmed = text.trim();
  console.log(`检查文本忽略: "${text}", 修剪后: "${trimmed}"`);

  // 检查长度
  if (trimmed.length < 2 || trimmed.length > 100) {
    console.log(`  长度检查失败: ${trimmed.length}`);
    return true;
  }

  // 检查是否为数字
  if (/^\d+$/.test(trimmed)) {
    console.log(`  数字检查失败`);
    return true;
  }

  // 检查是否为路径
  if (trimmed.includes('/') || trimmed.includes('\\')) {
    console.log(`  路径检查失败`);
    return true;
  }

  console.log(`  文本通过检查`);
  return false;
}

/**
 * 检查文本是否包含特定模块关键词并确定合适的命名空间
 */
function determineNamespace(filePath) {
  // 检查文件路径来确定命名空间
  const pathStr = filePath.toLowerCase();
  
  if (pathStr.includes('/addresses/') || pathStr.includes('/address/')) return 'addresses';
  if (pathStr.includes('/validators/') || pathStr.includes('/validator/')) return 'validators';
  if (pathStr.includes('/tokens/') || pathStr.includes('/token/')) return 'tokens';
  if (pathStr.includes('/transactions/') || pathStr.includes('/transaction/') || pathStr.includes('/tx/')) return 'transactions';
  if (pathStr.includes('/contract/') || pathStr.includes('/contracts/')) return 'contract';
  if (pathStr.includes('/settings/')) return 'settings';
  if (pathStr.includes('/dashboard/')) return 'dashboard';
  if (pathStr.includes('/form/') || pathStr.includes('/forms/')) return 'form';
  
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
    return `${ namespace }:${ context }.${ cleanText.substring(0, 30) }`;
  }

  return `${ namespace }:${ cleanText.substring(0, 30) }`;
}

/**
 * 提取文件中的硬编码字符串
 */
function extractStringsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`读取文件内容: ${filePath}, 内容长度: ${content.length}`);
    const strings = [];
    const STRING_LITERAL_REGEX = /['"`]()['"`]/g;
    const JSX_TEXT_REGEX = />(([^<>\n]{2,}))(?=<)/g;
    const JSX_ATTR_REGEX = /\b(placeholder|title|hint|tooltip|aria-label|alt|label|helperText|emptyText|fallbackText|loadingText|prevLabel|nextLabel|linkText|description|summary|message|error|success|warning|info|caption|text|modal-title)=[](([]{2,}))[]/gi;
    let match;

    // 提取字符串字面量
    console.log(`开始提取字符串字面量...`);
    while ((match = STRING_LITERAL_REGEX.exec(content)) !== null) {
      const string = match[1];
      console.log(`  找到字符串字面量: "${string}"`);
      if (!shouldIgnoreText(string)) {
        const key = generateTranslationKey(string, 'common', filePath);
        console.log(`    生成键: ${key}`);
        strings.push({
          text: string,
          key: key,
          source: 'string_literal',
        });
      } else {
        console.log(`    跳过字符串`);
      }
    }

    // 重置正则表达式的索引
    STRING_LITERAL_REGEX.lastIndex = 0;

    // 提取JSX标签内的文本
    console.log(`开始提取JSX标签文本...`);
    while ((match = JSX_TEXT_REGEX.exec(content)) !== null) {
      const string = match[1].trim();

      // 跳过空字符串或只包含空白
      if (!string || string.length < 2) continue;

      // 跳过包含特殊字符的标签内容
      if (string.includes('{') || string.includes('}')) continue;

      console.log(`  找到JSX标签文本: "${string}"`);
      if (!shouldIgnoreText(string)) {
        const key = generateTranslationKey(string, 'common', filePath);
        console.log(`    生成键: ${key}`);
        strings.push({
          text: string,
          key: key,
          source: 'jsx_text',
        });
      } else {
        console.log(`    跳过字符串`);
      }
    }

    // 重置正则表达式索引
    JSX_TEXT_REGEX.lastIndex = 0;

    // 提取JSX特定属性的值
    console.log(`开始提取JSX属性值...`);
    while ((match = JSX_ATTR_REGEX.exec(content)) !== null) {
      const string = match[2];
      const attribute = match[1];

      console.log(`  找到JSX属性: ${attribute}="${string}"`);
      if (!shouldIgnoreText(string)) {
        const key = generateTranslationKey(string, `form.${ attribute }`, filePath);
        console.log(`    生成键: ${key}`);
        strings.push({
          text: string,
          key: key,
          attribute: attribute,
          source: 'jsx_attribute',
        });
      } else {
        console.log(`    跳过字符串`);
      }
    }

    // 重置正则表达式索引
    JSX_ATTR_REGEX.lastIndex = 0;

    console.log(`文件 ${filePath} 提取到 ${strings.length} 个字符串`);
    return strings;
  } catch (error) {
    console.error(`Error reading file ${ filePath }:", error.message);
    return [];
  }
}

/**
 * 递归遍历目录
 */
function walkDirectory(dirPath, callback) {
  console.log(`进入目录: ${dirPath}`);
  if (shouldExcludeDir(dirPath)) {
    console.log(`目录被排除: ${dirPath}`);
    return;
  }

  let entries;
  try {
    entries = fs.readdirSync(dirPath, { withFileType: true });
    console.log(`读取目录内容:", entries.map(e => e.name));
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:", error.message);
    return;
  }

  for (const entry of entries) {
    if (!entry || !entry.name) {
      console.log(`跳过无效条目:", entry);
      continue; // 跳过无效条目
    }
    
    const fullPath = path.join(dirPath, entry.name);
    console.log(`处理条目: ${fullPath}, 目录: ${entry.isDirectory()}, 文件: ${entry.isFile()}`);

    if (entry.isDirectory()) {
      walkDirectory(fullPath, callback);
    } else if (entry.isFile() && shouldProcessFile(fullPath)) {
      console.log(`调用回调处理文件: ${fullPath}`);
      callback(fullPath);
    } else {
      console.log(`跳过条目: ${fullPath}`);
    }
  }
  console.log(`离开目录: ${dirPath}`);
}

/**
 * 主函数
 */
function main() {
  const targetPath = process.argv[2] || './';
  const outputFile = process.argv[3] || './i18n-extracted-keys.json';

  console.log(`扫描目录: ${ targetPath }`);

  const allStrings = [];

  if (isDirectory(targetPath)) {
    // 处理目录
    console.log('处理目录');
    console.log(`扫描目录: ${ targetPath }`);
    walkDirectory(targetPath, (filePath) => {
      console.log(`处理文件: ${filePath}`);
      const strings = extractStringsFromFile(filePath);
      if (strings.length > 0) {
        console.log(`找到 ${strings.length} 个字符串在 ${filePath}`);
        allStrings.push({
          file: filePath,
          strings: strings,
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