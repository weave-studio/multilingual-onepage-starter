# Skill: Customize Theme

> Change colors, fonts, spacing, and branding to match your brand identity

## Purpose

This skill guides you through customizing the visual theme of your site. You'll learn how to change accent colors, primary/secondary colors, fonts, spacing, and other design elements while maintaining accessibility standards and dark mode compatibility.

All theme customizations are centralized in SCSS variable files, making it easy to rebrand the entire site from a single location.

## Prerequisites

- [ ] Brand colors determined (hex codes ready)
- [ ] Font choices made (if changing fonts)
- [ ] Build succeeds: `npm run build`
- [ ] Basic understanding of CSS/SCSS helpful
- [ ] Access to contrast checking tools

## Input

| Parameter | Example | Required | Notes |
|-----------|---------|----------|-------|
| Customization type | Colors, fonts, or spacing | Yes | What you're customizing |
| Brand color (hex) | `#3b82f6` | If changing colors | Primary brand color |
| Font names | `Montserrat`, `Merriweather` | If changing fonts | Google Fonts or system fonts |

## Steps

Choose your customization type:
- **[Colors](#option-a-customize-colors)** - Change accent, primary, or background colors
- **[Fonts](#option-b-customize-fonts)** - Change typefaces for headings and body text
- **[Spacing](#option-c-customize-spacing)** - Adjust spacing scale

---

## Option A: Customize Colors

### A1: Change Accent Color (Quick Brand Refresh)

The accent color is used for buttons, links, and call-to-action elements.

**File:** `src/assets/scss/_variables.scss`

1. Find the theme accent variables (around line 70):
   ```scss
   // Theme Accents
   // Light theme
   $theme-accent-primary: #e8a587;
   $theme-accent-primary-hover: #f4c4ab;

   // Dark theme
   $theme-accent-primary-dark: #c9826b;
   $theme-accent-primary-hover-dark: #b57359;
   ```

2. Replace with your brand color:
   ```scss
   // Example: Change to blue accent
   $theme-accent-primary: #3b82f6;        // Your brand blue
   $theme-accent-primary-hover: #60a5fa;  // Lighter shade for hover

   $theme-accent-primary-dark: #2563eb;      // Darker for dark mode
   $theme-accent-primary-hover-dark: #1d4ed8; // Even darker for hover
   ```

**Tips for choosing shades:**
- **Hover color:** Should be 10-15% lighter (light mode) or darker (dark mode)
- **Use a tool:** [Tailwind Color Shades](https://uicolors.app/create) generates full palettes
- **Consistency:** Keep hue the same, only adjust lightness

3. **Test immediately:**
   ```bash
   npm run dev
   ```
   - Check buttons in light mode
   - Toggle dark mode - check buttons again
   - Verify hover states work

### A2: Change Primary Color Palette (Full Rebrand)

For a complete brand color overhaul:

**File:** `src/assets/scss/_variables.scss`

1. Find the primary color palette (around line 20):
   ```scss
   // Primary Color Palette (Sky Blue)
   $color-primary-50: #f0f9ff;
   $color-primary-100: #e0f2fe;
   $color-primary-200: #bae6fd;
   $color-primary-300: #7dd3fc;
   $color-primary-400: #38bdf8;
   $color-primary-500: #0ea5e9;  // Base color
   $color-primary-600: #0284c7;
   $color-primary-700: #0369a1;
   $color-primary-800: #075985;
   $color-primary-900: #0c4a6e;
   $color-primary-950: #082f49;
   ```

2. **Generate your brand palette:**
   - Go to [https://uicolors.app/create](https://uicolors.app/create)
   - Enter your brand color (e.g., `#7c3aed` for purple)
   - Copy the generated shades

3. **Replace all primary colors:**
   ```scss
   // Primary Color Palette (Your Brand Purple)
   $color-primary-50: #faf5ff;
   $color-primary-100: #f3e8ff;
   $color-primary-200: #e9d5ff;
   $color-primary-300: #d8b4fe;
   $color-primary-400: #c084fc;
   $color-primary-500: #7c3aed;  // Your brand color
   $color-primary-600: #9333ea;
   $color-primary-700: #7e22ce;
   $color-primary-800: #6b21a8;
   $color-primary-900: #581c87;
   $color-primary-950: #3b0764;
   ```

### A3: Change Background Colors

**File:** `src/assets/scss/_variables.scss`

1. Find hero gradient variables (around line 80):
   ```scss
   // Hero Section Gradients
   // Light mode
   $theme-hero-gradient-start: #f0f4f8;
   $theme-hero-gradient-end: #d4e2f1;

   // Dark mode
   $theme-hero-gradient-start-dark: #0a1628;
   $theme-hero-gradient-end-dark: #1e3a5f;
   ```

2. Replace with your colors:
   ```scss
   // Example: Warmer gradient
   $theme-hero-gradient-start: #fef3e2;
   $theme-hero-gradient-end: #f9d5a7;

   $theme-hero-gradient-start-dark: #2d1810;
   $theme-hero-gradient-end-dark: #4a2918;
   ```

### A4: Verify Color Accessibility

⚠️ **Critical:** All color changes must meet WCAG 2.1 AA contrast ratios:
- **Normal text:** 4.5:1 minimum
- **Large text (18pt+ or 14pt+ bold):** 3:1 minimum

**Tools to check contrast:**
1. [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
2. Chrome DevTools: Inspect element → Color picker shows contrast ratio
3. [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) (desktop app)

**How to check:**
1. Run `npm run dev`
2. Inspect a button or link
3. Check contrast ratio in DevTools
4. Adjust if ratio is too low

### A5: Update Dark Mode Overrides (if needed)

**File:** `src/assets/scss/themes/_dark-mode.scss`

If you changed primary colors significantly, verify dark mode selectors use your new colors correctly.

**Example:** If you changed buttons, check:
```scss
// Find button overrides in dark mode file
.btn-primary {
  background-color: var(--theme-accent-primary-dark);
  color: var(--color-neutral-50);

  &:hover {
    background-color: var(--theme-accent-primary-hover-dark);
  }
}
```

Usually no changes needed - CSS custom properties handle this automatically.

---

## Option B: Customize Fonts

### B1: Change to Google Fonts

**Example:** Switch from Inter to Montserrat (headings) + Merriweather (body)

#### Step 1: Update Font Loading

**File:** `src/_includes/partials/head.html`

Find the font loading section (around line 20):
```html
<!-- Fonts - Inter (sans-serif) for body text -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
/>
```

Replace with your fonts:
```html
<!-- Fonts - Montserrat (headings) + Merriweather (body) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Merriweather:wght@400;700&display=swap"
/>
```

**Font weight guide:**
- 400: Regular body text
- 600: Semibold (optional, for emphasis)
- 700: Bold (headings, strong emphasis)

#### Step 2: Update SCSS Variables

**File:** `src/assets/scss/_variables.scss`

Find typography variables (around line 100):
```scss
// Typography - Font Families
$font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-family-headings: 'Georgia', serif;
```

Replace with your fonts:
```scss
// Typography - Font Families
$font-family-primary: 'Merriweather', Georgia, serif;
$font-family-headings: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Fallback fonts:** Always include system fallbacks after your custom font.

#### Step 3: Test Typography

```bash
npm run dev
```

**Check:**
- [ ] Headings use new font
- [ ] Body text uses new font
- [ ] Font loads on first visit (check Network tab)
- [ ] Fallback works if font fails to load (disable network, refresh)
- [ ] Light and dark mode both work
- [ ] RTL languages still work (if applicable)

### B2: Change RTL Fonts (if applicable)

If you have RTL languages (Hebrew, Arabic), update RTL fonts:

**File:** `src/_includes/partials/head.html`

Find RTL font loading (around line 35):
```html
{% if language | isRTL %}
  {% if language == 'he' %}
  <!-- Hebrew fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alef:wght@400;700&family=Noto+Sans+Hebrew:wght@400;600;700&display=swap" />
  {% elif language == 'ar' %}
  <!-- Arabic fonts -->
  <link rel="stylesheet" href="..." />
  {% endif %}
{% endif %}
```

Update URLs for your chosen RTL fonts.

**File:** `src/assets/scss/_variables.scss`

Update RTL font variables:
```scss
// RTL (Hebrew/Arabic) fonts
$font-family-base-rtl: 'Your RTL Font', system-ui, sans-serif;
$font-family-heading-rtl: 'Your RTL Heading Font', system-ui, sans-serif;
```

---

## Option C: Customize Spacing

### C1: Adjust Spacing Scale

**File:** `src/assets/scss/_variables.scss`

Find spacing variables (around line 120):
```scss
// Spacing Scale (based on 4px increments)
$space-1: 0.25rem;  // 4px
$space-2: 0.5rem;   // 8px
$space-3: 0.75rem;  // 12px
$space-4: 1rem;     // 16px
$space-5: 1.25rem;  // 20px
$space-6: 1.5rem;   // 24px
$space-8: 2rem;     // 32px
$space-10: 2.5rem;  // 40px
$space-12: 3rem;    // 48px
$space-16: 4rem;    // 64px
$space-20: 5rem;    // 80px
$space-24: 6rem;    // 96px
$space-32: 8rem;    // 128px
```

**Options:**

1. **Increase spacing (more breathing room):**
   ```scss
   // Multiply all by 1.25x for more space
   $space-4: 1.25rem;  // 20px (was 16px)
   $space-8: 2.5rem;   // 40px (was 32px)
   // ... etc
   ```

2. **Decrease spacing (more compact):**
   ```scss
   // Multiply all by 0.875x for tighter layout
   $space-4: 0.875rem;  // 14px (was 16px)
   $space-8: 1.75rem;   // 28px (was 32px)
   // ... etc
   ```

3. **Change base increment:**
   ```scss
   // Use 8px increments instead of 4px
   $space-1: 0.5rem;  // 8px (was 4px)
   $space-2: 1rem;    // 16px (was 8px)
   // ... etc
   ```

⚠️ **Warning:** Changing spacing affects the entire site. Test thoroughly across all sections.

---

## Validation Checklist

### Build & Visual
- [ ] `npm run build` succeeds
- [ ] `npm run check` shows no errors
- [ ] `npm run dev` - site loads without errors
- [ ] No console errors in browser
- [ ] Fonts load correctly (check Network tab)

### Color Testing
- [ ] Light mode: All text readable
- [ ] Dark mode: All text readable
- [ ] Accent colors visible in both themes
- [ ] Buttons have clear hover states
- [ ] Links distinguishable from body text
- [ ] Focus indicators visible (Tab through interactive elements)
- [ ] Form error states clearly visible
- [ ] Contrast ratios checked (WCAG AA: 4.5:1 minimum for normal text)

### Typography Testing
- [ ] Headings use correct font
- [ ] Body text uses correct font
- [ ] Font weights display correctly (regular, semibold, bold)
- [ ] Line height comfortable to read
- [ ] Text doesn't overflow on mobile (375px width)
- [ ] RTL fonts work (if applicable)

### Spacing Testing
- [ ] Section spacing consistent
- [ ] No overlapping elements
- [ ] Mobile (375px): Adequate spacing, no cramming
- [ ] Tablet (768px): Balanced spacing
- [ ] Desktop (1200px+): Not too sparse

### Cross-Browser Testing
- [ ] Chrome/Edge: Renders correctly
- [ ] Firefox: Renders correctly
- [ ] Safari: Renders correctly
- [ ] Mobile Safari (iOS): Works correctly
- [ ] Chrome Mobile (Android): Works correctly

### Accessibility
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible with new colors
- [ ] Text resizes without breaking layout (zoom to 200%)
- [ ] Dark mode doesn't cause eye strain

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Fonts don't load | Font URL incorrect or font name misspelled | Check Network tab for 404s, verify font name exact |
| Dark mode colors wrong | CSS custom properties not updated | Check `_custom-properties.scss` maps variables correctly |
| Some elements still old color | Component uses hardcoded color | Search codebase for old hex code, replace with variable |
| Buttons invisible in dark mode | Contrast too low | Increase contrast between button and background |
| Spacing changes break layout | Grid or flex calculations assume old spacing | Adjust grid gaps or flex spacing in component SCSS |
| RTL fonts not applying | Font variable not used in RTL theme | Check `_rtl.scss` applies `$font-family-base-rtl` |
| Text overflows on mobile | Font size or spacing too large | Reduce font sizes or spacing for mobile breakpoint |
| Build fails after font change | Syntax error in variable definition | Check for missing quotes, semicolons in `_variables.scss` |
| Color not updating | Browser cache | Hard refresh (Cmd+Shift+R / Ctrl+F5) |
| Hover states not visible | Hover color too similar to base | Increase lightness difference between base and hover |

## Related Skills

- [create-page-section.md](./create-page-section.md) - Apply custom theme to new sections
- [add-new-language.md](./add-new-language.md) - Add fonts for new languages

## Reference

- [`.ai/context/customization-guide.md`](../context/customization-guide.md#customizing-colors) - Detailed customization guide
- [`.ai/context/patterns.md`](../context/patterns.md) - SCSS patterns and conventions
- [`.ai/context/architecture.md`](../context/architecture.md) - SCSS architecture overview
- [Google Fonts](https://fonts.google.com/) - Browse and select fonts
- [Tailwind Color Generator](https://uicolors.app/create) - Generate color palettes
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verify accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) - Contrast requirements

## Notes

- **Color psychology:** Colors evoke emotions - blue (trust), green (growth), red (urgency), purple (creativity)
- **Brand consistency:** If you have brand guidelines, follow them exactly for colors and fonts
- **Performance:** Each custom font adds ~20-50KB. Limit to 2-3 font families maximum
- **Variable fonts:** Consider using variable fonts for more flexibility with less file size
- **Fallback strategy:** Always provide system font fallbacks in case custom fonts fail to load
- **Dark mode priority:** Test dark mode immediately when changing colors - it's easier to fix issues early
- **Gradual changes:** For live sites, test theme changes on a staging environment first
- **Accessibility first:** When in doubt, choose higher contrast and larger font sizes
- **Mobile testing:** Colors and spacing have bigger impact on small screens - always test mobile

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-30
**Complexity:** Easy to Medium
**Estimated Time:** 30 minutes to 2 hours (depending on scope)
