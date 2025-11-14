#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix JSX attribute i18n errors in a file
function fixJSXAttributeErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Fix hint=t('key') to hint={t('key')}
    content = content.replace(/(\w+)=t\('([^']+)'\)/g, '$1={t(\'$2\')}');
    content = content.replace(/(\w+)=t\("([^"]+)"\)/g, '$1={t("$2")}');
    
    // Fix content=t('key') to content={t('key')}
    content = content.replace(/content=t\('([^']+)'\)/g, 'content={t(\'$1\')}');
    content = content.replace(/content=t\("([^"]+)"\)/g, 'content={t("$1")}');
    
    // Fix prevLabel=t('key') to prevLabel={t('key')}
    content = content.replace(/prevLabel=t\('([^']+)'\)/g, 'prevLabel={t(\'$1\')}');
    content = content.replace(/prevLabel=t\("([^"]+)"\)/g, 'prevLabel={t("$1")}');
    
    // Fix nextLabel=t('key') to nextLabel={t('key')}
    content = content.replace(/nextLabel=t\('([^']+)'\)/g, 'nextLabel={t(\'$1\')}');
    content = content.replace(/nextLabel=t\("([^"]+)"\)/g, 'nextLabel={t("$1")}');
    
    // Write the file only if it was changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed JSX attributes in: ${filePath}`);
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
      } else if (stat.isFile() && filePath.endsWith('.tsx')) {
        // Check if file contains the patterns we want to fix
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('=t(') || content.includes('content=t(')) {
          if (fixJSXAttributeErrors(filePath)) {
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
console.log('Starting JSX attribute i18n error fixes...');
const fixedCount = fixAllFiles('.');
console.log(`Fixed JSX attributes in ${fixedCount} files.`);