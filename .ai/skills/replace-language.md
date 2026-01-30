# Skill: Replace Language

> Swap one existing language for a different language (e.g., Spanish → French)

## Purpose

This skill guides you through replacing an existing language with a different one. This is more efficient than separately removing the old language and adding the new one, because you can reuse the existing file structure and avoid configuration churn.

Common use cases:
- Changing Spanish to French (same LTR direction)
- Changing Hebrew to Arabic (both RTL direction)
- Changing German to Japanese (LTR to LTR)
- Changing French to Hebrew (LTR to RTL - requires extra steps)

## Prerequisites

- [ ] Decided which language to remove (source) and which to add (target)
- [ ] Target language translations ready (or willing to use source as starting point)
- [ ] Target language code determined (ISO 639-1: `fr`, `ar`, `ja`, etc.)
- [ ] Both languages' text direction known (`ltr` or `rtl`)
- [ ] Text editor or IDE open to project root
- [ ] Build succeeds: `npm run build`

## Input

| Parameter | Example | Required | Notes |
|-----------|---------|----------|-------|
| Source language code (removing) | `es` | Yes | Current language to replace |
| Target language code (adding) | `fr` | Yes | New language ISO 639-1 code |
| Target English name | `French` | Yes | For English-speaking users |
| Target native name | `Français` | Yes | How native speakers write it |
| Target text direction | `ltr` | Yes | `ltr` or `rtl` |
| Target translations | Complete set | Yes | Can use source as template |

## Steps

### Step 1: Determine Replacement Scenario

Your approach depends on text direction changes:

| Scenario | From | To | Complexity |
|----------|------|-----|------------|
| A | LTR | LTR | Simple (Spanish → French) |
| B | RTL | RTL | Simple (Hebrew → Arabic) |
| C | LTR | RTL | Complex (French → Hebrew) |
| D | RTL | LTR | Complex (Hebrew → Spanish) |

**Scenarios A & B (same direction):** Follow steps 2-6
**Scenarios C & D (direction change):** Follow steps 2-6, then step 7

### Step 2: Rename and Update Translation File

**File:** `src/assets/js/translations/[source].js` → `[target].js`

1. Rename the file:
   ```bash
   # Example: Spanish → French
   mv src/assets/js/translations/es.js src/assets/js/translations/fr.js
   ```

2. Open the renamed file and update the meta section:
   ```javascript
   // BEFORE (Spanish)
   export default {
     meta: {
       code: 'es',
       name: 'Spanish',
       nativeName: 'Español',
       dir: 'ltr'
     },
   ```

   ```javascript
   // AFTER (French)
   export default {
     meta: {
       code: 'fr',
       name: 'French',
       nativeName: 'Français',
       dir: 'ltr'
     },
   ```

3. Translate all content sections (15 total):
   - Keep the Spanish text as a reference
   - Replace with French translations
   - OR use machine translation initially and refine later
   - Maintain exact structure (keys, HTML tags, arrays)

**Time-saving tip:** If languages are similar (e.g., Spanish → Portuguese), use find-and-replace for common words first, then manually refine.

### Step 3: Update Translation System Registry

**File:** `src/assets/js/translations/index.js`

1. Update the import statement:
   ```javascript
   // BEFORE
   import en from './en.js'
   import es from './es.js'  // ← Change 'es' to 'fr'
   import he from './he.js'
   ```

   ```javascript
   // AFTER
   import en from './en.js'
   import fr from './fr.js'  // ← Changed
   import he from './he.js'
   ```

2. Update the registry object:
   ```javascript
   // BEFORE
   const translationRegistry = {
     en,
     es,  // ← Change to 'fr'
     he
   }
   ```

   ```javascript
   // AFTER
   const translationRegistry = {
     en,
     fr,  // ← Changed
     he
   }
   ```

**Why this matters:** This updates the dynamic translation loader to import the new language file instead of the old one.

### Step 4: Update Site Configuration

**File:** `src/_data/site.js`

Replace the source language object with the target language object in `multilingual.languages`:

```javascript
// BEFORE
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
    code: 'es',              // ← Replace this object
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr'
  }
],
```

```javascript
// AFTER
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
    code: 'fr',              // ← Replaced
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr'
  }
],
```

**Why this matters:** Eleventy uses this for build-time operations (blog collections, RTL filter).

### Step 5: Update Language Switcher Configuration

**File:** `src/assets/js/language.js`

Find the `CONFIG` object (lines 9-21) and replace the source language with the target language:

```javascript
// BEFORE
const CONFIG = {
  defaultLanguage: 'en',
  storageKey: 'site-language',
  languages: [
    { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' }  // ← Replace
  ],
  // ...
}
```

```javascript
// AFTER
const CONFIG = {
  defaultLanguage: 'en',
  storageKey: 'site-language',
  languages: [
    { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
    { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' }  // ← Replaced
  ],
  // ...
}
```

**Why this matters:** The language switcher UI reads this configuration.

### Step 6: Update Default Language (if applicable)

⚠️ **Only if replacing the default language:**

If you're replacing the default language (e.g., site defaults to Spanish, changing to French):

1. Update in `src/_data/site.js`:
   ```javascript
   multilingual: {
     defaultLanguage: 'fr',  // Changed from 'es'
     // ...
   }
   ```

2. Update in `src/assets/js/language.js`:
   ```javascript
   const CONFIG = {
     defaultLanguage: 'fr',  // Changed from 'es'
     // ...
   }
   ```

**Why this matters:** Users who haven't selected a language will see the default. Both configs must match.

### Step 7: Handle Text Direction Change (Scenarios C & D only)

⚠️ **Only needed if changing from LTR to RTL or RTL to LTR**

#### Scenario C: LTR → RTL (e.g., French → Arabic)

**A. Add RTL Font Loading**

**File:** `src/_includes/partials/head.html`

If this is your first RTL language, add appropriate fonts:

```html
{% if language | isRTL %}
  {% if language == 'ar' %}
  <!-- Arabic fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" />
  {% elif language == 'he' %}
  <!-- Hebrew fonts (existing) -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alef:wght@400;700&family=Noto+Sans+Hebrew:wght@400;600;700&display=swap" />
  {% endif %}
{% else %}
<!-- LTR fonts -->
{% endif %}
```

If other RTL languages already exist, add to the existing block.

**B. Update RTL Font Variables (optional)**

**File:** `src/assets/scss/_variables.scss`

Add your new RTL language's fonts:

```scss
// RTL fonts (Hebrew, Arabic, etc.)
$font-family-base-rtl: 'Cairo', 'Noto Sans Arabic', 'Noto Sans Hebrew', system-ui, sans-serif;
$font-family-heading-rtl: 'Cairo', 'Noto Sans Arabic', 'Alef', system-ui, sans-serif;
```

#### Scenario D: RTL → LTR (e.g., Arabic → Spanish)

**A. Check Remaining RTL Languages**

If you're removing your LAST RTL language:

**File:** `src/_includes/partials/head.html`

Optionally remove the RTL font loading block (or leave for future RTL languages):

```html
<!-- Can remove this entire block if no RTL languages remain -->
{% if language | isRTL %}
  <link rel="stylesheet" href="..." />
{% endif %}
```

**B. No other changes needed** - the `isRTL` filter will simply never return true.

### Step 8: Update Blog Posts (if applicable)

**Directory:** `src/blog/`

If you have blog posts tagged with the source language:

```bash
# Find posts in source language
grep -l "language: es" src/blog/*.md
```

**Options:**

1. **Delete them:**
   ```bash
   # Delete all Spanish posts
   rm src/blog/*-es.md
   ```

2. **Convert them** (update frontmatter and translate):
   ```yaml
   ---
   title: "My Post"
   language: fr  # Changed from 'es'
   # ... translate other frontmatter ...
   ---

   <!-- Translate content -->
   ```

3. **Archive them:**
   ```bash
   mkdir -p src/blog/_archived
   mv src/blog/*-es.md src/blog/_archived/
   ```

### Step 9: Clear User Browser Cache (Important)

⚠️ **User Impact:** Users who previously selected the source language will have it stored in localStorage.

When they visit your site:
- The language system will detect the stored language no longer exists
- It will automatically fall back to the default language
- No error occurs, but they'll see the default instead of their previous choice

**No action needed** - the fallback is automatic and graceful.

## Validation Checklist

### Build & Lint
- [ ] `npm run build` succeeds without errors
- [ ] `npm run check` shows no Biome errors
- [ ] Browser console shows no JavaScript errors on page load
- [ ] Browser console shows no 404 errors for translation files

### Configuration Consistency
- [ ] All 4 configs updated with matching values:
  - [ ] Translation file meta (`src/assets/js/translations/[target].js`)
  - [ ] Translation registry (`src/assets/js/translations/index.js`)
  - [ ] Site config (`src/_data/site.js`)
  - [ ] Language switcher config (`src/assets/js/language.js`)
- [ ] If default language changed: Both `site.js` and `language.js` match

### Visual Testing
- [ ] Open site in browser (`npm run dev`)
- [ ] Language switcher shows target language name (not source)
- [ ] Select target language - page updates to new translations
- [ ] Light mode displays correctly
- [ ] Dark mode displays correctly
- [ ] Mobile (375px), tablet (768px), desktop (1200px+) all work
- [ ] All page sections show target language text

### Functional Testing
- [ ] Language switcher cycles through correct languages
- [ ] Source language no longer appears
- [ ] Target language works in all sections
- [ ] Contact form labels use target language
- [ ] Blog categories translated
- [ ] FAQ accordion shows target language
- [ ] Navigation menu translated

### Direction Change Testing (if applicable)
**LTR → RTL (Scenario C):**
- [ ] Page `dir="rtl"` attribute set when target language selected
- [ ] Body has `class="rtl"` when target language selected
- [ ] RTL fonts load correctly (check Network tab)
- [ ] Text aligns right
- [ ] Layout mirrors (nav on right side)
- [ ] No horizontal scrolling

**RTL → LTR (Scenario D):**
- [ ] Page has `dir="ltr"` for all languages (if no RTL remains)
- [ ] No `class="rtl"` applied
- [ ] Text aligns left
- [ ] Layout normal (nav on left)
- [ ] RTL fonts not loaded (if removed the block)

### Accessibility
- [ ] Screen reader announces target language
- [ ] Page `lang` attribute updates: `<html lang="fr">`
- [ ] All aria-labels use target language strings
- [ ] Keyboard navigation works

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Build fails: "Cannot find module './es.js'" | Import in `index.js` not updated | Change import from `'./es.js'` to `'./fr.js'` |
| Language switcher shows old language | `language.js` CONFIG not updated | Update CONFIG.languages array with new language |
| Some text in old language, some new | Translation file incompletely translated | Complete translation in `src/assets/js/translations/fr.js` |
| RTL not working (Scenario C) | `dir` not set to `'rtl'` in all 3 configs | Verify `dir: 'rtl'` in translation meta, site.js, language.js |
| RTL still active but shouldn't be (Scenario D) | `dir` still set to `'rtl'` | Change to `dir: 'ltr'` in all 3 configs |
| RTL fonts not loading (Scenario C) | Font loading block not added/updated | Add language check in `head.html` |
| Page crashes on language switch | Target translation file has syntax error | Check browser console - fix JavaScript syntax in translation file |
| Build fails: "Collection blogEs not found" | Blog posts still reference old language | Update or delete blog posts with old language frontmatter |
| Users stuck on old language | localStorage has old code cached | Expected - will fallback to default automatically |

## Related Skills

- [add-new-language.md](./add-new-language.md) - Detailed guide for adding languages
- [remove-language.md](./remove-language.md) - Detailed guide for removing languages
- [add-blog-post.md](./add-blog-post.md) - Create blog posts in new language
- [customize-theme.md](./customize-theme.md) - Adjust fonts for new language

## Reference

- [`.ai/context/customization-guide.md`](../context/customization-guide.md#adding-new-languages) - Customization guide
- [`.ai/context/architecture.md`](../context/architecture.md) - Translation system architecture
- [`.ai/skills/README.md`](./README.md#the-4-config-locations-for-language-changes) - Quick reference for config locations
- [Google Fonts](https://fonts.google.com/) - Find web fonts for your language
- [ISO 639-1 Language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) - Language code reference

## Notes

- **Translation efficiency:** If languages are linguistically similar (Spanish/Portuguese, Arabic/Urdu), start with the source translation and modify rather than translating from scratch.
- **Machine translation starting point:** Use DeepL, Google Translate, or similar to create initial translations, then have native speakers review and refine.
- **Font considerations:** When changing to a language with different character needs (Latin → Cyrillic, Latin → CJK), ensure fonts support all required glyphs.
- **Default language strategy:** If replacing the default language, consider user impact. Many users rely on defaults. Communicate the change clearly.
- **SEO impact:** Replacing a language changes all SEO signals. URLs, hreflang tags, and meta content all change. Plan for temporary ranking fluctuations.
- **Gradual rollout:** For live sites, consider adding the new language first (so both exist), then removing the old one after users have transitioned.

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-30
**Complexity:** Medium
**Estimated Time:** 1-3 hours (depending on translation readiness and direction change)
