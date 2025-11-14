const fs = require('fs');
const path = require('path');

/**
 * 修复缺失的翻译键
 */
function fixMissingTranslationKeys() {
  console.log('开始修复缺失的翻译键...');
  
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
            source: content[key].source,
            defaultMessage: content[key].defaultMessage || key.split('.').pop() // 使用键的最后一部分作为默认值
          });
        }
      }
    }
  }
  
  console.log(`\n发现 ${missingInTranslation.length} 个缺失的翻译键`);
  
  if (missingInTranslation.length === 0) {
    console.log('没有发现缺失的翻译键！');
    return;
  }
  
  // 按模块分组
  const missingByModule = {};
  missingInTranslation.forEach(item => {
    if (!missingByModule[item.module]) {
      missingByModule[item.module] = [];
    }
    missingByModule[item.module].push(item);
  });
  
  // 为每个模块添加缺失的键
  for (const [moduleName, missingKeys] of Object.entries(missingByModule)) {
    console.log(`处理模块: ${moduleName} (${missingKeys.length} 个缺失键)`);
    
    // 读取英文文件并添加缺失的键
    const enModulePath = path.join(enPath, moduleName);
    const enJsonFile = path.join(enModulePath, 'common.json');
    
    if (fs.existsSync(enJsonFile)) {
      let enContent = JSON.parse(fs.readFileSync(enJsonFile, 'utf8'));
      
      let enUpdated = false;
      missingKeys.forEach(item => {
        if (!enContent[item.key]) {
          const keyParts = item.key.split('.');
          const actualKey = keyParts.slice(2).join('.'); // 去掉模块和common部分
          enContent[item.key] = actualKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          enUpdated = true;
          console.log(`  添加英文翻译: ${item.key} = "${enContent[item.key]}"`);
        }
      });
      
      if (enUpdated) {
        // 确保目录存在
        if (!fs.existsSync(enModulePath)) {
          fs.mkdirSync(enModulePath, { recursive: true });
        }
        fs.writeFileSync(enJsonFile, JSON.stringify(enContent, null, 2));
        console.log(`  已更新英文文件: ${enJsonFile}`);
      }
    } else {
      // 创建新的文件
      const enModulePath = path.join(enPath, moduleName);
      if (!fs.existsSync(enModulePath)) {
        fs.mkdirSync(enModulePath, { recursive: true });
      }
      
      const newEnContent = {};
      missingKeys.forEach(item => {
        const keyParts = item.key.split('.');
        const actualKey = keyParts.slice(2).join('.'); // 去掉模块和common部分
        newEnContent[item.key] = actualKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        console.log(`  添加英文翻译: ${item.key} = "${newEnContent[item.key]}"`);
      });
      
      const enJsonFile = path.join(enModulePath, 'common.json');
      fs.writeFileSync(enJsonFile, JSON.stringify(newEnContent, null, 2));
      console.log(`  已创建英文文件: ${enJsonFile}`);
    }
    
    // 读取中文文件并添加缺失的键（使用英文内容作为基础，稍后需要翻译）
    const zhModulePath = path.join(zhPath, moduleName);
    const zhJsonFile = path.join(zhModulePath, 'common.json');
    
    let zhContent = {};
    if (fs.existsSync(zhJsonFile)) {
      zhContent = JSON.parse(fs.readFileSync(zhJsonFile, 'utf8'));
    } else {
      // 创建目录
      if (!fs.existsSync(zhModulePath)) {
        fs.mkdirSync(zhModulePath, { recursive: true });
      }
    }
    
    let zhUpdated = false;
    missingKeys.forEach(item => {
      if (!zhContent[item.key]) {
        // 为中文提供默认翻译（使用英文内容作为模板）
        const keyParts = item.key.split('.');
        const actualKey = keyParts.slice(2).join('.');
        // 简单的英文到中文的转换 - 实际应用中需要人工翻译
        zhContent[item.key] = actualKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        zhUpdated = true;
        console.log(`  添加中文翻译: ${item.key} = "${zhContent[item.key]}"`);
      }
    });
    
    if (zhUpdated) {
      fs.writeFileSync(zhJsonFile, JSON.stringify(zhContent, null, 2));
      console.log(`  已更新中文文件: ${zhJsonFile}`);
    }
  }
  
  console.log('\n修复完成！');
}

// 运行修复
fixMissingTranslationKeys();