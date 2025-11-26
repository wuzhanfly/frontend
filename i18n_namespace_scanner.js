const fs = require('fs');
const path = require('path');

const i18nBasePath = '/home/jan/work/test/frontend/lib/i18n';
const enPath = path.join(i18nBasePath, 'en');
const zhPath = path.join(i18nBasePath, 'zh-CN');

// 递归获取目录下的所有文件
function getFilesRecursive(dir, basePath = dir) {
  const results = {};
  
  if (!fs.existsSync(dir)) {
    return results;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const subResults = getFilesRecursive(fullPath, basePath);
      if (Object.keys(subResults).length > 0) {
        results[item] = subResults;
      }
    } else if (item.endsWith('.json')) {
      // 读取JSON文件内容
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const parsed = JSON.parse(content);
        results[item.replace('.json', '')] = Object.keys(parsed);
      } catch (error) {
        console.warn(`Error reading ${fullPath}:`, error.message);
        results[item.replace('.json', '')] = ['ERROR_READING_FILE'];
      }
    }
  }
  
  return results;
}

// 获取所有命名空间
function getAllNamespaces(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  
  return fs.readdirSync(dir)
    .filter(item => {
      const fullPath = path.join(dir, item);
      return fs.statSync(fullPath).isDirectory();
    })
    .sort();
}

// 主扫描函数
function scanI18nNamespaces() {
  console.log('开始扫描 i18n 命名空间...');
  
  const enNamespaces = getAllNamespaces(enPath);
  const zhNamespaces = getAllNamespaces(zhPath);
  
  console.log(`英文命名空间数量: ${enNamespaces.length}`);
  console.log(`中文命名空间数量: ${zhNamespaces.length}`);
  
  // 检查命名空间一致性
  const missingInZh = enNamespaces.filter(ns => !zhNamespaces.includes(ns));
  const missingInEn = zhNamespaces.filter(ns => !enNamespaces.includes(ns));
  const commonNamespaces = enNamespaces.filter(ns => zhNamespaces.includes(ns));
  
  // 获取每个命名空间的详细结构
  const namespaceDetails = {};
  
  for (const ns of commonNamespaces) {
    const enDir = path.join(enPath, ns);
    const zhDir = path.join(zhPath, ns);
    
    const enFiles = getFilesRecursive(enDir);
    const zhFiles = getFilesRecursive(zhDir);
    
    namespaceDetails[ns] = {
      en: enFiles,
      zh: zhFiles,
      file_count: {
        en: countFiles(enFiles),
        zh: countFiles(zhFiles)
      }
    };
  }
  
  // 为缺失的命名空间添加信息
  for (const ns of missingInZh) {
    const enDir = path.join(enPath, ns);
    namespaceDetails[ns] = {
      en: getFilesRecursive(enDir),
      zh: null,
      file_count: {
        en: countFiles(getFilesRecursive(enDir)),
        zh: 0
      },
      status: 'missing_in_zh'
    };
  }
  
  for (const ns of missingInEn) {
    const zhDir = path.join(zhPath, ns);
    namespaceDetails[ns] = {
      en: null,
      zh: getFilesRecursive(zhDir),
      file_count: {
        en: 0,
        zh: countFiles(getFilesRecursive(zhDir))
      },
      status: 'missing_in_en'
    };
  }
  
  return {
    scan_time: new Date().toISOString(),
    statistics: {
      total_namespaces: {
        en: enNamespaces.length,
        zh: zhNamespaces.length,
        common: commonNamespaces.length
      },
      missing_namespaces: {
        in_zh: missingInZh,
        in_en: missingInEn
      },
      consistency_ratio: commonNamespaces.length / Math.max(enNamespaces.length, zhNamespaces.length)
    },
    namespaces: namespaceDetails,
    all_namespaces: {
      en: enNamespaces,
      zh: zhNamespaces,
      common: commonNamespaces
    }
  };
}

// 递归计算文件数量
function countFiles(obj) {
  let count = 0;
  
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        count += 1; // 这是一个文件
      } else {
        count += countFiles(obj[key]);
      }
    }
  }
  
  return count;
}

// 运行扫描
const scanResult = scanI18nNamespaces();

// 将结果写入YAML文件
const yaml = require('js-yaml');
const yamlContent = yaml.dump(scanResult, {
  indent: 2,
  lineWidth: 120,
  noRefs: true,
  sortKeys: false
});

fs.writeFileSync('/home/jan/work/test/frontend/i18n_namespace_mapping.yaml', yamlContent);

console.log('扫描完成！结果已保存到 i18n_namespace_mapping.yaml');
console.log(`一致性比率: ${(scanResult.statistics.consistency_ratio * 100).toFixed(2)}%`);

if (scanResult.statistics.missing_namespaces.in_zh.length > 0) {
  console.log('中文缺失的命名空间:', scanResult.statistics.missing_namespaces.in_zh.join(', '));
}

if (scanResult.statistics.missing_namespaces.in_en.length > 0) {
  console.log('英文缺失的命名空间:', scanResult.statistics.missing_namespaces.in_en.join(', '));
}