#!/bin/bash

# 国际化文本替换工具使用示例脚本

echo "=== 国际化文本替换工具使用示例 ==="

# 1. 查看提取的国际化内容
echo "1. 查看提取的国际化内容示例:"
head -10 /home/jan/work/test/frontend/tools/i18n/extracted/common.json

echo ""
echo "=== 使用方法 ==="

# 2. 使用简化版脚本处理单个文件
echo "2. 使用简化版脚本处理单个文件:"
echo "   node /home/jan/work/test/frontend/tools/i18n/replace-with-keys-simple.js ./tools/i18n/extracted ./ui/shared/I18nExample.tsx"

# 3. 使用完整版脚本处理整个目录
echo ""
echo "3. 使用完整版脚本处理整个目录:"
echo "   node /home/jan/work/test/frontend/tools/i18n/replace-with-keys.js ./tools/i18n/extracted ./ui"

echo ""
echo "=== 脚本功能说明 ==="
echo "1. replace-with-keys-simple.js - 简化版脚本，处理单个文件"
echo "2. replace-with-keys.js - 完整版脚本，处理整个目录"
echo ""
echo "脚本会:"
echo "- 读取提取的国际化内容，生成文本到键的映射"
echo "- 在目标文件中查找匹配的文本"
echo "- 将文本替换为 {t('key')} 格式"
echo "- 自动添加国际化导入和 useTranslation 钩子"