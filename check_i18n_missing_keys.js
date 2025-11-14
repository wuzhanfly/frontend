const fs = require('fs');
const path = require('path');

// 定义语言目录
const LANG_DIRS = ['en', 'zh-CN'];
const BASE_PATH = './lib/i18n';

// 收集所有命名空间
function getNamespaces() {
  const namespaces = [];
  const enPath = path.join(BASE_PATH, 'en');
  const dirs = fs.readdirSync(enPath, { withFileTypes: true });
  
  for (const dir of dirs) {
    if (dir.isDirectory()) {
      namespaces.push(dir.name);
    }
  }
  
  return namespaces;
}

// 读取命名空间中的所有键
function getKeysForNamespace(lang, namespace) {
  const namespacePath = path.join(BASE_PATH, lang, namespace);
  const keys = new Set();
  
  try {
    const files = fs.readdirSync(namespacePath);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(namespacePath, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        Object.keys(content).forEach(key => keys.add(key));
      }
    }
  } catch (err) {
    console.error(`Error reading namespace ${namespace} for language ${lang}:`, err.message);
  }
  
  return keys;
}

// 检查缺失的键
function checkMissingKeys() {
  const namespaces = getNamespaces();
  const missingKeys = {};
  
  console.log('Checking for missing translation keys...\n');
  
  for (const namespace of namespaces) {
    const enKeys = getKeysForNamespace('en', namespace);
    const zhKeys = getKeysForNamespace('zh-CN', namespace);
    
    // 找到英文有但中文没有的键
    const missingInZh = [...enKeys].filter(key => !zhKeys.has(key));
    // 找到中文有但英文没有的键
    const missingInEn = [...zhKeys].filter(key => !enKeys.has(key));
    
    if (missingInZh.length > 0 || missingInEn.length > 0) {
      missingKeys[namespace] = {
        missingInZh,
        missingInEn
      };
      
      if (missingInZh.length > 0) {
        console.log(`Missing in zh-CN for namespace '${namespace}':`);
        missingInZh.forEach(key => console.log(`  - ${key}`));
        console.log();
      }
      
      if (missingInEn.length > 0) {
        console.log(`Missing in en for namespace '${namespace}':`);
        missingInEn.forEach(key => console.log(`  - ${key}`));
        console.log();
      }
    }
  }
  
  // 总结
  const totalMissing = Object.values(missingKeys).reduce((sum, item) => 
    sum + item.missingInZh.length + item.missingInEn.length, 0);
  
  console.log(`\nSummary: Found ${totalMissing} missing translation keys across ${Object.keys(missingKeys).length} namespaces.`);
  
  if (totalMissing === 0) {
    console.log('All translation keys are consistent between English and Chinese versions.');
  }
  
  return missingKeys;
}

// 运行检查
checkMissingKeys();