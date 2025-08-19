#!/bin/bash

# Update Image References to WebP
# This script updates all HTML files to reference .webp images instead of .png/.jpg

echo "🔄 Updating image references to WebP format..."
echo "=============================================="

# Set the project root
PROJECT_ROOT="/home/ice/dev/whaleofajob"
IMAGES_DIR="$PROJECT_ROOT/public/images"

# Check if directory exists
if [ ! -d "$PROJECT_ROOT" ]; then
    echo "❌ Error: Project directory $PROJECT_ROOT does not exist"
    exit 1
fi

cd "$PROJECT_ROOT" || exit

# Counter for updated files
UPDATED_FILES=0
TOTAL_REPLACEMENTS=0

# Backup directory
BACKUP_DIR="$PROJECT_ROOT/backup_$(date +%Y%m%d_%H%M%S)"

echo "📁 Creating backup at: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Function to update references in a file
update_file() {
    local file="$1"
    local filename=$(basename "$file")
    local backup_file="$BACKUP_DIR/$filename"
    
    # Create backup
    cp "$file" "$backup_file"
    
    # Count replacements before
    local png_count=$(grep -o '\.png' "$file" | wc -l)
    local jpg_count=$(grep -o '\.jpg\|\.jpeg' "$file" | wc -l)
    local total_before=$((png_count + jpg_count))
    
    if [ "$total_before" -eq 0 ]; then
        return
    fi
    
    echo "📝 Processing: $file"
    echo "   Found: $png_count PNG references, $jpg_count JPEG references"
    
    # Create temporary file
    local temp_file="${file}.tmp"
    
    # Replace image extensions with WebP
    # This maintains the exact filename, just changes the extension
    sed -E \
        -e 's/\.png(["\047\s\)])/\.webp\1/g' \
        -e 's/\.jpg(["\047\s\)])/\.webp\1/g' \
        -e 's/\.jpeg(["\047\s\)])/\.webp\1/g' \
        "$file" > "$temp_file"
    
    # Check if file changed
    if ! diff -q "$file" "$temp_file" > /dev/null; then
        mv "$temp_file" "$file"
        echo "   ✅ Updated $total_before image references"
        ((UPDATED_FILES++))
        ((TOTAL_REPLACEMENTS+=total_before))
    else
        rm "$temp_file"
        echo "   ⏭️  No changes needed"
    fi
    echo ""
}

# Update all HTML files
echo "🔍 Finding and updating HTML files..."
echo "--------------------------------------"
for file in $(find . -name "*.html" -not -path "./node_modules/*" -not -path "./backup_*/*" -not -path "./context/*"); do
    update_file "$file"
done

# Update CSS files
echo "🔍 Finding and updating CSS files..."
echo "-------------------------------------"
for file in $(find ./src/styles -name "*.css" 2>/dev/null); do
    update_file "$file"
done

# Update JSX files
echo "🔍 Finding and updating JSX files..."
echo "-------------------------------------"
for file in $(find ./src -name "*.jsx" 2>/dev/null); do
    update_file "$file"
done

# Check for any remaining references
echo "🔍 Checking for any remaining PNG/JPEG references..."
echo "----------------------------------------------------"
REMAINING=$(grep -r --include="*.html" --include="*.css" --include="*.jsx" -E '\.(png|jpg|jpeg)' . 2>/dev/null | grep -v "node_modules" | grep -v "backup_" | grep -v "context" | grep -v ".git" | wc -l)

if [ "$REMAINING" -gt 0 ]; then
    echo "⚠️  Warning: Found $REMAINING remaining PNG/JPEG references:"
    grep -r --include="*.html" --include="*.css" --include="*.jsx" -E '\.(png|jpg|jpeg)' . 2>/dev/null | grep -v "node_modules" | grep -v "backup_" | grep -v "context" | grep -v ".git" | head -10
    echo ""
    echo "These might be in comments, URLs, or special cases that need manual review."
else
    echo "✅ All image references have been updated!"
fi

# Summary
echo ""
echo "=============================================="
echo "📊 Update Summary:"
echo "  📝 Files updated: $UPDATED_FILES"
echo "  🔄 Total references changed: $TOTAL_REPLACEMENTS"
echo "  📁 Backup created at: $BACKUP_DIR"
echo "=============================================="

echo ""
echo "✨ Reference update complete!"
echo ""
echo "💡 Next steps:"
echo "  1. Test the site locally: npm run dev"
echo "  2. Check all images load correctly"
echo "  3. If everything works, you can delete the backup: rm -rf $BACKUP_DIR"
echo "  4. Consider keeping original images as fallbacks with <picture> element"
echo "  5. Commit the changes: git add -A && git commit -m 'feat: convert images to WebP format'"