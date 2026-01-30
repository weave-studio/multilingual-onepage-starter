# Architecture Documentation

This document provides comprehensive technical documentation of the Multilingual One-Page Starter template architecture.

## Tech Stack

### Static Site Generator

**Eleventy 2.0.1** (CommonJS configuration)

- Template engine: **Nunjucks** (default for `.html` files)
- Also supports: Markdown, Liquid, 11ty.js templates
- Collections for blog posts (global + per-language)
- Custom filters: readableDate, lowercase, reverse, limit, readingTime, dateIso, translateCategory
- Passthrough copy for assets
- Markdown-it with HTML, breaks, and linkify enabled

**Configuration file:** [`.eleventy.js`](../../.eleventy.js)

### Build Tool

**Sass 1.97.2** for SCSS compilation

- Compiles `src/assets/scss/main.scss` to `src/assets/css/main.css`
- No source maps in production
- Watch mode for development

**Vite 4.4.9** (configured but optional)

- Available for future ESM migration
- Currently incompatible with Eleventy 2.0 CommonJS config
- Configuration present in [`vite.config.mjs`](../../vite.config.mjs)

### Styling

**SCSS with organized architecture**

- Design token system (variables)
- Reusable mixins
- Component-based organization
- Dark mode via CSS custom properties
- RTL support
- Mobile-first responsive approach

### JavaScript

**Vanilla ES6 JavaScript** - No framework

- ES modules (type="module")
- Class-based components (accordion, filters, form validation, scroll animations)
- Functional modules (theme, language, navigation, analytics)
- Event-driven architecture
- localStorage for persistence
- Custom events for inter-module communication

### Linting & Formatting

**Biome 2.3.11** (unified tool)

- Replaces ESLint + Prettier
- Fast Rust-based linter/formatter
- Single configuration file: [`biome.json`](../../biome.json)
- Configured rules: recommended + custom style/complexity rules

**Configuration:**
```json
{
  "linter": {
    "rules": {
      "recommended": true,
      "style": { "useConst": "error", "useTemplate": "warn" },
      "suspicious": { "noConsole": "warn" },
      "correctness": { "noUnusedVariables": "error" }
    }
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded",
      "trailingCommas": "none"
    }
  }
}
```

### Package Management

**npm** with Node.js 20 (specified in `.nvmrc`)

- Minimum required: Node >=18.0.0
- Dependencies managed via `package.json`

---

## Directory Structure

```
multilingual-onepage-starter/
├── .ai/                          # AI development context
│   ├── README.md
│   ├── context/                  # Technical documentation
│   │   ├── project-overview.md
│   │   ├── architecture.md       # This file
│   │   ├── patterns.md
│   │   └── customization-guide.md
│   ├── skills/                   # Workflow guides (10 skills)
│   └── examples/                 # Templates for session files
│
├── src/                          # Source files (Eleventy input)
│   ├── _data/                    # Global data files
│   │   └── site.js               # Site configuration (multilingual, analytics)
│   │
│   ├── _includes/                # Reusable template parts
│   │   ├── layouts/              # Page layouts
│   │   │   ├── base.html         # Master HTML layout (37 lines)
│   │   │   └── post.html         # Blog post layout
│   │   ├── components/           # Reusable UI components
│   │   │   ├── nav.html          # Navigation (desktop + mobile)
│   │   │   ├── footer.html       # Footer
│   │   │   ├── hero.html         # Hero section
│   │   │   ├── language-switcher.html  # Language toggle/dropdown
│   │   │   └── svg-icons.html    # SVG sprite definitions
│   │   └── partials/             # Small reusable snippets
│   │       ├── head.html         # <head> contents
│   │       ├── meta-tags.html    # SEO/OG/Twitter meta tags
│   │       ├── scripts.html      # JS module initialization
│   │       └── analytics.html    # Analytics config injection
│   │
│   ├── assets/
│   │   ├── scss/                 # SCSS source files
│   │   │   ├── main.scss         # Entry point
│   │   │   ├── _variables.scss   # Design tokens
│   │   │   ├── _mixins.scss      # Reusable mixins
│   │   │   ├── base/             # Base styles
│   │   │   │   ├── _reset.scss
│   │   │   │   ├── _custom-properties.scss  # CSS vars
│   │   │   │   ├── _typography.scss
│   │   │   │   └── _utilities.scss
│   │   │   ├── components/       # Component styles
│   │   │   │   ├── _navigation.scss
│   │   │   │   ├── _hero.scss
│   │   │   │   ├── _buttons.scss
│   │   │   │   ├── _forms.scss
│   │   │   │   ├── _cards.scss
│   │   │   │   ├── _accordion.scss
│   │   │   │   ├── _sections.scss
│   │   │   │   ├── _footer.scss
│   │   │   │   └── _back-to-top.scss
│   │   │   ├── layout/           # Layout utilities
│   │   │   │   ├── _grid.scss
│   │   │   │   └── _sections.scss
│   │   │   └── themes/           # Theme overrides
│   │   │       ├── _dark-mode.scss   # 158+ selectors
│   │   │       └── _rtl.scss         # RTL transformations
│   │   │
│   │   ├── css/                  # Compiled CSS (generated)
│   │   │   └── main.css          # Output (5,119 lines)
│   │   │
│   │   ├── js/                   # JavaScript modules
│   │   │   ├── theme.js          # Dark/light theme toggle
│   │   │   ├── language.js       # Multilingual engine (core)
│   │   │   ├── analytics.js      # Multi-provider analytics
│   │   │   ├── navigation.js     # Mobile menu
│   │   │   ├── accordion.js      # FAQ accordion (class)
│   │   │   ├── faq-filter.js     # FAQ filtering (class)
│   │   │   ├── form-validation.js  # Contact form (class)
│   │   │   ├── scroll-behavior.js  # Navbar scroll + smooth scroll
│   │   │   ├── scroll-animations.js  # Reveal on scroll (class)
│   │   │   ├── rotating-text.js  # Hero text animation
│   │   │   ├── back-to-top.js    # Back-to-top button
│   │   │   ├── lazy-loading.js   # Image lazy loading
│   │   │   └── translations/     # Modular translation system
│   │   │       ├── index.js      # Translation registry/loader
│   │   │       ├── en.js         # English translations
│   │   │       ├── he.js         # Hebrew translations
│   │   │       ├── es.js         # Spanish translations
│   │   │       ├── _template.js  # Template for new languages
│   │   │       └── README.md     # Translation system docs
│   │   │
│   │   └── images/               # Image assets
│   │       ├── logo.svg
│   │       ├── og-default.jpg
│   │       ├── about/profile.jpg
│   │       └── [favicons]
│   │
│   ├── blog/                     # Blog posts (Markdown)
│   │   └── *.md                  # Post files with frontmatter
│   │
│   ├── index.html                # Homepage
│   ├── blog.html                 # Blog listing page
│   ├── thank-you.html            # Form thank-you page
│   └── robots.txt
│
├── dist/                         # Build output (generated, gitignored)
│   └── [generated files]
│
├── .eleventy.js                  # Eleventy configuration (CommonJS)
├── vite.config.mjs               # Vite configuration (ESM)
├── biome.json                    # Biome linter/formatter config
├── package.json                  # Dependencies and scripts
├── .nvmrc                        # Node version (20)
├── .editorconfig                 # Editor configuration
├── .gitignore                    # Git ignore patterns
├── .clinerules                   # AI assistant rules
├── .clineignore                  # AI assistant ignore patterns
│
├── IMPLEMENTATION_PLAN.md        # Development roadmap (for template developers)
├── progress.md                   # Progress tracker (gitignored, optional for users)
├── activeContext.md              # Session context (gitignored, optional for users)
└── README.md                     # Main documentation
```

### File Naming Conventions

- **SCSS partials:** Prefix with underscore (`_variables.scss`, `_mixins.scss`)
- **Components:** BEM naming in HTML/CSS (`nav__logo`, `hero__title`, `button--primary`)
- **JavaScript:** camelCase for files (`formValidation.js`), PascalCase for classes (`FAQAccordion`)
- **Layouts:** Plain names (`base.html`, `post.html`)
- **Data files:** Plain JavaScript (`site.js`)

### Where to Add New Files

- **New page:** Add `.html` or `.md` file to `src/` root
- **New component:** Add to `src/_includes/components/`
- **New partial:** Add to `src/_includes/partials/`
- **New SCSS component:** Add to `src/assets/scss/components/` and import in `main.scss`
- **New JS module:** Add to `src/assets/js/` and import in `partials/scripts.html`
- **New language:** Copy `src/assets/js/translations/_template.js` to `[code].js`
- **New blog post:** Add `.md` file to `src/blog/` with frontmatter

---

## Build Process

### Development Workflow

```bash
npm run dev
```

**What happens:**
1. `sass` watches `src/assets/scss/main.scss` and compiles to `src/assets/css/main.css` on changes
2. `eleventy --serve` watches all source files and rebuilds on changes
3. Both run concurrently via `concurrently` package
4. Dev server runs at `http://localhost:8080` with hot reload

**Watched files:**
- All HTML/Nunjucks templates in `src/`
- All Markdown files
- All data files in `src/_data/`
- Compiled CSS (auto-recompiled from SCSS)
- JavaScript modules (pass-through copied)

### Production Build

```bash
npm run build
```

**What happens:**
1. `sass` compiles SCSS to CSS (no source maps)
2. `eleventy` generates static HTML files
3. Output written to `dist/` directory

**Build output:**
- HTML files (index.html, blog.html, etc.)
- Blog post pages (dist/blog/post-slug/index.html)
- Compiled CSS (dist/assets/css/main.css)
- JavaScript modules (copied as-is, dist/assets/js/*.js)
- Images and static assets (copied, dist/assets/images/*)
- robots.txt, favicons, etc.

### Asset Pipeline

**SCSS Compilation:**
- Entry: `src/assets/scss/main.scss`
- Output: `src/assets/css/main.css`
- Process: Sass CLI compilation (not Vite/Webpack)
- Variables, mixins, partials all resolved at compile time
- CSS custom properties preserved for runtime theming

**JavaScript Modules:**
- Source: `src/assets/js/*.js`
- Output: `dist/assets/js/*.js` (copied as-is)
- Format: ES modules (loaded with `type="module"`)
- No bundling, no transpilation
- Browser-native module loading

**Images:**
- Source: `src/assets/images/*`
- Output: `dist/assets/images/*` (copied as-is)
- No automatic optimization (manual or via workflow skill)
- Lazy loading via JavaScript

**Passthrough Copy:**
- All files in `src/assets/` copied to `dist/assets/`
- `robots.txt`, `sitemap.xml` copied to `dist/`
- `contact-handler.php` copied to `dist/`
- `.htaccess` copied to `dist/`

### Build Scripts Reference

```json
{
  "dev": "concurrently \"npm:scss:watch\" \"npm:eleventy:dev\"",
  "build": "npm run scss:build && eleventy",
  "preview": "eleventy --serve --host",
  "serve": "npm run build && npm run preview",

  "scss:build": "sass src/assets/scss/main.scss:src/assets/css/main.css --no-source-map",
  "scss:watch": "sass src/assets/scss/main.scss:src/assets/css/main.css --watch --no-source-map",

  "eleventy": "eleventy",
  "eleventy:dev": "eleventy --serve",

  "lint": "biome lint src",
  "lint:fix": "biome lint src --write",
  "format": "biome format src --write",
  "format:check": "biome format src",
  "check": "biome check src",
  "check:fix": "biome check src --write"
}
```

---

## Technical Constraints

### Browser Support

**Modern browsers only:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

**Features requiring modern browsers:**
- ES6 modules (type="module")
- CSS custom properties (dark mode)
- CSS Grid and Flexbox
- IntersectionObserver (lazy loading, scroll animations)
- localStorage API
- CustomEvent API

**No support for:**
- Internet Explorer 11
- Older Android browsers (< 2020)

### Performance Targets

**Lighthouse scores (production):**
- Performance: 90+ (desktop), 85+ (mobile)
- Accessibility: 100
- Best Practices: 90+
- SEO: 90+

**Actual production results (Weave Studio):**
- Performance: 95+ desktop
- Accessibility: 100
- Full WCAG 2.1 AA compliance

### Accessibility Requirements

**WCAG 2.1 Level AA compliance:**
- ✅ Keyboard navigation for all interactive elements
- ✅ Focus indicators visible and clear
- ✅ ARIA labels on all components
- ✅ Semantic HTML structure
- ✅ Color contrast ratios (4.5:1 for text, 3:1 for UI)
- ✅ Screen reader support (tested with VoiceOver/NVDA)
- ✅ Skip links for main content
- ✅ Form labels and error messages
- ✅ No keyboard traps
- ✅ Respects prefers-reduced-motion
- ✅ Live regions for dynamic content

### RTL Support Requirements

**Full RTL (right-to-left) support:**
- ✅ Automatic `dir="rtl"` attribute based on language
- ✅ Mirrored layouts (flexbox reverse, transforms)
- ✅ Logical properties where applicable
- ✅ Icon flipping (arrows, chevrons)
- ✅ Mobile menu slide direction reversal
- ✅ RTL-specific font family override
- ✅ Text alignment reversal
- ✅ No horizontal scroll issues

**Supported RTL languages:**
- Hebrew (he) - fully tested
- Arabic (ar) - architecture supports, needs translation file
- Farsi/Persian (fa) - architecture supports, needs translation file

**Note:** Currently, some templates have hardcoded references to Hebrew (`language == "he"`). See [Known Limitations](#known-limitations) below.

---

## Project-Specific Sections

**👉 Fill in these sections with your deployment and integration details.**

### Custom Build Steps

- **Pre-build tasks:** [None yet / List custom tasks]
- **Post-build tasks:** [None yet / List custom tasks]
- **Environment variables:** [List if any]
- **Build optimizations:** [Image compression, minification, etc.]

### Third-Party Integrations

- **Analytics provider:** [Google Analytics 4 / Plausible / Fathom / None]
- **Tracking ID:** [Your tracking ID]
- **Form backend:** [contact-handler.php / Netlify Forms / Formspree / Other]
- **CMS integration:** [None / Netlify CMS / Decap CMS / Other]
- **CDN:** [Netlify / Cloudflare / None]
- **Email service:** [For contact form - SendGrid / Mailgun / PHP mail() / Other]
- **Other services:** [List any other integrations]

### Deployment Target

- **Hosting platform:** [Netlify / Vercel / Traditional hosting / GitHub Pages / Other]
- **Domain:** [your-domain.com]
- **SSL/HTTPS:** [Automatic via platform / Manual certificate / Cloudflare]
- **Deployment method:** [Git-based auto-deploy / Manual FTP / CI/CD pipeline]
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Environment:** [Production / Staging / Both]

### Performance Optimizations Applied

- [List custom optimizations beyond template defaults]
- [e.g., Image compression, CDN setup, Preload critical assets]

---

## Architecture Decisions

### Why Eleventy?

- Simple, flexible, JavaScript-based
- No client-side framework overhead
- Fast build times
- Great for content-focused sites
- Easy to understand and customize

### Why Vanilla JavaScript?

- Zero runtime dependencies
- Faster page loads
- Smaller bundle sizes
- Full browser API access
- Easier to maintain and debug
- No framework lock-in

### Why SCSS over CSS-in-JS?

- Better for static sites (compiled at build time)
- No runtime overhead
- Familiar syntax for most developers
- Great tooling and editor support
- Clear separation of concerns

### Why Biome over ESLint/Prettier?

- 10-20x faster than ESLint
- Unified tool (no config conflicts)
- Rust-based (performance)
- Simpler configuration
- Active development and modern approach

### Why Component/Partial Split?

- **Components:** Larger, reusable UI elements (nav, footer, hero)
- **Partials:** Small, focused snippets (head, scripts, meta tags)
- Clear mental model for organization
- Easier to find and edit specific parts

---

## Data Flow

### Language System Flow

```
1. Page loads
2. theme.js runs (inline in <head>, prevents FOUC)
3. language.js initializes:
   - Reads language from: blog post attr → localStorage → navigator → default
   - Loads translation file from translations/ registry
   - Updates HTML lang/dir attributes
   - Updates all [data-i18n] elements
   - Builds language switcher (toggle or dropdown)
4. User changes language:
   - Click event → setLanguage(newLang)
   - Updates localStorage
   - Updates HTML attributes
   - Updates all content
   - Dispatches 'languageChanged' CustomEvent
5. Other modules listen for 'languageChanged':
   - form-validation.js updates error messages
   - rotating-text.js swaps word list
```

### Theme System Flow

```
1. Inline script in <head> runs BEFORE page render:
   - Reads localStorage('theme')
   - OR checks prefers-color-scheme
   - Sets data-theme attribute on <html>
2. CSS loads with correct theme (no FOUC)
3. User clicks theme toggle:
   - theme.js toggles data-theme attribute
   - Updates localStorage
4. System preference changes:
   - mediaQuery listener fires
   - Auto-switches ONLY if no manual preference stored
```

### Form Validation Flow

```
1. ContactFormValidator initializes
2. Sets novalidate on form (custom validation)
3. Attaches blur/input listeners to fields
4. On blur: validate field, show errors if invalid
5. On input: revalidate, hide errors when valid
6. On submit:
   - Validate all fields
   - If invalid: focus first error, prevent submit
   - If valid: show loading state, submit natively to PHP
7. On languageChanged event:
   - Re-fetch error messages from getCurrentTranslations()
   - Revalidate any visible errors with new messages
```

### Blog Collection Flow

```
1. .eleventy.js reads site.js multilingual.languages array
2. For each language, creates a collection:
   - Collection name: blog{CodeCapitalized} (e.g., blogEn, blogHe)
   - Filters blog/*.md by frontmatter language field
   - Sorts by date descending
3. Templates access collections:
   - blog.html uses collections.blog (all posts)
   - Language-specific pages use collections.blogEn, etc.
4. Blog posts use post.html layout:
   - Includes data-post-lang and data-post-url attributes
   - Language switcher redirects via URL manipulation
```

---

## Key Files Deep Dive

### site.js (Global Configuration)

Location: [`src/_data/site.js`](../../src/_data/site.js)

```javascript
module.exports = {
  title: 'Your Site Title',
  description: 'Your site description',
  url: 'https://example.com',
  author: 'Your Name',

  multilingual: {
    defaultLanguage: 'en',
    storageKey: 'site-language',
    languages: [
      { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
      { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
      { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' }
    ]
  },

  analytics: {
    provider: 'none',  // 'ga4' | 'plausible' | 'fathom' | 'none'
    trackingId: '',
    respectDNT: true,
    anonymizeIP: true
  }
}
```

**Used by:**
- `.eleventy.js` (creates per-language blog collections)
- `analytics.html` partial (injects config as JSON)
- `language.js` mirrors this config internally

### base.html (Master Layout)

Location: [`src/_includes/layouts/base.html`](../../src/_includes/layouts/base.html)

```html
<!doctype html>
<html lang="{% if language %}{{ language }}{% else %}en{% endif %}"
  {% if language == "he" %} dir="rtl" {% endif %}>
  <head>{% include 'partials/head.html' %}</head>
  <body class="{% if language == 'he' %}rtl{% endif %}"
    data-language="{% if language %}{{ language }}{% else %}en{% endif %}">
    <a href="#main-content" class="skip-link sr-only">Skip to main content</a>
    {% include 'components/svg-icons.html' %}
    {% include 'components/nav.html' %}
    {{ content }}
    {% include 'components/footer.html' %}
    {% include 'partials/scripts.html' %}
  </body>
</html>
```

**Key features:**
- 37 lines (down from 277 - 86% reduction)
- Uses includes for all major sections
- Sets lang and dir attributes from frontmatter
- Includes skip link for accessibility
- data-language attribute for JS detection

**Note:** Currently has hardcoded `language == "he"` check - see [Known Limitations](#known-limitations).

### language.js (Multilingual Engine)

Location: [`src/assets/js/language.js`](../../src/assets/js/language.js)

**Exports:**
- `initLanguage()` - Initialize system
- `toggleLanguage()` - Switch languages
- `getCurrentLanguage()` - Get active language code
- `getCurrentTranslations()` - Get active translation object

**Key functions:**
- `setLanguage(langCode)` - Updates language, content, attributes, dispatches event
- `updateAllContent()` - Updates all [data-i18n] elements
- `buildLanguageSwitcher()` - Creates toggle (2 langs) or dropdown (3+)
- `updateLanguageDropdown()` - Updates active state without rebuilding

**State:**
- `currentLanguage` - Active language code
- `currentTranslations` - Active translation object
- `dropdownBuilt` - Flag prevents duplicate dropdown building

---

## Common Tasks

### Adding a New Page

1. Create `src/new-page.html`
2. Add frontmatter with layout
3. Add translation keys to all language files
4. Use `data-i18n` attributes for translatable content
5. Build and test

### Adding a New Section

1. **Plan the section structure:**
   - Decide on semantic HTML (section, div, article, etc.)
   - Identify reusable sub-components
   - Plan translation keys

2. **Add HTML to page:**
   ```html
   <section id="section-name" class="section-name" aria-labelledby="section-name-title">
     <div class="section-name__container">
       <h2 id="section-name-title" class="section-title" data-i18n="sectionName.title">
         Section Title
       </h2>
       <!-- content here -->
     </div>
   </section>
   ```

3. **Create SCSS component:**
   - Create `src/assets/scss/components/_section-name.scss`
   - Use BEM naming: `.section-name`, `.section-name__element`, `.section-name--modifier`
   - Import in `main.scss`: `@forward 'components/section-name';`

4. **Add dark mode styles:**
   - Add `[data-theme='dark'] .section-name` rules in `themes/_dark-mode.scss`

5. **Add RTL styles (if needed):**
   - Add `[dir='rtl'] .section-name` rules in `themes/_rtl.scss`

6. **Add translations:**
   - Add `sectionName: { ... }` object to all language files (en.js, he.js, es.js)

7. **Add accessibility:**
   - Ensure proper heading hierarchy
   - Add ARIA labels where needed
   - Test keyboard navigation

8. **Test:**
   - Light/dark mode
   - All languages
   - RTL layout
   - Mobile responsive
   - Accessibility

### Adding a New Component

1. Create `src/_includes/components/component-name.html`
2. Create `src/assets/scss/components/_component-name.scss`
3. Import in `main.scss`: `@forward 'components/component-name';`
4. Add dark mode styles in `themes/_dark-mode.scss` if needed
5. Add RTL styles in `themes/_rtl.scss` if needed
6. Include component where needed: `{% include 'components/component-name.html' %}`

### Adding a New Language

See [customization-guide.md](./customization-guide.md#adding-languages) for detailed steps.

**Quick version:**
1. Copy `src/assets/js/translations/_template.js` to `[code].js`
2. Translate all strings
3. Import in `translations/index.js` and add to registry
4. Add to `site.js` languages array
5. Test language switching

---

## Troubleshooting

### Build fails with SCSS error

- Check syntax in SCSS files
- Ensure all imports exist
- Verify variable names match in _variables.scss
- Run `npm run scss:build` separately to isolate error

### JavaScript modules not loading

- Check browser console for errors
- Verify `type="module"` attribute in scripts
- Ensure file paths are correct (case-sensitive)
- Check browser supports ES modules

### Dark mode not working

- Verify inline script in head.html runs first
- Check localStorage key matches theme.js
- Ensure CSS custom properties defined in _custom-properties.scss
- Verify dark mode overrides exist in _dark-mode.scss

### Language switching not working

- Check translation files imported in translations/index.js
- Verify language exists in site.js languages array
- Check browser console for errors
- Verify data-i18n attributes match translation keys

### RTL layout broken

- Check `dir="rtl"` attribute set on <html>
- Verify RTL styles exist in _rtl.scss
- Check for hardcoded directional values (left/right)
- Test clip-rect technique for ARIA live regions (not left/right positioning)

### New RTL language not working

- Check if templates have hardcoded `language == "he"` checks
- You may need to add language-specific conditionals to templates (e.g., `or language == "ar"`)
- Or implement dynamic RTL detection via Eleventy filter
- See IMPLEMENTATION_PLAN.md "Known Issues" section for details

---

**Last Updated:** 2026-01-29
**Template Version:** 1.0.0 (in development)
