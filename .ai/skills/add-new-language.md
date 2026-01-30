# Skill: Add New Language

> Add complete multilingual support for a new language (e.g., French, Arabic, German)

## Purpose

This skill guides you through adding a new language to the Multilingual One-Page Starter template. Adding a language involves creating a translation file with all UI strings, registering it in the translation system, and configuring it in 4 different locations so language switching works correctly.

This is the most complex language management skill because it requires careful coordination across multiple files and systems.

## Prerequisites

- [ ] Basic understanding of JavaScript ES modules
- [ ] Text editor or IDE open to project root
- [ ] All UI text translated and ready (or willing to use placeholders initially)
- [ ] Language code determined (ISO 639-1 standard: `fr`, `ar`, `de`, etc.)
- [ ] Text direction known (`ltr` or `rtl`)
- [ ] Build succeeds: `npm run build`

## Input

| Parameter | Example | Required | Notes |
|-----------|---------|----------|-------|
| Language code | `fr` | Yes | ISO 639-1 two-letter code |
| English name | `French` | Yes | For English-speaking users |
| Native name | `Français` | Yes | How native speakers write it |
| Text direction | `ltr` | Yes | `ltr` (left-to-right) or `rtl` (right-to-left) |
| All UI translations | Complete translation set | Yes | Can use placeholders initially |

## Steps

### Step 1: Create Translation File from Template

**File:** `src/assets/js/translations/[code].js` (replace `[code]` with your language code)

1. Copy the template file and rename it:
   ```bash
   cp src/assets/js/translations/_template.js src/assets/js/translations/fr.js
   ```

2. Open your new file (e.g., `fr.js`)

3. Update the meta section at the top:
   ```javascript
   export default {
     meta: {
       code: 'fr',        // Your language code
       name: 'French',    // English name
       nativeName: 'Français', // Native name
       dir: 'ltr'         // 'ltr' or 'rtl'
     },
   ```

4. Translate all 15 top-level sections:
   - `nav` - Navigation menu items
   - `skipLink` - Accessibility skip link
   - `hero` - Homepage hero section
   - `welcome` - Welcome section
   - `services` - Services section (largest section with nested content)
   - `performance` - Performance section
   - `portfolio` - Portfolio section
   - `blog` - Blog section and post UI
   - `about` - About section
   - `faq` - FAQ section with questions/answers
   - `contact` - Contact form and section
   - `thankYou` - Thank you page
   - `footer` - Footer content
   - `legalNotice` - Legal notice page
   - `pageMeta` - SEO meta tags

**Important translation rules:**
- Keep all property keys unchanged (only translate values)
- Maintain exact structure (don't add/remove properties)
- Keep HTML tags intact: `<strong>text</strong>`, `<br>`, `<a href="...">link</a>`
- Preserve placeholders: `[Language Name]` in dynamic strings
- Keep array lengths the same (especially in `services.items`, `faq.questions`, etc.)

**Example of correct translation:**

```javascript
// services section (partial)
services: {
  title: 'Ce que nous faisons',
  subtitle: 'Sites web qui fonctionnent pour vous',
  intro: {
    paragraph1: 'Chaque site web est conçu pour plus que de la beauté — il est optimisé pour votre entreprise.',
    paragraph2: '...',
    paragraph3: '...'
  },
  items: [
    {
      title: 'Développement Web',
      description: 'Sites web professionnels optimisés pour tous les appareils.'
    },
    // ... translate all 6 items
  ],
  // ... rest of services section
}
```

### Step 2: Register in Translation System

**File:** `src/assets/js/translations/index.js`

1. Add import at the top (alphabetically):
   ```javascript
   // Import all translation files
   import en from './en.js'
   import es from './es.js'
   import fr from './fr.js'  // ← Add this
   import he from './he.js'
   ```

2. Add to registry object (alphabetically):
   ```javascript
   // Registry of all loaded translations
   const translationRegistry = {
     en,
     es,
     fr,  // ← Add this
     he
   }
   ```

**Why this matters:** The translation registry dynamically loads your language strings. Without this registration, the language selector will show the language but all UI text will be missing.

### Step 3: Add to Site Configuration

**File:** `src/_data/site.js`

Add your language to the `multilingual.languages` array:

```javascript
multilingual: {
  defaultLanguage: 'en',
  storageKey: 'site-language',

  // Available languages
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
      code: 'fr',        // ← Add your new language
      name: 'French',
      nativeName: 'Français',
      dir: 'ltr'
    }
  ],
  // ...
}
```

**Why this matters:** This configuration is used by Eleventy for build-time rendering (blog collections, isRTL filter, etc.). It must match exactly with the other configurations.

### Step 4: Add to Language Switcher Configuration

**File:** `src/assets/js/language.js`

Find the `CONFIG` object at the top of the file (lines 9-21) and add your language to the `languages` array:

```javascript
// Configuration - matches site.js multilingual config
const CONFIG = {
  defaultLanguage: 'en',
  storageKey: 'site-language',
  languages: [
    { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
    { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' }  // ← Add this
  ],
  blog: {
    defaultPath: '/blog/',
    langPath: '/blog/{langCode}/'
  }
}
```

**Why this matters:** The language switcher UI reads this configuration to build the toggle/dropdown. It must match `site.js` exactly or language switching will behave inconsistently.

**Automatic switcher transition:** The language switcher automatically adapts:
- 1 language: Hidden (no switching needed)
- 2 languages: Pill toggle (current | next)
- 3+ languages: Dropdown menu

After adding your 3rd language, the switcher will automatically change from toggle to dropdown.

### Step 5: Handle RTL Languages (if applicable)

If you're adding an RTL language (Arabic, Hebrew, Urdu, Persian, etc.), additional configuration is needed:

#### A. Add RTL Font Loading

**File:** `src/_includes/partials/head.html`

The template already has RTL font loading configured using the `isRTL` filter:

```html
<!-- Hebrew fonts (only load when language is Hebrew) -->
{% if language | isRTL %}
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Alef:wght@400;700&family=Noto+Sans+Hebrew:wght@400;600;700&display=swap"
/>
{% else %}
<!-- Regular fonts for LTR languages -->
```

**For your new RTL language:**

1. Choose appropriate web fonts (Google Fonts, Adobe Fonts, etc.)
2. Update the font URL in the `{% if language | isRTL %}` block to load fonts for ALL RTL languages
3. Or add language-specific logic if different RTL languages need different fonts

**Example: Supporting both Hebrew and Arabic:**

```html
{% if language | isRTL %}
  {% if language == 'he' %}
  <!-- Hebrew-specific fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap" />
  {% elif language == 'ar' %}
  <!-- Arabic-specific fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" />
  {% endif %}
{% else %}
<!-- LTR fonts -->
{% endif %}
```

#### B. Update RTL Typography Variables (optional)

**File:** `src/assets/scss/_variables.scss`

If your RTL language needs different font families, update the RTL font variables:

```scss
// RTL (Hebrew) fonts
$font-family-base-rtl: 'Noto Sans Hebrew', 'Alef', system-ui, sans-serif;
$font-family-heading-rtl: 'Alef', 'Noto Sans Hebrew', system-ui, sans-serif;
```

Change to:

```scss
// RTL fonts (Hebrew, Arabic, etc.)
$font-family-base-rtl: 'Cairo', 'Noto Sans Arabic', 'Noto Sans Hebrew', system-ui, sans-serif;
$font-family-heading-rtl: 'Cairo', 'Noto Sans Arabic', 'Alef', system-ui, sans-serif;
```

**Note:** The template's RTL styles in `src/assets/scss/themes/_rtl.scss` are direction-agnostic and work for any RTL language. No changes needed there.

### Step 6: Verify Configuration Consistency

⚠️ **Critical:** All 4 config locations must match exactly:

Run this checklist:

- [ ] `src/assets/js/translations/[code].js` - Meta section filled correctly
- [ ] `src/assets/js/translations/index.js` - Import added, registry entry added
- [ ] `src/_data/site.js` - Language added to `multilingual.languages` array
- [ ] `src/assets/js/language.js` - Language added to `CONFIG.languages` array

**Verify the values match:**

| Property | Location 1 (translation file) | Location 2 (site.js) | Location 3 (language.js) |
|----------|-------------------------------|---------------------|--------------------------|
| `code` | `'fr'` | `'fr'` | `'fr'` |
| `name` | `'French'` | `'French'` | `'French'` |
| `nativeName` | `'Français'` | `'Français'` | `'Français'` |
| `dir` | `'ltr'` | `'ltr'` | `'ltr'` |

Mismatches will cause:
- Language switcher to show wrong names
- RTL detection to fail
- Blog language switching to break
- Build errors in Eleventy collections

## Validation Checklist

### Build & Lint
- [ ] `npm run build` succeeds without errors
- [ ] `npm run check` shows no Biome errors
- [ ] Browser console shows no JavaScript errors on page load
- [ ] Browser console shows no 404 errors for fonts (if RTL)

### Visual Testing
- [ ] Open site in browser (`npm run dev`)
- [ ] Language switcher shows new language name
- [ ] Click/tap language switcher - new language appears in rotation/dropdown
- [ ] Select new language - page UI updates to new translations
- [ ] Light mode displays all translated text correctly
- [ ] Dark mode displays all translated text correctly
- [ ] Test on mobile (375px width) - text doesn't overflow
- [ ] Test on tablet (768px width) - layout is correct
- [ ] Test on desktop (1200px+ width) - all sections render properly

### Functional Testing
- [ ] Language switcher cycles through all languages (or dropdown shows all)
- [ ] Selecting new language updates ALL page sections
- [ ] Refresh page - language preference persists (localStorage)
- [ ] All navigation links work and show translated text
- [ ] Contact form labels are translated
- [ ] Blog posts show category translations
- [ ] Footer content is translated
- [ ] FAQ accordion shows translated questions/answers

### RTL Testing (if applicable)
- [ ] Page `dir="rtl"` attribute set when RTL language selected
- [ ] Body has `class="rtl"` when RTL language selected
- [ ] Custom RTL fonts load correctly (check Network tab)
- [ ] Text aligns right instead of left
- [ ] Layout mirrors (navigation on right, not left)
- [ ] Icons flip direction where appropriate
- [ ] Gradients flip direction
- [ ] No horizontal scrolling issues

### Accessibility
- [ ] Screen reader announces language switcher correctly
- [ ] Screen reader announces translated content
- [ ] Page `lang` attribute updates: `<html lang="fr">`
- [ ] All `aria-label` attributes use translated strings
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible in new language

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Language appears in switcher but UI doesn't change | Translation file not registered in `index.js` | Add import and registry entry in `src/assets/js/translations/index.js` |
| Switcher doesn't show new language at all | Language missing from `CONFIG.languages` in `language.js` | Add to `CONFIG.languages` array in `src/assets/js/language.js` lines 12-16 |
| Build fails with "collection not found" | Language missing from `site.js` | Add to `multilingual.languages` in `src/_data/site.js` |
| Some text translated, some in English | Incomplete translation file | Review translation file - ensure all 15 sections translated |
| RTL layout not working | `dir` property not set to `'rtl'` in all 3 configs | Verify `dir: 'rtl'` in translation file meta, site.js, and language.js |
| RTL fonts not loading | Font link missing or wrong language check | Update font loading in `src/_includes/partials/head.html` |
| Language switcher breaks (doesn't cycle) | Config mismatch between files | Verify all 4 locations have identical code, name, nativeName, dir values |
| Blog language switching doesn't work | Language not in `site.js` | Eleventy builds per-language blog collections from `site.js` config |
| Text overflows on mobile | Translation longer than English | Add line breaks or adjust SCSS for language-specific overrides |
| Wrong characters display (���) | File encoding not UTF-8 | Save translation file as UTF-8 with BOM in your editor |
| localStorage shows wrong language | Language code typo | Check browser DevTools > Application > Local Storage - verify code matches |

## Related Skills

- [remove-language.md](./remove-language.md) - Remove an existing language
- [replace-language.md](./replace-language.md) - Swap one language for another
- [add-blog-post.md](./add-blog-post.md) - Create blog posts in your new language
- [setup-fresh-project.md](./setup-fresh-project.md) - Initial project setup including language configuration

## Reference

- [`.ai/context/customization-guide.md`](../context/customization-guide.md#adding-new-languages) - Detailed customization instructions
- [`.ai/context/architecture.md`](../context/architecture.md) - Translation system architecture
- [`.ai/context/patterns.md`](../context/patterns.md) - JavaScript and translation patterns
- [ISO 639-1 Language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) - Find your language code
- [Google Fonts](https://fonts.google.com/) - Find web fonts for your language

## Notes

- **Translation quality:** Use professional translators or native speakers for production sites. Machine translation is OK for initial testing but should be reviewed.
- **Translation maintenance:** When you update English text (add features, change copy), you must update ALL language files to match.
- **Default language:** To make your new language the default, update `defaultLanguage: 'fr'` in both `site.js` and `language.js`. Build the default language pages first to establish good translations.
- **SEO considerations:** Each language should have its own metadata translations in the `pageMeta` section of the translation file.
- **Character support:** Modern browsers support all Unicode characters, but verify fonts include all glyphs for your language (accents, diacritics, special characters).

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-30
**Complexity:** High
**Estimated Time:** 2-4 hours (depending on translation readiness)
