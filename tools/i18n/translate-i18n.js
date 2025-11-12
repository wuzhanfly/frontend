#!/usr/bin/env node

/**
 * 自动翻译脚本（映射表模式）
 * 根据文档要求重新创建
 */

const fs = require('fs');
const path = require('path');

/**
 * 保护占位符
 */
function protectPlaceholders(text) {
  // 定義占位符模式
  const patterns = [
    { pattern: /\{[^}]+\}/g, key: 'PLACEHOLDER' },  // {name}, {count}
    { pattern: /%\w/g, key: 'PERCENT' },            // %s, %d, %i
    { pattern: /\{\{[^}]+\}\}/g, key: 'DOUBLE_BRACE' }  // {{name}}
  ];
  
  let protectedText = text;
  const map = {};
  let id = 0;
  
  patterns.forEach(({ pattern, key }) => {
    protectedText = protectedText.replace(pattern, (match) => {
      const placeholderId = `__${key}_${id}__`;
      map[placeholderId] = match;
      id++;
      return placeholderId;
    });
  });
  
  return { protectedText, map };
}

/**
 * 恢复占位符
 */
function restorePlaceholders(protectedText, map) {
  let result = protectedText;
  
  Object.keys(map).forEach(placeholderId => {
    result = result.replace(new RegExp(placeholderId.replace(/[{}]/g, '\\$&'), 'g'), map[placeholderId]);
  });
  
  return result;
}

/**
 * 从映射表翻译文本
 */
function translateTextFromMap(text, targetLang, translationMap) {
  // 查找映射表中的翻译
  if (translationMap && translationMap[text]) {
    return translationMap[text];
  }
  
  // 如果没有找到映射，返回原文
  return text;
}

/**
 * 翻译资源包（映射表模式）
 */
async function translateResources(config, sourceDir, outputDir) {
  console.log('开始翻译资源包（映射表模式）...');
  
  const { targetLanguages } = config;
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 读取英文资源文件
  if (!fs.existsSync(sourceDir)) {
    console.error(`源目录不存在: ${sourceDir}`);
    process.exit(1);
  }
  
  const modules = fs.readdirSync(sourceDir);
  const report = {
    totalKeys: 0,
    translatedKeys: 0,
    failedKeys: [],
    successRate: 0,
    targetLanguages: targetLanguages
  };
  
  // 为每个目标语言翻译
  for (const lang of targetLanguages) {
    // 读取映射表文件
    const mapDir = path.join(outputDir, 'mappings', lang);
    const mapPath = path.join(mapDir, 'translation-map.json');
    let translationMap = {};
    
    if (fs.existsSync(mapPath)) {
      try {
        const mapContent = fs.readFileSync(mapPath, 'utf8');
        const mapData = JSON.parse(mapContent);
        // 转换数组格式为对象映射
        translationMap = {};
        mapData.forEach(item => {
          translationMap[item.key] = item.value;
        });
        console.log(`已加载 ${lang} 的映射表，包含 ${mapData.length} 个条目`);
      } catch (error) {
        console.warn(`无法加载 ${lang} 的映射表:`, error.message);
      }
    } else {
      console.warn(`未找到 ${lang} 的映射表文件: ${mapPath}`);
    }
    
    // 翻译每个模块
    for (const module of modules) {
      const modulePath = path.join(sourceDir, module);
      if (!fs.statSync(modulePath).isDirectory()) continue;
      
      const files = fs.readdirSync(modulePath);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(modulePath, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const data = JSON.parse(content);
          
          const keys = Object.keys(data);
          report.totalKeys += keys.length;
          
          console.log(`正在翻译模块 ${module} 到 ${lang}...`);
          
          const translatedData = {};
          let translatedCount = 0;
          
          for (const key of keys) {
            const text = data[key];
            
            try {
              // 保护占位符
              const { protectedText, map } = protectPlaceholders(text);
              
              // 从映射表翻译文本
              const translatedText = translateTextFromMap(protectedText, lang, translationMap);
              
              // 恢复占位符
              const finalText = restorePlaceholders(translatedText, map);
              
              translatedData[key] = finalText;
              translatedCount++;
            } catch (error) {
              console.error(`翻译失败 ${key}:`, error.message);
              // 翻译失败时保留原文
              translatedData[key] = text;
              report.failedKeys.push({
                module: module,
                key: key,
                language: lang,
                error: error.message
              });
            }
          }
          
          // 创建目标语言目录
          const langDir = path.join(outputDir, lang, module);
          if (!fs.existsSync(langDir)) {
            fs.mkdirSync(langDir, { recursive: true });
          }
          
          // 保存翻译后的文件
          const outputPath = path.join(langDir, file);
          fs.writeFileSync(outputPath, JSON.stringify(translatedData, null, 2));
          console.log(`已生成翻译文件: ${outputPath}`);
          
          report.translatedKeys += translatedCount;
        }
      }
    }
  }
  
  // 生成报告
  const reportDir = path.join(outputDir, '../reports');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  const reportPath = path.join(reportDir, 'translate-report.json');
  report.successRate = report.totalKeys > 0 ? (report.translatedKeys - report.failedKeys.length) / report.totalKeys * 100 : 0;
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`翻译报告已保存到: ${reportPath}`);
  
  // 输出统计信息
  console.log('\n=== 翻译统计 ===');
  console.log(`总键数: ${report.totalKeys}`);
  console.log(`翻译的键数: ${report.translatedKeys}`);
  console.log(`失败的键数: ${report.failedKeys.length}`);
  console.log(`成功率: ${report.successRate.toFixed(2)}%`);
  console.log(`目标语言: ${report.targetLanguages.join(', ')}`);
  
  if (report.failedKeys.length > 0) {
    console.log('\n失败的翻译:');
    report.failedKeys.slice(0, 10).forEach(item => {
      console.log(`  - 模块: ${item.module}, 键: ${item.key}, 语言: ${item.language}`);
    });
    if (report.failedKeys.length > 10) {
      console.log(`  ... 还有 ${report.failedKeys.length - 10} 个失败的翻译`);
    }
  }
  
  console.log('\n翻译完成！');
  return report;
}

/**
 * 主函数
 */
async function main() {
  const configPath = process.argv[2] || './tools/i18n/lang-config.json';
  const sourceDir = process.argv[3] || './lib/i18n/en';
  const outputDir = process.argv[4] || './lib/i18n';
  
  console.log(`配置文件: ${configPath}`);
  console.log(`源目录: ${sourceDir}`);
  console.log(`输出目录: ${outputDir}`);
  
  if (!fs.existsSync(configPath)) {
    console.error(`配置文件不存在: ${configPath}`);
    process.exit(1);
  }
  
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`源目录不存在: ${sourceDir}`);
    process.exit(1);
  }
  
  const report = await translateResources(config, sourceDir, outputDir);
  
  // 如果失败率过高，返回非零退出码
  if (report.failedKeys.length / report.totalKeys > 0.5) {
    console.log('\n警告: 翻译失败率过高，请检查映射表文件。');
    process.exit(1);
  }
}

// 执行主函数
if (require.main === module) {
  main();
}