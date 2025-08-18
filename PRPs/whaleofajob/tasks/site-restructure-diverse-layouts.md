# PRP: Site Restructure - Consolidate to 4 Pages with Diverse Layouts

## Task Metadata
- **Type**: Task PRP
- **Scope**: Large (Site Architecture Change)
- **Priority**: High
- **Dependencies**: Current site structure, retro theme
- **Created**: 2025-01-18
- **Status**: Ready for Execution

## 1. Goal
Consolidate the site from 7 pages to 4 pages, creating **unique, diverse layouts** for each page while maintaining the retro-neon theme. Move away from the repetitive "box-heavy" design pattern that makes every page look identical.

## 2. Problem Statement

### Current Issues:
- **Too many pages** (7) with similar content
- **Repetitive structure**: Every page follows same pattern:
  - Hero section
  - 3 black background boxes
  - White background boxes
  - More black/white alternating boxes
  - Pink CTA at bottom
- **"Box fatigue"**: Everything is in boxes, creating monotony
- **No visual hierarchy**: All pages have equal weight/importance
- **Lost uniqueness**: Each service page looks identical

### User Feedback:
> "It's just too much... too many boxes... everything's the same"

## 3. New Site Architecture

### From 7 Pages → To 4 Pages:
```
OLD STRUCTURE (7 pages):          NEW STRUCTURE (4 pages):
├── Home                     →    ├── Home (dynamic, hero-focused)
├── Sprinkler Repair        →    ├── Services (unified, clean grid)
├── Small Engine Repair     →    ├── About (story-driven, unique)
├── Junk Hauling           →    └── Contact (minimal, form-focused)
├── Service Areas          ↗
├── About                  →
└── Contact                →
```

## 4. Unique Layout Strategy for Each Page

### 🏠 HOME PAGE (Keep Current)
**Purpose**: First impression, brand showcase
**Layout**: Dynamic hero with video, service highlights
**Keep**: Current design works well - it's the template for the THEME, not the layout

### 🔧 SERVICES PAGE (New Unified Page)
**Purpose**: Showcase all services in one place
**Layout Concept**: "Service Showcase" - NOT boxes!

```
[Retro Hero - Brief, punchy]
"We Fix It All"

[Service Tabs or Accordion - Interactive]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ SPRINKLER REPAIR │ SMALL ENGINE │ JUNK HAULING │
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Active tab content flows naturally, no boxes]
• Valve repair & replacement
• Timer programming  
• Leak detection
• Emergency service
[Real photo of sprinkler work]

[Service Areas Map Section]
Interactive or visual map showing coverage

[Single Strong CTA]
"Get Your Free Estimate" → Contact
```

**Unique Elements**:
- Tabbed interface (not boxes)
- Flowing content (not grid)
- One service area map (not repeated lists)
- Photography over icons

### 👥 ABOUT PAGE (Reimagined)
**Purpose**: Build trust, show personality
**Layout Concept**: "Our Story" - Timeline/Journey style

```
[Minimal Hero]
"Family Owned Since 1983"

[Timeline Design - Vertical Flow]
1983 ─── Started with one truck
  │
1995 ─── Expanded to full West Valley
  │
2010 ─── Added small engine repair
  │
TODAY ── 3rd generation, same values

[Team Section - Asymmetric Layout]
Large photo left, text right (or vice versa)
No boxes, just clean typography

[Values - Typography Focus]
Big, bold statements, no containers:
HONEST PRICING
QUALITY WORK
FAMILY VALUES

[Simple CTA]
"Work with us" → Contact
```

**Unique Elements**:
- Timeline visualization
- Asymmetric layouts
- Typography as design element
- Minimal containers

### 📞 CONTACT PAGE (Simplified)
**Purpose**: Make contact easy
**Layout Concept**: "Direct Connection" - Form-first

```
[No Hero - Straight to Business]

[Split Screen Layout]
LEFT:                    RIGHT:
Contact Form             Business Info
(React Component)        Hours: Mon-Fri 5am-5pm
                        Phone: (623) 931-0846
                        Email: yzagere.enterprises@
                        
                        [Small Map]
                        5314 W Glendale Ave

[Bottom: Trust Signals]
✓ Free Estimates  ✓ Same Day Service  ✓ Licensed & Insured
```

**Unique Elements**:
- No hero section (unique!)
- Split-screen layout
- Form prominence
- Minimal decoration

## 5. Design Principles for Diversity

### Keep Consistent (Theme):
- Retro colors (neon pink/cyan)
- Dark backgrounds with grid
- Orbitron & Space Mono fonts
- Glow effects

### Make Diverse (Layouts):
- **Home**: Hero-heavy, dynamic
- **Services**: Tab/accordion interaction
- **About**: Timeline/story flow
- **Contact**: Split-screen minimal

### Reduce Box Usage:
- Use typography as design
- Embrace white space
- Try overlapping elements
- Use borders/lines instead of containers
- Let content breathe

## 6. Technical Implementation Plan

### Phase 1: Backup & Branch
```bash
git checkout -b feature/site-restructure
cp -r sprinkler-repair archive/
cp -r small-engine-repair archive/
cp -r junk-hauling archive/
cp -r service-areas archive/
```

### Phase 2: Create Services Page
```javascript
// services/index.html
// Combine content from 3 service pages
// Implement tab/accordion system
// Can use vanilla JS or React component
```

### Phase 3: Redesign About Page
```javascript
// about/index.html
// Remove all card/box classes
// Implement timeline design
// Use CSS Grid/Flexbox for asymmetry
```

### Phase 4: Simplify Contact Page
```javascript
// contact/index.html
// Remove hero section
// Implement split-screen layout
// Keep ContactForm React component
```

### Phase 5: Update Navigation
```javascript
// All pages: Update nav to 4 items
// Home | Services | About | Contact
```

### Phase 6: Update Vite Config
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        contact: resolve(__dirname, 'contact/index.html')
      }
    }
  }
});
```

### Phase 7: Remove Old Pages
```bash
# After verification
rm -rf sprinkler-repair/
rm -rf small-engine-repair/
rm -rf junk-hauling/
rm -rf service-areas/
```

## 7. CSS Modifications Needed

### New Utility Classes:
```css
/* Timeline styles */
.timeline { ... }
.timeline__item { ... }
.timeline__date { ... }

/* Tab system */
.tabs { ... }
.tabs__nav { ... }
.tabs__content { ... }

/* Split layout */
.split-layout { ... }
.split-layout__left { ... }
.split-layout__right { ... }

/* Typography utilities */
.text-hero { ... }
.text-statement { ... }

/* Reduce box usage */
.no-container { ... }
.content-flow { ... }
```

## 8. Content Migration Map

| Old Page | Content | New Location |
|----------|---------|--------------|
| sprinkler-repair/* | All service details | services/index.html (Tab 1) |
| small-engine-repair/* | All service details | services/index.html (Tab 2) |
| junk-hauling/* | All service details | services/index.html (Tab 3) |
| service-areas/* | City list | services/index.html (Map section) |
| about/* | Company info | about/index.html (Redesigned) |
| contact/* | Form + info | contact/index.html (Simplified) |

## 9. Validation Checklist

### Pre-Implementation:
- [ ] Backup all current pages
- [ ] Document any custom JS functionality
- [ ] Save any unique content

### During Implementation:
- [ ] Create services page with tabs
- [ ] Redesign about with timeline
- [ ] Simplify contact layout
- [ ] Update all navigation menus
- [ ] Update vite.config.js
- [ ] Test all internal links
- [ ] Verify no content lost

### Post-Implementation:
- [ ] Build succeeds
- [ ] All 4 pages load
- [ ] Each page looks unique
- [ ] Retro theme maintained
- [ ] Mobile responsive
- [ ] Form still works
- [ ] SEO tags updated
- [ ] No 404 errors from old URLs

## 10. Success Criteria

✅ **Site reduced to 4 pages** (Home, Services, About, Contact)
✅ **Each page has unique layout** (not cookie-cutter)
✅ **Less boxy** (varied containers and layouts)
✅ **Maintains retro theme** (colors, fonts, effects)
✅ **Better visual hierarchy** (clear page purposes)
✅ **Improved user flow** (simpler navigation)
✅ **All content preserved** (nothing lost in consolidation)
✅ **Performance maintained** (Lighthouse ≥90)

## 11. Rollback Plan

If issues arise:
```bash
git checkout main
git branch -D feature/site-restructure
# Restore from archive/ if needed
```

## 12. redirect Strategy (SEO)

For old URLs, add to netlify.toml:
```toml
[[redirects]]
  from = "/sprinkler-repair/*"
  to = "/services/#sprinkler"
  status = 301

[[redirects]]
  from = "/small-engine-repair/*"
  to = "/services/#engine"
  status = 301

[[redirects]]
  from = "/junk-hauling/*"
  to = "/services/#junk"
  status = 301

[[redirects]]
  from = "/service-areas/*"
  to = "/services/#areas"
  status = 301
```

## 13. Example Layouts (Visual Guide)

### Services Page (Tabs, Not Boxes):
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SPRINKLER  ENGINE  JUNK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Content flows naturally here
No boxes, just clean sections
```

### About Page (Timeline, Not Cards):
```
    1983
     |
     ├── Our beginning
     |
    1995
     |
     ├── Expansion story
     |
   TODAY
```

### Contact (Split, Not Stacked):
```
|  FORM  |  INFO  |
|        |        |
|        |  MAP   |
```

---

**Ready for Execution**: This PRP provides a complete plan to restructure the site with diverse, unique layouts while maintaining the retro theme. The goal is visual diversity, not uniformity.