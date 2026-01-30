# Skill: Optimize Images

> Optimize images for web performance using modern formats and responsive techniques

## Purpose

Reduce image file sizes and improve loading performance using WebP/AVIF formats, responsive images, lazy loading, and proper sizing. Images are often the largest assets on web pages - optimization can dramatically improve performance.

## Prerequisites

- [ ] Images ready to optimize in `src/assets/images/`
- [ ] Build succeeds: `npm run build`
- [ ] Image optimization tools installed (optional: ImageMagick, cwebp, avifenc)

## Steps

### Step 1: Audit Current Images

```bash
# Find all images and their sizes
find src/assets/images -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) -exec du -h {} \; | sort -rh
```

**Identify optimization opportunities:**
- Files > 200KB (large)
- PNG files that could be JPG
- JPG files at 100% quality
- Images larger than display size

### Step 2: Convert to Modern Formats

**Option A: Using online tools (easiest)**
- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [CloudConvert](https://cloudconvert.com/) - Batch conversion

**Option B: Using command-line tools**

**Install tools:**
```bash
# macOS
brew install imagemagick webp libavif

# Ubuntu/Debian
sudo apt-get install imagemagick webp libavif-bin

# Windows
# Download from official websites
```

**Convert to WebP:**
```bash
# Single file
cwebp -q 85 input.jpg -o output.webp

# Batch convert all JPGs
for file in src/assets/images/*.jpg; do
  cwebp -q 85 "$file" -o "${file%.jpg}.webp"
done
```

**Convert to AVIF (best compression):**
```bash
# Single file
avifenc --min 0 --max 63 -a end-usage=q -a cq-level=18 input.jpg output.avif

# Batch convert
for file in src/assets/images/*.jpg; do
  avifenc --min 0 --max 63 -a end-usage=q -a cq-level=18 "$file" "${file%.jpg}.avif"
done
```

### Step 3: Resize Images to Display Size

**Never serve images larger than display size:**

```bash
# Resize to max width 1200px (preserve aspect ratio)
convert input.jpg -resize 1200x\> output.jpg

# Create multiple sizes for responsive images
convert input.jpg -resize 400x output-small.jpg
convert input.jpg -resize 800x output-medium.jpg
convert input.jpg -resize 1200x output-large.jpg
```

### Step 4: Implement Responsive Images in HTML

**Basic responsive image:**
```html
<img
  src="/assets/images/photo.jpg"
  srcset="/assets/images/photo-400.jpg 400w,
          /assets/images/photo-800.jpg 800w,
          /assets/images/photo-1200.jpg 1200w"
  sizes="(max-width: 640px) 400px,
         (max-width: 1024px) 800px,
         1200px"
  alt="Descriptive alt text"
  loading="lazy"
  width="1200"
  height="800"
/>
```

**Modern format support with `<picture>`:**
```html
<picture>
  <source
    srcset="/assets/images/photo-400.avif 400w,
            /assets/images/photo-800.avif 800w,
            /assets/images/photo-1200.avif 1200w"
    sizes="(max-width: 640px) 400px,
           (max-width: 1024px) 800px,
           1200px"
    type="image/avif"
  />
  <source
    srcset="/assets/images/photo-400.webp 400w,
            /assets/images/photo-800.webp 800w,
            /assets/images/photo-1200.webp 1200w"
    sizes="(max-width: 640px) 400px,
           (max-width: 1024px) 800px,
           1200px"
    type="image/webp"
  />
  <img
    src="/assets/images/photo-1200.jpg"
    srcset="/assets/images/photo-400.jpg 400w,
            /assets/images/photo-800.jpg 800w,
            /assets/images/photo-1200.jpg 1200w"
    sizes="(max-width: 640px) 400px,
           (max-width: 1024px) 800px,
           1200px"
    alt="Descriptive alt text"
    loading="lazy"
    width="1200"
    height="800"
  />
</picture>
```

### Step 5: Add Lazy Loading

**For images below the fold:**
```html
<img src="..." alt="..." loading="lazy" />
```

**For critical images (hero, above-fold):**
```html
<img src="..." alt="..." loading="eager" />
<!-- or omit loading attribute -->
```

### Step 6: Add Width and Height Attributes

**Prevents layout shift (Core Web Vitals):**
```html
<img
  src="/assets/images/photo.jpg"
  alt="Description"
  width="1200"
  height="800"
  loading="lazy"
/>
```

Browser calculates aspect ratio and reserves space before image loads.

### Step 7: Optimize SVGs

**For SVG icons and graphics:**

```bash
# Install SVGO
npm install -g svgo

# Optimize single SVG
svgo input.svg -o output.svg

# Batch optimize
svgo -f src/assets/images/svg -o src/assets/images/svg-optimized
```

**Manual SVG optimization:**
1. Remove unnecessary metadata
2. Remove comments
3. Minimize decimal precision
4. Remove unused IDs and classes
5. Minify paths

### Step 8: Create Before/After Comparison

**Document your optimization results:**

```bash
# Before
find src/assets/images -name "*.jpg" -exec du -ch {} + | grep total

# After
find src/assets/images -name "*.webp" -exec du -ch {} + | grep total
```

**Example results:**
- Before: 2.4 MB total
- After: 780 KB total
- Savings: 67% reduction

## Validation Checklist

### File Optimization
- [ ] All images < 200KB (larger images have WebP/AVIF variants)
- [ ] JPG quality 80-85 (good balance)
- [ ] PNG only for transparency/logos
- [ ] WebP versions created for all photos
- [ ] AVIF versions for maximum compression (optional)

### HTML Implementation
- [ ] `loading="lazy"` on below-fold images
- [ ] `width` and `height` attributes on all images
- [ ] `srcset` for responsive images
- [ ] `<picture>` element for format fallbacks
- [ ] Alt text on all images (descriptive, not "image of...")

### Performance Testing
- [ ] Run Lighthouse audit
- [ ] Check "Properly size images" (should pass)
- [ ] Check "Serve images in next-gen formats" (should pass)
- [ ] Check "Defer offscreen images" (should pass)
- [ ] No Cumulative Layout Shift (CLS) from images

### Visual Testing
- [ ] Images display correctly in all browsers
- [ ] Fallback to JPG works (disable WebP in DevTools)
- [ ] Lazy loading works (scroll down - images load)
- [ ] No broken images
- [ ] Responsive images load correct size (check Network tab)

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Images blurry | Over-compressed | Increase quality setting (try q=90) |
| Large file sizes | Wrong format or quality | Use WebP q=85 or AVIF cq-level=18 |
| Layout shift on load | Missing width/height | Add explicit dimensions to `<img>` |
| Images not lazy loading | `loading="lazy"` missing | Add attribute to images below fold |
| WebP not supported | Old browser | Use `<picture>` with JPG fallback |
| Responsive images not working | `sizes` attribute wrong | Verify sizes match CSS breakpoints |

## Related Skills

- [add-blog-post.md](./add-blog-post.md) - Optimize blog featured images
- [create-page-section.md](./create-page-section.md) - Add optimized images to sections
- [deploy-site.md](./deploy-site.md) - Deploy optimized site

## Reference

- [Squoosh App](https://squoosh.app/) - Image optimization tool
- [WebP Documentation](https://developers.google.com/speed/webp)
- [AVIF Documentation](https://avif.io/)
- [Responsive Images Guide](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Lazy Loading](https://web.dev/lazy-loading-images/)

## Notes

- **Format support:** WebP: 97%+ browsers, AVIF: 90%+ browsers (always provide JPG fallback)
- **Quality settings:** WebP q=85 ≈ JPG q=90 (better compression), AVIF even better
- **File size targets:** Hero images < 150KB, thumbnails < 50KB, icons < 10KB
- **Automation:** Consider build-time optimization with Eleventy Image plugin for production sites
- **CDN:** Consider using image CDN (Cloudinary, Imgix) for automatic optimization and delivery

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-30
**Complexity:** Easy
**Estimated Time:** 1-2 hours (depending on number of images)
