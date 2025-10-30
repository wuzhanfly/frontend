import os
import re
from pathlib import Path

def camel_case(name):
    """Convert snake_case or kebab-case to CamelCase"""
    # Handle both snake_case and kebab-case
    name = name.replace('-', '_')
    return ''.join(word.capitalize() for word in name.split('_'))

def sanitize_component_name(name):
    """Sanitize component name to ensure it's a valid React component name"""
    # Remove any invalid characters and ensure it starts with a letter
    name = re.sub(r'[^a-zA-Z0-9_-]', '', name)
    # Handle special cases like starting with a number
    if name and name[0].isdigit():
        name = 'Icon' + name
    return name

def convert_svg_to_react_component(svg_path, output_path):
    """Convert an SVG file to a React component"""
    # Get the file name without extension
    file_name = os.path.basename(svg_path)
    name_without_ext = os.path.splitext(file_name)[0]
    
    # Sanitize and convert to PascalCase for component name
    sanitized_name = sanitize_component_name(name_without_ext)
    component_name = camel_case(sanitized_name)
    
    # Handle special component names that might conflict with reserved words
    if component_name.lower() in ['class', 'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while']:
        component_name = component_name + 'Icon'
    
    # Read SVG content
    with open(svg_path, 'r') as f:
        svg_content = f.read()
    
    # Parse the SVG to extract attributes and content
    try:
        # Remove XML declaration if present
        svg_content = re.sub(r'<\?xml[^>]*\?>', '', svg_content)
        # Remove any leading/trailing whitespace
        svg_content = svg_content.strip()
        
        # Extract the main SVG tag and its attributes
        svg_match = re.search(r'<svg([^>]*)>(.*)</svg>', svg_content, re.DOTALL)
        if not svg_match:
            print(f"Error: Could not parse SVG in {file_name}")
            return False
        
        svg_attrs = svg_match.group(1)
        svg_body = svg_match.group(2).strip()
        
        # Convert SVG attributes to React props
        # Replace class with className
        svg_attrs = svg_attrs.replace('class=', 'className=')
        
        # Ensure xmlns is present
        if 'xmlns=' not in svg_attrs:
            svg_attrs = svg_attrs.strip() + ' xmlns="http://www.w3.org/2000/svg"'
        
        # Ensure viewBox is present
        if 'viewBox=' not in svg_attrs:
            # Try to extract width and height if present
            width_match = re.search(r'width="([^"]*)"', svg_attrs)
            height_match = re.search(r'height="([^"]*)"', svg_attrs)
            if width_match and height_match:
                width = width_match.group(1)
                height = height_match.group(1)
                svg_attrs = svg_attrs.strip() + f' viewBox="0 0 {width} {height}"'
            else:
                # Default viewBox if not present
                svg_attrs = svg_attrs.strip() + ' viewBox="0 0 24 24"'
        
        # Create the React component content
        component_content = f'''import * as React from 'react';

export default function {component_name}(props: React.SVGProps<SVGSVGElement>) {{
  return (
    <svg
      {svg_attrs.strip()}
      {{ ...props }}
    >
      {svg_body}
    </svg>
  );
}}'''
        
        # Write the component to a .tsx file
        with open(output_path, 'w') as f:
            f.write(component_content)
        
        print(f"Converted {svg_path} to {output_path}")
        return True
        
    except Exception as e:
        print(f"Error converting {svg_path}: {str(e)}")
        return False

def convert_all_svgs_recursive(input_dir, output_base_dir):
    """Convert all SVG files in a directory and its subdirectories to React components"""
    success_count = 0
    error_count = 0
    
    # Walk through all directories and files
    for root, dirs, files in os.walk(input_dir):
        # Skip the components directory if it exists
        if 'components' in dirs:
            dirs.remove('components')
            
        # Get relative path from input_dir
        rel_path = os.path.relpath(root, input_dir)
        
        # Determine output directory
        if rel_path == '.':
            output_dir = output_base_dir
        else:
            output_dir = os.path.join(output_base_dir, rel_path)
        
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        # Process SVG files in current directory
        svg_files = [f for f in files if f.endswith('.svg')]
        
        for svg_file in svg_files:
            svg_path = os.path.join(root, svg_file)
            # Generate output filename (component name)
            name_without_ext = os.path.splitext(svg_file)[0]
            sanitized_name = sanitize_component_name(name_without_ext)
            component_name = camel_case(sanitized_name)
            output_file = os.path.join(output_dir, f'{component_name}.tsx')
            
            if convert_svg_to_react_component(svg_path, output_file):
                success_count += 1
            else:
                error_count += 1
    
    print(f"Conversion complete. Successfully converted: {success_count}, Errors: {error_count}")

if __name__ == "__main__":
    input_directory = "/home/jan/work/test/frontend/icons"
    output_directory = "/home/jan/work/test/frontend/icons-components"
    
    convert_all_svgs_recursive(input_directory, output_directory)