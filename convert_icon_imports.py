#!/usr/bin/env python3
"""
将 icons-components 组件的导入形式更改为 icons SVG 导入形式
例如: ArrowIcon from 'icons-components/arrows/EastMini' 
改成: ArrowIcon from 'icons/arrows/east-mini.svg'
"""

import os
import re
import sys
from pathlib import Path

def convert_pascal_to_kebab(name):
    """将 PascalCase 转换为 kebab-case"""
    # 在大写字母前插入连字符，然后转为小写
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', name)
    s2 = re.sub('([a-z0-9])([A-Z])', r'\1-\2', s1)
    return s2.lower()

def find_icon_imports(file_path):
    """查找文件中的 icons-components 导入"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 匹配 import ... from 'icons-components/...'
        pattern = r"import\s+([^;]+?)\s+from\s+['\"]icons-components/([^'\"]+)['\"]"
        matches = re.findall(pattern, content)
        
        return content, matches
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None, []

def convert_import_path(icon_components_path):
    """将 icons-components 路径转换为 icons SVG 路径"""
    # 移除 .tsx 扩展名
    path_without_ext = icon_components_path.replace('.tsx', '')
    
    # 分割路径
    parts = path_without_ext.split('/')
    
    # 处理子目录和根级别组件
    if len(parts) >= 2:
        category = parts[0]
        component_name = parts[1]
        
        # 将 PascalCase 转换为 kebab-case
        svg_filename = convert_pascal_to_kebab(component_name) + '.svg'
        
        # 构建新的 SVG 路径
        svg_path = f"icons/{category}/{svg_filename}"
        
        return svg_path
    elif len(parts) == 1:
        # 处理根级别组件（如 Close, InfoFilled 等）
        component_name = parts[0]
        svg_filename = convert_pascal_to_kebab(component_name) + '.svg'
        
        # 检查是否有对应的 SVG 文件
        return f"icons/{svg_filename}"
    
    return icon_components_path

def process_file(file_path):
    """处理单个文件"""
    content, imports = find_icon_imports(file_path)
    
    if not content or not imports:
        return False, 0
    
    changes_made = 0
    new_content = content
    
    for import_names, icon_path in imports:
        # 转换路径
        svg_path = convert_import_path(icon_path)
        
        if svg_path != icon_path:
            # 替换导入语句
            old_pattern = f"from ['\"]icons-components/{icon_path}['\"]"
            new_pattern = f"from '@{svg_path}'"
            new_content = re.sub(old_pattern, new_pattern, new_content)
            changes_made += 1
            
            print(f"  {icon_path} -> {svg_path}")
    
    if changes_made > 0:
        # 写回文件
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True, changes_made
        except Exception as e:
            print(f"Error writing {file_path}: {e}")
            return False, 0
    
    return False, 0

def scan_directory(root_dir):
    """扫描目录中的所有 TypeScript/JavaScript 文件"""
    files_to_process = []
    
    for root, dirs, files in os.walk(root_dir):
        # 跳过 node_modules 和 .git
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
        
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                file_path = os.path.join(root, file)
                files_to_process.append(file_path)
    
    return files_to_process

def main():
    if len(sys.argv) > 1:
        target_dir = sys.argv[1]
    else:
        target_dir = '.'  # 默认当前目录
    
    if not os.path.isdir(target_dir):
        print(f"错误: 目录 '{target_dir}' 不存在")
        sys.exit(1)
    
    print(f"扫描目录: {target_dir}")
    print("查找并替换 icons-components 导入...")
    
    files_to_process = scan_directory(target_dir)
    total_files = len(files_to_process)
    processed_files = 0
    total_changes = 0
    
    for file_path in files_to_process:
        changed, changes = process_file(file_path)
        if changed:
            processed_files += 1
            total_changes += changes
            print(f"✓ 更新文件: {file_path} ({changes} 处更改)")
    
    print(f"\n完成!")
    print(f"扫描文件: {total_files}")
    print(f"更新文件: {processed_files}")
    print(f"总更改数: {total_changes}")

if __name__ == "__main__":
    main()