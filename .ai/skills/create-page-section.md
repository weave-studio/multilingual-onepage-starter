# Skill: Create Page Section

> Add a new section to the homepage with full multilingual and accessibility support

## Purpose

This skill guides you through adding a completely new section to your homepage (e.g., pricing, testimonials, team, features). You'll create the HTML structure with proper semantics and accessibility, build matching SCSS styles following BEM methodology, add dark mode overrides, handle RTL if needed, add translations for all languages, and integrate scroll animations.

This ensures your new section integrates seamlessly with the existing template architecture.

## Prerequisites

- [ ] Section purpose and content planned
- [ ] Section name chosen (kebab-case: `testimonials`, `pricing`, `team`)
- [ ] Content structure decided (grid, cards, list, etc.)
- [ ] Translation text ready for all languages
- [ ] Build succeeds: `npm run build`
- [ ] Familiarity with BEM naming conventions helpful

## Input

| Parameter | Example | Required | Notes |
|-----------|---------|----------|-------|
| Section name | `testimonials` | Yes | Lowercase, kebab-case |
| Section title | "What Clients Say" | Yes | Main heading |
| Section subtitle | "Real feedback..." | No | Optional subheading |
| Content structure | Grid of cards | Yes | Layout type |
| Translation keys | testimonials.* | Yes | For all languages |
| Needs dark mode | Yes | Yes | Always plan for dark mode |
| Has RTL considerations | Check text/layout | Yes | Images, icons, directional elements |

## Steps

### Step 1: Plan Section Structure

Before coding, decide on:

1. **Content organization:**
   - Single column vs. grid
   - Card-based vs. list-based
   - Number of items
   - Nested components

2. **Semantic HTML:**
   - `<section>` for the wrapper
   - `<article>` for repeating items (cards, testimonials, team members)
   - Proper heading hierarchy (`<h2>` for section title)

3. **Translation structure:**
   - Section-level: `sectionName.title`, `sectionName.subtitle`
   - Items: `sectionName.items.0.property`, `sectionName.items.1.property`
   - Buttons/CTAs: `sectionName.cta.text`, `sectionName.cta.button`

**Example plan for testimonials:**
```
Structure:
- Section title (h2)
- Section subtitle (p)
- Grid of testimonial cards (3 columns on desktop)
  - Each card: quote, author name, company

Translation keys:
- testimonials.title
- testimonials.subtitle
- testimonials.items.0.quote
- testimonials.items.0.name
- testimonials.items.0.company
```

### Step 2: Add HTML to index.html

**File:** `src/index.html`

Insert your new section in `<main>`, typically before the contact section:

```html
<section id="testimonials" class="testimonials" aria-labelledby="testimonials-title">
  <div class="testimonials__container">
    <h2 id="testimonials-title" class="section-title" data-i18n="testimonials.title">
      What Our Clients Say
    </h2>
    <p class="section-subtitle" data-i18n="testimonials.subtitle">
      Real feedback from real clients
    </p>

    <div class="testimonials__grid">
      <article class="testimonial-card">
        <blockquote class="testimonial-card__quote">
          <p data-i18n="testimonials.items.0.quote">
            "Working with Weave Studio transformed our online presence. Highly professional!"
          </p>
        </blockquote>
        <div class="testimonial-card__author">
          <strong class="testimonial-card__name" data-i18n="testimonials.items.0.name">Sarah Johnson</strong>
          <span class="testimonial-card__company" data-i18n="testimonials.items.0.company">Tech Startup Inc.</span>
        </div>
      </article>

      <article class="testimonial-card">
        <blockquote class="testimonial-card__quote">
          <p data-i18n="testimonials.items.1.quote">
            "Fast, beautiful, and exactly what we needed. Couldn't be happier!"
          </p>
        </blockquote>
        <div class="testimonial-card__author">
          <strong class="testimonial-card__name" data-i18n="testimonials.items.1.name">David Chen</strong>
          <span class="testimonial-card__company" data-i18n="testimonials.items.1.company">Design Agency</span>
        </div>
      </article>

      <article class="testimonial-card">
        <blockquote class="testimonial-card__quote">
          <p data-i18n="testimonials.items.2.quote">
            "Exceptional attention to detail. Our site performs beautifully!"
          </p>
        </blockquote>
        <div class="testimonial-card__author">
          <strong class="testimonial-card__name" data-i18n="testimonials.items.2.name">Maria Garcia</strong>
          <span class="testimonial-card__company" data-i18n="testimonials.items.2.company">E-Commerce Store</span>
        </div>
      </article>
    </div>
  </div>
</section>
```

**Required patterns to follow:**

- **Section ID:** `id="testimonials"` - matches section name
- **ARIA labelledby:** `aria-labelledby="testimonials-title"` - points to heading ID
- **Heading ID:** `id="testimonials-title"` - matches aria-labelledby
- **BEM classes:** `testimonials`, `testimonials__container`, `testimonials__grid`
- **data-i18n attributes:** On ALL text elements for translation
- **Semantic HTML:** `<article>` for repeating items, `<blockquote>` for quotes

### Step 3: Create SCSS Component File

**File:** `src/assets/scss/components/_testimonials.scss`

Create a new file for your section's styles:

```scss
// ==========================================================================
// TESTIMONIALS SECTION
// Client testimonials grid
// ==========================================================================

.testimonials {
  padding: $space-16 0;
  background-color: var(--theme-section-bg-light);

  &__container {
    @include container;
  }

  &__grid {
    display: grid;
    gap: $space-8;
    margin-top: $space-12;

    // Responsive grid
    @include md {
      grid-template-columns: repeat(2, 1fr);
    }

    @include lg {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.testimonial-card {
  // Use existing card mixin for consistency
  @include card-base;
  padding: $space-6;
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__quote {
    flex-grow: 1;
    font-size: $font-size-lg;
    line-height: 1.6;
    color: var(--theme-text-primary);
    font-style: italic;

    p {
      margin: 0;
    }

    // Decorative quote mark
    &::before {
      content: '"';
      font-size: 3rem;
      line-height: 0;
      color: var(--theme-accent-primary);
      display: block;
      margin-bottom: $space-2;
    }
  }

  &__author {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    padding-top: $space-4;
    border-top: 1px solid var(--theme-border-color);
  }

  &__name {
    font-weight: 600;
    color: var(--theme-text-primary);
  }

  &__company {
    font-size: $font-size-sm;
    color: var(--theme-text-secondary);
  }
}
```

**Required patterns to follow:**

- **Variable usage:** Use `$space-*`, `$font-size-*` variables (never hardcode values)
- **Custom properties:** Use `var(--theme-*)` for colors (enables dark mode)
- **Mixins:** Use `@include container`, `@include md`, `@include lg` for responsive
- **BEM naming:** `.testimonials__container`, `.testimonial-card__quote`
- **Comments:** Section header comment for clarity

**Key SCSS patterns from the template:**

```scss
// Spacing variables (from _variables.scss)
$space-1: 0.25rem;   // 4px
$space-2: 0.5rem;    // 8px
$space-4: 1rem;      // 16px
$space-6: 1.5rem;    // 24px
$space-8: 2rem;      // 32px
$space-12: 3rem;     // 48px
$space-16: 4rem;     // 64px

// Container mixin
@include container;  // Max-width container with padding

// Responsive breakpoints
@include sm { ... }  // >= 640px
@include md { ... }  // >= 768px
@include lg { ... }  // >= 1024px
@include xl { ... }  // >= 1280px

// Card base mixin
@include card-base;  // Box, shadow, border, hover effect
```

### Step 4: Register SCSS in main.scss

**File:** `src/assets/scss/main.scss`

Add your component to the components section (alphabetically):

```scss
// === COMPONENTS ===
// Reusable UI components
@forward 'components/accordion';
@forward 'components/back-to-top';
@forward 'components/buttons';
@forward 'components/cards';
@forward 'components/footer';
@forward 'components/forms';
@forward 'components/hero';
@forward 'components/navigation';
@forward 'components/sections';
@forward 'components/testimonials';  // ← Add this
```

**Why this matters:** The `@forward` directive makes your component styles available globally. Without this, your section won't have any styling.

**Important:** Components DON'T use `@use 'variables'` themselves - they inherit variables from `main.scss`'s top-level `@use 'variables' as *`.

### Step 5: Add Dark Mode Overrides

**File:** `src/assets/scss/themes/_dark-mode.scss`

Add theme-aware overrides at the end of the file:

```scss
// Testimonials section
.testimonials {
  background-color: var(--theme-section-bg-dark);
}

.testimonial-card {
  background-color: var(--color-neutral-800);
  border-color: var(--color-neutral-700);

  &:hover {
    border-color: var(--theme-accent-primary-dark);
  }

  &__quote::before {
    color: var(--theme-accent-primary-dark);
  }

  &__author {
    border-top-color: var(--color-neutral-700);
  }
}
```

**Why dark mode matters:** All sections must work in both light and dark mode. Use theme-aware custom properties that automatically adapt.

**Common dark mode patterns:**

```scss
// Backgrounds
background-color: var(--theme-section-bg-light);     // Light mode
background-color: var(--theme-section-bg-dark);      // Dark mode

// Text
color: var(--theme-text-primary);     // Primary text (high contrast)
color: var(--theme-text-secondary);   // Secondary text (lower contrast)

// Accents
color: var(--theme-accent-primary);        // Light mode accent
color: var(--theme-accent-primary-dark);   // Dark mode accent

// Borders
border-color: var(--theme-border-color);   // Adapts to theme
```

### Step 6: Add RTL Overrides (if needed)

**File:** `src/assets/scss/themes/_rtl.scss`

If your section has directional elements (icons, arrows, gradients, asymmetric layouts), add RTL overrides:

```scss
// Testimonials section
.testimonial-card {
  &__quote::before {
    // Mirror quote mark for RTL
    transform: scaleX(-1);
  }
}
```

**When RTL overrides are needed:**

- ✅ Icons with directional meaning (arrows, chevrons)
- ✅ Asymmetric layouts (image left, text right)
- ✅ Gradients with direction
- ✅ Decorative elements with specific placement
- ❌ Centered content (automatically works)
- ❌ Simple grids (CSS Grid auto-mirrors)
- ❌ Text-only content (browser handles it)

**Common RTL patterns:**

```scss
// Flip horizontal direction
.element {
  transform: scaleX(-1);
}

// Swap left/right positioning
.element {
  // Instead of: margin-left: 20px;
  margin-inline-start: 20px;  // Auto-adapts to RTL
}

// Gradients
.element {
  background: linear-gradient(to left, ...);  // Will flip in RTL context
}
```

### Step 7: Add Translations to ALL Language Files

You must add translation keys to **every language file** in `src/assets/js/translations/`.

**Example:** For English (`src/assets/js/translations/en.js`):

```javascript
export default {
  meta: { /* ... */ },
  nav: { /* ... */ },
  // ... existing sections ...

  // Testimonials section (add before footer)
  testimonials: {
    title: 'What Our Clients Say',
    subtitle: 'Real feedback from real clients',
    items: [
      {
        quote: 'Working with Weave Studio transformed our online presence. Highly professional!',
        name: 'Sarah Johnson',
        company: 'Tech Startup Inc.'
      },
      {
        quote: 'Fast, beautiful, and exactly what we needed. Couldn't be happier!',
        name: 'David Chen',
        company: 'Design Agency'
      },
      {
        quote: 'Exceptional attention to detail. Our site performs beautifully!',
        name: 'Maria Garcia',
        company: 'E-Commerce Store'
      }
    ]
  },

  footer: { /* ... */ }
}
```

**Repeat for all languages:**
- `src/assets/js/translations/en.js`
- `src/assets/js/translations/he.js`
- `src/assets/js/translations/es.js`
- Any additional languages you have

**Translation structure must match exactly** across all language files (same keys, same array lengths).

### Step 8: Add Navigation Link (Optional)

If you want your section in the navigation menu:

**A. Add to navigation HTML**

Navigation is in `src/_includes/components/nav.html`, but it's rendered dynamically by JavaScript. You don't need to edit HTML.

**B. Add translation key to all language files**

```javascript
// In each translation file (en.js, he.js, es.js)
nav: {
  logo: 'Weave Studio',
  logoWeave: 'Weave',
  logoStudio: 'Studio',
  services: 'Services',
  portfolio: 'Portfolio',
  about: 'About',
  blog: 'Blog',
  faq: 'FAQ',
  testimonials: 'Testimonials',  // ← Add this
  contact: 'Get Started',
  // ...
}
```

**C. Update navigation rendering** (if needed)

Check `src/_includes/components/nav.html` to see if it auto-generates links from sections or uses a hardcoded list. Update accordingly.

### Step 9: Add Scroll Animation (Optional)

If you want the section to animate on scroll (like other sections):

**Add `data-scroll-reveal` attribute** to the main grid/content:

```html
<div class="testimonials__grid" data-scroll-reveal>
  <!-- Cards... -->
</div>
```

**How it works:** The `animations.js` file (included via `scripts.html`) automatically detects `data-scroll-reveal` elements and animates them when they enter the viewport.

**Animation details:**
- Triggers when element is 10% visible
- Adds `is-visible` class
- CSS transition handles the animation
- Works with IntersectionObserver (modern browsers)

## Validation Checklist

### Build & Lint
- [ ] `npm run build` succeeds
- [ ] `npm run check` shows no Biome errors
- [ ] Browser console shows no JavaScript errors
- [ ] No TypeScript/linting errors in editor

### HTML Structure
- [ ] Section has unique `id` attribute
- [ ] Section has `aria-labelledby` pointing to heading
- [ ] Heading has matching `id`
- [ ] All text has `data-i18n` attributes
- [ ] Semantic HTML used (`<article>`, `<h2>`, etc.)
- [ ] No empty or placeholder text in HTML

### SCSS/Styling
- [ ] Component file created in `src/assets/scss/components/`
- [ ] File registered in `main.scss` with `@forward`
- [ ] BEM naming conventions followed
- [ ] Spacing uses `$space-*` variables
- [ ] Colors use `var(--theme-*)` custom properties
- [ ] Responsive breakpoints use `@include md`, `@include lg`
- [ ] No hardcoded pixel values for spacing
- [ ] Dark mode overrides added to `_dark-mode.scss`
- [ ] RTL overrides added to `_rtl.scss` (if needed)

### Visual Testing
- [ ] Section renders on homepage
- [ ] Light mode styling correct
- [ ] Dark mode styling correct (toggle theme)
- [ ] Mobile (375px): Layout stacks, text readable, no overflow
- [ ] Tablet (768px): 2-column grid (if applicable)
- [ ] Desktop (1200px+): 3-column grid (if applicable)
- [ ] Hover states work (if applicable)
- [ ] Spacing consistent with other sections
- [ ] Typography hierarchy clear

### Multilingual Testing
- [ ] Switch to each language - all text translates
- [ ] English: All keys resolve
- [ ] Hebrew (RTL): Text displays correctly, layout mirrors
- [ ] Spanish: All keys resolve
- [ ] No `data-i18n` attributes show in rendered text
- [ ] Translation arrays match HTML structure (same number of items)

### Accessibility
- [ ] Section has `aria-labelledby`
- [ ] Heading has proper hierarchy (`<h2>` for section title)
- [ ] All interactive elements keyboard-accessible (Tab, Enter)
- [ ] Focus indicators visible
- [ ] Screen reader announces section correctly
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] No information conveyed by color alone

### Scroll Animation (if added)
- [ ] `data-scroll-reveal` attribute present
- [ ] Animation triggers when scrolling to section
- [ ] Animation smooth (not jarring)
- [ ] Content readable before animation completes

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Section has no styling | SCSS not registered in `main.scss` | Add `@forward 'components/sectionname'` |
| Dark mode looks broken | No overrides in `_dark-mode.scss` | Add dark mode styles |
| Text doesn't translate | Missing `data-i18n` attributes | Add `data-i18n="section.key"` to all text |
| Translation shows key instead of text | Key doesn't exist in translation file | Add key to ALL translation files |
| Build fails with "undefined variable" | Using variable not imported | Check variables are defined in `_variables.scss` |
| RTL layout wrong | No RTL overrides | Add directional fixes to `_rtl.scss` |
| Section too narrow on mobile | Not using `@include container` | Add container class or mixin |
| Spacing inconsistent | Hardcoded pixel values | Replace with `$space-*` variables |
| Animation doesn't trigger | Missing `data-scroll-reveal` attribute | Add attribute to animated element |
| Grid doesn't stack on mobile | No responsive breakpoints | Add `@include md` / `@include lg` media queries |
| Colors same in light/dark | Using static colors not custom properties | Use `var(--theme-*)` instead of `$color-*` |

## Related Skills

- [customize-theme.md](./customize-theme.md) - Adjust colors and fonts for your section
- [add-new-language.md](./add-new-language.md) - Add translations for new languages
- [add-blog-post.md](./add-blog-post.md) - Create content for your site

## Reference

- [`.ai/context/patterns.md`](../context/patterns.md) - HTML, SCSS, and JavaScript patterns
- [`.ai/context/customization-guide.md`](../context/customization-guide.md#adding-new-sections) - Section customization guide
- [`.ai/context/architecture.md`](../context/architecture.md) - SCSS architecture and build system
- [BEM Methodology](https://getbem.com/) - CSS naming conventions
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards

## Notes

- **Section order:** Add new sections before the contact section (typically the last section before footer)
- **Naming conventions:** Use kebab-case for IDs and file names, BEM for CSS classes
- **Reusability:** Extract repeated patterns into mixins if you create multiple similar sections
- **Performance:** Large images in sections should be lazy-loaded: `loading="lazy"`
- **SEO:** Section headings contribute to page structure - use proper `<h2>` hierarchy
- **Content first:** Build the HTML structure with real content first, then style it - not the other way around
- **Dark mode testing:** Always toggle dark mode during development - don't wait until the end
- **Translation workflow:** Add placeholder English first, then translate to other languages - or vice versa based on your primary language

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-30
**Complexity:** Medium
**Estimated Time:** 1-2 hours
