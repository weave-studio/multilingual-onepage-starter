# Skill: Setup Fresh Project

> Initial setup workflow for starting a new project from the template

## Purpose

This skill guides you through the complete initial setup of a new project using the Multilingual One-Page Starter template. You'll gather project information, configure languages, update content, customize theme, and prepare for development - all in a systematic workflow.

**This is your starting point.** Complete this skill before using others.

## Prerequisites

- [ ] Template repository cloned or downloaded
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Text editor or IDE ready
- [ ] Basic project information gathered (see Input section)

## Input

Gather this information before starting:

| Information | Example | Why Needed |
|-------------|---------|------------|
| Project name | "Acme Corp Website" | Branding, titles |
| Description | "Professional services for..." | SEO, meta tags |
| Site URL | "https://acmecorp.com" | Configuration, meta tags |
| Target audience | "Small business owners" | Context for customization |
| Languages needed | English, Spanish, French | Multilingual configuration |
| Analytics provider | Google Analytics 4 | Tracking setup |
| Brand colors | #3b82f6 (blue) | Theme customization |
| Logo/branding files | logo.svg, favicon.ico | Visual identity |

## Steps

### Step 1: Install Dependencies

```bash
# Navigate to project directory
cd multilingual-onepage-starter

# Install dependencies
npm install

# Verify installation
npm run build
```

**Expected output:**
```
[11ty] Writing dist/index.html from ./src/index.html
[11ty] Writing dist/blog.html from ./src/blog.html
...
[11ty] Wrote 8 files in 0.89 seconds
```

### Step 2: Initialize AI Context & Session Files

**Purpose:** Set up files that help AI assistants understand your project and track progress.

**A. Create session tracking files (optional but recommended):**

```bash
# Copy templates to create your session files
cp .ai/examples/session-context-template.md activeContext.md
cp .ai/examples/progress-tracking-template.md progress.md
cp .ai/examples/implementation-plan-template.md implementation-plan.md
```

These files are already in `.gitignore` and won't be committed - they're for your personal use.

**B. Fill in basic project information:**

Open `implementation-plan.md` and fill in:
- Project name and description
- Target completion timeline
- Primary goals
- Planned languages

Open `.ai/context/project-overview.md` and fill in the placeholder sections:
```markdown
## Project Information

- **Project Name:** Acme Corp Website
- **Description:** Professional services for small businesses
- **Target Audience:** Small business owners
- **Primary Goals:** Lead generation, showcase services
```

**Why this helps:** AI assistants (Claude Code, Cline, Cursor) can read these files to understand your project context, making their suggestions more relevant and helpful.

**C. Update activeContext.md (if using):**

Document what you're about to do:
```markdown
## Current Task
Setting up new project from multilingual template

## Next Steps
- Configure site.js with project info
- Configure languages (keeping en, es, removing he)
- Update translations with our content
```

### Step 3: Update site.js Configuration

**File:** `src/_data/site.js`

**A. Basic information:**
```javascript
module.exports = {
  title: 'Acme Corp',  // ← Your project name
  description: 'Professional services for small businesses',  // ← Your description
  url: 'https://acmecorp.com',  // ← Your domain (or temporary)
  author: 'John Smith',  // ← Your name
```

**B. Review multilingual config:**
```javascript
multilingual: {
  defaultLanguage: 'en',  // Keep or change to your primary language
  storageKey: 'site-language',  // Keep as-is
  languages: [
    // Review: Do you need all 3 languages (en, he, es)?
    // Add more? Remove some?
  ]
}
```

**C. Configure analytics (or set to 'none'):**
```javascript
analytics: {
  provider: 'none',  // Change to 'ga4', 'plausible', or 'fathom' when ready
  trackingId: '',
  respectDNT: true,
  anonymizeIP: true
}
```

### Step 4: Configure Languages

**Choose your scenario:**

#### Scenario A: Keep Default Languages (English, Hebrew, Spanish)
✅ Skip to Step 4

#### Scenario B: Remove Unwanted Languages
Use [remove-language.md](./remove-language.md) skill:
- If removing Hebrew: Follow skill to remove from 4 config locations
- If removing Spanish: Follow skill to remove from 4 config locations

#### Scenario C: Add New Languages
Use [add-new-language.md](./add-new-language.md) skill:
- Example: Add French, German, Arabic, etc.
- Requires creating translation file and registering in 4 locations

#### Scenario D: Replace Languages
Use [replace-language.md](./replace-language.md) skill:
- Example: Replace Spanish with French
- More efficient than remove + add separately

**Result:** Your `site.js`, `language.js`, and translation files should only include languages you need.

### Step 5: Update Translation Content

**For EACH language you're keeping**, update the translation file:

**Files:**
- `src/assets/js/translations/en.js`
- `src/assets/js/translations/he.js` (if keeping)
- `src/assets/js/translations/es.js` (if keeping)

**Update these sections at minimum:**

```javascript
export default {
  meta: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr'
  },

  // Navigation
  nav: {
    logo: 'Acme Corp',  // ← Your company name
    logoText1: 'Acme',  // ← First part for split styling (if using two-tone logo)
    logoText2: 'Corp',  // ← Second part for split styling
    // ... update other nav items
  },

  // Hero section
  hero: {
    titleFirstLine: 'Your tagline',  // ← Your hero text
    titleAnimated: 'websites',
    rotatingWords: ['websites', 'solutions', 'services'],  // ← Your rotating words
    description: 'Your value proposition...',  // ← Your description
    // ...
  },

  // About section
  about: {
    content: {
      paragraph1: 'Your company story...',  // ← Your content
      // ...
    },
    profile: {
      name: 'Your Name',  // ← Your name
      title: 'Your Title'  // ← Your title
    }
  },

  // Contact section
  contact: {
    details: {
      email: { label: 'Email', value: 'hello@acmecorp.com' },  // ← Your email
      // ...
    }
  },

  // Footer
  footer: {
    logo: 'Acme Corp',  // ← Your company name
    description: 'Your company description',  // ← Your description
    copyright: '© Copyright 2026 Acme Corp | All Rights Reserved.',  // ← Your copyright
  },

  // Page meta (SEO)
  pageMeta: {
    title: 'Acme Corp - Professional Services',  // ← Your SEO title
    description: 'Your meta description...',  // ← Your meta description
    // ...
  }
}
```

**Repeat for ALL language files** with translated content.

### Step 6: Update HTML Frontmatter (if needed)

**File:** `src/index.html`

Update page-level metadata:
```yaml
---
layout: layouts/base.html
title: Acme Corp - Professional Services  # ← Your title
description: Professional services for small businesses  # ← Your description
language: en
---
```

**Repeat for other HTML pages** (blog.html, thank-you.html, legal-notice.html).

### Step 7: Customize Theme (Optional but Recommended)

Use [customize-theme.md](./customize-theme.md) skill to:

**A. Change accent color:**
- Open `src/assets/scss/_variables.scss`
- Update `$theme-accent-primary` and related variables
- Use brand colors

**B. Change fonts (optional):**
- Update Google Fonts link in `src/_includes/partials/head.html`
- Update font variables in `_variables.scss`

**C. Test customization:**
```bash
npm run dev
```

Visit [http://localhost:8080](http://localhost:8080) and verify:
- [ ] Colors match brand
- [ ] Fonts look good
- [ ] Light and dark mode both work

### Step 8: Add/Remove Sections (Optional)

**Remove unwanted sections:**

1. Delete section HTML from `src/index.html`
2. Comment out or remove corresponding SCSS `@forward` in `src/assets/scss/main.scss`
3. Remove navigation link (if added)
4. Test build

**Add custom sections:**

Use [create-page-section.md](./create-page-section.md) skill to add:
- Testimonials section
- Pricing section
- Team section
- Features section
- Custom content

### Step 9: Replace Logo and Favicon

**Logo:**
1. Add your logo: `src/assets/images/logo.svg` (or .png)
2. Update navigation component if logo needs custom styling

**Favicon:**
1. Generate favicon package: [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Replace files in `src/assets/images/favicon/`
3. Verify links in `src/_includes/partials/head.html`

### Step 10: Finalize AI Context with Decisions Made

**Purpose:** Document the final decisions you made during setup so AI assistants have complete context.

**File:** `.ai/context/project-overview.md`

Update with your actual decisions from steps 3-9:

```markdown
## Project Information

- **Project Name:** Acme Corp Website
- **Description:** Professional services website targeting small businesses
- **Target Audience:** Small business owners in North America
- **Primary Goals:** Lead generation, brand awareness, service showcase

## Languages

- **Default Language:** English
- **Supported Languages:** English, Spanish (removed Hebrew)
- **Notes:** Spanish added for Latin American market expansion

## Theme Customization

- **Brand Colors:** Primary #3b82f6, Accent #e8a587
- **Fonts:** Montserrat (headings), Merriweather (body)
- **Sections Removed:** Portfolio (not needed yet)
- **Sections Added:** Testimonials section

## Deployment

- **Hosting Platform:** Netlify
- **Domain:** acmecorp.com
- **SSL:** Auto-provisioned via Netlify
```

**File:** `implementation-plan.md`

Mark Phase 1-2 as complete and update Phase 3+ with actual plans.

This gives AI assistants complete context for helping with future customization.

### Step 11: Test Complete Build

```bash
# Run full build
npm run build

# Run linting
npm run check

# Start dev server
npm run dev
```

**Verification checklist:**
- [ ] Build succeeds with no errors
- [ ] Biome linting passes
- [ ] All pages load (/, /blog/, /thank-you/, /legal-notice/)
- [ ] Language switcher cycles through your languages
- [ ] Dark mode toggle works
- [ ] All sections render correctly
- [ ] Forms work (if not using PHP handler, they won't submit yet)
- [ ] No console errors
- [ ] Mobile responsive (test at 375px, 768px, 1200px)

### Step 12: Set Up Git Repository

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# First commit
git commit -m "Initial project setup for Acme Corp"

# Add remote and push
git remote add origin https://github.com/yourusername/acmecorp-website.git
git branch -M main
git push -u origin main
```

### Step 13: Next Steps Checklist

After initial setup, proceed with:

- [ ] **Content:** Add/edit sections with real content
- [ ] **Blog:** Create blog posts using [add-blog-post.md](./add-blog-post.md)
- [ ] **Images:** Optimize all images using [optimize-images.md](./optimize-images.md)
- [ ] **Analytics:** Configure tracking using [setup-analytics.md](./setup-analytics.md)
- [ ] **Testing:** Test thoroughly on multiple devices and browsers
- [ ] **Deploy:** Deploy to hosting using [deploy-site.md](./deploy-site.md)
- [ ] **SEO:** Submit sitemap to Google Search Console
- [ ] **Monitoring:** Set up uptime monitoring (UptimeRobot, Pingdom)

## Validation Checklist

### Configuration
- [ ] `site.js` updated with project info
- [ ] Languages configured (added/removed as needed)
- [ ] Translation files updated with your content
- [ ] Analytics configured or set to 'none'

### Branding
- [ ] Company name updated in all translations
- [ ] Logo and favicon replaced
- [ ] Brand colors applied
- [ ] Fonts customized (if needed)

### Content
- [ ] Hero section text updated
- [ ] Services/sections reflect your offerings
- [ ] About section tells your story
- [ ] Contact information correct
- [ ] Footer content updated
- [ ] Legal notice/privacy policy updated (if applicable)

### Technical
- [ ] Build succeeds (`npm run build`)
- [ ] Linting passes (`npm run check`)
- [ ] Dev server runs (`npm run dev`)
- [ ] All pages accessible
- [ ] No console errors
- [ ] Git repository initialized

### Quality
- [ ] Light mode looks good
- [ ] Dark mode looks good
- [ ] Mobile responsive (375px, 768px)
- [ ] Desktop looks professional (1200px+)
- [ ] All links work
- [ ] Language switcher functions
- [ ] Forms validate (if using)

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Build fails after language changes | Didn't update all 4 config locations | Verify `translations/[code].js`, `translations/index.js`, `site.js`, `language.js` |
| Translation shows keys not text | Keys don't match between HTML and JS | Check `data-i18n` attributes match translation file keys |
| Language switcher shows wrong count | `site.js` and `language.js` mismatch | Ensure both have same language list |
| Theme colors don't change | Using hardcoded colors not variables | Use `var(--theme-*)` custom properties |
| Images 404 after build | Passthrough copy not working | Verify `.eleventy.js` has `addPassthroughCopy('src/assets')` |
| Fonts don't load | Font URL incorrect | Check `head.html` font link matches font name in variables |

## Related Skills

**Essential follow-ups:**
- [add-blog-post.md](./add-blog-post.md) - Create content
- [customize-theme.md](./customize-theme.md) - Further customization
- [setup-analytics.md](./setup-analytics.md) - Add tracking
- [deploy-site.md](./deploy-site.md) - Go live

**Language management:**
- [add-new-language.md](./add-new-language.md) - Add languages
- [remove-language.md](./remove-language.md) - Remove languages
- [replace-language.md](./replace-language.md) - Swap languages

**Advanced:**
- [create-page-section.md](./create-page-section.md) - Add sections
- [optimize-images.md](./optimize-images.md) - Performance

## Reference

- [`.ai/context/project-overview.md`](../context/project-overview.md) - Project context template
- [`.ai/context/architecture.md`](../context/architecture.md) - Technical documentation
- [`.ai/context/patterns.md`](../context/patterns.md) - Code patterns
- [`.ai/context/customization-guide.md`](../context/customization-guide.md) - Detailed guides

## Notes

- **Time estimate:** Allow 2-4 hours for complete initial setup
- **Incremental approach:** You don't have to finish everything in one session - complete configuration first, then customize over time
- **Placeholder content:** Keep template content initially, replace section by section to avoid breaking layout
- **AI assistance:** With context files filled in, AI assistants (Claude Code, Cline, Cursor) can help with customization
- **Git commits:** Commit after each major step (languages configured, theme customized, content updated)
- **Backup:** Keep the original template in a separate folder as reference
- **Version control:** Use branches for major changes (e.g., `feature/testimonials-section`)

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-30
**Complexity:** Medium
**Estimated Time:** 2-4 hours