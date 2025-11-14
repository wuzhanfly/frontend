const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to add useTranslation import and hook to files that use t() but don't have it
function fixTranslationErrors() {
  try {
    const output = execSync('cd /home/jan/work/test/frontend && npx tsc --noEmit 2>&1', { encoding: 'utf-8' });
    const lines = output.split('
').filter(line => line.includes("TS2304: Cannot find name 't'"));
    
    const filesToFix = new Set();
    lines.forEach(line => {
      const match = line.match(/^(.*?):/);
      if (match) {
        filesToFix.add(match[1]);
      }
    });
    
    console.log(`Found ${filesToFix.size} files to fix`);
    
    filesToFix.forEach(filePath => {
      try {
        const fullPath = path.join('/home/jan/work/test/frontend', filePath);
        if (fs.existsSync(fullPath)) {
          let content = fs.readFileSync(fullPath, 'utf-8');
          
          // Check if already has useTranslation
          if (content.includes('useTranslation')) {
            console.log(`Skipping ${filePath} - already has useTranslation`);
            return;
          }
          
          // Add import
          if (content.includes('import React')) {
            content = content.replace(
              'import React',
              'import React\nimport { useTranslation } from \'react-i18next\';'
            );
          } else if (content.includes('from \'react\';')) {
            content = content.replace(
              'from \'react\';',
              'from \'react\';\nimport { useTranslation } from \'react-i18next\';'
            );
          } else {
            // Add at the beginning
            content = 'import { useTranslation } from \'react-i18next\';\n' + content;
          }
          
          // Add hook after component declaration
          const patterns = [
            /(const \w+ = \(.*?\) => {)/,
            /(function \w+\(.*?\) {)/
          ];
          
          for (const pattern of patterns) {
            if (pattern.test(content)) {
              content = content.replace(pattern, '$1\n  const { t } = useTranslation();');
              break;
            }
          }
          
          fs.writeFileSync(fullPath, content, 'utf-8');
          console.log(`Fixed ${filePath}`);
        }
      } catch (error) {
        console.error(`Error fixing ${filePath}:`, error.message);
      }
    });
  } catch (error) {
    console.error('Error getting TypeScript errors:', error.message);
  }
}

fixTranslationErrors();