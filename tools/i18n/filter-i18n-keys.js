#!/usr/bin/env node

/**
 * 校验提取的国际化内容脚本
 * 根据文档要求重新创建
 */

const fs = require('fs');
const path = require('path');

/**
 * 校验提取的键值对
 */
function filterKeys(extractedDir, outputDir) {
  console.log('开始校验提取的国际化内容...');
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 读取提取的文件
  const files = fs.readdirSync(extractedDir);
  const report = {
    duplicateKeys: [],
    emptyMessages: [],
    invalidFormat: [],
    totalKeys: 0,
    filteredKeys: 0
  };
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(extractedDir, file);
      const module = path.basename(file, '.json');
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        const filteredData = {};
        const keys = Object.keys(data);
        report.totalKeys += keys.length;
        
        keys.forEach(key => {
          const item = data[key];
          
          // 检查空值
          if (!item.defaultMessage || item.defaultMessage.trim() === '') {
            report.emptyMessages.push({
              module: module,
              key: key,
              source: item.source
            });
            return;
          }
          
          // 检查重复键（在这个模块内）
          if (filteredData[key]) {
            report.duplicateKeys.push({
              module: module,
              key: key,
              sources: [filteredData[key].source, item.source]
            });
            return;
          }
          
          // 检查键格式
          if (!/^[a-zA-Z0-9_.-]+$/.test(key)) {
            report.invalidFormat.push({
              module: module,
              key: key,
              source: item.source
            });
            return;
          }
          
          // 通过校验的键
          filteredData[key] = item;
          report.filteredKeys++;
        });
        
        // 保存过滤后的数据
        const outputPath = path.join(outputDir, file);
        fs.writeFileSync(outputPath, JSON.stringify(filteredData, null, 2));
        console.log(`已生成校验后的模块文件: ${outputPath}`);
        
      } catch (error) {
        console.error(`处理文件 ${file} 时出错:`, error.message);
      }
    }
  });
  
  // 生成报告
  const reportPath = path.join(outputDir, 'filter-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`校验报告已保存到: ${reportPath}`);
  
  // 输出统计信息
  console.log('\n=== 校验统计 ===');
  console.log(`总键数: ${report.totalKeys}`);
  console.log(`通过校验的键数: ${report.filteredKeys}`);
  console.log(`重复键数: ${report.duplicateKeys.length}`);
  console.log(`空消息键数: ${report.emptyMessages.length}`);
  console.log(`格式错误键数: ${report.invalidFormat.length}`);
  
  if (report.duplicateKeys.length > 0) {
    console.log('\n重复键:');
    report.duplicateKeys.slice(0, 10).forEach(item => {
      console.log(`  - 模块: ${item.module}, 键: ${item.key}`);
    });
    if (report.duplicateKeys.length > 10) {
      console.log(`  ... 还有 ${report.duplicateKeys.length - 10} 个重复键`);
    }
  }
  
  if (report.emptyMessages.length > 0) {
    console.log('\n空消息键:');
    report.emptyMessages.slice(0, 10).forEach(item => {
      console.log(`  - 模块: ${item.module}, 键: ${item.key}`);
    });
    if (report.emptyMessages.length > 10) {
      console.log(`  ... 还有 ${report.emptyMessages.length - 10} 个空消息键`);
    }
  }
  
  if (report.invalidFormat.length > 0) {
    console.log('\n格式错误键:');
    report.invalidFormat.slice(0, 10).forEach(item => {
      console.log(`  - 模块: ${item.module}, 键: ${item.key}`);
    });
    if (report.invalidFormat.length > 10) {
      console.log(`  ... 还有 ${report.invalidFormat.length - 10} 个格式错误键`);
    }
  }
  
  console.log('\n校验完成！');
  return report;
}

/**
 * 主函数
 */
function main() {
  const extractedDir = process.argv[2] || './tools/i18n/extracted';
  const outputDir = process.argv[3] || './tools/i18n/filtered';
  
  console.log(`提取目录: ${extractedDir}`);
  console.log(`输出目录: ${outputDir}`);
  
  if (!fs.existsSync(extractedDir)) {
    console.error(`提取目录不存在: ${extractedDir}`);
    process.exit(1);
  }
  
  const report = filterKeys(extractedDir, outputDir);
  
  // 如果有严重问题，返回非零退出码
  if (report.duplicateKeys.length > 0 || report.emptyMessages.length > 0) {
    console.log('\n发现严重问题，建议修复后再继续。');
    process.exit(1);
  }
}

// 执行主函数
if (require.main === module) {
  main();
}