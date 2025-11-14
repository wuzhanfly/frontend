#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix i18n errors in a file
function fixI18nErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Check if it's a test file
    const isTestFile = filePath.endsWith('.test.ts') || filePath.endsWith('.test.tsx') || filePath.endsWith('.pw.tsx');
    
    // For test files, we replace {t('key')} with the key itself
    if (isTestFile) {
      // Replace {t('key')} with 'key'
      content = content.replace(/\{t\('([^']+)\'\)\}/g, "'$1'");
      content = content.replace(/\{t\("([^"]+)"\)\}/g, '"$1"');
    } else {
      // For regular files, we replace {t('key')} with t('key')
      // But be careful with JSX attributes - they need to be wrapped in {}
      content = content.replace(/(\w+=)["']{t\('([^']+)\'\)}["']/g, '$1{t(\'$2\')}');
      content = content.replace(/(\w+=)["']{t\("([^"]+)"\)}/g, '$1{t("$2")}');
      
      // Replace standalone {t('key')} with t('key') in expressions
      content = content.replace(/\{t\('([^']+)\'\)\}/g, "t('$1')");
      content = content.replace(/\{t\("([^"]+)"\)}/g, 't("$1")');
      
      // If the file uses t() function but doesn't import useTranslation, add the import
      if (content.includes('t(') && !content.includes('useTranslation')) {
        // Check if it's a React component file
        if ((content.includes('import React') || content.includes('import {') && content.includes('} from \'react\'')) && 
            (content.includes('export default') || content.includes('const ') || content.includes('function '))) {
          // Add useTranslation import if not already present
          if (!content.includes('useTranslation')) {
            content = content.replace(
              /(import\s+[^;]+from\s+['"]react["'](?:\s*;)?)/, 
              `$1\nimport { useTranslation } from 'react-i18next';`
            );
          }
          
          // Add const { t } = useTranslation(); after the component declaration
          // But only if it's not already there
          if (!content.includes('const { t } = useTranslation()')) {
            content = content.replace(
              /(const\s+[A-Za-z0-9_]+\s*=\s*\([^)]*\)\s*=>\s*{)/g, 
              `$1\n  const { t } = useTranslation();`
            );
            
            // For function components with different syntax
            content = content.replace(
              /(function\s+[A-Za-z0-9_]+\([^)]*\)\s*{)/g, 
              `$1\n  const { t } = useTranslation();`
            );
          }
        }
      }
    }
    
    // Write the file only if it was changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively find and fix files
function fixAllFiles(dir) {
  let fixedCount = 0;
  
  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      
      // Skip node_modules and other unnecessary directories
      if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.next' || file === 'build') {
        continue;
      }
      
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walk(filePath);
      } else if (stat.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts'))) {
        // Check if file contains the pattern we want to fix
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('{t(')) {
          if (fixI18nErrors(filePath)) {
            fixedCount++;
          }
        }
      }
    }
  }
  
  walk(dir);
  return fixedCount;
}

// Run the fix
console.log('Starting i18n error fixes...');
const fixedCount = fixAllFiles('.');
console.log(`Fixed ${fixedCount} files.`);
