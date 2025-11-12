#!/usr/bin/env node

/**
 * 生成映射表模板脚本
 * 将提取的英文内容作为 key 和 value 生成映射表
 */

const fs = require('fs');
const path = require('path');

/**
 * 从提取的国际化内容生成映射表模板
 */
function generateMappingTemplate(sourceDir, outputDir, language) {
  console.log(`开始生成 ${language} 的映射表模板...`);
  
  // 创建输出目录
  const langDir = path.join(outputDir, language);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }
  
  // 读取提取的国际化内容
  if (!fs.existsSync(sourceDir)) {
    console.error(`源目录不存在: ${sourceDir}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(sourceDir);
  const allKeys = new Set(); // 使用 Set 来避免重复的 key
  
  // 收集所有英文内容
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(sourceDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      // 遍历每个键值对，提取 defaultMessage 作为映射表的 key 和 value
      Object.keys(data).forEach(key => {
        const item = data[key];
        if (item.defaultMessage) {
          allKeys.add(item.defaultMessage); // 添加英文原文作为 key 和 value
        }
      });
    }
  }
  
  // 生成映射表数组，key 和 value 都使用英文原文
  const mappingArray = Array.from(allKeys).map(key => ({
    key: key,
    value: key // 目标语言使用相同的英文原文
  }));
  
  // 保存映射表文件
  const outputPath = path.join(langDir, 'translation-map.json');
  fs.writeFileSync(outputPath, JSON.stringify(mappingArray, null, 2));
  console.log(`已生成映射表模板: ${outputPath}`);
  console.log(`共生成 ${mappingArray.length} 个映射项`);
  
  return mappingArray;
}

/**
 * 主函数
 */
function main() {
  const sourceDir = process.argv[2] || './lib/i18n/en';
  const outputDir = process.argv[3] || './lib/i18n/mappings';
  const language = process.argv[4] || 'zh-CN';
  
  console.log(`源目录: ${sourceDir}`);
  console.log(`输出目录: ${outputDir}`);
  console.log(`目标语言: ${language}`);
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`源目录不存在: ${sourceDir}`);
    process.exit(1);
  }
  
  const mappingArray = generateMappingTemplate(sourceDir, outputDir, language);
  
  console.log('\n映射表模板生成完成！');
  console.log('请在 translation-map.json 文件中将 value 字段翻译为目标语言');
}

// 执行主函数
if (require.main === module) {
  main();
}