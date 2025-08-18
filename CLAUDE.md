# CLAUDE.md: Project Configuration

## 1. Project Identity & Core Principles
- **Project Goal:** A fast, low-maintenance **React MPA** (multi-page site with React “islands”) for **Yzagere Enterprises** (Glendale, AZ): landscaping & **sprinkler repair**, **small engine repair**, and **junk hauling** across the West Valley. Keep it **KISS** (Keep It Simple) and **YAGNI** (don’t add it until it’s needed).
- **Core Principles:** Performance-first; minimal deps (**react**, **react-dom**, **vite** only); **BEM CSS** + CSS variables; ship static HTML pages (no SPA router); vendored **lite-youtube-embed**; progressive enhancement; accessibility; SEO & JSON-LD; re-use legacy copy.
- **Key Terminology:** 
  - **Primary services:** sprinkler/irrigation repair, drip/valves/timers; landscaping/desert maintenance; **small engine repair** (mowers, blowers, trimmers); **junk hauling** (single items → cleanouts).
  - **Service area cities:** Glendale, Peoria, Surprise, Goodyear, Avondale, Buckeye, Litchfield Park, El Mirage, Sun City, Sun City West, Tolleson, Waddell.
  - **Brand palette:** Pink `#FF2D7D`, Teal `#16E0BD`, Dark `#0D0D0D`, Off-white `#FDF9F6`.

## 2. Tech Stack
- **Language:** HTML5, CSS3 (**BEM**), JS (ES modules), **React 18 (islands only)**.
- **Framework(s):** None beyond React itself. **No router, no state libs, no CSS framework.**
- **Database:** None. Static content + one email function.
- **Styling:** Global CSS files (`tokens.css`, `base.css`, `components.css`). CSS variables for colors/spacing; mobile-first media queries; BEM selectors.
- **Testing:** Local Docker (nginx) + Selenium **MCP** smoke test (Home → Contact → Submit → success); manual Lighthouse (mobile) ≥ 90.
- **Infrastructure:**
  - **Build:** **Vite** (multi-page inputs). 
  - **Hosting:** Netlify static hosting; `publish = "dist"`.
  - **Serverless:** Netlify Function `/.netlify/functions/contact` (Node 18/20, **Nodemailer** via **SendGrid SMTP**).
  - **Env vars (Netlify):**  
    `SMTP_HOST=smtp.sendgrid.net` · `SMTP_PORT=587` · `SMTP_USER=apikey` · `SMTP_PASS=<SENDGRID_API_KEY>`  
    `MAIL_FROM="Yzagere Enterprises <yzagere.enterprises@gmail.com>"` · `MAIL_TO="yzagere.enterprises@gmail.com"`

## 3. Project Structure
- **Directory Layout:**

/
├─ netlify.toml
├─ vite.config.js
├─ index.html
├─ sprinkler-repair/index.html
├─ small-engine-repair/index.html
├─ junk-hauling/index.html
├─ service-areas/index.html
├─ about/index.html
├─ contact/index.html
├─ public/
│ ├─ images/ (hero/header images, posters, og images)
│ └─ assets/vendor/ (lite-yt-embed.css/js)
├─ src/
│ ├─ styles/ (tokens.css, base.css, components.css)
│ ├─ components/ (Hero.jsx, ContactForm.jsx, etc.)
│ └─ mount.jsx (tiny “island” mounter)
├─ assets/ (optional site images/icons if not using /public)
├─ netlify/functions/ (contact.js)
└─ context/ (legacy/reference content; read-only)

- **Architectural Patterns:** **MPA + islands**. Each page is a real HTML file (SEO-friendly). React used only where helpful (Hero, ContactForm). **Vendored** `lite-youtube-embed` web component for the hero video (ID: `UJlJ_Ep1fOc`, start at 0) with custom ≤200KB WebP poster and `<link rel="preconnect">` to `youtube-nocookie.com` and `i.ytimg.com`.
- **Exemplary Files:**
- **`netlify.toml`**
  ```toml
  [build]
    command = "npm ci && npm run build"
    publish = "dist"
    functions = "netlify/functions"

  [functions]
    node_bundler = "esbuild"
  ```
- **`vite.config.js`** (multi-page inputs)
  ```js
  import { defineConfig } from 'vite';
  import { resolve } from 'path';

  export default defineConfig({
    build: {
      rollupOptions: {
        input: {
          home: resolve(__dirname, 'index.html'),
          sprinklers: resolve(__dirname, 'sprinkler-repair/index.html'),
          smallengine: resolve(__dirname, 'small-engine-repair/index.html'),
          junk: resolve(__dirname, 'junk-hauling/index.html'),
          areas: resolve(__dirname, 'service-areas/index.html'),
          about: resolve(__dirname, 'about/index.html'),
          contact: resolve(__dirname, 'contact/index.html')
        }
      }
    }
  });
  ```
- **`netlify/functions/contact.js`** (Nodemailer + anti-spam)
  ```js
  import nodemailer from "nodemailer";

  const required = (o, k) => (o[k] ?? "").toString().trim();

  export async function handler(event) {
    if (event.httpMethod !== "POST")
      return { statusCode: 405, headers: { "content-type": "application/json" },
               body: JSON.stringify({ ok:false, error:"Method Not Allowed" }) };

    const body = JSON.parse(event.body || "{}");

    // Anti-spam: honeypot + min time on page
    if (body._hp || Number(body._startTime || 0) > Date.now() - 4000)
      return { statusCode: 200, headers: { "content-type":"application/json" },
               body: JSON.stringify({ ok:true }) };

    const name = required(body, "name");
    const email = required(body, "email");
    const msg = required(body, "message");
    const phone = (body.phone || "").trim();
    const service = (body.service || "").trim();
    if (!name || !email || !msg)
      return { statusCode: 400, headers: { "content-type":"application/json" },
               body: JSON.stringify({ ok:false, error:"Missing fields" }) };

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      to: process.env.MAIL_TO,
      from: process.env.MAIL_FROM,
      subject: `New Lead: ${service || "General"} — ${name}`,
      html: `<h3>New Website Lead</h3>
             <p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Phone:</b> ${phone}</p>
             <p><b>Service:</b> ${service}</p>
             <p><b>Message:</b><br/>${msg.replace(/\n/g,"<br/>")}</p>`
    });

    return { statusCode: 200, headers: { "content-type":"application/json" },
             body: JSON.stringify({ ok:true }) };
  }
  ```
- **Hero embed (HTML snippet)**:
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

## 4. Operational Directives: Commands & Workflows
- **Commands:**
```bash
# Dev server (Vite)
npm run dev

# Build / Preview
npm run build
npm run preview

# Docker (serve the built /dist via nginx for MCP Selenium tests)
docker compose up --build   # assuming compose mounts ./dist and a dev nginx.conf

# Examples (optional)
npx serve -l 5173           # quick static preview if needed

    Workflows:

        Git: feature/* → PR → main.

        Pull Requests: require 1 approval + checks:

            Netlify Deploy Preview ✅

            Lighthouse (mobile): Performance/SEO/Best Practices ≥ 90

            Images ≤ 200KB (WebP preferred), have width/height/alt

            No new external scripts beyond approved list

            HTML validates; no console errors; keyboard navigation works

        Docker Dev Workflow (Anti-Drift: single source of truth)

            Source of truth = Git repo. Never edit inside containers.

            Bind-mount the repo (or dist/ for tests); dev images do not COPY site files.

            Rebuild only if Dockerfile or nginx config changes:

            docker compose up --build

            MCP Test Loop: compose up → Selenium smoke → fix code in repo → re-run → PR → Deploy Preview.

            Prohibited: docker exec edits; committing container FS snapshots.

        KISS & YAGNI Rules: only react, react-dom, vite. No router, no state libs, no CSS framework, no analytics beyond Netlify Analytics, no client tracking.

5. Structural & Stylistic Mandates

    Formatting & Linting: Keep HTML/CSS/JS tidy; comments where needed. (No build-time linters by default.)

    Naming Conventions:

        Files/URLs kebab-case.

        CSS classes BEM: .block__element--modifier (flat specificity).

    API Design: One JSON POST endpoint /.netlify/functions/contact with shape:
    { name, email, phone?, service?, message, _hp, _startTime } → returns 200 { ok:true } on success.

    State Management: None. React islands must be self-contained; no global stores.

    SEO: Each HTML page declares unique <title> and <meta name="description">, canonical link, OG tags, and JSON-LD:

        Homepage JSON-LD: @type: HomeAndConstructionBusiness, telephone +16239310846, hours Mo-Fr 05:00-17:00, address 5314 W Glendale Ave, Glendale, AZ 85301, areaServed (cities list).

        Service pages: @type: Service with areaServed cities.

    Performance Budgets:

        Images ≤ 200KB; LCP image uses loading="eager" + fetchpriority="high".

        Offscreen images loading="lazy".

        lite-YT uses custom poster; no iframe until click; preconnects present.

        Keep main thread light (tiny React islands, no heavy libs).

    Accessibility: WCAG 2.1 AA: visible focus, labeled controls, keyboard operable, adequate color contrast.

6. Guardrails: The "Do Not" Section

    Do not add routers, CSS frameworks, UI kits, or state libraries.

    Do not convert to a single-page app; keep MPA with real HTML pages.

    Do not introduce third-party analytics besides Netlify Analytics.

    Do not exceed image budgets or omit width/height/alt.

    Do not log PII in functions or console.

    Do not add external scripts beyond: vendored lite-youtube-embed and Netlify Analytics snippet.

    Do not edit files inside containers; rebuild only on Dockerfile/nginx changes.

    Do not read or edit files in: /context/legacy-site/** (reference-only).

7. Modular Context Imports

    @/context/legacy-site/about-us/index.html

    @/context/legacy-site/category/services/landscaping/index.html

    @/context/legacy-site/contact-form/index.html

    @/context/legacy-site/outdoor-services-in-arizona/index.html

    @/context/legacy-site/services/irrigation-repair-near-me/index.html

    @/context/legacy-site/services/lawn-maintenance-in-arizona/index.html

    @/context/legacy-site/services/lawn-mower-repair/index.html

    @/context/legacy-site/services/sprinkler-repair-in-arizona/index.html

    @/context/legacy-site/yzagere-enterprises-reviews/index.html

    @/context/legacy-site/index.html

    @/context/legacy-site/lander.html

    @/context/legacy-site/about-us-full.html

    @/context/legacy-site/robots.txt.html

    @/context/mcp/docker-selenium-mcp-workflow.txt

    @/context/mcp/MCP_SERVERS.md

# ======================================================================
# PRP FRAMEWORK INTEGRATION (Approach 2: Framework Import)
# ======================================================================

## PRP Framework Context

This project has been enhanced with the **PRP (Product Requirement Prompt) Framework** to enable AI agents to ship production-ready code on the first pass. The framework provides:

- **Command-Driven System**: Pre-configured Claude Code commands in `.claude/commands/`
- **Template-Based Methodology**: Structured PRP templates with validation loops
- **Context-Rich Approach**: Comprehensive documentation and examples
- **Validation-First Design**: Executable validation gates for one-pass implementation success

## Available PRP Commands

### Core PRP Commands
- `/prp-base-create` - Generate comprehensive PRPs with research
- `/prp-base-execute` - Execute PRPs against codebase
- `/prp-planning-create` - Create planning documents with diagrams
- `/prp-task-create` - Create task-specific PRPs
- `/prp-task-execute` - Execute task PRPs
- `/prime-core` - Prime Claude with project context

### Development Commands
- `/onboarding-new` - Initialize context for new projects
- `/debug-current` - Debug current implementation
- `/hackathon-create` - Create PRP optimized for rapid development

### Code Quality Commands
- `/review-staged-unstaged` - Review git changes using PRP methodology
- `/refactor-simple` - Simple refactoring tasks
- `/refactor-complex` - Complex architectural changes

## PRP Workflow for This Project

### Creating Project-Specific PRPs
Store project PRPs in: `PRPs/whaleofajob/`
- `features/` - Feature implementation PRPs
- `refactors/` - Refactoring PRPs
- `tasks/` - Task-specific PRPs

### Validation Gates for Whaleofajob
```bash
# Level 1: Build verification
npm run build

# Level 2: Preview site
npm run preview

# Level 3: Lighthouse checks
# Performance/SEO/Best Practices ≥ 90

# Level 4: MCP Selenium smoke test
docker compose up --build
# Run smoke test: Home → Contact → Submit → success
```

## PRP Methodology Integration

When implementing features for this project:

1. **Use PRP Templates**: Start with templates in `PRPs/templates/`
2. **Include Project Context**: Reference CLAUDE.md sections, legacy content
3. **Define Validation**: Include build, preview, and test commands
4. **Follow KISS/YAGNI**: Keep PRPs focused on minimal, working solutions

## Project-Specific PRP Guidelines

- **Service Context**: Always include service terminology (sprinkler repair, small engine, junk hauling)
- **Performance Focus**: Include image size checks, loading strategies
- **MPA Architecture**: Remember this is NOT an SPA - real HTML pages
- **React Islands**: Only use React where needed (Hero, ContactForm)
- **Vendored Dependencies**: Reference lite-youtube-embed setup

## PRP Structure for Whaleofajob

```
PRPs/
├── templates/          # Framework templates (don't modify)
├── whaleofajob/       # Your project PRPs
│   ├── features/      # Feature PRPs
│   ├── refactors/     # Refactoring PRPs
│   └── tasks/         # Task PRPs
└── README.md          # PRP documentation
```

## Path References in PRPs

Since we're using the Import approach, use direct paths from project root:
```yaml
Files to modify:
  - src/components/Hero.jsx
  - netlify/functions/contact.js
  - index.html
```

## Framework Commands Integration

The PRP framework commands are now integrated and available. Use them to:
- Create structured PRPs for new features
- Execute PRPs with validation loops
- Review code changes systematically
- Manage complex refactoring tasks

Remember: **Context is King** - Every PRP should contain everything needed for successful implementation in a single pass.
EOF < /dev/null

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Nature

This is a **PRP (Product Requirement Prompt) Framework** repository, not a traditional software project. The core concept: **"PRP = PRD + curated codebase intelligence + agent/runbook"** - designed to enable AI agents to ship production-ready code on the first pass.

## Core Architecture

### Command-Driven System

- **pre-configured Claude Code commands** in `.claude/commands/`
- Commands organized by function:
  - `PRPs/` - PRP creation and execution workflows
  - `development/` - Core development utilities (prime-core, onboarding, debug)
  - `code-quality/` - Review and refactoring commands
  - `rapid-development/experimental/` - Parallel PRP creation and hackathon tools
  - `git-operations/` - Conflict resolution and smart git operations

### Template-Based Methodology

- **PRP Templates** in `PRPs/templates/` follow structured format with validation loops
- **Context-Rich Approach**: Every PRP must include comprehensive documentation, examples, and gotchas
- **Validation-First Design**: Each PRP contains executable validation gates (syntax, tests, integration)

### AI Documentation Curation

- `PRPs/ai_docs/` contains curated Claude Code documentation for context injection
- `claude_md_files/` provides framework-specific CLAUDE.md examples

## Development Commands

### PRP Execution

```bash
# Interactive mode (recommended for development)
uv run PRPs/scripts/prp_runner.py --prp [prp-name] --interactive

# Headless mode (for CI/CD)
uv run PRPs/scripts/prp_runner.py --prp [prp-name] --output-format json

# Streaming JSON (for real-time monitoring)
uv run PRPs/scripts/prp_runner.py --prp [prp-name] --output-format stream-json
```

### Key Claude Commands

- `/prp-base-create` - Generate comprehensive PRPs with research
- `/prp-base-execute` - Execute PRPs against codebase
- `/prp-planning-create` - Create planning documents with diagrams
- `/prime-core` - Prime Claude with project context
- `/review-staged-unstaged` - Review git changes using PRP methodology

## Critical Success Patterns

### The PRP Methodology

1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance

### PRP Structure Requirements

- **Goal**: Specific end state and desires
- **Why**: Business value and user impact
- **What**: User-visible behavior and technical requirements
- **All Needed Context**: Documentation URLs, code examples, gotchas, patterns
- **Implementation Blueprint**: Pseudocode with critical details and task lists
- **Validation Loop**: Executable commands for syntax, tests, integration

### Validation Gates (Must be Executable)

```bash
# Level 1: Syntax & Style
ruff check --fix && mypy .

# Level 2: Unit Tests
uv run pytest tests/ -v

# Level 3: Integration
uv run uvicorn main:app --reload
curl -X POST http://localhost:8000/endpoint -H "Content-Type: application/json" -d '{...}'

# Level 4: Deployment
# mcp servers, or other creative ways to self validate
```

## Anti-Patterns to Avoid

- L Don't create minimal context prompts - context is everything - the PRP must be comprehensive and self-contained, reference relevant documentation and examples.
- L Don't skip validation steps - they're critical for one-pass success - The better The AI is at running the validation loop, the more likely it is to succeed.
- L Don't ignore the structured PRP format - it's battle-tested
- L Don't create new patterns when existing templates work
- L Don't hardcode values that should be config
- L Don't catch all exceptions - be specific

## Working with This Framework

### When Creating new PRPs

1. **Context Process**: New PRPs must consist of context sections, Context is King!
2.

### When Executing PRPs

1. **Load PRP**: Read and understand all context and requirements
2. **ULTRATHINK**: Create comprehensive plan, break down into todos, use subagents, batch tool etc check prps/ai_docs/
3. **Execute**: Implement following the blueprint
4. **Validate**: Run each validation command, fix failures
5. **Complete**: Ensure all checklist items done

### Command Usage

- Read the .claude/commands directory
- Access via `/` prefix in Claude Code
- Commands are self-documenting with argument placeholders
- Use parallel creation commands for rapid development
- Leverage existing review and refactoring commands

## Project Structure Understanding

```
PRPs-agentic-eng/
.claude/
  commands/           # 28+ Claude Code commands
  settings.local.json # Tool permissions
PRPs/
  templates/          # PRP templates with validation
  scripts/           # PRP runner and utilities
  ai_docs/           # Curated Claude Code documentation
   *.md               # Active and example PRPs
 claude_md_files/        # Framework-specific CLAUDE.md examples
 pyproject.toml         # Python package configuration
```

Remember: This framework is about **one-pass implementation success through comprehensive context and validation**. Every PRP should contain the exact context for an AI agent to successfully implement working code in a single pass.
