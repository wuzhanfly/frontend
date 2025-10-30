import os
import re
from xml.etree import ElementTree as ET

def camel_case(name):
    """Convert snake_case to CamelCase"""
    return ''.join(word.capitalize() for word in name.split('_'))

def convert_svg_to_react_component(svg_path, output_dir):
    """Convert an SVG file to a React component"""
    # Get the file name without extension
    file_name = os.path.basename(svg_path)
    name_without_ext = os.path.splitext(file_name)[0]
    
    # Convert to PascalCase for component name
    component_name = camel_case(name_without_ext)
    
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
            return
        
        svg_attrs = svg_match.group(1)
        svg_body = svg_match.group(2).strip()
        
        # Convert SVG attributes to React props
        # Replace class with className
        svg_attrs = svg_attrs.replace('class=', 'className=')
        # Add default fill="none" if not present (based on CloseIcon example)
        if 'fill=' not in svg_attrs and 'fill=' not in svg_body:
            if 'fill=' not in svg_attrs:
                svg_attrs = svg_attrs.strip() + ' fill="none"'
        
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
        output_file = os.path.join(output_dir, f'{component_name}.tsx')
        with open(output_file, 'w') as f:
            f.write(component_content)
        
        print(f"Converted {file_name} to {component_name}.tsx")
        
    except Exception as e:
        print(f"Error converting {file_name}: {str(e)}")

def convert_all_svgs(input_dir, output_dir):
    """Convert all SVG files in a directory to React components"""
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Find all SVG files
    svg_files = [f for f in os.listdir(input_dir) if f.endswith('.svg')]
    
    print(f"Found {len(svg_files)} SVG files to convert")
    
    # Convert each SVG file
    for svg_file in svg_files:
        svg_path = os.path.join(input_dir, svg_file)
        convert_svg_to_react_component(svg_path, output_dir)
    
    print(f"Conversion complete. Check {output_dir} for React components.")

if __name__ == "__main__":
    input_directory = "/home/jan/work/test/frontend/icons"
    output_directory = "/home/jan/work/test/frontend/icons/components"
    
    convert_all_svgs(input_directory, output_directory)