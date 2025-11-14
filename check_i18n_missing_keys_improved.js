const fs = require('fs');
const path = require('path');

// 定义语言目录
const LANG_DIRS = ['en', 'zh-CN'];
const BASE_PATH = './lib/i18n';

// 从源代码中提取翻译键使用情况
function extractTranslationKeysFromCode() {
  const keys = [];
  
  // 递归遍历源代码目录
  function walkDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        if (!filePath.includes('/node_modules/') && !filePath.includes('/.next/')) {
          walkDirectory(filePath);
        }
      } else if (stat.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js'))) {
        const content = fs.readFileSync(filePath, 'utf8');
        // 匹配 t('namespace.key') 或 t("namespace.key") 模式
        const regex = /t\s*\(\s*['"`][^'"`]+['"`]\s*\)/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
          if (match[1] && match[1].trim() !== '' && match[1] !== 'undefined') {
            keys.push(match[1]);
          }
        }
        // 匹配 t(`${namespace}.${key}`) 模板字符串
        const templateRegex = /t\s*\(\s*`[^`]+`\s*\)/g;
        let templateMatch;
        while ((templateMatch = templateRegex.exec(content)) !== null) {
          if (templateMatch[1] && templateMatch[1].trim() !== '' && !templateMatch[1].includes('${')) {
            keys.push(templateMatch[1]);
          }
        }
      }
    }
  }
  
  try {
    walkDirectory('./src');
    walkDirectory('./ui');
    walkDirectory('./pages');
    walkDirectory('./toolkit');
  } catch (err) {
    console.error('Error extracting translation keys from code:', err.message);
  }
  
  // 去重并过滤无效键
  return [...new Set(keys.filter(key => key && key !== 'undefined'))];
}

// 读取所有翻译键
function getAllTranslationKeys() {
  const allKeys = new Set();
  
  for (const lang of LANG_DIRS) {
    const langPath = path.join(BASE_PATH, lang);
    const namespaces = fs.readdirSync(langPath, { withFileTypes: true });
    
    for (const namespace of namespaces) {
      if (namespace.isDirectory()) {
        const namespacePath = path.join(langPath, namespace.name);
        const files = fs.readdirSync(namespacePath);
        
        for (const file of files) {
          if (file.endsWith('.json')) {
            const filePath = path.join(namespacePath, file);
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            Object.keys(content).forEach(key => allKeys.add(key));
          }
        }
      }
    }
  }
  
  return Array.from(allKeys);
}

// 检查缺失的键
function checkMissingKeys() {
  console.log('Extracting translation keys from source code...');
  const codeKeys = extractTranslationKeysFromCode();
  console.log(`Found ${codeKeys.length} translation keys used in code.`);
  
  console.log('Extracting all translation keys from language files...');
  const allTranslationKeys = getAllTranslationKeys();
  console.log(`Found ${allTranslationKeys.length} translation keys in language files.`);
  
  // 创建翻译键的映射，用于快速查找
  const translationKeyMap = new Set(allTranslationKeys);
  
  // 检查代码中使用的键是否都存在于翻译文件中
  const missingKeys = codeKeys.filter(key => !translationKeyMap.has(key));
  
  console.log('\nChecking for missing translation keys...\n');
  
  if (missingKeys.length > 0) {
    console.log(`Missing translation keys (${missingKeys.length}):`);
    missingKeys.forEach(key => console.log(`  - ${key}`));
  } else {
    console.log('All translation keys used in code are present in language files.');
  }
  
  // 检查是否有重复或不一致的键
  const enKeys = new Set();
  const zhKeys = new Set();
  
  const enPath = path.join(BASE_PATH, 'en');
  const zhPath = path.join(BASE_PATH, 'zh-CN');
  
  const namespaces = fs.readdirSync(enPath, { withFileTypes: true });
  
  for (const namespace of namespaces) {
    if (namespace.isDirectory()) {
      const enNamespacePath = path.join(enPath, namespace.name);
      const zhNamespacePath = path.join(zhPath, namespace.name);
      
      // 读取英文键
      if (fs.existsSync(enNamespacePath)) {
        const files = fs.readdirSync(enNamespacePath);
        for (const file of files) {
          if (file.endsWith('.json')) {
            const filePath = path.join(enNamespacePath, file);
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            Object.keys(content).forEach(key => enKeys.add(key));
          }
        }
      }
      
      // 读取中文键
      if (fs.existsSync(zhNamespacePath)) {
        const files = fs.readdirSync(zhNamespacePath);
        for (const file of files) {
          if (file.endsWith('.json')) {
            const filePath = path.join(zhNamespacePath, file);
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            Object.keys(content).forEach(key => zhKeys.add(key));
          }
        }
      }
    }
  }
  
  // 检查英文有但中文没有的键
  const missingInZh = [...enKeys].filter(key => !zhKeys.has(key));
  // 检查中文有但英文没有的键
  const missingInEn = [...zhKeys].filter(key => !enKeys.has(key));
  
  if (missingInZh.length > 0) {
    console.log(`\nKeys present in en but missing in zh-CN (${missingInZh.length}):`);
    missingInZh.forEach(key => console.log(`  - ${key}`));
  }
  
  if (missingInEn.length > 0) {
    console.log(`\nKeys present in zh-CN but missing in en (${missingInEn.length}):`);
    missingInEn.forEach(key => console.log(`  - ${key}`));
  }
  
  console.log('\nAnalysis complete.');
  
  // 返回检查结果
  return {
    codeKeys,
    missingKeys,
    missingInZh,
    missingInEn
  };
}

// 运行检查
checkMissingKeys();