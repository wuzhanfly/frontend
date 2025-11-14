const fs = require('fs');
const path = require('path');

/**
 * 检查提取的键是否存在于翻译文件中
 */
function checkMissingKeys() {
  console.log('开始检查提取的键与翻译文件的匹配情况...');
  
  // 读取所有翻译文件
  const enPath = './lib/i18n/en';
  const zhPath = './lib/i18n/zh-CN';
  
  const allTranslationKeys = new Set();
  
  // 读取英文翻译文件
  const enModules = fs.readdirSync(enPath);
  for (const module of enModules) {
    const modulePath = path.join(enPath, module);
    if (fs.statSync(modulePath).isDirectory()) {
      const files = fs.readdirSync(modulePath);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(modulePath, file);
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          Object.keys(content).forEach(key => allTranslationKeys.add(key));
        }
      }
    }
  }
  
  console.log(`从英文翻译文件中加载了 ${allTranslationKeys.size} 个键`);
  
  // 读取中文翻译文件
  const zhModules = fs.readdirSync(zhPath);
  for (const module of zhModules) {
    const modulePath = path.join(zhPath, module);
    if (fs.statSync(modulePath).isDirectory()) {
      const files = fs.readdirSync(modulePath);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(modulePath, file);
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          Object.keys(content).forEach(key => allTranslationKeys.add(key));
        }
      }
    }
  }
  
  console.log(`从中英文翻译文件中总共加载了 ${allTranslationKeys.size} 个唯一键`);
  
  // 读取提取的键
  const extractedPath = './tools/i18n/extracted';
  const extractedFiles = fs.readdirSync(extractedPath);
  
  let totalExtractedKeys = 0;
  let missingInTranslation = [];
  
  for (const file of extractedFiles) {
    if (file.endsWith('.json')) {
      const filePath = path.join(extractedPath, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const keys = Object.keys(content);
      totalExtractedKeys += keys.length;
      
      for (const key of keys) {
        if (!allTranslationKeys.has(key)) {
          missingInTranslation.push({
            key: key,
            module: path.basename(file, '.json'),
            source: content[key].source
          });
        }
      }
    }
  }
  
  console.log(`\n从代码中提取了 ${totalExtractedKeys} 个键`);
  console.log(`在翻译文件中缺失的键: ${missingInTranslation.length} 个`);
  
  if (missingInTranslation.length > 0) {
    console.log('\n缺失的键:');
    missingInTranslation.forEach(item => {
      console.log(`  - ${item.key} (模块: ${item.module}, 来源: ${item.source.join(', ')})`);
    });
  } else {
    console.log('\n所有在代码中使用的键都在翻译文件中存在！');
  }
  
  // 检查反向问题：翻译文件中存在但代码中未使用的键
  const extractedKeysSet = new Set();
  for (const file of extractedFiles) {
    if (file.endsWith('.json')) {
      const filePath = path.join(extractedPath, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      Object.keys(content).forEach(key => extractedKeysSet.add(key));
    }
  }
  
  const unusedTranslationKeys = [];
  for (const key of allTranslationKeys) {
    if (!extractedKeysSet.has(key)) {
      unusedTranslationKeys.push(key);
    }
  }
  
  console.log(`\n翻译文件中存在但代码中未使用的键: ${unusedTranslationKeys.length} 个`);
  if (unusedTranslationKeys.length > 0 && unusedTranslationKeys.length < 50) {
    console.log('未使用的键:');
    unusedTranslationKeys.forEach(key => console.log(`  - ${key}`));
  } else if (unusedTranslationKeys.length >= 50) {
    console.log('未使用的键太多，仅显示前50个:');
    unusedTranslationKeys.slice(0, 50).forEach(key => console.log(`  - ${key}`));
  }
  
  return {
    missingKeys: missingInTranslation,
    unusedKeys: unusedTranslationKeys
  };
}

// 运行检查
checkMissingKeys();