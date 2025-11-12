#!/usr/bin/env node

/**
 * 生成英文资源包脚本
 * 根据文档要求重新创建
 */

const fs = require('fs');
const path = require('path');

/**
 * 生成英文资源包
 */
function generateEnglishResources(filteredDir, outputDir) {
  console.log('开始生成英文资源包...');
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 读取过滤后的文件
  const files = fs.readdirSync(filteredDir);
  const report = {
    totalKeys: 0,
    generatedKeys: 0,
    needsReview: [],
    modules: []
  };
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(filteredDir, file);
      const module = path.basename(file, '.json');
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        const resourceData = {};
        const keys = Object.keys(data);
        report.totalKeys += keys.length;
        
        keys.forEach(key => {
          const item = data[key];
          
          // 使用 defaultMessage 作为英文翻译
          resourceData[key] = item.defaultMessage;
          report.generatedKeys++;
          
          // 检查是否需要人工审核
          if (!item.defaultMessage || item.defaultMessage.includes('NEEDS_REVIEW')) {
            report.needsReview.push({
              module: module,
              key: key,
              source: item.source
            });
          }
        });
        
        // 保存资源文件
        const moduleDir = path.join(outputDir, module);
        if (!fs.existsSync(moduleDir)) {
          fs.mkdirSync(moduleDir, { recursive: true });
        }
        
        const outputPath = path.join(moduleDir, 'common.json');
        fs.writeFileSync(outputPath, JSON.stringify(resourceData, null, 2));
        console.log(`已生成英文资源文件: ${outputPath}`);
        report.modules.push(module);
        
      } catch (error) {
        console.error(`处理文件 ${file} 时出错:`, error.message);
      }
    }
  });
  
  // 生成报告
  const reportPath = path.join(outputDir, '../reports/generate-en-report.json');
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`生成报告已保存到: ${reportPath}`);
  
  // 输出统计信息
  console.log('\n=== 生成统计 ===');
  console.log(`总键数: ${report.totalKeys}`);
  console.log(`生成的键数: ${report.generatedKeys}`);
  console.log(`需要人工审核的键数: ${report.needsReview.length}`);
  console.log(`生成的模块数: ${report.modules.length}`);
  
  if (report.needsReview.length > 0) {
    console.log('\n需要人工审核的键:');
    report.needsReview.slice(0, 10).forEach(item => {
      console.log(`  - 模块: ${item.module}, 键: ${item.key}`);
    });
    if (report.needsReview.length > 10) {
      console.log(`  ... 还有 ${report.needsReview.length - 10} 个需要审核的键`);
    }
  }
  
  console.log('\n英文资源包生成完成！');
  return report;
}

/**
 * 主函数
 */
function main() {
  const filteredDir = process.argv[2] || './tools/i18n/filtered';
  const outputDir = process.argv[3] || './lib/i18n/en';
  
  console.log(`过滤目录: ${filteredDir}`);
  console.log(`输出目录: ${outputDir}`);
  
  if (!fs.existsSync(filteredDir)) {
    console.error(`过滤目录不存在: ${filteredDir}`);
    process.exit(1);
  }
  
  const report = generateEnglishResources(filteredDir, outputDir);
  
  // 如果有需要人工审核的键，输出警告
  if (report.needsReview.length > 0) {
    console.log('\n警告: 发现需要人工审核的键，请检查报告文件。');
  }
}

// 执行主函数
if (require.main === module) {
  main();
}