name: "Yzagere Enterprises Website - React MPA Implementation"
description: |
  Complete implementation of a fast, low-maintenance React Multi-Page Application (MPA) 
  for Yzagere Enterprises landscaping business using React islands architecture, 
  BEM CSS methodology, and Netlify deployment with contact form functionality.

---

## Goal

**Feature Goal**: Build a complete, production-ready website for Yzagere Enterprises as a React MPA with static HTML pages enhanced by React "islands" for interactivity.

**Deliverable**: Seven-page static website with React components for Hero and ContactForm, vendored lite-youtube-embed, BEM CSS styling, and Netlify Function for contact form handling.

**Success Definition**: Website passes Lighthouse mobile score ≥ 90, Docker/Selenium smoke test passes (Home → Contact → Submit → success), all pages render without JavaScript, and contact form successfully sends emails via SendGrid.

## User Persona

**Target User**: West Valley Arizona homeowners needing landscaping, sprinkler repair, small engine repair, or junk hauling services.

**Use Case**: User searches for local service providers, lands on website, views services, and contacts for quote/appointment.

**User Journey**: 
1. User arrives via search or direct link
2. Views hero video and service offerings
3. Navigates to specific service page for details
4. Checks service areas for coverage
5. Submits contact form for quote/service request
6. Receives confirmation of submission

**Pain Points Addressed**: Need for reliable local service provider, quick response times, transparent service offerings, easy contact method.

## Why

- Establish online presence for 40+ year family business
- Generate leads through SEO-optimized pages and contact form
- Showcase four primary services with dedicated landing pages
- Build trust through professional design and video content
- Enable mobile-first experience for field service customers

## What

Build a seven-page React MPA website with:
- Homepage with hero video (lite-youtube-embed)
- Three service pages (sprinkler repair, small engine repair, junk hauling)
- Service areas page listing 12 West Valley cities
- About page with company history
- Contact page with React form component
- Netlify Function for email handling via SendGrid
- BEM CSS with brand colors (Pink #FF2D7D, Teal #16E0BD, Dark #0D0D0D, Off-white #FDF9F6)

### Success Criteria

- [ ] All 7 HTML pages render completely without JavaScript
- [ ] React islands (Hero, ContactForm) enhance but don't break functionality
- [ ] Lighthouse mobile scores ≥ 90 for Performance, SEO, Best Practices
- [ ] All images ≤ 200KB with width/height/alt attributes
- [ ] Contact form sends emails via SendGrid SMTP
- [ ] Docker Selenium test passes: navigate → fill form → submit → success
- [ ] Each page has unique title, meta description, canonical URL, OG tags, JSON-LD
- [ ] Site deploys to Netlify with working contact function

## All Needed Context

### Context Completeness Check

_This PRP contains everything needed for an AI agent unfamiliar with the codebase to successfully implement the complete website from scratch._

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- file: /home/ice/dev/whaleofajob/CLAUDE.md
  why: Complete project specifications, tech stack requirements, exemplary code patterns
  pattern: Vite config, Netlify Function, lite-YT embed HTML, BEM CSS structure
  gotcha: No SPA router, no state libs, no CSS frameworks allowed

- file: /home/ice/dev/whaleofajob/context/legacy-site/index.html
  why: Extract marketing copy, service descriptions, company history
  pattern: Service taglines, value propositions, "No Job too Big or Small"
  gotcha: Phone/email not in legacy content - use from CLAUDE.md

- url: https://github.com/paulirish/lite-youtube-embed
  why: Vendored web component for hero video embed
  critical: Download CSS/JS files directly, don't use NPM
  section: Basic usage and custom poster setup

- url: https://getbem.com/introduction/
  why: BEM CSS methodology for component styling
  critical: Use block__element--modifier pattern, flat specificity
  section: Naming conventions

- url: https://docs.netlify.com/functions/overview/
  why: Serverless function configuration and deployment
  critical: Functions go in netlify/functions/ directory
  section: Function structure and environment variables

- url: https://vite.dev/guide/build#multi-page-app
  why: Multi-page application build configuration
  critical: Use rollupOptions.input for multiple HTML entries
  section: Building for Production

- docfile: PRPs/ai_docs/react-mpa-patterns.md (if created from research)
  why: React islands architecture implementation patterns
  section: Selective component mounting and portal patterns
```

### Current Codebase tree

```bash
/home/ice/dev/whaleofajob/
├── CLAUDE.md
├── PRPs/
│   ├── README.md
│   ├── templates/
│   │   └── prp_base.md
│   └── whaleofajob/
│       └── create-website.md (this file)
└── context/
    └── legacy-site/
        ├── index.html
        ├── about-us/index.html
        ├── contact-form/index.html
        ├── services/
        │   ├── irrigation-repair-near-me/index.html
        │   ├── lawn-maintenance-in-arizona/index.html
        │   ├── lawn-mower-repair/index.html
        │   └── sprinkler-repair-in-arizona/index.html
        └── yzagere-enterprises-reviews/index.html
```

### Desired Codebase tree with files to be added

```bash
/home/ice/dev/whaleofajob/
├── package.json                     # React, Vite dependencies
├── vite.config.js                   # Multi-page build config
├── netlify.toml                     # Build and function settings
├── .gitignore                       # Node modules, dist, .env
├── index.html                       # Homepage
├── sprinkler-repair/
│   └── index.html                   # Sprinkler service page
├── small-engine-repair/
│   └── index.html                   # Small engine service page
├── junk-hauling/
│   └── index.html                   # Junk hauling service page
├── service-areas/
│   └── index.html                   # Service areas listing
├── about/
│   └── index.html                   # About us page
├── contact/
│   └── index.html                   # Contact page
├── public/
│   ├── robots.txt                   # SEO robots file
│   ├── images/
│   │   ├── hero-poster.webp         # YouTube video poster ≤200KB
│   │   ├── og-image.jpg             # Open Graph default image
│   │   └── [service images]         # Service-specific images
│   └── assets/
│       └── vendor/
│           ├── lite-yt-embed.css    # Vendored from GitHub
│           └── lite-yt-embed.js     # Vendored from GitHub
├── src/
│   ├── styles/
│   │   ├── tokens.css               # CSS variables (colors, spacing)
│   │   ├── base.css                 # Reset, typography, base styles
│   │   └── components.css           # BEM component styles
│   ├── components/
│   │   ├── Hero.jsx                 # Hero section with video
│   │   └── ContactForm.jsx          # Contact form component
│   └── mount.jsx                    # React island mounting logic
└── netlify/
    └── functions/
        └── contact.js               # Nodemailer contact handler
```

### Known Gotchas & Library Quirks

```javascript
// CRITICAL: React 18 requires createRoot API, not ReactDOM.render
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('app'));

// CRITICAL: Vite requires .jsx extension for React files
// CRITICAL: Each HTML file needs type="module" for script tags
// CRITICAL: SendGrid requires 'apikey' as username, not email
// CRITICAL: lite-youtube-embed auto-uses youtube-nocookie.com
// CRITICAL: BEM classes need both base and modifier (.btn .btn--primary)
// CRITICAL: Netlify Functions must export async handler function
```

## Implementation Blueprint

### Data models and structure

```javascript
// Contact Form Data Model
interface ContactFormData {
  name: string;        // Required
  email: string;       // Required, validated
  phone?: string;      // Optional
  service?: string;    // Service dropdown selection
  message: string;     // Required
  _hp?: string;        // Honeypot field (anti-spam)
  _startTime: number;  // Timestamp (anti-spam)
}

// Service Data Structure
const services = [
  { id: 'sprinkler', name: 'Sprinkler/Irrigation Repair', url: '/sprinkler-repair/' },
  { id: 'engine', name: 'Small Engine Repair', url: '/small-engine-repair/' },
  { id: 'junk', name: 'Junk Hauling', url: '/junk-hauling/' },
  { id: 'landscaping', name: 'Landscaping', url: '/' }
];

// Service Area Cities
const serviceAreas = [
  'Glendale', 'Peoria', 'Surprise', 'Goodyear', 'Avondale', 
  'Buckeye', 'Litchfield Park', 'El Mirage', 'Sun City', 
  'Sun City West', 'Tolleson', 'Waddell'
];
```

### Implementation Tasks (ordered by dependencies)

```yaml
Task 1: CREATE package.json and install dependencies
  - IMPLEMENT: Minimal dependencies (react, react-dom, vite, nodemailer)
  - COMMAND: npm init -y && npm install react react-dom vite nodemailer
  - CRITICAL: Only these packages, no router, no UI library
  - PLACEMENT: Project root

Task 2: CREATE vite.config.js
  - IMPLEMENT: Multi-page input configuration
  - FOLLOW pattern: CLAUDE.md vite.config.js example
  - CRITICAL: All 7 HTML pages as separate inputs
  - PLACEMENT: Project root

Task 3: CREATE netlify.toml
  - IMPLEMENT: Build command, publish directory, functions path
  - FOLLOW pattern: CLAUDE.md netlify.toml example
  - CRITICAL: functions = "netlify/functions", publish = "dist"
  - PLACEMENT: Project root

Task 4: VENDOR lite-youtube-embed files
  - DOWNLOAD: lite-yt-embed.css and lite-yt-embed.js from GitHub
  - URL: https://github.com/paulirish/lite-youtube-embed/tree/master/src
  - PLACEMENT: public/assets/vendor/
  - CRITICAL: Do not use NPM, download files directly

Task 5: CREATE src/styles/tokens.css
  - IMPLEMENT: CSS variables for colors, spacing, typography
  - COLORS: Pink #FF2D7D, Teal #16E0BD, Dark #0D0D0D, Off-white #FDF9F6
  - SPACING: --spacing-xs through --spacing-xl
  - PLACEMENT: src/styles/tokens.css

Task 6: CREATE src/styles/base.css
  - IMPLEMENT: CSS reset, base typography, mobile-first styles
  - PATTERN: box-sizing: border-box, system font stack
  - CRITICAL: Mobile-first media queries
  - PLACEMENT: src/styles/base.css

Task 7: CREATE src/styles/components.css
  - IMPLEMENT: BEM component styles (.nav, .card, .hero, .form)
  - PATTERN: .block__element--modifier naming
  - CRITICAL: Use CSS variables from tokens.css
  - PLACEMENT: src/styles/components.css

Task 8: CREATE src/components/Hero.jsx
  - IMPLEMENT: Hero section with lite-youtube-embed integration
  - INCLUDE: Video ID UJlJ_Ep1fOc, custom poster
  - PATTERN: React functional component with hooks
  - PLACEMENT: src/components/Hero.jsx

Task 9: CREATE src/components/ContactForm.jsx
  - IMPLEMENT: React form with validation and anti-spam
  - INCLUDE: Honeypot field, time validation, field validation
  - PATTERN: Controlled components, async form submission
  - PLACEMENT: src/components/ContactForm.jsx

Task 10: CREATE src/mount.jsx
  - IMPLEMENT: React island mounting logic
  - PATTERN: createRoot API, selective component mounting
  - CRITICAL: Check element exists before mounting
  - PLACEMENT: src/mount.jsx

Task 11: CREATE index.html (Homepage)
  - IMPLEMENT: Complete HTML with hero, services grid, CTA
  - INCLUDE: Meta tags, OG tags, JSON-LD HomeAndConstructionBusiness
  - PATTERN: Semantic HTML5, React mount points
  - PLACEMENT: Project root

Task 12: CREATE service page HTML files
  - IMPLEMENT: sprinkler-repair/index.html
  - IMPLEMENT: small-engine-repair/index.html  
  - IMPLEMENT: junk-hauling/index.html
  - PATTERN: Service-specific content, JSON-LD Service schema
  - PLACEMENT: Respective directories

Task 13: CREATE service-areas/index.html
  - IMPLEMENT: List of 12 West Valley cities served
  - PATTERN: Semantic list, local SEO optimization
  - PLACEMENT: service-areas/index.html

Task 14: CREATE about/index.html
  - IMPLEMENT: Company history, 40+ years, family-owned
  - CONTENT: Founded 1983, Paul Yzagere Sr., third generation
  - PLACEMENT: about/index.html

Task 15: CREATE contact/index.html
  - IMPLEMENT: Contact page with React form mount point
  - INCLUDE: Business info, hours, map placeholder
  - PLACEMENT: contact/index.html

Task 16: CREATE netlify/functions/contact.js
  - IMPLEMENT: Nodemailer with SendGrid SMTP
  - FOLLOW pattern: CLAUDE.md contact.js example
  - CRITICAL: Anti-spam checks, proper error handling
  - PLACEMENT: netlify/functions/contact.js

Task 17: CREATE public/robots.txt
  - IMPLEMENT: Basic robots.txt allowing all crawlers
  - PATTERN: User-agent: * Allow: /
  - PLACEMENT: public/robots.txt

Task 18: CREATE hero poster image
  - CREATE: public/images/hero-poster.webp
  - REQUIREMENT: ≤200KB, 16:9 aspect ratio
  - CRITICAL: Optimize for fast loading
  - PLACEMENT: public/images/
```

### Implementation Patterns & Key Details

```javascript
// React Island Mounting Pattern (src/mount.jsx)
import { createRoot } from 'react-dom/client';
import Hero from './components/Hero';
import ContactForm from './components/ContactForm';

// Mount Hero if element exists
const heroEl = document.getElementById('hero-root');
if (heroEl) {
  const root = createRoot(heroEl);
  root.render(<Hero />);
}

// Mount ContactForm if element exists
const formEl = document.getElementById('contact-form-root');
if (formEl) {
  const root = createRoot(formEl);
  root.render(<ContactForm />);
}

// BEM CSS Pattern (components.css)
.hero {
  background: var(--color-off-white);
  padding: var(--spacing-lg);
}

.hero__video {
  max-width: 800px;
  margin: 0 auto;
}

.hero__title {
  font-size: 2.5rem;
  color: var(--color-dark);
  text-align: center;
}

.hero--fullwidth {
  padding: 0;
  width: 100vw;
}

// HTML with React Mount Points
<section class="hero">
  <div id="hero-root">
    <!-- React Hero component mounts here -->
    <!-- Fallback content for no-JS -->
    <h1>Yzagere Enterprises</h1>
    <p>Family Owned in Glendale, AZ since 1983!</p>
  </div>
</section>

// Contact Form Anti-Spam Pattern
const [startTime] = useState(Date.now());

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = {
    ...values,
    _hp: '', // Honeypot
    _startTime: startTime
  };
  
  const response = await fetch('/.netlify/functions/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
};
```

### Integration Points

```yaml
HTML_HEAD:
  - preconnect: "https://www.youtube-nocookie.com"
  - preconnect: "https://i.ytimg.com"
  - stylesheet: "/assets/vendor/lite-yt-embed.css"
  - stylesheet: "/src/styles/tokens.css"
  - stylesheet: "/src/styles/base.css"
  - stylesheet: "/src/styles/components.css"

HTML_SCRIPTS:
  - add to: "Before closing </body>"
  - pattern: '<script src="/assets/vendor/lite-yt-embed.js" defer></script>'
  - pattern: '<script type="module" src="/src/mount.jsx"></script>'

ENVIRONMENT_VARIABLES:
  - platform: Netlify Dashboard
  - variables:
    SMTP_HOST: "smtp.sendgrid.net"
    SMTP_PORT: "587"
    SMTP_USER: "apikey"
    SMTP_PASS: "[SendGrid API Key]"
    MAIL_FROM: "Yzagere Enterprises <yzagere.enterprises@gmail.com>"
    MAIL_TO: "yzagere.enterprises@gmail.com"

JSON_LD_SCHEMAS:
  - homepage: "@type: HomeAndConstructionBusiness"
  - services: "@type: Service"
  - contact: "@type: ContactPage"
```

## Validation Loop

### Level 1: Syntax & Build Validation

```bash
# Install dependencies
npm install

# Build the site
npm run build

# Expected: Successful build with dist/ directory created
# If errors: Check vite.config.js paths and HTML syntax
```

### Level 2: Local Development Testing

```bash
# Start Vite dev server
npm run dev

# Open http://localhost:5173
# Test each page loads
# Test React components mount (Hero, ContactForm)
# Test form validation

# Preview production build
npm run preview

# Expected: All pages load, React islands work, no console errors
```

### Level 3: Lighthouse Performance Testing

```bash
# Using Chrome DevTools or CLI
# Test mobile performance for each page

# Homepage
lighthouse http://localhost:5173 --view --preset=desktop --only-categories=performance,seo,best-practices,accessibility

# Expected scores:
# Performance: ≥ 90
# SEO: ≥ 90  
# Best Practices: ≥ 90
# Accessibility: ≥ 90

# If low scores: Check image sizes, remove render-blocking resources
```

### Level 4: Docker Selenium Testing

```bash
# Create docker-compose.yml for nginx
cat > docker-compose.yml << 'EOF'
version: '3'
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./dist:/usr/share/nginx/html:ro
EOF

# Build and serve
npm run build
docker compose up

# Run Selenium test via MCP
# Test flow: 
# 1. Navigate to http://localhost:8080
# 2. Click Contact link
# 3. Fill form (name, email, message)
# 4. Submit
# 5. Verify success message

# Expected: Form submits successfully, success message appears
```

### Level 5: Netlify Function Testing

```bash
# Test locally with Netlify CLI
npm install -g netlify-cli
netlify dev

# Test contact function
curl -X POST http://localhost:8888/.netlify/functions/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message",
    "_hp": "",
    "_startTime": "'$(date +%s)000'"
  }'

# Expected: {"ok": true}
# If error: Check environment variables, SendGrid API key
```

## Final Validation Checklist

### Technical Validation

- [ ] All pages build without errors: `npm run build`
- [ ] No console errors on any page
- [ ] All images ≤ 200KB with width/height/alt
- [ ] React components mount and function
- [ ] Contact form validates and submits
- [ ] Netlify Function sends emails via SendGrid

### Feature Validation

- [ ] All 7 pages accessible and render without JavaScript
- [ ] Hero video loads with custom poster
- [ ] Contact form has anti-spam protection
- [ ] Each page has unique meta tags and JSON-LD
- [ ] Mobile-responsive at all breakpoints
- [ ] Keyboard navigation works throughout

### Performance Validation

- [ ] Lighthouse mobile scores ≥ 90
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 3s
- [ ] No layout shifts (CLS < 0.1)
- [ ] Images use loading="lazy" except hero

### SEO Validation

- [ ] Each page has unique <title> and meta description
- [ ] Canonical URLs set correctly
- [ ] Open Graph tags present
- [ ] JSON-LD structured data validates
- [ ] robots.txt allows crawling

### Deployment Validation

- [ ] Site deploys to Netlify successfully
- [ ] Contact function works in production
- [ ] All environment variables set in Netlify
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

---

## Anti-Patterns to Avoid

- ❌ Don't add React Router or any SPA routing
- ❌ Don't use CSS frameworks (Bootstrap, Tailwind)
- ❌ Don't add state management libraries (Redux, MobX)
- ❌ Don't install unnecessary dependencies
- ❌ Don't create complex component hierarchies
- ❌ Don't forget image optimization
- ❌ Don't skip accessibility attributes
- ❌ Don't hardcode sensitive data (API keys)
- ❌ Don't use synchronous scripts that block rendering
- ❌ Don't exceed the KISS principle - keep it simple

## Confidence Score: 9/10

This PRP provides comprehensive implementation guidance with all necessary context, patterns, and validation steps for successful one-pass implementation of the Yzagere Enterprises website.
