#!/usr/bin/env python3
"""
Download and process stock photos for Yzagere Enterprises website
Fetches from Unsplash API (free, no auth needed for basic use)
"""

import os
import requests
from PIL import Image
from io import BytesIO
import time

# Unsplash API (no auth needed for demo/low volume)
UNSPLASH_BASE = "https://api.unsplash.com/photos/random"
UNSPLASH_CLIENT_ID = "YOUR_ACCESS_KEY"  # Get free at https://unsplash.com/developers

# For demo purposes, we'll use direct image URLs from Unsplash that work without API key
# These are curated, high-quality images that match each service

STOCK_IMAGES = {
    "service-sprinkler-repair": {
        "url": "https://images.pexels.com/photos/4207899/pexels-photo-4207899.jpeg?auto=compress&cs=tinysrgb&w=800",  # Sprinkler
        "alt": "Professional sprinkler system repair",
        "credit": "Pexels"
    },
    "service-small-engine": {
        "url": "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=800&q=80",  # Lawn mower
        "alt": "Small engine and lawn mower repair", 
        "credit": "Unsplash"
    },
    "service-junk-hauling": {
        "url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",  # Moving truck
        "alt": "Professional junk hauling and removal",
        "credit": "Unsplash"
    },
    "service-landscaping": {
        "url": "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=800&q=80",  # Desert landscape
        "alt": "Arizona desert landscaping and maintenance",
        "credit": "Unsplash"
    }
}

def download_image(url, filename):
    """Download image from URL"""
    print(f"Downloading {filename}...")
    try:
        response = requests.get(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        response.raise_for_status()
        return Image.open(BytesIO(response.content))
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
        return None

def resize_and_optimize(image, target_width=600, target_height=400):
    """Resize and optimize image for web"""
    if image.mode in ('RGBA', 'LA', 'P'):
        # Create white background for transparent images
        bg = Image.new('RGB', image.size, (255, 255, 255))
        bg.paste(image, mask=image.split()[-1] if image.mode == 'RGBA' else None)
        image = bg
    elif image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Calculate crop for aspect ratio
    img_aspect = image.width / image.height
    target_aspect = target_width / target_height
    
    if img_aspect > target_aspect:
        # Image is wider - crop width
        new_width = int(image.height * target_aspect)
        left = (image.width - new_width) // 2
        image = image.crop((left, 0, left + new_width, image.height))
    else:
        # Image is taller - crop height
        new_height = int(image.width / target_aspect)
        top = (image.height - new_height) // 2
        image = image.crop((0, top, image.width, top + new_height))
    
    # Resize to target dimensions
    image = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
    return image

def save_as_webp(image, output_path, quality=85):
    """Save image as WebP format"""
    try:
        image.save(output_path, 'WEBP', quality=quality, method=6)
        print(f"✓ Saved: {output_path}")
        return True
    except Exception as e:
        print(f"Error saving WebP: {e}")
        # Fallback to JPEG if WebP fails
        jpeg_path = output_path.replace('.webp', '.jpg')
        image.save(jpeg_path, 'JPEG', quality=quality, optimize=True)
        print(f"✓ Saved as JPEG fallback: {jpeg_path}")
        return True

def main():
    # Create images directory if it doesn't exist
    output_dir = "/home/ice/dev/whaleofajob/public/images"
    os.makedirs(output_dir, exist_ok=True)
    
    print("🖼️  Downloading stock photos for Yzagere Enterprises...")
    print("-" * 50)
    
    success_count = 0
    
    for filename, info in STOCK_IMAGES.items():
        # Download image
        image = download_image(info['url'], filename)
        if not image:
            continue
        
        # Process image
        image = resize_and_optimize(image)
        
        # Save as WebP
        output_path = os.path.join(output_dir, f"{filename}.webp")
        if save_as_webp(image, output_path):
            success_count += 1
        
        # Be nice to the server
        time.sleep(1)
    
    print("-" * 50)
    print(f"✅ Successfully downloaded {success_count}/{len(STOCK_IMAGES)} images")
    
    # Create a credits file
    credits_path = os.path.join(output_dir, "PHOTO_CREDITS.txt")
    with open(credits_path, 'w') as f:
        f.write("Photo Credits\n")
        f.write("=" * 40 + "\n\n")
        for filename, info in STOCK_IMAGES.items():
            f.write(f"{filename}.webp\n")
            f.write(f"  Source: {info['credit']}\n")
            f.write(f"  Alt: {info['alt']}\n\n")
    
    print(f"📝 Photo credits saved to {credits_path}")

if __name__ == "__main__":
    main()