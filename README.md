# Yzagere Enterprises Website

A fast, retro-themed multi-page website for Yzagere Enterprises - West Valley's trusted provider of sprinkler repair, small engine repair, junk hauling, and landscaping services since 1983.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 CSS Architecture

The site uses a **layered CSS architecture** with a retro 80s neon theme. Styles are organized in a specific loading order for proper cascading:

### CSS File Structure

```
src/styles/
├── tokens.css        # 1️⃣ Design tokens (colors, spacing, typography variables)
├── base.css          # 2️⃣ Reset styles and base HTML elements
├── components.css    # 3️⃣ Component structure and layout
└── retro-theme.css   # 4️⃣ Retro theme overrides (loads LAST)
```

### Loading Order (Important!)

Each HTML page loads CSS files in this specific order:

```html
<!-- Base styles -->
<link rel="stylesheet" href="/src/styles/tokens.css">      <!-- Variables -->
<link rel="stylesheet" href="/src/styles/base.css">        <!-- Reset -->
<link rel="stylesheet" href="/src/styles/components.css">  <!-- Structure -->

<!-- Theme (loads last to override everything) -->
<link rel="stylesheet" href="/src/styles/retro-theme.css"> <!-- Theme -->
```

### Making Style Changes

#### To modify the retro theme (colors, glows, animations):
Edit `/src/styles/retro-theme.css` - This file overrides all other styles

```css
/* Example: Change the neon colors */
:root {
  --neon-pink: #FF2D7D;     /* Main pink glow */
  --neon-cyan: #16E0BD;     /* Main cyan glow */
  --dark-bg: #000000;       /* Background */
}
```

#### To modify component structure (layout, spacing):
Edit `/src/styles/components.css` - Base component styles

```css
/* Example: Change services grid layout */
.services__grid {
  grid-template-columns: repeat(4, 1fr);  /* 4 columns on desktop */
}
```

#### To modify design tokens (spacing, fonts):
Edit `/src/styles/tokens.css` - CSS variables used throughout

```css
/* Example: Change spacing scale */
:root {
  --space-xl: 2rem;    /* 32px */
  --space-2xl: 3rem;   /* 48px */
}
```

### Retro Theme Features

The retro theme (`retro-theme.css`) provides:

- **Neon glow effects** on text and borders
- **Animated grid background** (moves diagonally)
- **Gradient text** with pink/cyan colors
- **Hover animations** with glow effects
- **Monospace fonts** (Orbitron, Space Mono)
- **Dark background** with bright neon accents
- **Flicker animations** for authentic retro feel

### Service Grid Layout

The services section displays differently based on screen size:

- **Desktop (≥1024px)**: 4 columns in a row
- **Tablet (768px-1023px)**: 2 columns
- **Mobile (<768px)**: 1 column (stacked)

To modify the grid, edit in `retro-theme.css`:

```css
.services__grid {
  grid-template-columns: repeat(4, 1fr);  /* Change number here */
}
```

## 📁 Project Structure

```
/
├── index.html                 # Homepage
├── about/index.html          # About page
├── contact/index.html        # Contact page
├── services/index.html       # Services page
├── src/
│   ├── styles/              # CSS files (see above)
│   ├── components/          # React components
│   └── mount.jsx           # React island mounter
├── public/
│   ├── images/             # Hero images, posters
│   └── assets/vendor/      # lite-youtube-embed
└── netlify/
    └── functions/          # Contact form handler
```

## 🛠 Tech Stack

- **Vite** - Build tool
- **React 18** - For interactive components only
- **CSS** - BEM methodology with retro theme
- **Netlify** - Hosting and serverless functions
- **lite-youtube-embed** - Performant YouTube embeds

## 🎯 Performance

- Static HTML pages (not an SPA)
- React used only where needed (contact form, hero)
- Optimized images (WebP, <200KB)
- YouTube video loads on click only
- CSS variables for easy theming

## 📝 Development Notes

- **KISS Principle**: Keep it simple
- **YAGNI**: Don't add features until needed
- **Mobile-first**: Responsive design
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: Each page has unique meta tags and JSON-LD

## 🚢 Deployment

Deploys automatically to Netlify on push to `main` branch.

### Environment Variables (Netlify)

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=<YOUR_SENDGRID_API_KEY>
MAIL_FROM="Yzagere Enterprises <yzagere.enterprises@gmail.com>"
MAIL_TO="yzagere.enterprises@gmail.com"
```

## 📞 Contact

Yzagere Enterprises  
📍 5314 W Glendale Ave, Glendale, AZ 85301  
📱 (623) 931-0846  
✉️ yzagere.enterprises@gmail.com

---

*Family owned and operated since 1983, serving the West Valley with pride.*