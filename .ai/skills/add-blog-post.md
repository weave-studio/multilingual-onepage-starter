# Skill: Add Blog Post

> Create a new blog post in any language with proper frontmatter and markdown content

## Purpose

This skill guides you through creating a new blog post for your site. You'll learn the required frontmatter structure, how to write markdown content, how to add featured images, and how to manage multilingual blog posts.

Blog posts are written in Markdown (`.md` files) and automatically processed by Eleventy into HTML pages.

## Prerequisites

- [ ] Blog post content written (or ready to draft)
- [ ] Language determined (en, he, es, or other configured language)
- [ ] Category decided (Web Development, Design, Performance, SEO, or custom)
- [ ] Featured image prepared (optional, but recommended)
- [ ] Build succeeds: `npm run build`

## Input

| Parameter | Example | Required | Notes |
|-----------|---------|----------|-------|
| Language code | `en` | Yes | Must match configured language |
| Post title | "Optimizing Web Performance" | Yes | SEO-friendly, descriptive |
| Post slug | `optimizing-web-performance` | Yes | URL-safe, lowercase, hyphens |
| Category | "Performance" | Yes | Used for filtering and translation |
| Publication date | `2026-01-30` | Yes | YYYY-MM-DD format |
| Featured image | `/assets/images/blog/post-image.jpg` | No | Recommended for social sharing |
| Excerpt | "Learn how to..." | Yes | 1-2 sentence summary |

## Steps

### Step 1: Choose Filename Convention

Blog post files go in `src/blog/` and should follow this naming pattern:

**Format:** `YYYY-MM-DD-slug-language.md`

**Examples:**
```
src/blog/2026-01-30-optimizing-web-performance-en.md
src/blog/2026-01-30-web-performance-he.md
src/blog/2026-02-15-design-trends-2026-es.md
```

**Why this format:**
- Date prefix allows chronological sorting in file system
- Slug provides SEO-friendly URL
- Language suffix enables easy filtering

**Alternative (simpler):**
```
src/blog/optimizing-web-performance-en.md
src/blog/web-performance-he.md
```

Use the convention that works best for you - both are supported.

### Step 2: Create Blog Post File

**File:** `src/blog/2026-01-30-optimizing-web-performance-en.md`

Create a new file with this frontmatter structure:

```markdown
---
title: "Optimizing Web Performance: A Complete Guide"
date: 2026-01-30
language: en
category: "Performance"
excerpt: "Learn practical strategies to make your website faster, from image optimization to code splitting and lazy loading."
featured_image: "/assets/images/blog/performance-guide.jpg"
author: "Your Name"
tags:
  - performance
  - optimization
  - web development
featured: false
---

## Introduction

Your blog post content starts here. Write in standard Markdown.

## What is Web Performance?

Web performance refers to how quickly...

### Measuring Performance

You can measure performance using these tools:

1. **Google Lighthouse** - Built into Chrome DevTools
2. **WebPageTest** - Detailed waterfall analysis
3. **Core Web Vitals** - Real user metrics

## Optimization Strategies

### Image Optimization

Images are often the largest assets on web pages. Here's how to optimize them:

- Use modern formats like WebP or AVIF
- Resize images to actual display size
- Implement lazy loading
- Use responsive images with `srcset`

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### Code Splitting

Break your JavaScript into smaller chunks...

## Conclusion

By following these strategies, you can significantly improve your website's performance.

### Step 3: Understand Frontmatter Fields

**Required fields:**

| Field | Format | Example | Purpose |
|-------|--------|---------|---------|
| `title` | String (quoted) | `"My Post Title"` | Post heading, page title |
| `date` | YYYY-MM-DD | `2026-01-30` | Publication date, sorting |
| `language` | Language code | `en`, `he`, `es` | Which language this post is in |
| `category` | String (quoted) | `"Web Development"` | Post category, must match translation key |
| `excerpt` | String (quoted) | `"Short summary..."` | Used in post cards, SEO description |

**Optional fields:**

| Field | Format | Example | Purpose |
|-------|--------|---------|---------|
| `featured_image` | Path string | `"/assets/images/blog/..."` | Card thumbnail, social sharing |
| `author` | String | `"Your Name"` | Author attribution |
| `tags` | YAML list | `- tag1`<br>`- tag2` | Filtering, SEO keywords |
| `featured` | Boolean | `true` or `false` | Highlight on homepage |

**Important notes:**

- **`language`** must match a configured language (`en`, `he`, `es`) or build will fail
- **`category`** should be one of: `"Web Development"`, `"Design"`, `"Performance"`, `"SEO"` (or add your own)
- **`date`** determines post order - newer posts appear first
- **`excerpt`** shows in blog listing cards - keep it concise (1-2 sentences)

### Step 4: Add Category Translations (if using new category)

If you're using a category that doesn't exist yet, add translations:

**File:** `src/assets/js/translations/en.js` (and all language files)

Find the `blog` section and add your category:

```javascript
blog: {
  title: 'Recently From the Blog',
  // ... other keys ...
  categories: {
    webDevelopment: 'Web Development',
    design: 'Design',
    performance: 'Performance',
    seo: 'SEO',
    tutorials: 'Tutorials'  // ← Add your new category
  },
  // ... rest of blog section
}
```

**Repeat for all language files:**
- `src/assets/js/translations/en.js` → `tutorials: 'Tutorials'`
- `src/assets/js/translations/he.js` → `tutorials: 'מדריכים'`
- `src/assets/js/translations/es.js` → `tutorials: 'Tutoriales'`

**Update category map in Eleventy:**

**File:** `.eleventy.js`

Find the `translateCategory` filter (around line 85):

```javascript
// Add category translation filter for blog posts
eleventyConfig.addFilter("translateCategory", function(category) {
  const categoryMap = {
    'Web Development': 'blog.categories.webDevelopment',
    'Design': 'blog.categories.design',
    'Performance': 'blog.categories.performance',
    'SEO': 'blog.categories.seo',
    'Tutorials': 'blog.categories.tutorials'  // ← Add this
  };
  return categoryMap[category] || category;
});
```

### Step 5: Add Featured Image (Optional but Recommended)

**Recommended specifications:**
- **Size:** 1200x630px (optimal for social sharing)
- **Format:** JPG or WebP
- **File size:** < 200KB (optimize for web)
- **Aspect ratio:** 1.91:1 (landscape)

**Location:** `src/assets/images/blog/your-image-name.jpg`

**Frontmatter:**
```yaml
featured_image: "/assets/images/blog/your-image-name.jpg"
```

**Image optimization:**
```bash
# If you have ImageMagick installed
convert input.jpg -resize 1200x630^ -gravity center -extent 1200x630 -quality 85 output.jpg

# Or use online tools:
# - TinyPNG (https://tinypng.com/)
# - Squoosh (https://squoosh.app/)
```

### Step 6: Write Markdown Content

**Supported Markdown features:**

```markdown
## Headings (H2, H3, H4)

**Bold text** and *italic text*

[Links](https://example.com)

![Images](/assets/images/example.jpg)

> Blockquotes for emphasis

- Unordered lists
- With multiple items

1. Ordered lists
2. Numbered automatically

` + "```" + `javascript
// Code blocks with syntax highlighting
const example = "Hello World";
` + "```" + `

Horizontal rules:
---

Tables:
| Column 1 | Column 2 |
|----------|----------|
| Data     | Data     |
```

**Best practices:**

- Start with `## ` for first heading (H2) - H1 is the post title
- Use semantic heading hierarchy (H2 → H3 → H4, don't skip levels)
- Break content into scannable sections
- Use code blocks for code examples
- Add alt text to all images
- Keep paragraphs short (3-4 sentences)
- Use lists for easy scanning

### Step 7: Create Companion Posts in Other Languages (Optional)

To make your blog post available in multiple languages:

1. **Create the companion file:**
   ```bash
   # If you have an English post, create Hebrew version
   cp src/blog/2026-01-30-optimizing-web-performance-en.md \
      src/blog/2026-01-30-optimizing-web-performance-he.md
   ```

2. **Update frontmatter:**
   ```yaml
   ---
   title: "אופטימיזציה של ביצועי אתר: מדריך מלא"
   date: 2026-01-30
   language: he  # ← Changed to Hebrew
   category: "Performance"
   excerpt: "למד אסטרטגיות מעשיות להאצת האתר שלך..."
   featured_image: "/assets/images/blog/performance-guide.jpg"  # Can reuse same image
   ---
   ```

3. **Translate content** to the target language

**Why companion posts:**
- Users can read blog in their preferred language
- Better SEO for multilingual sites
- Language switcher works on blog posts (auto-redirects to companion post)

**Linking companion posts:** The template automatically handles language switching between companion posts if they share the same slug and date.

### Step 8: Test the Post

```bash
npm run build
npm run dev
```

**Verification checklist:**

- [ ] Navigate to `/blog/` - post appears in listing
- [ ] Post card shows title, excerpt, category, date
- [ ] Featured image displays (if added)
- [ ] Click post - opens full post page
- [ ] Post content renders correctly
- [ ] Code blocks have syntax highlighting
- [ ] Images load
- [ ] Language switcher shows correct language
- [ ] Dark mode works on post page
- [ ] Mobile responsive (375px width)

## Validation Checklist

### Build & Lint
- [ ] `npm run build` succeeds
- [ ] `npm run check` shows no errors
- [ ] Blog collection includes new post
- [ ] No console errors when viewing post

### Frontmatter Validation
- [ ] All required fields present (title, date, language, category, excerpt)
- [ ] Date in YYYY-MM-DD format
- [ ] Language matches configured language
- [ ] Category is translated (if custom category)
- [ ] Featured image path is correct (if used)
- [ ] YAML syntax valid (proper quotes, indentation)

### Content Validation
- [ ] Markdown renders correctly
- [ ] Headings use proper hierarchy (H2, H3, H4)
- [ ] Links work and open correctly
- [ ] Images display with proper alt text
- [ ] Code blocks have language specified for syntax highlighting
- [ ] No broken internal links

### Visual Testing
- [ ] Post appears in blog listing
- [ ] Post card formatting correct
- [ ] Featured image displays in card
- [ ] Full post page renders properly
- [ ] Typography hierarchy clear
- [ ] Light mode readable
- [ ] Dark mode readable
- [ ] Mobile (375px): Text readable, images responsive
- [ ] Tablet (768px): Layout comfortable
- [ ] Desktop (1200px+): Optimal line length

### Multilingual Testing (if applicable)
- [ ] Companion posts in other languages work
- [ ] Language switcher appears on blog post
- [ ] Switching language redirects to companion post
- [ ] All language versions show correct translations

### SEO Validation
- [ ] Post has descriptive title (50-60 characters)
- [ ] Excerpt is compelling (150-160 characters)
- [ ] Featured image present for social sharing
- [ ] Headings use keywords naturally
- [ ] Content is substantial (300+ words minimum)

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Build fails: "Unknown language" | Language code doesn't match config | Use `en`, `he`, `es` or configured language code |
| Post doesn't appear in listing | Frontmatter syntax error | Validate YAML syntax, check for missing quotes/colons |
| Post shows future date | System clock wrong OR using future date | Use current/past date or check system time |
| Featured image 404 | Path incorrect | Verify path starts with `/assets/images/` and file exists |
| Code blocks no syntax highlighting | Language not specified | Add language: ` + "```" + `javascript` not ` + "```" + ` |
| Category shows as key | Translation missing | Add category to translation files in `blog.categories` |
| Markdown not rendering | File extension not `.md` | Ensure filename ends with `.md` |
| Post content blank | No content after frontmatter | Add markdown content after the `---` closing |
| Language switcher doesn't work | Companion post missing or different slug | Create companion post with same slug |
| RTL post displays LTR | Language not set to RTL language code | Use `language: he` (or other RTL code) |

## Related Skills

- [add-new-language.md](./add-new-language.md) - Add blog support for new language
- [optimize-images.md](./optimize-images.md) - Optimize featured images
- [create-page-section.md](./create-page-section.md) - Customize blog layout

## Reference

- [`.ai/context/patterns.md`](../context/patterns.md) - Markdown and content patterns
- [`.ai/context/architecture.md`](../context/architecture.md) - Blog collection architecture
- [Eleventy Documentation](https://www.11ty.dev/docs/) - Static site generator docs
- [Markdown Guide](https://www.markdownguide.org/) - Markdown syntax reference
- [Front Matter](https://www.11ty.dev/docs/data-frontmatter/) - Eleventy frontmatter docs

## Notes

- **Permalinks:** Blog posts use the pattern `/blog/slug/` for default language and `/blog/{langCode}/slug/` for other languages
- **Drafts:** To create a draft, set `date` to a future date - it won't appear in production builds (if configured)
- **Updating posts:** Edit the `.md` file and rebuild - changes appear immediately
- **Deleting posts:** Remove the `.md` file and rebuild
- **Post order:** Determined by `date` field - newer posts appear first
- **Reading time:** Automatically calculated based on word count (200 words/minute)
- **Collections:** Posts are automatically added to language-specific collections (`blogEn`, `blogHe`, `blogEs`)
- **Sitemap:** Blog posts are automatically included in sitemap.xml
- **RSS feed:** Not currently implemented - could be added as future enhancement
- **Comments:** Not included - could integrate Disqus, utterances, or similar

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-30
**Complexity:** Easy
**Estimated Time:** 30-60 minutes
