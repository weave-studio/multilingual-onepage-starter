# Customization Guide

This guide provides step-by-step instructions for common customizations to the Multilingual One-Page Starter template.

## Table of Contents

- [Customizing Colors](#customizing-colors)
- [Customizing Fonts](#customizing-fonts)
- [Changing Branding](#changing-branding)
- [Adding New Sections](#adding-new-sections)
- [Adding New Languages](#adding-new-languages)
- [Removing Languages](#removing-languages)
- [Modifying Layouts](#modifying-layouts)
- [Adding New Pages](#adding-new-pages)
- [Customizing Components](#customizing-components)
- [What Not to Break](#what-not-to-break)

---

## Customizing Colors

### Changing the Accent Color

**Location:** [`src/assets/scss/_variables.scss`](../../src/assets/scss/_variables.scss)

The template uses a terracotta/peach accent color (#e8a587) by default. To change it:

1. **Find the accent color variables:**
   ```scss
   // Light theme accent
   $theme-accent-primary: #e8a587;
   $theme-accent-primary-hover: #f4c4ab;

   // Dark theme accent
   $theme-accent-primary-dark: #c9826b;
   $theme-accent-primary-hover-dark: #b57359;
   ```

2. **Replace with your brand color:**
   ```scss
   // Example: Change to blue accent
   $theme-accent-primary: #3b82f6;
   $theme-accent-primary-hover: #60a5fa;

   $theme-accent-primary-dark: #2563eb;
   $theme-accent-primary-hover-dark: #1d4ed8;
   ```

3. **Test in both themes:**
   - Run `npm run dev`
   - Toggle between light and dark mode
   - Verify contrast ratios meet WCAG 2.1 AA standards

### Changing Primary/Secondary Colors

**For a complete rebrand:**

1. **Replace the primary color palette:**
   ```scss
   // Current: Sky blue
   $color-primary-500: #0ea5e9;

   // Change to your brand color
   $color-primary-500: #7c3aed;  // Purple example
   ```

2. **Generate a full palette using a tool:**
   - Use [Tailwind Color Shades Generator](https://uicolors.app/create)
   - Generate shades from 50 to 950
   - Replace all `$color-primary-*` variables

3. **Update neutral colors (optional):**
   ```scss
   // Current: Cool gray
   $color-neutral-50: #f8fafc;
   $color-neutral-900: #0f172a;

   // Change to warm gray, blue-gray, etc.
   ```

### Changing Background Colors

**Location:** [`src/assets/scss/_variables.scss`](../../src/assets/scss/_variables.scss)

1. **Find theme background variables:**
   ```scss
   // Hero gradient (light mode)
   $theme-hero-gradient-start: #f0f4f8;
   $theme-hero-gradient-end: #d4e2f1;

   // Hero gradient (dark mode)
   $theme-hero-gradient-start-dark: #0a1628;
   $theme-hero-gradient-end-dark: #1e3a5f;
   ```

2. **Replace with your colors:**
   ```scss
   // Example: Warmer gradient
   $theme-hero-gradient-start: #fef3e2;
   $theme-hero-gradient-end: #f9d5a7;
   ```

3. **Update CSS custom properties if needed:**

   Check [`src/assets/scss/base/_custom-properties.scss`](../../src/assets/scss/base/_custom-properties.scss) to ensure your changes are mapped to CSS variables.

### Testing Color Changes

**Checklist:**
- [ ] Light mode: All text readable (contrast check)
- [ ] Dark mode: All text readable (contrast check)
- [ ] Buttons: Hover states visible
- [ ] Links: Clear and distinguishable
- [ ] Focus indicators: Visible on all interactive elements
- [ ] Forms: Error states clearly visible

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Browser DevTools: Lighthouse accessibility audit
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

---

## Customizing Fonts

### Changing to Google Fonts

**Example: Switch to Montserrat + Merriweather**

1. **Update font imports in [`src/_includes/partials/head.html`](../../src/_includes/partials/head.html):**

   Find this section:
   ```html
   <!-- Fonts - Inter (sans-serif) for body text -->
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link
     rel="stylesheet"
     href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
   />
   ```

   Replace with:
   ```html
   <!-- Fonts - Montserrat (headings) + Merriweather (body) -->
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link
     rel="stylesheet"
     href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Merriweather:wght@400;700&display=swap"
   />
   ```

2. **Update SCSS variables in [`src/assets/scss/_variables.scss`](../../src/assets/scss/_variables.scss):**

   Find:
   ```scss
   // Typography - Font Families
   $font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
   $font-family-headings: 'Georgia', serif;
   ```

   Replace with:
   ```scss
   // Typography - Font Families
   $font-family-primary: 'Merriweather', Georgia, serif;
   $font-family-headings: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
   ```

3. **Update Hebrew fonts (if using Hebrew):**

   In the same file:
   ```scss
   // Hebrew font families
   $font-family-primary-hebrew: 'Frank Ruhl Libre', serif;  // Your choice
   $font-family-headings-hebrew: 'Rubik', sans-serif;  // Your choice
   ```

   Then update the font import in `head.html` for Hebrew fonts.

4. **Test thoroughly:**
   - Check all font weights are loaded (400, 600, 700)
   - Verify line-height still works well
   - Test in both languages
   - Check mobile readability

### Using Self-Hosted Fonts

1. **Download fonts and place in [`src/assets/fonts/`](../../src/assets/fonts/):**
   ```
   src/assets/fonts/
   ├── montserrat-regular.woff2
   ├── montserrat-bold.woff2
   ├── merriweather-regular.woff2
   └── merriweather-bold.woff2
   ```

2. **Create [`src/assets/scss/base/_fonts.scss`](../../src/assets/scss/base/_fonts.scss):**
   ```scss
   @font-face {
     font-family: 'Montserrat';
     src: url('/assets/fonts/montserrat-regular.woff2') format('woff2');
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }

   @font-face {
     font-family: 'Montserrat';
     src: url('/assets/fonts/montserrat-bold.woff2') format('woff2');
     font-weight: 700;
     font-style: normal;
     font-display: swap;
   }

   // Repeat for Merriweather...
   ```

3. **Import in [`src/assets/scss/main.scss`](../../src/assets/scss/main.scss):**
   ```scss
   @forward 'base/fonts';  // Add this before other imports
   ```

4. **Remove Google Fonts link from `head.html`**

5. **Update Eleventy config to copy fonts:**

   In [`.eleventy.js`](../../.eleventy.js), add:
   ```javascript
   eleventyConfig.addPassthroughCopy("src/assets/fonts");
   ```

---

## Changing Branding

### Replacing the Logo

1. **Prepare your logo:**
   - **Format:** SVG recommended (scalable, small file size)
   - **Alternative:** PNG with transparent background
   - **Size:** Height ~40-50px for desktop view
   - **Color:** Provide light/dark mode versions if needed

2. **Replace logo file:**
   - Place your logo at [`src/assets/images/logo.svg`](../../src/assets/images/logo.svg)
   - Or use a different filename and update the path

3. **Update navigation component:**

   Edit [`src/_includes/components/nav.html`](../../src/_includes/components/nav.html):

   Find:
   ```html
   <a href="/" class="nav__logo" aria-label="Go to homepage">
     <span class="nav__logo-text nav__logo-text--weave" data-i18n="nav.logoWeave">Weave</span>
     <span class="nav__logo-text nav__logo-text--studio" data-i18n="nav.logoStudio">Studio</span>
   </a>
   ```

   Replace with:
   ```html
   <a href="/" class="nav__logo" aria-label="Go to homepage">
     <img src="/assets/images/logo.svg" alt="Your Company Name" width="150" height="40" />
   </a>
   ```

4. **Update translations:**

   If you removed the logo text spans, you can remove `nav.logoWeave` and `nav.logoStudio` from translation files.

5. **Dark mode logo (optional):**

   If your logo needs a different version for dark mode:

   ```html
   <a href="/" class="nav__logo" aria-label="Go to homepage">
     <img
       src="/assets/images/logo-light.svg"
       alt="Your Company Name"
       class="nav__logo-image nav__logo-image--light"
     />
     <img
       src="/assets/images/logo-dark.svg"
       alt="Your Company Name"
       class="nav__logo-image nav__logo-image--dark"
     />
   </a>
   ```

   Then add CSS in [`src/assets/scss/components/_navigation.scss`](../../src/assets/scss/components/_navigation.scss):
   ```scss
   .nav__logo-image--dark {
     display: none;
   }

   [data-theme='dark'] .nav__logo-image--light {
     display: none;
   }

   [data-theme='dark'] .nav__logo-image--dark {
     display: block;
   }
   ```

### Updating Site Metadata

**Edit [`src/_data/site.js`](../../src/_data/site.js):**

```javascript
module.exports = {
  title: 'Your Business Name',  // Change this
  description: 'Professional services for your industry',  // Change this
  url: 'https://yourdomain.com',  // Change this
  author: 'Your Name',  // Change this

  // Leave multilingual and analytics sections as-is for now
}
```

### Updating Favicon

1. **Generate favicons using [RealFaviconGenerator](https://realfavicongenerator.net/):**
   - Upload your logo/icon
   - Download the generated package

2. **Replace favicon files in [`src/assets/images/`](../../src/assets/images/):**
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png`
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`
   - `site.webmanifest`

3. **Update site.webmanifest with your branding:**
   ```json
   {
     "name": "Your Business Name",
     "short_name": "YourBiz",
     "icons": [
       {
         "src": "/assets/images/android-chrome-192x192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "/assets/images/android-chrome-512x512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ],
     "theme_color": "#0ea5e9",
     "background_color": "#ffffff",
     "display": "standalone"
   }
   ```

### Updating Open Graph Image

The Open Graph image appears when sharing your site on social media.

1. **Create an OG image:**
   - **Size:** 1200x630px (Facebook/LinkedIn standard)
   - **Format:** JPG or PNG
   - **Content:** Your logo + tagline + branded background

2. **Replace [`src/assets/images/og-default.jpg`](../../src/assets/images/og-default.jpg)**

3. **Verify in [`src/_includes/partials/meta-tags.html`](../../src/_includes/partials/meta-tags.html):**
   ```html
   <meta property="og:image" content="{{ site.url }}/assets/images/og-default.jpg" />
   ```

---

## Adding New Sections

> **💡 Automated Skill:** Use the `/create-page-section` skill to automate this process with AI assistance.
See: [`.ai/skills/create-page-section`](../skills/create-page-section.md)

Follow these steps to add a new section to your homepage.

### Step 1: Plan the Section

Decide on:
- **Section name:** (e.g., "testimonials", "pricing", "team")
- **Content:** What will it include?
- **Translation keys:** What text needs translation?

### Step 2: Add HTML Structure

**Edit [`src/index.html`](../../src/index.html):**

```html
<!-- Add after existing sections, before footer include -->
<section id="testimonials" class="testimonials" aria-labelledby="testimonials-title">
  <div class="testimonials__container">
    <h2 id="testimonials-title" class="section-title" data-i18n="testimonials.title">
      What Our Clients Say
    </h2>
    <p class="section-subtitle" data-i18n="testimonials.subtitle">
      Real feedback from real clients
    </p>

    <div class="testimonials__grid">
      <!-- Testimonial cards here -->
      <article class="testimonial-card">
        <p class="testimonial-card__quote" data-i18n="testimonials.items.0.quote">
          "Excellent service and professional results!"
        </p>
        <div class="testimonial-card__author">
          <strong data-i18n="testimonials.items.0.name">John Doe</strong>
          <span data-i18n="testimonials.items.0.company">Acme Corp</span>
        </div>
      </article>

      <!-- Repeat for more testimonials -->
    </div>
  </div>
</section>
```

**Key patterns:**
- Section has `id` matching the section name
- Section has `aria-labelledby` pointing to the heading
- Heading has matching `id`
- All text has `data-i18n` attributes
- Use semantic HTML (`<article>` for repeating items)

### Step 3: Create SCSS Component

**Create [`src/assets/scss/components/_testimonials.scss`](../../src/assets/scss/components/_testimonials.scss):**

```scss
.testimonials {
  padding: $space-16 0;
  background-color: var(--color-neutral-50);

  &__container {
    @include container;
  }

  &__grid {
    display: grid;
    gap: $space-8;
    margin-top: $space-12;

    @include md {
      grid-template-columns: repeat(2, 1fr);
    }

    @include lg {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.testimonial-card {
  @include card-base;
  padding: $space-6;

  &__quote {
    font-size: $font-size-lg;
    line-height: 1.6;
    color: var(--theme-text-primary);
    margin-bottom: $space-4;

    &::before {
      content: '"';
      font-size: $font-size-3xl;
      color: var(--theme-accent-terracotta);
    }
  }

  &__author {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    font-size: $font-size-sm;
    color: var(--theme-text-secondary);

    strong {
      color: var(--theme-text-primary);
      font-weight: $font-weight-semibold;
    }
  }
}
```

**Import in [`src/assets/scss/main.scss`](../../src/assets/scss/main.scss):**

```scss
// Add to components section
@forward 'components/testimonials';
```

### Step 4: Add Dark Mode Styles

**Edit [`src/assets/scss/themes/_dark-mode.scss`](../../src/assets/scss/themes/_dark-mode.scss):**

```scss
[data-theme='dark'] {
  // ... existing dark mode styles ...

  // Testimonials section
  .testimonials {
    background-color: var(--color-neutral-800);
  }

  .testimonial-card {
    background-color: var(--color-neutral-900);
    border-color: var(--color-neutral-700);
  }
}
```

### Step 5: Add RTL Support (if needed)

**Edit [`src/assets/scss/themes/_rtl.scss`](../../src/assets/scss/themes/_rtl.scss):**

```scss
[dir='rtl'] {
  // ... existing RTL styles ...

  // Testimonials
  .testimonial-card__quote::before {
    // In Hebrew/Arabic, quotes might need repositioning
    margin-inline-start: 0;
    margin-inline-end: $space-2;
  }
}
```

### Step 6: Add Translations

**Add to ALL language files:**

**[`src/assets/js/translations/en.js`](../../src/assets/js/translations/en.js):**
```javascript
export default {
  // ... existing translations ...

  testimonials: {
    title: 'What Our Clients Say',
    subtitle: 'Real feedback from real clients',
    items: [
      {
        quote: 'Excellent service and professional results!',
        name: 'John Doe',
        company: 'Acme Corp'
      },
      {
        quote: 'Highly recommended for anyone looking for quality work.',
        name: 'Jane Smith',
        company: 'TechStart Inc'
      }
      // Add more testimonials
    ]
  }
}
```

**Repeat for [`he.js`](../../src/assets/js/translations/he.js) and [`es.js`](../../src/assets/js/translations/es.js).**

### Step 7: Add Navigation Link (optional)

**Edit [`src/_includes/components/nav.html`](../../src/_includes/components/nav.html):**

```html
<li class="nav__menu-item" role="none">
  <a href="#testimonials" class="nav__link" role="menuitem" data-i18n="nav.testimonials">
    Testimonials
  </a>
</li>
```

**Add to translations:**
```javascript
nav: {
  // ... existing nav translations ...
  testimonials: 'Testimonials'
}
```

### Step 8: Test

- [ ] Build succeeds: `npm run build`
- [ ] Section displays correctly in light mode
- [ ] Section displays correctly in dark mode
- [ ] All languages show translated content
- [ ] RTL layout works (if applicable)
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] Keyboard navigation works
- [ ] Screen reader announces section properly

---

## Adding New Languages

> **💡 Automated Skill:** Use the `/add-new-language.md` skill to automate this process with AI assistance.
See: [`.ai/skills/add-new-language.md`](../skills/add-new-language.md)

### Step 1: Copy Translation Template

```bash
cp src/assets/js/translations/_template.js src/assets/js/translations/fr.js
```

Replace `fr.js` with your language code (2-letter ISO 639-1 code).

### Step 2: Update Meta Information

**Edit the new file (`fr.js`):**

```javascript
export default {
  meta: {
    code: 'fr',              // Your language code
    name: 'French',          // English name
    nativeName: 'Français',  // Native name
    dir: 'ltr'               // 'ltr' or 'rtl'
  },

  // Translate ALL strings below...
  nav: {
    logo: 'Votre Logo',
    services: 'Services',
    // ... translate everything
  }
}
```

### Step 3: Translate All Strings

Work through the entire file, translating every string value. The structure must remain identical to the template.

**Tools for translation:**
- Professional translator (recommended)
- [DeepL](https://www.deepl.com/) (good quality)
- Google Translate (acceptable for testing)

**Important:** Translate only the string values, never change the keys.

```javascript
// ✅ Correct
nav: {
  services: 'Services',  // Changed value
  portfolio: 'Portfolio'
}

// ❌ Wrong
navigation: {  // Don't change keys!
  services: 'Services'
}
```

### Step 4: Register the Language

**Edit [`src/assets/js/translations/index.js`](../../src/assets/js/translations/index.js):**

```javascript
import en from './en.js'
import he from './he.js'
import es from './es.js'
import fr from './fr.js'  // Add your import

const translationRegistry = {
  en,
  he,
  es,
  fr  // Add to registry
}

export function getTranslations(langCode) {
  return translationRegistry[langCode] || null
}

export function getAvailableLanguages() {
  return Object.keys(translationRegistry)
}

export function hasLanguage(langCode) {
  return langCode in translationRegistry
}

export function getLanguageMeta(langCode) {
  return translationRegistry[langCode]?.meta || null
}
```

### Step 5: Add to Site Configuration

**Edit [`src/_data/site.js`](../../src/_data/site.js):**

```javascript
multilingual: {
  defaultLanguage: 'en',
  storageKey: 'site-language',
  languages: [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      dir: 'ltr'
    },
    {
      code: 'he',
      name: 'Hebrew',
      nativeName: 'עברית',
      dir: 'rtl'
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      dir: 'ltr'
    },
    {
      code: 'fr',      // Add your language
      name: 'French',
      nativeName: 'Français',
      dir: 'ltr'
    }
  ]
}
```

### Step 6: Add Fonts (if needed)

If your language requires specific fonts (like Hebrew, Arabic, Chinese):

**Edit [`src/_includes/partials/head.html`](../../src/_includes/partials/head.html):**

```html
<!-- French doesn't need special fonts, but Arabic would: -->
{% if language == "ar" %}
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&display=swap"
/>
{% endif %}
```

### Step 7: Test

```bash
npm run dev
```

- [ ] Language appears in switcher (dropdown if 3+ languages)
- [ ] Can switch to new language
- [ ] All content updates to new language
- [ ] Language persists on page reload
- [ ] No console errors
- [ ] If RTL: layout mirrors correctly
- [ ] If RTL: no horizontal scroll issues

### Step 8: Create Blog Posts (optional)

If using the blog, create posts in the new language:

```bash
touch src/blog/example-post-fr.md
```

**Frontmatter:**
```yaml
---
title: "Titre de l'article"
description: "Description de l'article"
date: 2026-01-29
language: fr
category: technical
tags:
  - eleventy
  - french
layout: layouts/post.html
---

Contenu en français...
```

---

## Removing Languages

> **💡 Automated Skill:** Use the `/remove-language` skill to automate this process with AI assistance.

### Step 1: Remove Translation File

```bash
rm src/assets/js/translations/es.js
```

### Step 2: Unregister from Index

**Edit [`src/assets/js/translations/index.js`](../../src/assets/js/translations/index.js):**

Remove the import and registry entry:

```javascript
// Remove this line
import es from './es.js'

const translationRegistry = {
  en,
  he
  // Removed es
}
```

### Step 3: Remove from Site Config

**Edit [`src/_data/site.js`](../../src/_data/site.js):**

Remove the language from the array:

```javascript
languages: [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' }
  // Removed Spanish
]
```

### Step 4: Remove Language-Specific Files (optional)

If you had blog posts, font imports, or other language-specific files, remove them:

```bash
# Remove blog posts in that language
rm src/blog/*-es.md

# If you had language-specific fonts loaded, remove from head.html
```

### Step 5: Verify

- [ ] Build succeeds
- [ ] Language no longer appears in switcher
- [ ] Default language still works
- [ ] No console errors referencing the removed language

---

## Modifying Layouts

### Changing the Base Layout

**Edit [`src/_includes/layouts/base.html`](../../src/_includes/layouts/base.html):**

This is the master layout used by all pages. It's only 37 lines and uses includes for all major sections.

**Current structure:**
```html
<!doctype html>
<html lang="..." dir="...">
  <head>{% include 'partials/head.html' %}</head>
  <body>
    <a href="#main-content" class="skip-link sr-only">Skip to main content</a>
    {% include 'components/svg-icons.html' %}
    {% include 'components/nav.html' %}
    {{ content }}
    {% include 'components/footer.html' %}
    {% include 'partials/scripts.html' %}
  </body>
</html>
```

**To add a site-wide banner:**

```html
<body>
  <a href="#main-content" class="skip-link sr-only">Skip to main content</a>

  <!-- Add your banner here -->
  <div class="site-banner" role="banner">
    <p>🎉 Special offer: 20% off all services this month!</p>
  </div>

  {% include 'components/svg-icons.html' %}
  {% include 'components/nav.html' %}
  {{ content }}
  {% include 'components/footer.html' %}
  {% include 'partials/scripts.html' %}
</body>
```

Then create SCSS for `.site-banner` in a new component file.

### Creating a Custom Layout

**Example: Create a minimal layout for legal pages:**

1. **Create [`src/_includes/layouts/minimal.html`](../../src/_includes/layouts/minimal.html):**

```html
<!doctype html>
<html lang="{% if language %}{{ language }}{% else %}en{% endif %}">
  <head>{% include 'partials/head.html' %}</head>
  <body class="layout-minimal">
    {% include 'components/svg-icons.html' %}

    <header class="minimal-header">
      <a href="/" class="minimal-header__logo">← Back to Home</a>
    </header>

    <main id="main-content" role="main" class="minimal-main">
      {{ content }}
    </main>

    <footer class="minimal-footer">
      <p>&copy; 2026 Your Company. All rights reserved.</p>
    </footer>

    {% include 'partials/scripts.html' %}
  </body>
</html>
```

2. **Use in a page:**

```yaml
---
layout: layouts/minimal.html
title: Privacy Policy
---

<h1>Privacy Policy</h1>
<p>Your privacy policy content...</p>
```

---

## Adding New Pages

### Simple Page

1. **Create [`src/privacy.html`](../../src/privacy.html):**

```html
---
layout: layouts/base.html
language: en
title: Privacy Policy
pageClass: page-privacy
---

<main id="main-content" role="main">
  <section class="privacy">
    <div class="privacy__container">
      <h1 data-i18n="privacy.title">Privacy Policy</h1>
      <p data-i18n="privacy.intro">We value your privacy...</p>
      <!-- Content -->
    </div>
  </section>
</main>
```

2. **Add translations to all language files**

3. **Add to navigation (optional):**

```html
<a href="/privacy" data-i18n="nav.privacy">Privacy</a>
```

4. **Build and test:**

```bash
npm run build
# Check dist/privacy/index.html was created
```

### Markdown Page

1. **Create [`src/about-us.md`](../../src/about-us.md):**

```markdown
---
layout: layouts/base.html
language: en
title: About Us
---

# About Our Company

Founded in 2020, we specialize in...

## Our Mission

To provide excellent service...
```

2. **Markdown compiles to HTML automatically**

---

## Customizing Components

### Modifying the Navigation

**Edit [`src/_includes/components/nav.html`](../../src/_includes/components/nav.html)**

**Example: Add a CTA button to navigation:**

```html
<nav class="nav" aria-label="Main navigation">
  <div class="nav__container">
    <a href="/" class="nav__logo">...</a>

    <ul class="nav__menu">
      <!-- Existing menu items -->
    </ul>

    <!-- Add CTA button -->
    <a href="/contact" class="nav__cta button button--primary" data-i18n="nav.getStarted">
      Get Started
    </a>

    <!-- Theme toggle, language switcher, mobile toggle -->
  </div>
</nav>
```

Then add styles in `_navigation.scss` for `.nav__cta`.

### Modifying the Footer

**Edit [`src/_includes/components/footer.html`](../../src/_includes/components/footer.html)**

**Example: Add newsletter signup:**

```html
<footer class="footer" role="contentinfo">
  <div class="footer__container">

    <!-- Add newsletter section -->
    <div class="footer__section footer__section--newsletter">
      <h3 class="footer__heading" data-i18n="footer.newsletter.title">
        Subscribe to Our Newsletter
      </h3>
      <form class="newsletter-form" action="/subscribe" method="post">
        <input
          type="email"
          data-i18n-placeholder="footer.newsletter.placeholder"
          placeholder="Enter your email"
          required
        />
        <button type="submit" data-i18n="footer.newsletter.submit">Subscribe</button>
      </form>
    </div>

    <!-- Existing footer sections -->
  </div>
</footer>
```

Add translations and styles accordingly.

---

## What Not to Break

### Critical Features to Preserve

When customizing, ensure you don't break these core features:

#### 1. Accessibility (WCAG 2.1 AA)

**Don't:**
- Remove ARIA labels (`aria-label`, `aria-labelledby`, `aria-expanded`)
- Remove skip links
- Remove `role` attributes
- Use color alone to convey information
- Reduce text/background contrast below 4.5:1
- Remove keyboard navigation support
- Remove focus indicators

**Do:**
- Test with keyboard navigation (Tab, Enter, Space, Arrows)
- Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- Maintain semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`)
- Keep focus indicators visible

#### 2. RTL Support

**Don't:**
- Use directional properties without RTL override (`margin-left`, `text-align: left`)
- Hardcode language-specific logic (see Known Limitations in architecture.md)
- Remove `dir` attribute from `<html>`
- Use `left: -10000px` for hidden elements (use clip-rect technique)

**Do:**
- Use logical properties when possible (`margin-inline-start`)
- Add RTL styles in `_rtl.scss` for new components
- Test in Hebrew (or create a test RTL language)
- Check for horizontal scroll issues

#### 3. Dark Mode

**Don't:**
- Hardcode colors (use CSS custom properties)
- Remove `data-theme` attribute
- Skip adding dark mode styles for new components
- Assume text is always readable (test contrast in both modes)

**Do:**
- Use `var(--theme-*)` for all colors
- Add dark mode overrides in `_dark-mode.scss`
- Test toggle functionality
- Verify all text is readable in dark mode

#### 4. Translation System

**Don't:**
- Hardcode user-facing text in HTML/JavaScript
- Skip adding translation keys for new content
- Change translation object structure (breaks language.js)
- Remove `data-i18n` attributes

**Do:**
- Use `data-i18n` for all translatable text
- Add keys to ALL language files (en.js, he.js, es.js, etc.)
- Test language switching after changes
- Keep translation structure consistent across languages

#### 5. Mobile Responsive Design

**Don't:**
- Use fixed widths (use max-width or flexible units)
- Remove responsive breakpoints
- Assume desktop viewport
- Hide critical content on mobile

**Do:**
- Test at 375px (mobile), 768px (tablet), 1024px+ (desktop)
- Use mobile-first approach (base styles for mobile, `@include md` for larger)
- Test mobile menu functionality
- Verify touch targets are at least 44x44px

---

## Testing Your Customizations

### Checklist

After any customization, run through this checklist:

#### Build & Development
- [ ] `npm run build` succeeds with no errors
- [ ] `npm run dev` runs without warnings
- [ ] `npm run check` passes (Biome linting)

#### Visual
- [ ] Light mode: All changes look correct
- [ ] Dark mode: All changes look correct
- [ ] All languages: Content displays properly
- [ ] Mobile (375px): Layout works, no horizontal scroll
- [ ] Tablet (768px): Layout works
- [ ] Desktop (1024px+): Layout works

#### Functionality
- [ ] Language switching works
- [ ] Dark mode toggle works
- [ ] Navigation works (desktop and mobile)
- [ ] Forms validate correctly (if modified)
- [ ] Links work
- [ ] Scroll animations trigger (if applicable)

#### Accessibility
- [ ] Keyboard navigation: Can reach all interactive elements
- [ ] Focus indicators: Visible on all focusable elements
- [ ] Screen reader: Content makes sense (test with VoiceOver/NVDA)
- [ ] Color contrast: WCAG AA compliant (4.5:1 text, 3:1 UI)
- [ ] ARIA: Labels and states are correct

#### RTL (if using RTL languages)
- [ ] Layout mirrors correctly
- [ ] No horizontal scroll
- [ ] Text alignment correct
- [ ] Icons/arrows flip appropriately

---

## Getting Help

If you get stuck:

1. **Check the documentation:**
   - [architecture.md](./architecture.md) - Technical details
   - [patterns.md](./patterns.md) - Code examples

2. **Check the codebase:**
   - Look for similar examples in existing components
   - Read comments in SCSS/JavaScript files

3. **Use the workflow skills:**
   - See [`.ai/skills/`](../skills/) directory for step-by-step guides

4. **Ask your AI assistant:**
   - Reference specific context files: "@architecture.md, how do I..."
   - Show error messages for targeted help

---

**Last Updated:** 2026-01-29
**Template Version:** 1.0.0 (in development)