# PRP: CSS Standardization - Align All Pages with Homepage Styling

## Task Metadata
- **Type**: Task PRP
- **Scope**: Medium
- **Priority**: High
- **Dependencies**: Homepage styling (already complete)
- **Created**: 2025-01-18
- **Status**: Ready for Execution

## 1. Goal
Standardize CSS implementation across all pages to match the homepage's retro-neon theme while maintaining performance and accessibility standards. **Each page retains its unique content structure and layout - we're standardizing the visual theme, not creating clones.**

## 2. Why This Matters
- **Consistency**: Users expect consistent visual experience across all pages
- **Brand Identity**: The retro-neon theme is part of Yzagere's unique brand identity
- **User Experience**: Inconsistent styling creates confusion and reduces trust
- **Maintenance**: Standardized CSS reduces technical debt and simplifies future updates

## 3. Current State Analysis

### Homepage (Properly Styled)
```html
<!-- Homepage CSS imports -->
<link rel="stylesheet" href="/src/styles/tokens.css">
<link rel="stylesheet" href="/src/styles/base.css">
<link rel="stylesheet" href="/src/styles/components.css">
<link rel="stylesheet" href="/src/styles/retro-theme.css">  <!-- KEY: Retro theme -->
<link rel="stylesheet" href="/assets/vendor/lite-yt-embed.css">
<!-- Google Fonts for Retro Theme -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### Service Pages (Missing Styling)
```html
<!-- Current service page CSS (incomplete) -->
<link rel="stylesheet" href="/src/styles/tokens.css">
<link rel="stylesheet" href="/src/styles/base.css">
<link rel="stylesheet" href="/src/styles/components.css">
<!-- MISSING: retro-theme.css -->
<!-- MISSING: Google Fonts -->
<!-- MISSING: lite-yt-embed.css (if videos needed) -->
```

### CSS Architecture Overview
1. **tokens.css**: Design system variables (colors, spacing, typography)
2. **base.css**: Reset and foundational styles
3. **components.css**: BEM component styles
4. **retro-theme.css**: Neon/80s theme overrides and animations
5. **lite-yt-embed.css**: YouTube embed component (vendored)

## 4. Implementation Requirements

### Pages Requiring Updates
1. `/sprinkler-repair/index.html`
2. `/small-engine-repair/index.html`
3. `/junk-hauling/index.html`
4. `/service-areas/index.html`
5. `/about/index.html`
6. `/contact/index.html`

### Critical Elements to Standardize

#### A. CSS Import Order (Must Match Homepage)
```html
<!-- Preconnects for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- CSS imports in correct order -->
<link rel="stylesheet" href="/src/styles/tokens.css">
<link rel="stylesheet" href="/src/styles/base.css">
<link rel="stylesheet" href="/src/styles/components.css">
<link rel="stylesheet" href="/src/styles/retro-theme.css">

<!-- Google Fonts for Retro Theme -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

#### B. Retro Theme Key Features
- **Dark background**: `var(--dark-bg)` (#000000)
- **Neon colors**: Pink (#FF2D7D), Cyan (#16E0BD)
- **Typography**: Orbitron + Space Mono fonts
- **Grid animation**: Animated background grid effect
- **Glow effects**: Text shadows and neon flickers
- **Gradient titles**: Using `-webkit-background-clip`

#### C. Component Class Structure (BEM)
```html
<!-- Navigation -->
<nav class="nav">
  <div class="container nav__container">
    <a href="/" class="nav__logo">Yzagere</a>
    <ul class="nav__list">
      <li class="nav__item">
        <a href="/sprinkler-repair/" class="nav__link">Sprinkler Repair</a>
      </li>
    </ul>
  </div>
</nav>

<!-- Hero Section -->
<section class="hero">
  <div class="container hero__content">
    <h1 class="hero__title">
      <span>Service Name</span>
      <span class="hero__title--highlight">Highlight Text</span>
    </h1>
    <p class="hero__text">Description text</p>
    <div class="hero__actions">
      <a href="/contact/" class="button button--primary">Get Quote</a>
      <a href="tel:+16239310846" class="button button--secondary">Call Now</a>
    </div>
  </div>
</section>

<!-- Service Cards -->
<section class="services">
  <div class="container">
    <div class="service-grid">
      <article class="service-card">
        <h3 class="service-card__title">Service Title</h3>
        <p class="service-card__text">Description</p>
        <ul class="service-card__features">
          <li class="service-card__feature">Feature 1</li>
        </ul>
      </article>
    </div>
  </div>
</section>
```

## 5. Implementation Blueprint

### Phase 1: Update CSS Imports (All Pages)
```javascript
// For each page file:
const pagesToUpdate = [
  'sprinkler-repair/index.html',
  'small-engine-repair/index.html',
  'junk-hauling/index.html',
  'service-areas/index.html',
  'about/index.html',
  'contact/index.html'
];

// Update pattern:
// 1. Add font preconnects after meta tags
// 2. Add retro-theme.css after components.css
// 3. Add Google Fonts link
// 4. Remove any conflicting inline styles
```

### Phase 2: Update HTML Structure
```javascript
// Ensure each page has:
// 1. Proper navigation with .nav classes
// 2. Hero section with retro styling
// 3. Service content in proper BEM structure
// 4. Footer with consistent styling
```

### Phase 3: Page-Specific Adjustments
```javascript
// Contact page: Ensure form has proper retro styling
// Service pages: Add service-specific hero content
// About page: Apply team/history section styling
// Service areas: Style city list with neon accents
```

## 5A. Page-Specific Content Structures (Preserved)

### Each Page Maintains Its Unique Layout:

#### Sprinkler Repair Page
- Hero: "Call us the Sprinkler Doctors!"
- Service grid: Valve repair, timer programming, leak detection
- Emergency services callout section
- Testimonial section specific to sprinkler work

#### Small Engine Repair Page  
- Hero: "Your Local Mower & Equipment Experts"
- Equipment types grid: Mowers, blowers, trimmers, etc.
- Brands we service section
- Seasonal maintenance tips

#### Junk Hauling Page
- Hero: "Single Item to Full Cleanouts"
- Service types: Single items, estate cleanouts, construction debris
- Pricing structure section
- Eco-friendly disposal commitment

#### Service Areas Page
- Hero: "Serving the Entire West Valley"
- Interactive city list with service details
- Map integration (if applicable)
- Response time by area

#### About Page
- Hero: "Family-Owned Since 1983"
- Company history timeline
- Team member cards
- Community involvement section

#### Contact Page
- Hero: "Get Your Free Estimate"
- React ContactForm component
- Business hours display
- Multiple contact methods

## 6. Validation Checklist

### Pre-Implementation Checks
- [ ] Backup current page versions
- [ ] Document any page-specific custom styles
- [ ] Verify all CSS files exist and load

### During Implementation
- [ ] Add font preconnects to all pages
- [ ] Add retro-theme.css to all pages
- [ ] Add Google Fonts to all pages
- [ ] Update navigation HTML structure
- [ ] Update hero sections with proper classes
- [ ] Apply BEM classes to all components
- [ ] Remove conflicting inline styles
- [ ] Test responsive behavior

### Post-Implementation Validation
- [ ] Visual consistency check across all pages
- [ ] Dark theme properly applied
- [ ] Neon colors and glow effects working
- [ ] Grid animation visible
- [ ] Typography using correct fonts
- [ ] Mobile responsiveness maintained
- [ ] No console errors
- [ ] Lighthouse scores still ≥90

## 7. Validation Commands

```bash
# Build check
npm run build

# Preview site locally
npm run preview
# Open http://localhost:4173 and check all pages

# Check for CSS loading errors
# In browser console on each page:
Array.from(document.styleSheets).forEach(sheet => {
  console.log(sheet.href, sheet.cssRules ? 'Loaded' : 'Failed');
});

# Performance validation
# Run Lighthouse on each page (mobile mode)
# Target: Performance ≥90, Accessibility ≥90

# Visual regression check
# Manually compare each page to homepage styling
```

## 8. Common Gotchas & Solutions

### Issue 1: Font Flash (FOUT)
**Solution**: Preconnect tags must come before CSS imports

### Issue 2: Grid Animation Performance
**Solution**: Use CSS transforms, not position changes

### Issue 3: Retro Theme Overriding Base Styles
**Solution**: This is intentional - retro-theme.css should override

### Issue 4: Mobile Menu Not Working
**Solution**: Ensure nav toggle JavaScript is included via mount.jsx

### Issue 5: Dark Background on Forms
**Solution**: Add specific form field background overrides in retro-theme.css

## 9. Rollback Plan
If issues arise:
1. Git revert the commit
2. Remove retro-theme.css imports
3. Pages will fall back to base styling
4. Debug and fix issues before re-applying

## 10. Success Criteria
- ✅ All 6 service pages match homepage **visual theme** (colors, fonts, effects)
- ✅ Each page maintains its **unique content and layout**
- ✅ Retro-neon theme consistently applied
- ✅ No broken layouts or missing styles
- ✅ Lighthouse scores maintained (≥90)
- ✅ Mobile responsiveness preserved
- ✅ No console errors
- ✅ Grid animation working on all pages
- ✅ Consistent navigation behavior

## 11. Testing Matrix

| Page | Desktop Chrome | Mobile Safari | Lighthouse | Accessibility |
|------|---------------|---------------|------------|---------------|
| Homepage | ✓ Reference | ✓ Reference | ≥90 | WCAG AA |
| Sprinkler | Must Match | Must Match | ≥90 | WCAG AA |
| Small Engine | Must Match | Must Match | ≥90 | WCAG AA |
| Junk Hauling | Must Match | Must Match | ≥90 | WCAG AA |
| Service Areas | Must Match | Must Match | ≥90 | WCAG AA |
| About | Must Match | Must Match | ≥90 | WCAG AA |
| Contact | Must Match | Must Match | ≥90 | WCAG AA |

## 12. Post-Implementation Tasks
1. Clear browser cache and test
2. Test on actual mobile devices
3. Verify SEO meta tags still work
4. Check social media preview cards
5. Document any custom per-page styles needed

---

**Ready for Execution**: This PRP contains all context needed to standardize CSS across the site. The homepage is the source of truth for styling.