# Skill: Remove Language

> Remove an existing language from the multilingual system

## Purpose

This skill guides you through completely removing a language from the template. You'll delete the translation file, unregister it from the translation system, and remove it from all configuration locations.

This is useful when you want to reduce the number of supported languages or replace an unused language with a different one.

## Prerequisites

- [ ] Decided which language to remove (have the language code ready)
- [ ] Verified it's NOT the default language (check `site.js` and `language.js`)
- [ ] Text editor or IDE open to project root
- [ ] Build succeeds: `npm run build`
- [ ] Optional: Backup of translation file in case you change your mind

## Input

| Parameter | Example | Required | Notes |
|-----------|---------|----------|-------|
| Language code to remove | `es` | Yes | Must NOT be the default language |

## Steps

### Step 1: Validate Language is Not Default

⚠️ **Critical:** You cannot remove the default language. The site must have at least one language.

**Files to check:**
- `src/_data/site.js` - `multilingual.defaultLanguage`
- `src/assets/js/language.js` - `CONFIG.defaultLanguage`

If the language you want to remove IS the default:
1. First change the default to a different language in BOTH files
2. Run `npm run build` to verify the change works
3. Then proceed with removal

**Example:** If removing `en` but it's the default, first change to:
```javascript
// In both site.js and language.js
defaultLanguage: 'he',  // Changed from 'en'
```

### Step 2: Delete Translation File

**File:** `src/assets/js/translations/[code].js`

Delete the translation file for the language you're removing:

```bash
# Example: Removing Spanish
rm src/assets/js/translations/es.js
```

Or use your file explorer / IDE to delete the file.

**What this does:** Removes all UI translations for this language. The file will no longer be available for import.

### Step 3: Unregister from Translation System

**File:** `src/assets/js/translations/index.js`

1. Remove the import statement:
   ```javascript
   // BEFORE
   import en from './en.js'
   import es from './es.js'  // ← Remove this line
   import he from './he.js'
   ```

   ```javascript
   // AFTER
   import en from './en.js'
   import he from './he.js'
   ```

2. Remove from the registry object:
   ```javascript
   // BEFORE
   const translationRegistry = {
     en,
     es,  // ← Remove this line
     he
   }
   ```

   ```javascript
   // AFTER
   const translationRegistry = {
     en,
     he
   }
   ```

**Why this matters:** This prevents the language system from trying to load a translation file that no longer exists.

### Step 4: Remove from Site Configuration

**File:** `src/_data/site.js`

Remove the language object from the `multilingual.languages` array:

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
    code: 'es',              // ← Remove this entire object
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
  }
],
```

**Why this matters:** Eleventy uses this configuration to build language-specific blog collections and the `isRTL` filter. Leaving it here will cause build errors since the translation file doesn't exist.

### Step 5: Remove from Language Switcher Configuration

**File:** `src/assets/js/language.js`

Find the `CONFIG` object (lines 9-21) and remove the language from the `languages` array:

```javascript
// BEFORE
const CONFIG = {
  defaultLanguage: 'en',
  storageKey: 'site-language',
  languages: [
    { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' }  // ← Remove
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
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' }
  ],
  // ...
}
```

**Why this matters:** The language switcher UI reads this configuration. Leaving the language here would show it in the switcher but clicking it would fail (no translations available).

**Automatic switcher transition:** The language switcher will automatically adapt:
- 3+ languages → 2 languages: Changes from dropdown to pill toggle
- 2 languages → 1 language: Switcher hides completely (no switching needed)

### Step 6: Clean Up Language-Specific Resources (if applicable)

If you're removing an RTL language and it was the ONLY RTL language:

#### A. RTL Font Loading (optional cleanup)

**File:** `src/_includes/partials/head.html`

If you removed the only RTL language, you can optionally remove RTL font loading to reduce page weight:

```html
<!-- BEFORE: RTL font loading block -->
{% if language | isRTL %}
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Alef:wght@400;700&family=Noto+Sans+Hebrew:wght@400;600;700&display=swap"
/>
{% else %}
<!-- LTR fonts -->
{% endif %}
```

Since no RTL languages exist, the `isRTL` filter will never return true. You can:
1. Leave it as-is (harmless, future-proof if you add RTL later)
2. Remove the entire `{% if language | isRTL %}` block (slightly cleaner)

**Recommendation:** Leave it unless you're sure you'll never add RTL languages.

#### B. Remove Blog Posts in Removed Language

**Directory:** `src/blog/`

If you have blog posts tagged with the removed language, they'll still build but won't be accessible via language switching:

```bash
# Find blog posts for removed language
ls src/blog/ | grep "language: es"
```

Options:
1. **Delete them:** `rm src/blog/my-spanish-post.md`
2. **Archive them:** Move to a `src/blog/_archived/` directory (create it first)
3. **Convert them:** Change `language: es` to `language: en` and translate content

**Files to update:** Any `.md` file in `src/blog/` with `language: es` in frontmatter.

### Step 7: Clear User Browser Cache (Important)

⚠️ **User Impact:** If users have previously selected the removed language, it's stored in their browser's localStorage.

When they visit your site again:
- The language system will detect the stored preference is invalid
- It will automatically fall back to the default language
- No error occurs, but they might wonder why their language preference "reset"

**No action needed** - the language system handles this gracefully. Just be aware users will see the default language instead of their previous choice.

## Validation Checklist

### Build & Lint
- [ ] `npm run build` succeeds without errors
- [ ] `npm run check` shows no Biome errors
- [ ] Browser console shows no JavaScript errors on page load
- [ ] Browser console shows no 404 errors for translation files

### Visual Testing
- [ ] Open site in browser (`npm run dev`)
- [ ] Language switcher no longer shows removed language
- [ ] If 2 languages remain: Switcher is pill toggle (code | code)
- [ ] If 1 language remains: Switcher is hidden
- [ ] Default language displays correctly
- [ ] All sections render with correct remaining languages
- [ ] Light mode works
- [ ] Dark mode works

### Functional Testing
- [ ] Language switcher cycles through only remaining languages
- [ ] No option to select removed language
- [ ] Refresh page - default language loads
- [ ] Open DevTools > Application > Local Storage
- [ ] Manually set `site-language` to removed code (e.g., `'es'`)
- [ ] Refresh page - site falls back to default language (graceful failure)
- [ ] Delete localStorage key - site loads default language

### RTL Testing (if removed an RTL language)
- [ ] If no RTL languages remain, site is always LTR
- [ ] If other RTL languages remain, they still work correctly
- [ ] Font loading skips RTL fonts (if you removed the block)

### Build Output Verification
- [ ] `dist/` folder doesn't contain removed language artifacts
- [ ] Blog collections don't reference removed language
- [ ] No broken links to removed language pages

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Build fails: "Cannot find module" | Import statement still in `index.js` | Remove import line from `src/assets/js/translations/index.js` |
| Build fails: "Unknown language in collection" | Language still in `site.js` | Remove language object from `src/_data/site.js` |
| Removed language still appears in switcher | Language still in `language.js` CONFIG | Remove from `CONFIG.languages` in `src/assets/js/language.js` |
| Console error: "Translation not found for es" | Language still in CONFIG but file deleted | Remove from all 4 config locations |
| Site loads removed language from cache | Browser localStorage has old preference | Clear localStorage or wait - site will fallback gracefully |
| Build succeeds but blog posts missing | Blog posts in removed language deleted | Expected behavior - those posts are gone |
| RTL still activates (but shouldn't) | Another RTL language exists OR config not updated | Check `site.js` - verify no `dir: 'rtl'` languages remain |
| Language switcher disappeared (but shouldn't) | Only 1 language remains | This is correct - with 1 language there's nothing to switch to |

## Related Skills

- [add-new-language.md](./add-new-language.md) - Add a different language as replacement
- [replace-language.md](./replace-language.md) - Directly swap one language for another
- [setup-fresh-project.md](./setup-fresh-project.md) - Reconfigure languages for new project

## Reference

- [`.ai/context/customization-guide.md`](../context/customization-guide.md#removing-languages) - Customization instructions
- [`.ai/context/architecture.md`](../context/architecture.md) - Translation system architecture
- [`.ai/skills/README.md`](./README.md#the-4-config-locations-for-language-changes) - Quick reference for 4 config locations

## Notes

- **Minimum languages:** You must have at least 1 language. The template will not work with zero languages.
- **Default language protection:** Always verify you're not removing the default language. If you need to remove it, change the default first.
- **Reverting removal:** If you removed a language by mistake, you can restore it:
  1. Restore the translation file from backup or git history: `git checkout HEAD -- src/assets/js/translations/es.js`
  2. Follow the [add-new-language.md](./add-new-language.md) skill to re-register it
- **Data loss:** Deleting a translation file is permanent (unless you have backups or git history). Consider archiving instead of deleting if unsure.
- **SEO impact:** Removing a language will remove all SEO signals for that language. If the language had good rankings, consider the business impact before removing.

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-30
**Complexity:** Medium
**Estimated Time:** 15-30 minutes