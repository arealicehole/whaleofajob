#!/usr/bin/env python3

"""
Update Image References to WebP
This script updates all HTML, CSS, and JSX files to reference .webp images
"""

import os
import re
import shutil
from pathlib import Path
from datetime import datetime

def create_backup(project_root):
    """Create a backup directory with timestamp"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir = project_root / f"backup_{timestamp}"
    backup_dir.mkdir(exist_ok=True)
    return backup_dir

def update_file_references(file_path, backup_dir):
    """Update image references in a single file"""
    # Read file content
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            original_content = content
    except Exception as e:
        print(f"   ❌ Error reading {file_path}: {e}")
        return 0
    
    # Create backup
    backup_path = backup_dir / file_path.name
    shutil.copy2(file_path, backup_path)
    
    # Count existing references
    png_count = len(re.findall(r'\.png(?=["\'`\s\)])', content))
    jpg_count = len(re.findall(r'\.jpe?g(?=["\'`\s\)])', content, re.IGNORECASE))
    total_refs = png_count + jpg_count
    
    if total_refs == 0:
        return 0
    
    print(f"📝 Processing: {file_path.relative_to(Path.cwd())}")
    print(f"   Found: {png_count} PNG, {jpg_count} JPEG references")
    
    # Replace extensions with .webp
    # Handle .png
    content = re.sub(r'\.png(?=["\'`\s\)])', '.webp', content)
    # Handle .jpg and .jpeg (case insensitive)
    content = re.sub(r'\.jpe?g(?=["\'`\s\)])', '.webp', content, flags=re.IGNORECASE)
    
    # Write updated content if changed
    if content != original_content:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"   ✅ Updated {total_refs} references")
            return total_refs
        except Exception as e:
            print(f"   ❌ Error writing {file_path}: {e}")
            # Restore from backup
            shutil.copy2(backup_path, file_path)
            return 0
    else:
        print(f"   ⏭️  No changes needed")
        return 0

def find_files(project_root, extensions):
    """Find all files with given extensions"""
    files = []
    exclude_dirs = {'node_modules', 'backup_', '.git', 'context', 'dist', 'build'}
    
    for ext in extensions:
        for file_path in project_root.rglob(f"*.{ext}"):
            # Skip excluded directories
            if any(excluded in str(file_path) for excluded in exclude_dirs):
                continue
            files.append(file_path)
    
    return files

def main():
    print("🔄 Updating image references to WebP format...")
    print("=" * 45)
    
    # Set project root
    project_root = Path("/home/ice/dev/whaleofajob")
    
    if not project_root.exists():
        print(f"❌ Error: Project directory {project_root} does not exist")
        return 1
    
    # Change to project directory
    os.chdir(project_root)
    
    # Create backup directory
    backup_dir = create_backup(project_root)
    print(f"📁 Creating backup at: {backup_dir.name}\n")
    
    # Statistics
    stats = {
        'files_updated': 0,
        'total_refs': 0
    }
    
    # Find and update HTML files
    print("🔍 Updating HTML files...")
    print("-" * 30)
    html_files = find_files(project_root, ['html', 'htm'])
    for file_path in html_files:
        refs = update_file_references(file_path, backup_dir)
        if refs > 0:
            stats['files_updated'] += 1
            stats['total_refs'] += refs
    
    # Find and update CSS files
    print("\n🔍 Updating CSS files...")
    print("-" * 30)
    css_files = find_files(project_root / "src" / "styles", ['css'])
    for file_path in css_files:
        refs = update_file_references(file_path, backup_dir)
        if refs > 0:
            stats['files_updated'] += 1
            stats['total_refs'] += refs
    
    # Find and update JSX files
    print("\n🔍 Updating JSX files...")
    print("-" * 30)
    jsx_files = find_files(project_root / "src", ['jsx', 'js'])
    for file_path in jsx_files:
        refs = update_file_references(file_path, backup_dir)
        if refs > 0:
            stats['files_updated'] += 1
            stats['total_refs'] += refs
    
    # Check for remaining references
    print("\n🔍 Checking for remaining PNG/JPEG references...")
    print("-" * 45)
    
    remaining = []
    all_files = html_files + css_files + jsx_files
    
    for file_path in all_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                if re.search(r'\.(png|jpe?g)', content, re.IGNORECASE):
                    # Check if these are actual image references or just in comments/URLs
                    lines = content.split('\n')
                    for i, line in enumerate(lines, 1):
                        if re.search(r'\.(png|jpe?g)(?=["\'`\s\)])', line, re.IGNORECASE):
                            remaining.append(f"{file_path.relative_to(project_root)}:{i}")
        except:
            pass
    
    if remaining:
        print(f"⚠️  Found {len(remaining)} lines with remaining PNG/JPEG references:")
        for ref in remaining[:10]:  # Show first 10
            print(f"   {ref}")
        if len(remaining) > 10:
            print(f"   ... and {len(remaining) - 10} more")
        print("\nThese might be in comments, external URLs, or need manual review.")
    else:
        print("✅ All image references have been updated!")
    
    # Print summary
    print("\n" + "=" * 45)
    print("📊 Update Summary:")
    print(f"  📝 Files updated: {stats['files_updated']}")
    print(f"  🔄 Total references changed: {stats['total_refs']}")
    print(f"  📁 Backup created at: {backup_dir.name}")
    print("=" * 45)
    
    print("\n✨ Reference update complete!")
    print("\n💡 Next steps:")
    print("  1. Test the site: npm run dev")
    print("  2. Verify all images load correctly")
    print(f"  3. If everything works, delete backup: rm -rf {backup_dir.name}")
    print("  4. Commit changes: git add -A && git commit -m 'feat: convert images to WebP'")

if __name__ == "__main__":
    main()