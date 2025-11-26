const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const i18nBasePath = '/home/jan/work/test/frontend/lib/i18n';
const enPath = path.join(i18nBasePath, 'en');
const zhPath = path.join(i18nBasePath, 'zh-CN');

// 递归获取目录下的所有JSON文件及其键
function getNamespaceStructure(dir, basePath = dir) {
  const results = {};
  
  if (!fs.existsSync(dir)) {
    return results;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const subResults = getNamespaceStructure(fullPath, basePath);
      if (Object.keys(subResults).length > 0) {
        results[item] = subResults;
      }
    } else if (item.endsWith('.json')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const parsed = JSON.parse(content);
        results[item.replace('.json', '')] = {
          keys: extractAllKeys(parsed),
          key_count: countKeys(parsed)
        };
      } catch (error) {
        console.warn(`Error reading ${fullPath}:`, error.message);
        results[item.replace('.json', '')] = {
          keys: ['ERROR_READING_FILE'],
          key_count: 0,
          error: error.message
        };
      }
    }
  }
  
  return results;
}

// 递归提取所有键
function extractAllKeys(obj, prefix = '') {
  const keys = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...extractAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys.sort();
}

// 递归计算键的数量
function countKeys(obj) {
  let count = 0;
  
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      count += countKeys(obj[key]);
    } else {
      count++;
    }
  }
  
  return count;
}

// 比较两个命名空间的键
function compareNamespaceKeys(enKeys, zhKeys, namespace) {
  const enSet = new Set(enKeys);
  const zhSet = new Set(zhKeys);
  
  const missingInZh = enKeys.filter(key => !zhSet.has(key));
  const missingInEn = zhKeys.filter(key => !enSet.has(key));
  const commonKeys = enKeys.filter(key => zhSet.has(key));
  
  return {
    namespace,
    key_counts: {
      en: enKeys.length,
      zh: zhKeys.length,
      common: commonKeys.length
    },
    missing_keys: {
      in_zh: missingInZh,
      in_en: missingInEn
    },
    completeness_ratio: commonKeys.length / Math.max(enKeys.length, zhKeys.length),
    has_issues: missingInZh.length > 0 || missingInEn.length > 0
  };
}

// 递归比较命名空间结构
function compareNamespaceStructures(enStruct, zhStruct, namespace = '') {
  const results = [];
  
  // 获取所有子项
  const allKeys = new Set([...Object.keys(enStruct || {}), ...Object.keys(zhStruct || {})]);
  
  for (const key of allKeys) {
    const enItem = enStruct?.[key];
    const zhItem = zhStruct?.[key];
    const currentNamespace = namespace ? `${namespace}.${key}` : key;
    
    if (enItem && zhItem) {
      if (enItem.keys && zhItem.keys) {
        // 比较键
        const comparison = compareNamespaceKeys(enItem.keys, zhItem.keys, currentNamespace);
        results.push(comparison);
      } else {
        // 递归比较子结构
        const subResults = compareNamespaceStructures(enItem, zhItem, currentNamespace);
        results.push(...subResults);
      }
    } else if (enItem && !zhItem) {
      results.push({
        namespace: currentNamespace,
        status: 'missing_in_zh',
        key_counts: { en: enItem.key_count || 0, zh: 0, common: 0 },
        missing_keys: { in_zh: ['ENTIRE_FILE'], in_en: [] },
        completeness_ratio: 0,
        has_issues: true
      });
    } else if (!enItem && zhItem) {
      results.push({
        namespace: currentNamespace,
        status: 'missing_in_en',
        key_counts: { en: 0, zh: zhItem.key_count || 0, common: 0 },
        missing_keys: { in_zh: [], in_en: ['ENTIRE_FILE'] },
        completeness_ratio: 0,
        has_issues: true
      });
    }
  }
  
  return results;
}

// 主验证函数
function validateI18nCompleteness() {
  console.log('开始详细验证 i18n 完整性...');
  
  // 获取所有命名空间
  const enNamespaces = fs.readdirSync(enPath).filter(item => {
    const fullPath = path.join(enPath, item);
    return fs.statSync(fullPath).isDirectory();
  });
  
  const zhNamespaces = fs.readdirSync(zhPath).filter(item => {
    const fullPath = path.join(zhPath, item);
    return fs.statSync(fullPath).isDirectory();
  });
  
  console.log(`发现英文命名空间: ${enNamespaces.length} 个`);
  console.log(`发现中文命名空间: ${zhNamespaces.length} 个`);
  
  const validationResults = {
    validation_time: new Date().toISOString(),
    summary: {
      total_namespaces: {
        en: enNamespaces.length,
        zh: zhNamespaces.length,
        common: enNamespaces.filter(ns => zhNamespaces.includes(ns)).length
      }
    },
    namespace_validations: {},
    issues_summary: {
      total_files_with_issues: 0,
      total_missing_keys: { in_zh: 0, in_en: 0 },
      namespaces_with_problems: []
    }
  };
  
  // 验证每个命名空间
  for (const namespace of enNamespaces) {
    if (!zhNamespaces.includes(namespace)) {
      validationResults.namespace_validations[namespace] = {
        status: 'missing_in_zh',
        message: '整个命名空间在中文版本中缺失'
      };
      validationResults.issues_summary.namespaces_with_problems.push(namespace);
      continue;
    }
    
    const enDir = path.join(enPath, namespace);
    const zhDir = path.join(zhPath, namespace);
    
    const enStructure = getNamespaceStructure(enDir);
    const zhStructure = getNamespaceStructure(zhDir);
    
    const comparisons = compareNamespaceStructures(enStructure, zhStructure, namespace);
    
    const namespaceValidation = {
      namespace,
      file_comparisons: comparisons,
      total_files: comparisons.length,
      files_with_issues: comparisons.filter(c => c.has_issues).length,
      overall_completeness: comparisons.length > 0 ? 
        comparisons.reduce((sum, c) => sum + c.completeness_ratio, 0) / comparisons.length : 1
    };
    
    validationResults.namespace_validations[namespace] = namespaceValidation;
    
    // 统计问题
    if (namespaceValidation.files_with_issues > 0) {
      validationResults.issues_summary.total_files_with_issues += namespaceValidation.files_with_issues;
      validationResults.issues_summary.namespaces_with_problems.push(namespace);
      
      for (const comparison of comparisons) {
        if (comparison.has_issues) {
          validationResults.issues_summary.total_missing_keys.in_zh += comparison.missing_keys.in_zh.length;
          validationResults.issues_summary.total_missing_keys.in_en += comparison.missing_keys.in_en.length;
        }
      }
    }
  }
  
  // 检查中文独有的命名空间
  const zhOnlyNamespaces = zhNamespaces.filter(ns => !enNamespaces.includes(ns));
  for (const namespace of zhOnlyNamespaces) {
    validationResults.namespace_validations[namespace] = {
      status: 'missing_in_en',
      message: '整个命名空间在英文版本中缺失'
    };
    validationResults.issues_summary.namespaces_with_problems.push(namespace);
  }
  
  // 计算总体统计
  const totalNamespaces = Math.max(enNamespaces.length, zhNamespaces.length);
  validationResults.summary.overall_completeness = 
    (totalNamespaces - validationResults.issues_summary.namespaces_with_problems.length) / totalNamespaces;
  
  return validationResults;
}

// 运行验证
const validationResult = validateI18nCompleteness();

// 保存详细结果
const yamlContent = yaml.dump(validationResult, {
  indent: 2,
  lineWidth: 120,
  noRefs: true,
  sortKeys: false
});

fs.writeFileSync('/home/jan/work/test/frontend/i18n_validation_report.yaml', yamlContent);

// 生成摘要报告
const summaryReport = {
  validation_time: validationResult.validation_time,
  overall_summary: {
    total_namespaces: validationResult.summary.total_namespaces,
    overall_completeness: `${(validationResult.summary.overall_completeness * 100).toFixed(2)}%`,
    namespaces_with_issues: validationResult.issues_summary.namespaces_with_problems.length,
    total_files_with_issues: validationResult.issues_summary.total_files_with_issues,
    total_missing_keys: validationResult.issues_summary.total_missing_keys
  },
  problem_namespaces: validationResult.issues_summary.namespaces_with_problems,
  detailed_issues: {}
};

// 添加详细问题信息
for (const namespace of validationResult.issues_summary.namespaces_with_problems) {
  const validation = validationResult.namespace_validations[namespace];
  if (validation.file_comparisons) {
    const problematicFiles = validation.file_comparisons.filter(c => c.has_issues);
    summaryReport.detailed_issues[namespace] = {
      files_with_issues: problematicFiles.length,
      issues: problematicFiles.map(file => ({
        file: file.namespace,
        missing_in_zh: file.missing_keys.in_zh.length,
        missing_in_en: file.missing_keys.in_en.length,
        completeness: `${(file.completeness_ratio * 100).toFixed(2)}%`
      }))
    };
  } else {
    summaryReport.detailed_issues[namespace] = {
      status: validation.status,
      message: validation.message
    };
  }
}

// 保存摘要报告
const summaryYaml = yaml.dump(summaryReport, {
  indent: 2,
  lineWidth: 120,
  noRefs: true,
  sortKeys: false
});

fs.writeFileSync('/home/jan/work/test/frontend/i18n_validation_summary.yaml', summaryYaml);

console.log('验证完成！');
console.log(`总体完整性: ${summaryReport.overall_summary.overall_completeness}`);
console.log(`有问题的命名空间: ${summaryReport.overall_summary.namespaces_with_issues} 个`);
console.log(`有问题的文件: ${summaryReport.overall_summary.total_files_with_issues} 个`);
console.log(`中文缺失的键: ${summaryReport.overall_summary.total_missing_keys.in_zh} 个`);
console.log(`英文缺失的键: ${summaryReport.overall_summary.total_missing_keys.in_en} 个`);
console.log('');
console.log('详细报告已保存到:');
console.log('- i18n_validation_report.yaml (完整报告)');
console.log('- i18n_validation_summary.yaml (摘要报告)');