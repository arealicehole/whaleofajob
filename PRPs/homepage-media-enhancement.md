# PRP: Homepage Media Enhancement - YouTube Video & Visual Improvements

## Goal
Transform the homepage with embedded YouTube video, optimized button layout, and strategic background images while maintaining the retro-neon theme and performance standards.

## Why
- The homepage lacks visual media that showcases Yzagere's work and personality
- Button layout can be improved for better CTA visibility
- Background images will add depth and visual interest without compromising performance
- YouTube video (ID: UJlJ_Ep1fOc) will provide dynamic content and engagement

## What
### User-Visible Behavior
1. **YouTube Video Integration**
   - Embedded video using lite-youtube-embed (no iframe until clicked)
   - Custom WebP poster image (≤200KB)
   - Positioned strategically between hero and services sections
   - Retro-styled video container with neon borders

2. **Button Layout Optimization**
   - Hero buttons arranged in single row (responsive)
   - Service cards potentially reorganized as horizontal strip
   - Clear visual hierarchy for CTAs

3. **Background Images**
   - Subtle background images for key sections
   - Optimized WebP format (≤200KB each)
   - CSS gradient overlays to maintain text readability
   - Parallax or fixed backgrounds for depth

### Technical Requirements
- Vendor lite-youtube-embed CSS/JS (already in /public/assets/vendor/)
- Preconnect links to youtube-nocookie.com and i.ytimg.com
- All images optimized with width/height attributes
- Mobile-first responsive design
- Maintain Lighthouse scores ≥90

## All Needed Context

### Current Homepage Structure
```html
1. Hero Section - Contains 3 buttons in hero__actions div
2. Services Section - 4 service cards in grid
3. Service Areas Section - Lists of cities
4. CTA Section - 2 buttons centered
```

### lite-youtube-embed Setup (from CLAUDE.md)
```html
<link rel="preconnect" href="https://www.youtube-nocookie.com">
<link rel="preconnect" href="https://i.ytimg.com">
<link rel="stylesheet" href="/assets/vendor/lite-yt-embed.css">
<script src="/assets/vendor/lite-yt-embed.js" defer></script>
<lite-youtube videoid="UJlJ_Ep1fOc" params="rel=0&modestbranding=1"
              style="--lite-yt-aspect-ratio:56.25%;background-image:url('/images/hero-poster.webp')">
  <a href="https://youtube.com/watch?v=UJlJ_Ep1fOc" class="lty-playbtn">
    <span class="lyt-visually-hidden">Play intro</span>
  </a>
</lite-youtube>
```

### Button Considerations
- Current hero has 3 buttons: Get Free Estimate, Call, View Service Areas
- Service section has 4 "Learn More" buttons in cards
- Need to clarify which "four buttons" to put in single row
- Maintain BEM class naming: form__button, form__button--secondary, form__button--outline

### Retro Theme Integration
- Neon colors: Pink #FF2D7D, Cyan #16E0BD
- Dark backgrounds: #0D0D0D
- Animated grid backgrounds
- Glow effects on hover
- Orbitron and Space Mono fonts

### Image Requirements
- All images ≤200KB
- WebP format preferred
- Include width/height attributes
- loading="lazy" for offscreen images
- loading="eager" + fetchpriority="high" for LCP image

## Implementation Blueprint

### Step 1: Create Video Section
```html
<!-- After Hero, Before Services -->
<section class="video-showcase" aria-labelledby="video-heading">
  <div class="container">
    <div class="video-showcase__header">
      <h2 id="video-heading" class="video-showcase__title">See Us in Action</h2>
      <p class="video-showcase__subtitle">40+ years of professional service</p>
    </div>
    
    <div class="video-showcase__wrapper">
      <!-- Preconnects in <head> -->
      <lite-youtube videoid="UJlJ_Ep1fOc" params="rel=0&modestbranding=1"
                    style="--lite-yt-aspect-ratio:56.25%;background-image:url('/images/hero-poster.webp')">
        <a href="https://youtube.com/watch?v=UJlJ_Ep1fOc" class="lty-playbtn">
          <span class="lyt-visually-hidden">Play Yzagere Enterprises intro video</span>
        </a>
      </lite-youtube>
    </div>
  </div>
</section>
```

### Step 2: Optimize Button Layout
```css
/* Hero buttons - single row on desktop */
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  justify-content: center;
}

@media (min-width: 768px) {
  .hero__actions {
    flex-wrap: nowrap;
  }
  
  /* Add 4th button if needed */
  .hero__actions .form__button {
    flex: 1;
    min-width: 150px;
  }
}

/* Alternative: Service cards as horizontal strip */
.services__grid--horizontal {
  display: flex;
  overflow-x: auto;
  gap: var(--space-lg);
  padding-bottom: var(--space-md);
}

.services__grid--horizontal .services__item {
  flex: 0 0 250px;
}
```

### Step 3: Add Background Images
```css
/* Hero background with overlay */
.hero {
  position: relative;
  background-image: 
    linear-gradient(135deg, rgba(13,13,13,0.9), rgba(255,45,125,0.1)),
    url('/images/hero-bg.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* Services section with subtle pattern */
.services {
  background-image: 
    linear-gradient(180deg, transparent, rgba(22,224,189,0.05)),
    url('/images/circuit-pattern.webp');
  background-size: 200px;
  background-repeat: repeat;
}

/* Video section styling */
.video-showcase {
  padding: var(--space-4xl) 0;
  background: var(--dark-surface);
  position: relative;
  overflow: hidden;
}

.video-showcase::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--grid-pattern);
  opacity: 0.1;
  animation: grid-move 20s linear infinite;
}

.video-showcase__wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-xl);
  position: relative;
  z-index: 1;
}

/* Custom lite-youtube styling */
lite-youtube {
  border: 2px solid var(--neon-cyan);
  border-radius: var(--radius-lg);
  box-shadow: 0 0 30px rgba(22,224,189,0.3);
  transition: all 0.3s ease;
}

lite-youtube:hover {
  box-shadow: 0 0 50px rgba(255,45,125,0.5);
  transform: scale(1.02);
}
```

### Step 4: Create/Optimize Images
```bash
# Create poster for video (screenshot from video)
# Optimize to WebP ≤200KB
# Create hero background image
# Create subtle pattern for services section
# All images need width/height attributes in HTML
```

## Task List
- [ ] Add preconnect links to index.html head
- [ ] Add lite-youtube CSS/JS links to index.html
- [ ] Create video-showcase section HTML
- [ ] Style video section with retro theme
- [ ] Reorganize hero buttons to single row
- [ ] Decide on service cards layout (grid vs horizontal)
- [ ] Create/source background images
- [ ] Optimize all images to WebP ≤200KB
- [ ] Add background images with CSS overlays
- [ ] Test on mobile devices
- [ ] Verify Lighthouse scores ≥90
- [ ] Test YouTube embed functionality
- [ ] Ensure keyboard navigation works
- [ ] Verify all images have width/height/alt

## Validation Loop

### Level 1: Build & Preview
```bash
npm run build
npm run preview
# Open http://localhost:4173
```

### Level 2: Visual Checks
- [ ] YouTube video loads with poster
- [ ] Video plays on click
- [ ] Buttons display in single row on desktop
- [ ] Background images load correctly
- [ ] Text remains readable over backgrounds
- [ ] Mobile layout works properly

### Level 3: Performance
```bash
# Run Lighthouse on preview
# Check mobile scores:
# - Performance ≥90
# - SEO ≥90
# - Best Practices ≥90
# - Accessibility ≥90

# Verify image sizes
find public/images -name "*.webp" -exec ls -lh {} \;
# All should be ≤200KB
```

### Level 4: Cross-browser
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test on actual mobile device

## Success Criteria
✅ YouTube video embedded with lite-youtube-embed
✅ Custom poster image ≤200KB
✅ Buttons optimized (single row or better layout)
✅ Background images enhance without compromising performance
✅ All Lighthouse scores ≥90
✅ Mobile-first responsive design maintained
✅ Retro-neon theme consistently applied
✅ No console errors
✅ Keyboard navigation preserved