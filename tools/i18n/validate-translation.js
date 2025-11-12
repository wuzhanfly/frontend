#!/usr/bin/env node

/**
 * 翻译质量校验脚本
 * 根据文档要求重新创建
 */

const fs = require('fs');
const path = require('path');

/**
 * 校验翻译质量
 */
function validateTranslation(sourceDir, targetDir, outputDir) {
  console.log('开始校验翻译质量...');
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 读取源语言（英文）资源
  if (!fs.existsSync(sourceDir)) {
    console.error(`源语言目录不存在: ${sourceDir}`);
    process.exit(1);
  }
  
  // 读取目标语言资源
  if (!fs.existsSync(targetDir)) {
    console.error(`目标语言目录不存在: ${targetDir}`);
    process.exit(1);
  }
  
  const report = {
    totalKeys: 0,
    semanticIssues: [],
    placeholderIssues: [],
    formatIssues: [],
    suspiciousTranslations: [],
    targetLanguages: []
  };
  
  // 获取所有目标语言
  const languages = fs.readdirSync(targetDir).filter(item => {
    const langPath = path.join(targetDir, item);
    return fs.statSync(langPath).isDirectory();
  });
  
  report.targetLanguages = languages;
  
  // 遍历每个目标语言
  for (const lang of languages) {
    console.log(`正在校验语言: ${lang}`);
    
    const langPath = path.join(targetDir, lang);
    const modules = fs.readdirSync(langPath);
    
    for (const module of modules) {
      const modulePath = path.join(langPath, module);
      if (!fs.statSync(modulePath).isDirectory()) continue;
      
      // 读取源模块文件
      const sourceModulePath = path.join(sourceDir, module);
      if (!fs.existsSync(sourceModulePath)) {
        console.log(`源模块不存在: ${sourceModulePath}`);
        continue;
      }
      
      const sourceFiles = fs.readdirSync(sourceModulePath);
      const targetFiles = fs.readdirSync(modulePath);
      
      for (const file of sourceFiles) {
        if (file.endsWith('.json')) {
          const sourceFilePath = path.join(sourceModulePath, file);
          const targetFilePath = path.join(modulePath, file);
          
          if (!targetFiles.includes(file)) {
            console.log(`目标语言文件不存在: ${targetFilePath}`);
            continue;
          }
          
          const sourceContent = fs.readFileSync(sourceFilePath, 'utf8');
          const targetContent = fs.readFileSync(targetFilePath, 'utf8');
          
          const sourceData = JSON.parse(sourceContent);
          const targetData = JSON.parse(targetContent);
          
          const sourceKeys = Object.keys(sourceData);
          report.totalKeys += sourceKeys.length;
          
          // 校验每个键
          for (const key of sourceKeys) {
            if (!targetData[key]) {
              report.semanticIssues.push({
                module: module,
                key: key,
                language: lang,
                issue: 'Missing translation'
              });
              continue;
            }
            
            const sourceText = sourceData[key];
            const targetText = targetData[key];
            
            // 检查占位符完整性
            const sourcePlaceholders = sourceText.match(/\{[^}]+\}/g) || [];
            const targetPlaceholders = targetText.match(/\{[^}]+\}/g) || [];
            
            if (sourcePlaceholders.length !== targetPlaceholders.length) {
              report.placeholderIssues.push({
                module: module,
                key: key,
                language: lang,
                sourcePlaceholders: sourcePlaceholders,
                targetPlaceholders: targetPlaceholders,
                issue: 'Placeholder count mismatch'
              });
            } else {
              // 检查占位符是否一致
              for (const sp of sourcePlaceholders) {
                if (!targetPlaceholders.includes(sp)) {
                  report.placeholderIssues.push({
                    module: module,
                    key: key,
                    language: lang,
                    sourcePlaceholders: sourcePlaceholders,
                    targetPlaceholders: targetPlaceholders,
                    issue: 'Placeholder mismatch'
                  });
                  break;
                }
              }
            }
            
            // 检查百分号占位符
            const sourcePercentPlaceholders = sourceText.match(/%[sdi]/g) || [];
            const targetPercentPlaceholders = targetText.match(/%[sdi]/g) || [];
            
            if (sourcePercentPlaceholders.length !== targetPercentPlaceholders.length) {
              report.placeholderIssues.push({
                module: module,
                key: key,
                language: lang,
                sourcePlaceholders: sourcePercentPlaceholders,
                targetPlaceholders: targetPercentPlaceholders,
                issue: 'Percent placeholder count mismatch'
              });
            }
            
            // 检查是否为可疑翻译（如直接复制源文本）
            if (sourceText === targetText) {
              report.suspiciousTranslations.push({
                module: module,
                key: key,
                language: lang,
                issue: 'Source text not translated'
              });
            }
            
            // 检查格式问题（如多余的空格、特殊字符等）
            if (targetText.trim() !== targetText) {
              report.formatIssues.push({
                module: module,
                key: key,
                language: lang,
                issue: 'Extra whitespace'
              });
            }
          }
        }
      }
    }
  }
  
  // 生成报告
  const reportPath = path.join(outputDir, 'validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`校验报告已保存到: ${reportPath}`);
  
  // 输出统计信息
  console.log('\n=== 校验统计 ===');
  console.log(`总键数: ${report.totalKeys}`);
  console.log(`语义问题: ${report.semanticIssues.length}`);
  console.log(`占位符问题: ${report.placeholderIssues.length}`);
  console.log(`格式问题: ${report.formatIssues.length}`);
  console.log(`可疑翻译: ${report.suspiciousTranslations.length}`);
  console.log(`目标语言: ${report.targetLanguages.join(', ')}`);
  
  if (report.semanticIssues.length > 0) {
    console.log('\n语义问题:');
    report.semanticIssues.slice(0, 10).forEach(item => {
      console.log(`  - 模块: ${item.module}, 键: ${item.key}, 语言: ${item.language}`);
    });
    if (report.semanticIssues.length > 10) {
      console.log(`  ... 还有 ${report.semanticIssues.length - 10} 个语义问题`);
    }
  }
  
  if (report.placeholderIssues.length > 0) {
    console.log('\n占位符问题:');
    report.placeholderIssues.slice(0, 10).forEach(item => {
      console.log(`  - 模块: ${item.module}, 键: ${item.key}, 语言: ${item.language}`);
    });
    if (report.placeholderIssues.length > 10) {
      console.log(`  ... 还有 ${report.placeholderIssues.length - 10} 个占位符问题`);
    }
  }
  
  if (report.formatIssues.length > 0) {
    console.log('\n格式问题:');
    report.formatIssues.slice(0, 10).forEach(item => {
      console.log(`  - 模块: ${item.module}, 键: ${item.key}, 语言: ${item.language}`);
    });
    if (report.formatIssues.length > 10) {
      console.log(`  ... 还有 ${report.formatIssues.length - 10} 个格式问题`);
    }
  }
  
  if (report.suspiciousTranslations.length > 0) {
    console.log('\n可疑翻译:');
    report.suspiciousTranslations.slice(0, 10).forEach(item => {
      console.log(`  - 模块: ${item.module}, 键: ${item.key}, 语言: ${item.language}`);
    });
    if (report.suspiciousTranslations.length > 10) {
      console.log(`  ... 还有 ${report.suspiciousTranslations.length - 10} 个可疑翻译`);
    }
  }
  
  console.log('\n校验完成！');
  return report;
}

/**
 * 主函数
 */
function main() {
  const sourceDir = process.argv[2] || './lib/i18n/en';
  const targetDir = process.argv[3] || './lib/i18n';
  const outputDir = process.argv[4] || './tools/i18n/reports';
  
  console.log(`源语言目录: ${sourceDir}`);
  console.log(`目标语言目录: ${targetDir}`);
  console.log(`输出目录: ${outputDir}`);
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`源语言目录不存在: ${sourceDir}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(targetDir)) {
    console.error(`目标语言目录不存在: ${targetDir}`);
    process.exit(1);
  }
  
  const report = validateTranslation(sourceDir, targetDir, outputDir);
  
  // 如果有问题，返回非零退出码
  if (report.semanticIssues.length > 0 || 
      report.placeholderIssues.length > 0 || 
      report.suspiciousTranslations.length > 0) {
    console.log('\n警告: 发现翻译质量问题，请检查报告文件。');
    process.exit(1);
  }
}

// 执行主函数
if (require.main === module) {
  main();
}