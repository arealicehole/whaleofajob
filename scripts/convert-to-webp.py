#!/usr/bin/env python3

"""
Convert Images to WebP Format
This script converts all PNG and JPEG images to WebP format while preserving filenames
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
    print("✅ PIL/Pillow is installed")
except ImportError:
    print("❌ Error: Pillow is not installed.")
    print("Please install it with: pip install Pillow")
    sys.exit(1)

def convert_to_webp(input_path, quality=85):
    """Convert an image to WebP format"""
    output_path = input_path.with_suffix('.webp')
    
    # Skip if WebP already exists
    if output_path.exists():
        return 'skipped', None
    
    try:
        # Open and convert image
        with Image.open(input_path) as img:
            # Convert RGBA to RGB if necessary (for JPEG compatibility)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create a white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Save as WebP
            img.save(output_path, 'WEBP', quality=quality, method=6)
            
            # Get file sizes
            original_size = input_path.stat().st_size
            webp_size = output_path.stat().st_size
            savings = (1 - webp_size/original_size) * 100
            
            return 'converted', {
                'original_size': original_size,
                'webp_size': webp_size,
                'savings': savings
            }
    except Exception as e:
        return 'error', str(e)

def format_size(bytes):
    """Format bytes to human readable size"""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes < 1024.0:
            return f"{bytes:.1f} {unit}"
        bytes /= 1024.0
    return f"{bytes:.1f} TB"

def main():
    print("🎨 Starting image conversion to WebP format...")
    print("=" * 45)
    
    # Set images directory
    project_root = Path("/home/ice/dev/whaleofajob")
    images_dir = project_root / "public" / "images"
    
    if not images_dir.exists():
        print(f"❌ Error: Directory {images_dir} does not exist")
        sys.exit(1)
    
    # Statistics
    stats = {
        'converted': 0,
        'skipped': 0,
        'errors': 0,
        'total_saved': 0
    }
    
    # Find all PNG and JPEG files
    image_files = list(images_dir.glob("*.png")) + \
                  list(images_dir.glob("*.jpg")) + \
                  list(images_dir.glob("*.jpeg")) + \
                  list(images_dir.glob("*.PNG")) + \
                  list(images_dir.glob("*.JPG")) + \
                  list(images_dir.glob("*.JPEG"))
    
    if not image_files:
        print("No PNG or JPEG files found in the images directory")
        return
    
    print(f"Found {len(image_files)} image files to process\n")
    
    # Process each image
    for img_path in image_files:
        print(f"🔄 Processing: {img_path.name}")
        
        status, data = convert_to_webp(img_path, quality=85)
        
        if status == 'converted':
            stats['converted'] += 1
            stats['total_saved'] += data['original_size'] - data['webp_size']
            print(f"   ✅ Converted successfully")
            print(f"   📊 Size: {format_size(data['original_size'])} → {format_size(data['webp_size'])} ({data['savings']:.1f}% savings)")
        elif status == 'skipped':
            stats['skipped'] += 1
            print(f"   ⏭️  Skipped (WebP already exists)")
        else:  # error
            stats['errors'] += 1
            print(f"   ❌ Error: {data}")
        print()
    
    # Print summary
    print("=" * 45)
    print("📊 Conversion Summary:")
    print(f"  ✅ Converted: {stats['converted']} files")
    print(f"  ⏭️  Skipped: {stats['skipped']} files")
    print(f"  ❌ Errors: {stats['errors']} files")
    if stats['total_saved'] > 0:
        print(f"  💾 Total space saved: {format_size(stats['total_saved'])}")
    print("=" * 45)
    
    # List all WebP files
    webp_files = list(images_dir.glob("*.webp"))
    if webp_files:
        print("\n📁 WebP files in directory:")
        for webp in sorted(webp_files):
            size = format_size(webp.stat().st_size)
            print(f"  {webp.name} ({size})")
    
    print("\n✨ Conversion complete!")
    print("\n💡 Next steps:")
    print("  1. Run: python3 scripts/update-image-references.py")
    print("  2. Test the site: npm run dev")
    print("  3. Commit changes: git add -A && git commit -m 'feat: convert images to WebP'")

if __name__ == "__main__":
    main()