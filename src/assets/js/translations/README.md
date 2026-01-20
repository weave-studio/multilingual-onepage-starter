# Translation System

This directory contains the multilingual translation system for the site. The system supports unlimited languages with a configuration-driven architecture.

## 📁 File Structure

```
translations/
├── index.js        # Translation loader and helper functions
├── en.js          # English translations (MASTER TEMPLATE)
├── he.js          # Hebrew translations
├── _template.js   # Pre-formatted template for new languages
└── README.md      # This file
```

## ⚠️ CRITICAL: Structure Integrity

**ALL translation files MUST have IDENTICAL structure to [en.js](en.js).**

The English translation file is the **single source of truth** for structure. Any mismatch will cause:
- JavaScript runtime errors (TypeError: Cannot read property 'X' of undefined)
- Site breakage and non-functional language switching
- Missing content in sections

**Before adding ANY new language:**
1. Read [en.js](en.js) to understand current structure (currently ~460 lines)
2. Use [_template.js](_template.js) as your starting point (guaranteed to match [en.js](en.js))
3. Translate values only - NEVER modify keys or structure

## 🌍 Adding a New Language

**IMPORTANT: Always use [_template.js](_template.js) as your starting point. Never copy an outdated translation file.**

Follow these 5 steps to add a new language to your site:

### Step 1: Create Translation File

1. Copy `_template.js` and rename it to your language code (e.g., `es.js` for Spanish)
2. Update the `meta` object with your language details:
   ```javascript
   meta: {
     code: 'es',           // ISO 639-1 code
     name: 'Spanish',      // English name
     nativeName: 'Español', // Native name
     dir: 'ltr'            // 'ltr' or 'rtl'
   }
   ```
3. Translate all text strings (keep property keys unchanged)

### Step 2: Register in Translation Loader

Edit `index.js`:

```javascript
// Add import at the top
import es from './es.js'

// Add to translationRegistry
const translationRegistry = {
  en,
  he,
  es  // Add your new language
}
```

### Step 3: Add Language Configuration

Edit `src/_data/site.js` and add your language to the `multilingual.languages` array:

```javascript
multilingual: {
  defaultLanguage: 'en',
  storageKey: 'site-language',
  languages: [
    { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' }  // Add here
  ]
}
```

### Step 4: Update language.js Configuration

Edit `src/assets/js/language.js` and add your language to the CONFIG object:

```javascript
const CONFIG = {
  defaultLanguage: 'en',
  storageKey: 'site-language',
  languages: [
    { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' }  // Add here
  ]
}
```

### Step 5: Build and Test

```bash
npm run build
npm run dev
```

Test that:
- Language switcher shows your new language
- All content translates correctly
- RTL/LTR works properly (if applicable)
- Language persists in localStorage

## 🔑 Translation Key Structure

All translation files follow the same structure:

```javascript
export default {
  meta: { /* language metadata */ },
  nav: { /* navigation items */ },
  hero: { /* hero section */ },
  welcome: { /* welcome section */ },
  about: { /* about section */ },
  services: { /* services with array of items */ },
  performance: { /* performance metrics */ },
  portfolio: { /* portfolio items */ },
  blog: { /* blog section */ },
  faq: { /* FAQ items array */ },
  contact: { /* contact form */ },
  footer: { /* footer content */ },
  thankYou: { /* thank you page */ },
  rotating: { /* rotating words array */ }
}
```

## 📝 Translation Guidelines

### General Rules
- **Keep keys unchanged** - Only translate the values
- **Maintain structure** - Arrays must have the same number of items
- **Test thoroughly** - Verify all sections after translation
- **Use proper encoding** - UTF-8 for all special characters

### RTL Languages (Arabic, Hebrew, Farsi, etc.)
1. Set `dir: 'rtl'` in the meta object
2. The system automatically handles layout mirroring
3. Test thoroughly in both LTR and RTL modes
4. Verify mobile responsiveness

### Array Content
Some sections use arrays (services, FAQ, portfolio):
```javascript
services: {
  items: [
    { title: 'Service 1', description: 'Description 1' },
    { title: 'Service 2', description: 'Description 2' },
    // ... keep same number of items
  ]
}
```

## 🔧 Helper Functions

The translation system exports these functions from `index.js`:

### `getTranslations(langCode)`
Get the full translation object for a language.
```javascript
const translations = getTranslations('es')
console.log(translations.hero.title)
```

### `hasLanguage(langCode)`
Check if a language is available.
```javascript
if (hasLanguage('es')) {
  // Language exists
}
```

### `getAvailableLanguages()`
Get array of all loaded language codes.
```javascript
const langs = getAvailableLanguages() // ['en', 'he', 'es']
```

### `getLanguageMeta(langCode)`
Get metadata for a specific language.
```javascript
const meta = getLanguageMeta('es')
// { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' }
```

## 🎨 Language Switcher UI

### 1 Language
The language switcher is automatically hidden when only one language is configured.

### 2 Languages
Displays as a simple toggle: **EN | עב**

### 3+ Languages
Automatically switches to a dropdown menu with all available languages.

The UI updates automatically based on the number of configured languages.

## 🧪 Testing Checklist

When adding a new language, verify:

- [ ] Translation file created with all keys
- [ ] Import added to `index.js`
- [ ] Language added to `site.js` config
- [ ] Language added to `language.js` CONFIG
- [ ] Site builds without errors
- [ ] Language appears in switcher
- [ ] All sections translate correctly
- [ ] Navigation updates properly
- [ ] Forms use correct placeholders
- [ ] Blog collections work (if using blog)
- [ ] RTL layout works (for RTL languages)
- [ ] Language persists in localStorage
- [ ] Browser language detection works
- [ ] Dark mode works with new language
- [ ] Mobile responsive in new language

## 🐛 Troubleshooting

### Language doesn't appear in switcher
- Check that language is added to both `site.js` and `language.js` CONFIG
- Verify import in `index.js`
- Clear browser cache and localStorage

### Content not translating
- Verify all translation keys match the template
- Check browser console for errors
- Ensure file is imported in `index.js`

### RTL layout issues
- Confirm `dir: 'rtl'` in meta object
- Check that language is detected as RTL in language.js
- Test in multiple browsers

### Build errors
- Check for syntax errors in translation file
- Ensure all strings are properly quoted
- Verify no missing commas in objects/arrays

## 📚 Language Codes Reference

Common ISO 639-1 language codes:

| Code | Language | Native Name | Direction |
|------|----------|-------------|-----------|
| en   | English  | English     | ltr       |
| es   | Spanish  | Español     | ltr       |
| fr   | French   | Français    | ltr       |
| de   | German   | Deutsch     | ltr       |
| it   | Italian  | Italiano    | ltr       |
| pt   | Portuguese | Português | ltr       |
| ru   | Russian  | Русский     | ltr       |
| ja   | Japanese | 日本語      | ltr       |
| zh   | Chinese  | 中文        | ltr       |
| ar   | Arabic   | العربية     | rtl       |
| he   | Hebrew   | עברית       | rtl       |
| fa   | Farsi    | فارسی       | rtl       |

## 🔧 Maintaining Translation Structure

### When Adding New Sections to the Codebase

If you add new content sections to the website that require translation:

#### Step 1: Update en.js (Master Template)
Add new keys to [en.js](en.js) first. This is the **single source of truth**.

```javascript
// Example: Adding a new "pricing" section
export default {
  meta: { /* ... */ },
  nav: { /* ... */ },

  // NEW SECTION
  pricing: {
    title: 'Our Pricing',
    subtitle: 'Simple and transparent',
    plans: [
      { name: 'Basic', price: '$99' },
      { name: 'Pro', price: '$199' }
    ]
  },

  // ... rest of structure
}
```

#### Step 2: Update _template.js
Copy the **exact structure** from [en.js](en.js) to [_template.js](_template.js).

```javascript
// In _template.js
pricing: {
  title: 'Our Pricing',
  subtitle: 'Simple and transparent',
  plans: [
    { name: 'Basic', price: '$99' },
    { name: 'Pro', price: '$199' }
  ]
},
```

#### Step 3: Update ALL Existing Translation Files
Every language file (he.js, es.js, etc.) **MUST** add the same structure:

```javascript
// In he.js
pricing: {
  title: 'המחירים שלנו',
  subtitle: 'פשוט ושקוף',
  plans: [
    { name: 'בסיסי', price: '$99' },
    { name: 'מקצועי', price: '$199' }
  ]
},
```

#### Step 4: Validation Checklist
- [ ] New keys added to [en.js](en.js)
- [ ] [_template.js](_template.js) updated to match [en.js](en.js)
- [ ] All language files updated (he.js, es.js, etc.)
- [ ] Structure validation script passes (see below)
- [ ] Build succeeds without errors
- [ ] All languages display new content correctly

### Structure Validation

Run this validation to ensure all translation files match:

```bash
# Compare structure between files
node scripts/validate-translations.js  # (create this script if needed)
```

Or manually verify:
1. All translation files have same property count
2. All nested objects have same depth
3. All arrays have same length
4. No undefined property access in browser console

## 💡 Best Practices

1. **Always use _template.js** - Never copy old translation files as templates
2. **en.js is the master** - All structural changes start in [en.js](en.js)
3. **Translate incrementally** - Test after completing each major section
4. **Use native speakers** - Get translations reviewed by native speakers
5. **Test on devices** - Verify on desktop, tablet, and mobile
6. **Version control** - Commit translations separately for easier review
7. **Maintain structure** - When adding content, update ALL translation files simultaneously

## 🤝 Contributing Translations

If you'd like to contribute a translation:

1. Fork the repository
2. Follow the "Adding a New Language" steps above
3. Test thoroughly
4. Submit a pull request with:
   - New translation file
   - Updated `index.js`
   - Updated configs
   - Screenshots showing the translation in action

---

**Need help?** Check the main project README or open an issue on GitHub.
