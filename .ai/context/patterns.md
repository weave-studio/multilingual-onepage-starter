# Code Patterns and Conventions

This document contains real code examples and patterns from the template. Use these as references when adding new features or modifying existing code.

## HTML Patterns

### Template Engine

This template uses **Nunjucks** for HTML templating (Eleventy's default for `.html` files).

**Common Nunjucks syntax:**
```html
<!-- Variables -->
{{ variableName }}

<!-- Conditionals -->
{% if condition %}...{% endif %}
{% if condition %}...{% else %}...{% endif %}

<!-- Loops -->
{% for item in items %}...{% endfor %}

<!-- Includes -->
{% include 'path/to/file.html' %}

<!-- Filters -->
{{ date | readableDate }}
{{ text | lowercase }}
```

### Page Structure

Every page follows this pattern:

```html
---
layout: layouts/base.html
language: en
pageClass: page-specific-class
title: Page Title
---

<main id="main-content" role="main">
  <section id="section-id" class="section-name" aria-labelledby="section-id-title">
    <div class="section-name__container">
      <h2 id="section-id-title" class="section-title" data-i18n="section.title">
        English Title Here
      </h2>
      <!-- Section content -->
    </div>
  </section>
</main>
```

**Key points:**
- Frontmatter sets layout, language, page class
- `<main>` has `id="main-content"` for skip link target
- `role="main"` for accessibility
- Sections use `aria-labelledby` pointing to heading `id`
- All translatable text has `data-i18n` attribute with English default

### BEM Naming Convention

**Block, Element, Modifier (BEM) methodology:**

```html
<!-- Block -->
<nav class="nav">

  <!-- Element (child of block) -->
  <div class="nav__logo">...</div>

  <!-- Element with modifier -->
  <a href="#" class="nav__link nav__link--active">Home</a>
  <button class="nav__link nav__link--cta">Get Started</button>

  <!-- Nested elements -->
  <ul class="nav__menu">
    <li class="nav__menu-item">
      <a href="#" class="nav__link">Services</a>
    </li>
  </ul>
</nav>
```

**Naming rules:**
- Block: `.block-name` (kebab-case)
- Element: `.block-name__element-name` (double underscore)
- Modifier: `.block-name--modifier-name` (double dash)
- **Never:** `.block-name__element-name__sub-element` (max one level deep)

**Real examples from codebase:**
```html
<!-- From nav.html -->
<nav class="nav">
  <div class="nav__logo"></div>
  <ul class="nav__menu"></ul>
  <a class="nav__link nav__link--cta"></a>
</nav>

<!-- From hero.html -->
<section class="hero">
  <div class="hero__container">
    <h1 class="hero__title"></h1>
    <p class="hero__description"></p>
    <div class="hero__actions">
      <a class="button button--primary"></a>
    </div>
  </div>
</section>

<!-- From footer.html -->
<footer class="footer">
  <div class="footer__container">
    <div class="footer__section">
      <h3 class="footer__heading"></h3>
      <ul class="footer__links"></ul>
    </div>
  </div>
</footer>
```

### Translation Pattern (data-i18n)

**Every user-facing text must use `data-i18n` attribute:**

```html
<!-- Simple text -->
<h2 data-i18n="welcome.title">Welcome to Our Site</h2>

<!-- Nested translation keys (dot notation) -->
<h3 data-i18n="services.intro.title">Our Services</h3>
<p data-i18n="services.intro.paragraph1">We offer professional...</p>

<!-- Array access in translation keys -->
<h4 data-i18n="services.items.0.title">Web Development</h4>
<p data-i18n="services.items.0.description">Professional websites...</p>

<!-- Form placeholders -->
<input
  type="text"
  data-i18n-placeholder="contact.form.fields.name.placeholder"
  placeholder="Your Name"
/>

<!-- Buttons -->
<button data-i18n="contact.form.submit">Send Message</button>

<!-- Links -->
<a href="#services" data-i18n="nav.services">Services</a>

<!-- List items (innerHTML preserved for HTML tags) -->
<li data-i18n="services.features.list1.description">
  <strong>Fast</strong> development process
</li>
```

**How it works:**
1. English text is the default (hardcoded in HTML)
2. `data-i18n` attribute specifies the translation key
3. JavaScript `language.js` updates text on language change
4. Dot notation (`section.subsection.key`) navigates translation object
5. Array indices supported (`items.0.title`, `features.2.description`)

**Real example from index.html:**
```html
<section id="services" class="services" aria-labelledby="services-title">
  <div class="services__container">
    <h2 id="services-title" class="section-title" data-i18n="services.title">
      Services
    </h2>
    <p class="section-subtitle" data-i18n="services.subtitle">
      What We Offer
    </p>

    <div class="service-cards">
      <article class="service-card">
        <h4 class="service-card__title" data-i18n="services.items.0.title">
          Website Development
        </h4>
        <p class="service-card__description" data-i18n="services.items.0.description">
          Professional-looking and optimized websites built to perform on all devices.
        </p>
      </article>
    </div>
  </div>
</section>
```

### Accessibility Patterns

**Every interactive component must be accessible:**

#### Skip Link

```html
<a href="#main-content" class="skip-link sr-only">
  Skip to main content
</a>

<!-- Target: -->
<main id="main-content" role="main">...</main>
```

**Note:** `.sr-only` class makes it visible only on keyboard focus.

#### ARIA Labels

```html
<!-- Navigation -->
<nav aria-label="Main navigation">...</nav>

<!-- Buttons with icons -->
<button
  data-theme-toggle
  aria-label="Toggle dark mode"
  class="nav__theme-toggle"
>
  <svg aria-hidden="true" focusable="false">...</svg>
  <span class="sr-only">Toggle theme</span>
</button>

<!-- Decorative images -->
<svg aria-hidden="true" focusable="false">...</svg>

<!-- Meaningful images -->
<img src="profile.jpg" alt="Profile photo of Jane Doe">

<!-- Sections -->
<section id="about" aria-labelledby="about-title">
  <h2 id="about-title">About Us</h2>
</section>
```

#### Form Accessibility

```html
<form class="contact-form" novalidate>
  <!-- Label associated with input -->
  <div class="form-group">
    <label for="contact-name" class="form-label">
      <span data-i18n="contact.form.fields.name.label">Name</span>
      <span class="form-required" aria-label="required">*</span>
    </label>
    <input
      type="text"
      id="contact-name"
      name="name"
      class="form-input"
      data-i18n-placeholder="contact.form.fields.name.placeholder"
      placeholder="Your Name"
      aria-required="true"
      aria-describedby="contact-name-error"
    />
    <span
      id="contact-name-error"
      class="form-error"
      role="alert"
      aria-live="polite"
    ></span>
  </div>

  <!-- Honeypot field (hidden from humans, visible to bots) -->
  <div class="contact__bot-field" aria-hidden="true">
    <label for="contact__bot-field">Don't fill this out:</label>
    <input type="text" name="contact__bot-field" id="contact__bot-field" />
  </div>

  <button type="submit" class="button button--primary">
    <span data-i18n="contact.form.submit">Send Message</span>
    <span class="button__loading" aria-hidden="true">
      <svg><!-- loading spinner --></svg>
    </span>
  </button>
</form>
```

**Key patterns:**
- `for` attribute on label matches input `id`
- `aria-required="true"` on required fields
- `aria-describedby` links to error message span
- Error spans have `role="alert"` and `aria-live="polite"`
- Honeypot field has `aria-hidden="true"`
- Loading states have `aria-hidden` to hide from screen readers

#### FAQ Accordion Accessibility

```html
<div class="faq-accordion">
  <div class="faq-item">
    <button
      class="faq-question"
      aria-expanded="false"
      aria-controls="faq-answer-1"
      id="faq-question-1"
    >
      <span data-i18n="faq.categories.process.q1.question">
        What is your development process?
      </span>
      <svg class="faq-icon" aria-hidden="true"><!-- chevron --></svg>
    </button>
    <div
      id="faq-answer-1"
      class="faq-answer"
      role="region"
      aria-labelledby="faq-question-1"
      aria-hidden="true"
    >
      <p data-i18n="faq.categories.process.q1.answer">
        Our process includes...
      </p>
    </div>
  </div>
</div>
```

**Key patterns:**
- `aria-expanded` reflects open/closed state
- `aria-controls` links button to content
- Answer has `role="region"` and `aria-labelledby`
- Icons have `aria-hidden="true"`

#### Screen Reader Only Content

```html
<!-- Visible only to screen readers -->
<span class="sr-only">Current language: English</span>

<!-- Hidden from screen readers -->
<svg aria-hidden="true" focusable="false">...</svg>
```

**`.sr-only` class definition (from _utilities.scss):**
```scss
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;

  &:focus {
    position: fixed;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    padding: $space-4;
    margin: 0;
    overflow: visible;
    clip: auto;
    clip-path: none;
    white-space: normal;
    background-color: var(--color-neutral-900);
    color: var(--color-neutral-50);
    z-index: $z-index-modal;
  }
}
```

---

## SCSS Patterns

### File Organization

```scss
// main.scss - Entry point
@use 'variables' as *;  // Import variables into global scope
@use 'mixins' as *;     // Import mixins into global scope

@forward 'base/reset';           // Forward (no namespace)
@forward 'base/custom-properties';
@forward 'components/navigation';
@forward 'themes/dark-mode';
```

**Rules:**
- Use `@use` for variables and mixins (brings into scope)
- Use `@forward` for component files (no import needed)
- Partial files start with underscore (`_variables.scss`)
- Import order matters (base → layout → components → themes)

### Variable Naming

**From `_variables.scss`:**

```scss
// Colors: $color-{palette}-{shade}
$color-primary-500: #0ea5e9;
$color-neutral-50: #f8fafc;
$color-neutral-900: #0f172a;

// Theme colors: $theme-{context}-{variant}
$theme-hero-gradient-start: #f0f4f8;
$theme-accent-terracotta: #e8a587;
$theme-text-primary: #1a2332;

// Typography: $font-{property}-{size/weight}
$font-size-base: 1rem;
$font-size-xl: 1.25rem;
$font-weight-normal: 400;
$font-weight-bold: 700;

// Spacing: $space-{number} (Tailwind-like)
$space-2: 0.5rem;   // 8px
$space-4: 1rem;     // 16px
$space-8: 2rem;     // 32px

// Breakpoints: $breakpoint-{size}
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;

// Transitions: $transition-{speed}
$transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
$transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);

// Z-index: $z-index-{context}
$z-index-dropdown: 1000;
$z-index-modal: 1050;
```

### Using Mixins

**Responsive breakpoints (mobile-first):**

```scss
.nav {
  display: flex;
  flex-direction: column;

  @include md {  // @media (min-width: 768px)
    flex-direction: row;
  }

  @include lg {  // @media (min-width: 1024px)
    padding: $space-6 $space-8;
  }
}
```

**Flexbox utilities:**

```scss
.hero__actions {
  @include flex-center;  // display: flex; align-items: center; justify-content: center;
}

.nav__menu {
  @include flex-between;  // display: flex; justify-content: space-between; align-items: center;
}
```

**Typography mixins:**

```scss
h1 {
  @include heading-1;  // Responsive font sizing, line-height, font-family
}

.section-subtitle {
  @include body-text-lg;  // Larger body text with appropriate line-height
}
```

**Button mixins:**

```scss
.button {
  @include button-base;  // Base button styles

  &--primary {
    @include button-primary;  // Terracotta accent color
  }

  &--secondary {
    @include button-secondary;  // Neutral/outlined
  }
}
```

**Real example from `_buttons.scss`:**
```scss
.button {
  @include button-base;

  &--primary {
    @include button-primary;
  }

  &--secondary {
    @include button-secondary;
  }

  &--ghost {
    @include button-ghost;
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
}
```

### Component Pattern

**Every component follows this structure:**

```scss
// components/_component-name.scss

.component-name {
  // Base styles
  display: block;
  padding: $space-4;

  // Elements
  &__element {
    color: var(--theme-text-primary);
  }

  &__element-2 {
    margin-bottom: $space-2;
  }

  // Modifiers
  &--variant {
    background-color: $color-primary-500;
  }

  // State classes
  &.is-active {
    font-weight: $font-weight-bold;
  }

  &.is-loading {
    opacity: 0.6;
    pointer-events: none;
  }

  // Responsive
  @include md {
    padding: $space-8;
  }

  // Nested component (rare, avoid deep nesting)
  .nested-component {
    // ...
  }
}
```

**Real example from `_navigation.scss`:**
```scss
.nav {
  position: sticky;
  top: 0;
  z-index: $z-index-sticky;
  background-color: var(--theme-bg-primary);
  transition: background-color $transition-normal, box-shadow $transition-normal;

  &.scrolled {
    box-shadow: $shadow-md;
  }

  &__container {
    @include container;
    @include flex-between;
    padding-top: $space-4;
    padding-bottom: $space-4;
  }

  &__logo {
    @include flex-center;
    gap: $space-2;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: var(--theme-text-primary);
    text-decoration: none;
  }

  &__menu {
    @include flex-center;
    gap: $space-6;
    list-style: none;
    margin: 0;
    padding: 0;

    @include md {
      flex-direction: row;
    }
  }

  &__link {
    color: var(--theme-text-secondary);
    text-decoration: none;
    font-weight: $font-weight-medium;
    transition: color $transition-fast;

    &:hover,
    &:focus {
      color: var(--theme-text-primary);
    }

    &--active {
      color: var(--theme-accent-terracotta);
    }

    &--cta {
      @include button-primary;
    }
  }
}
```

### Dark Mode Pattern

**Always use CSS custom properties for theming:**

```scss
// base/_custom-properties.scss
:root {
  --theme-bg-primary: #{$color-neutral-50};
  --theme-text-primary: #{$theme-text-primary};
  --theme-accent-terracotta: #{$theme-accent-terracotta};
}

// Component uses custom properties
.nav {
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
}

// themes/_dark-mode.scss
[data-theme='dark'] {
  --theme-bg-primary: #{$color-neutral-900};
  --theme-text-primary: #{$theme-text-primary-dark};
  --theme-accent-terracotta: #{$theme-accent-terracotta-dark};

  // Component-specific overrides
  .nav {
    border-bottom: 1px solid var(--color-neutral-800);
  }

  .hero {
    background: linear-gradient(
      135deg,
      var(--theme-hero-gradient-start),
      var(--theme-hero-gradient-end)
    );
  }
}
```

**Pattern rules:**
- Define CSS custom properties in `:root`
- Use SCSS variables for default values
- Override in `[data-theme='dark']` selector
- Component-specific dark mode styles go in `_dark-mode.scss`

### RTL Pattern

**Use logical properties where possible:**

```scss
// Instead of:
margin-left: $space-4;  // ❌ Directional

// Use:
margin-inline-start: $space-4;  // ✅ Logical
```

**For complex RTL changes:**

```scss
// themes/_rtl.scss
[dir='rtl'] {
  // Hebrew fonts
  --font-family-primary: 'Noto Sans Hebrew', sans-serif;
  --font-family-headings: 'Alef', serif;

  // Flex direction reversal
  .hero__actions {
    flex-direction: row-reverse;
  }

  // Transform for icons
  .nav__menu-icon {
    transform: scaleX(-1);  // Flip arrows/chevrons
  }

  // Text alignment
  .section-title {
    text-align: right;
  }

  // Mobile menu slide direction
  .nav__menu--mobile {
    right: auto;
    left: -100%;

    &.is-open {
      left: 0;
    }
  }
}
```

**Real RTL example from `_rtl.scss`:**
```scss
[dir='rtl'] {
  // Font family override for Hebrew
  --font-family-primary: 'Noto Sans Hebrew', sans-serif;
  --font-family-headings: 'Alef', serif;

  // Global text alignment
  body {
    text-align: right;
  }

  // Hero section
  .hero__actions {
    flex-direction: row-reverse;
  }

  // Service cards
  .service-cards {
    direction: rtl;
  }

  // FAQ filter buttons
  .faq__filters {
    direction: rtl;
  }

  // Navigation arrows/icons
  .nav__dropdown-arrow,
  .faq-icon {
    transform: scaleX(-1);
  }

  // Mobile menu
  @include max-md {
    .nav__menu--mobile {
      right: auto;
      left: -100%;

      &.is-open {
        left: 0;
      }
    }
  }
}
```

---

## JavaScript Patterns

### Module Structure

**Every JavaScript file exports functions OR classes (choose one pattern per file):**

**Functional Module Pattern** (used for: theme.js, language.js, analytics.js)

Utility modules that provide multiple related functions:

```javascript
// theme.js - exports multiple functions
let currentTheme = 'light'

function getTheme() {
  return currentTheme
}

function setTheme(theme) {
  currentTheme = theme
  document.documentElement.setAttribute('data-theme', theme)
}

export { getTheme, setTheme }
```

**Class-Based Module Pattern** (used for: accordion.js, faq-filter.js, lazy-load.js)

UI components that encapsulate state and behavior:

```javascript
// accordion.js - exports a single class
class FAQAccordion {
  constructor(element, options = {}) {
    this.element = element
    this.options = { ...this.defaultOptions, ...options }
    this.init()
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.element.addEventListener('click', this.handleClick.bind(this))
  }

  handleClick(event) {
    // Handle click
  }

  destroy() {
    // Cleanup
  }
}

export default FAQAccordion
```

**Why This Split?**
- **Functions** → For utilities and stateless operations (theme switching, language loading)
- **Classes** → For stateful UI components (accordions, filters, carousels)
- Choose ONE pattern per file to keep modules simple and predictable

**Real example from `theme.js`:**
```javascript
let currentTheme = 'light'

function getTheme() {
  const stored = localStorage.getItem('theme')
  if (stored) return stored

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function setTheme(theme) {
  currentTheme = theme
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

function toggleTheme() {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
}

function initTheme() {
  const theme = getTheme()
  setTheme(theme)

  // Listen for toggle button
  const toggleButton = document.querySelector('[data-theme-toggle]')
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleTheme)
  }

  // Listen for system preference changes (only if no manual preference)
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light')
    }
  })
}

export { initTheme, toggleTheme, currentTheme }
```

### Event Handling Pattern

**Use delegated event listeners for dynamic content:**

```javascript
// ❌ Don't attach to each element
document.querySelectorAll('.button').forEach(btn => {
  btn.addEventListener('click', handleClick)
})

// ✅ Delegate to parent
document.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    handleClick(e)
  }
})
```

**Real example from `scroll-behavior.js`:**
```javascript
export function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    // Check if clicked element is a hash link
    if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
      const link = e.target.matches('a') ? e.target : e.target.closest('a')
      const href = link.getAttribute('href')

      // Ignore empty or just "#"
      if (!href || href === '#') return

      e.preventDefault()

      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1')
        target.focus()
      }
    }
  })
}
```

### LocalStorage Pattern

**Always check for availability and handle errors:**

```javascript
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.warn(`Failed to save to localStorage: ${error}`)
  }
}

function getFromStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key)
    return value !== null ? value : defaultValue
  } catch (error) {
    console.warn(`Failed to read from localStorage: ${error}`)
    return defaultValue
  }
}
```

### Custom Events Pattern

**Dispatch custom events for inter-module communication:**

```javascript
// Dispatch
document.dispatchEvent(
  new CustomEvent('languageChanged', {
    detail: {
      language: 'en',
      translations: { /* ... */ }
    }
  })
)

// Listen
document.addEventListener('languageChanged', (e) => {
  const { language, translations } = e.detail
  console.log(`Language changed to: ${language}`)
})
```

**Real example from `language.js` → `form-validation.js`:**

```javascript
// language.js dispatches
function setLanguage(langCode) {
  // ... update language logic ...

  document.dispatchEvent(
    new CustomEvent('languageChanged', {
      detail: { language: currentLanguage, translations: currentTranslations }
    })
  )
}

// form-validation.js listens
class ContactFormValidator {
  constructor(form) {
    this.form = form
    this.setupLanguageListener()
  }

  setupLanguageListener() {
    document.addEventListener('languageChanged', () => {
      this.updateErrorMessages()
      this.revalidateVisibleErrors()
    })
  }

  updateErrorMessages() {
    const translations = getCurrentTranslations()
    this.errorMessages = translations.contact.form.errors
  }
}
```

### Class-Based Component Pattern

**Real example from `accordion.js`:**

```javascript
class FAQAccordion {
  constructor(container, options = {}) {
    // Prevent duplicate initialization
    if (container.dataset.accordionInitialized === 'true') {
      console.warn('Accordion already initialized on this element')
      return
    }

    this.container = container
    this.options = { allowMultiple: false, ...options }
    this.items = []
    this.init()

    // Mark as initialized
    container.dataset.accordionInitialized = 'true'
  }

  init() {
    this.findItems()
    this.bindEvents()
    this.setupAccessibility()
  }

  findItems() {
    this.items = Array.from(this.container.querySelectorAll('.faq-item'))
  }

  bindEvents() {
    this.items.forEach((item, index) => {
      const button = item.querySelector('.faq-question')
      const answer = item.querySelector('.faq-answer')

      if (button && answer) {
        button.addEventListener('click', () => this.toggle(index))
        button.addEventListener('keydown', (e) => this.handleKeyboard(e, index))
      }
    })
  }

  toggle(index) {
    const item = this.items[index]
    const button = item.querySelector('.faq-question')
    const answer = item.querySelector('.faq-answer')
    const isExpanded = button.getAttribute('aria-expanded') === 'true'

    if (!this.options.allowMultiple) {
      this.closeAll()
    }

    if (isExpanded) {
      this.close(index)
    } else {
      this.open(index)
    }

    this.announce(isExpanded ? 'collapsed' : 'expanded', button.textContent)
  }

  open(index) {
    const item = this.items[index]
    const button = item.querySelector('.faq-question')
    const answer = item.querySelector('.faq-answer')

    button.setAttribute('aria-expanded', 'true')
    answer.setAttribute('aria-hidden', 'false')
    answer.style.maxHeight = `${answer.scrollHeight}px`
  }

  close(index) {
    const item = this.items[index]
    const button = item.querySelector('.faq-question')
    const answer = item.querySelector('.faq-answer')

    button.setAttribute('aria-expanded', 'false')
    answer.setAttribute('aria-hidden', 'true')
    answer.style.maxHeight = '0'
  }

  closeAll() {
    this.items.forEach((_, index) => this.close(index))
  }

  handleKeyboard(event, index) {
    const key = event.key

    switch (key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        this.toggle(index)
        break
      case 'ArrowDown':
        event.preventDefault()
        this.focusNext(index)
        break
      case 'ArrowUp':
        event.preventDefault()
        this.focusPrevious(index)
        break
      case 'Home':
        event.preventDefault()
        this.focusFirst()
        break
      case 'End':
        event.preventDefault()
        this.focusLast()
        break
    }
  }

  focusNext(currentIndex) {
    const nextIndex = (currentIndex + 1) % this.items.length
    this.items[nextIndex].querySelector('.faq-question').focus()
  }

  focusPrevious(currentIndex) {
    const prevIndex = (currentIndex - 1 + this.items.length) % this.items.length
    this.items[prevIndex].querySelector('.faq-question').focus()
  }

  announce(action, questionText) {
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('role', 'status')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.classList.add('sr-only')

    // Direction-agnostic positioning (works in both LTR and RTL)
    liveRegion.style.position = 'absolute'
    liveRegion.style.width = '1px'
    liveRegion.style.height = '1px'
    liveRegion.style.padding = '0'
    liveRegion.style.margin = '-1px'
    liveRegion.style.overflow = 'hidden'
    liveRegion.style.clip = 'rect(0, 0, 0, 0)'
    liveRegion.style.clipPath = 'inset(50%)'
    liveRegion.style.whiteSpace = 'nowrap'
    liveRegion.style.border = '0'

    liveRegion.textContent = `${questionText} ${action}`
    document.body.appendChild(liveRegion)

    setTimeout(() => liveRegion.remove(), 1000)
  }

  destroy() {
    this.container.dataset.accordionInitialized = 'false'
    this.items = []
  }
}

export default FAQAccordion

// Helper function for easy initialization
export function initFAQAccordions(selector = '.faq-accordion') {
  const containers = document.querySelectorAll(selector)
  return Array.from(containers).map(container => new FAQAccordion(container))
}
```

**Key patterns from this example:**
- Duplicate initialization prevention via `dataset` attribute
- Options merging with defaults
- Separate `init()`, `bindEvents()`, `setupAccessibility()` methods
- Keyboard navigation (Arrow keys, Home, End)
- ARIA attributes management
- Screen reader announcements with clip-rect (RTL-safe)
- `destroy()` method for cleanup
- Helper function for batch initialization

### Reduced Motion Pattern

**Always respect `prefers-reduced-motion`:**

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (prefersReducedMotion) {
  // Skip animations
} else {
  // Run animations
}
```

**Real example from `scroll-animations.js`:**
```javascript
class ScrollAnimations {
  constructor() {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (this.prefersReducedMotion) {
      this.showAllElements()
      return
    }

    this.init()
  }

  showAllElements() {
    const elements = document.querySelectorAll('[data-scroll-reveal]')
    elements.forEach(el => el.classList.add('is-visible'))
  }

  init() {
    const elements = document.querySelectorAll('[data-scroll-reveal]')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    elements.forEach(el => observer.observe(el))
  }
}

export default ScrollAnimations
```

---

## Don'ts (Anti-Patterns)

### ❌ Don't Use jQuery

This is a vanilla JavaScript project. No jQuery.

```javascript
// ❌ Don't
$('.button').click(function() { ... })

// ✅ Do
document.querySelectorAll('.button').forEach(btn => {
  btn.addEventListener('click', (e) => { ... })
})
```

### ❌ Don't Inline Styles

Use classes and SCSS.

```html
<!-- ❌ Don't -->
<div style="color: red; padding: 20px;">Content</div>

<!-- ✅ Do -->
<div class="alert alert--error">Content</div>
```

### ❌ Don't Hard-Code Text

Always use `data-i18n` for translatable content.

```html
<!-- ❌ Don't -->
<button>Click Here</button>

<!-- ✅ Do -->
<button data-i18n="common.clickHere">Click Here</button>
```

### ❌ Don't Skip ARIA Labels

Every interactive element needs proper labeling.

```html
<!-- ❌ Don't -->
<button class="icon-button">
  <svg>...</svg>
</button>

<!-- ✅ Do -->
<button class="icon-button" aria-label="Close menu">
  <svg aria-hidden="true">...</svg>
  <span class="sr-only">Close menu</span>
</button>
```

### ❌ Don't Use Directional Properties for RTL

Use logical properties or RTL-specific overrides.

```scss
// ❌ Don't (breaks RTL)
.element {
  margin-left: $space-4;
  text-align: left;
}

// ✅ Do
.element {
  margin-inline-start: $space-4;
  text-align: start;
}

// Or use RTL override in _rtl.scss
[dir='rtl'] .element {
  margin-left: 0;
  margin-right: $space-4;
  text-align: right;
}
```

### ❌ Don't Break Dark Mode

Always use CSS custom properties for colors.

```scss
// ❌ Don't (hardcoded color)
.element {
  background-color: #ffffff;
  color: #000000;
}

// ✅ Do (uses custom properties)
.element {
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
}
```

### ❌ Don't Nest SCSS More Than 3 Levels

Keep specificity low.

```scss
// ❌ Don't
.nav {
  .nav__menu {
    .nav__menu-item {
      .nav__link {  // Too deep!
        color: red;
      }
    }
  }
}

// ✅ Do
.nav__link {
  color: var(--theme-text-primary);
}
```

### ❌ Don't Use ARIA Live Regions with Directional Positioning

Use clip-rect technique for screen-reader-only announcements.

```javascript
// ❌ Don't (breaks RTL, causes horizontal scroll)
liveRegion.style.position = 'absolute'
liveRegion.style.left = '-10000px'

// ✅ Do (direction-agnostic)
liveRegion.style.position = 'absolute'
liveRegion.style.clip = 'rect(0, 0, 0, 0)'
liveRegion.style.clipPath = 'inset(50%)'
liveRegion.style.whiteSpace = 'nowrap'
```

---

## Summary Checklist

When adding new code, ensure:

- [ ] HTML uses BEM naming convention
- [ ] All text has `data-i18n` attribute (English default)
- [ ] All interactive elements have ARIA labels
- [ ] Forms have proper label/input association
- [ ] SCSS uses variables and mixins (no hardcoded values)
- [ ] Dark mode support via CSS custom properties
- [ ] RTL support via logical properties or `[dir='rtl']` overrides
- [ ] JavaScript uses modern ES6+ syntax
- [ ] Event listeners are cleaned up when needed
- [ ] Reduced motion is respected for animations
- [ ] No jQuery or other framework dependencies
- [ ] Code follows existing patterns in the template

---

**Last Updated:** 2026-01-29
**Template Version:** 1.0.0 (in development)
