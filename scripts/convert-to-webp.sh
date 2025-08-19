#!/bin/bash

# Convert Images to WebP Script
# This script converts all PNG and JPEG images in the public/images directory to WebP format
# while preserving the original filenames

echo "🎨 Starting image conversion to WebP format..."
echo "==========================================="

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ Error: cwebp is not installed."
    echo "Please install webp tools first:"
    echo "  Ubuntu/Debian: sudo apt-get install webp"
    echo "  MacOS: brew install webp"
    echo "  Fedora: sudo dnf install libwebp-tools"
    exit 1
fi

# Set the images directory
IMAGES_DIR="/home/ice/dev/whaleofajob/public/images"

# Check if directory exists
if [ ! -d "$IMAGES_DIR" ]; then
    echo "❌ Error: Directory $IMAGES_DIR does not exist"
    exit 1
fi

cd "$IMAGES_DIR" || exit

# Counter for converted files
CONVERTED=0
SKIPPED=0
ERRORS=0

# Function to convert image to WebP
convert_to_webp() {
    local input_file="$1"
    local output_file="${input_file%.*}.webp"
    
    # Skip if WebP already exists
    if [ -f "$output_file" ]; then
        echo "⏭️  Skipping $input_file (WebP already exists)"
        ((SKIPPED++))
        return
    fi
    
    echo "🔄 Converting: $input_file → $output_file"
    
    # Convert with high quality settings
    # -q 85 = quality level (0-100, 85 is good balance)
    # -m 6 = compression method (slowest/best)
    # -mt = multi-threading
    if cwebp -q 85 -m 6 -mt "$input_file" -o "$output_file" 2>/dev/null; then
        echo "✅ Successfully converted: $output_file"
        
        # Show file size comparison
        original_size=$(du -h "$input_file" | cut -f1)
        webp_size=$(du -h "$output_file" | cut -f1)
        echo "   Size: $original_size → $webp_size"
        
        ((CONVERTED++))
    else
        echo "❌ Failed to convert: $input_file"
        ((ERRORS++))
    fi
    echo ""
}

# Process all PNG files
echo "📸 Processing PNG files..."
echo "--------------------------"
for file in *.png; do
    if [ -f "$file" ]; then
        convert_to_webp "$file"
    fi
done

# Process all JPEG/JPG files
echo "📸 Processing JPEG files..."
echo "---------------------------"
for file in *.jpg *.jpeg *.JPG *.JPEG; do
    if [ -f "$file" ]; then
        convert_to_webp "$file"
    fi
done

# Summary
echo "==========================================="
echo "📊 Conversion Summary:"
echo "  ✅ Converted: $CONVERTED files"
echo "  ⏭️  Skipped: $SKIPPED files (already exist)"
echo "  ❌ Errors: $ERRORS files"
echo "==========================================="

# List all WebP files
echo ""
echo "📁 WebP files in directory:"
ls -lh *.webp 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'

echo ""
echo "✨ Conversion complete!"
echo ""
echo "💡 Next steps:"
echo "  1. Update HTML/CSS references from .png/.jpg to .webp"
echo "  2. Consider keeping originals as fallbacks"
echo "  3. Test all images load correctly"
echo "  4. Run: ./scripts/update-image-references.sh (if created)"