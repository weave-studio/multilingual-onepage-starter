# Skill: Deploy Site

> Deploy your site to Netlify, Vercel, GitHub Pages, or traditional hosting

## Purpose

Deploy your built site to production hosting. This skill covers four popular deployment options with step-by-step instructions, configuration files, and post-deployment validation.

## Prerequisites

- [ ] Site builds successfully: `npm run build`
- [ ] All features tested locally: `npm run dev`
- [ ] Analytics configured (if using)
- [ ] Images optimized (recommended)
- [ ] Git repository set up (for Netlify/Vercel/GitHub Pages)
- [ ] Domain name ready (optional)

## Steps

Choose your hosting platform:
- **[Netlify](#option-a-netlify)** - Easiest, generous free tier, excellent DX
- **[Vercel](#option-b-vercel)** - Great performance, Next.js creators, free tier
- **[GitHub Pages](#option-c-github-pages)** - Free for public repos, GitHub integration
- **[Traditional/FTP](#option-d-traditional-hosting-ftp)** - cPanel, shared hosting

---

## Option A: Netlify

**Recommended for:** Beginners, fast deployment, automatic HTTPS

### A1: Pre-Deployment Checks

```bash
npm run build
npm run check
```

Verify `dist/` folder contains your built site.

### A2: Create netlify.toml

**File:** `netlify.toml` (in project root)

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### A3: Deploy via Netlify UI

1. **Push to Git:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub/GitLab/Bitbucket
   - Select your repository

3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

4. **Wait for deployment** (usually 1-2 minutes)

### A4: Configure Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `example.com`)
4. Follow DNS configuration instructions
5. Netlify auto-provisions SSL certificate

---

## Option B: Vercel

**Recommended for:** Great performance, edge functions, free tier

### B1: Create vercel.json

**File:** `vercel.json` (in project root)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": null,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### B2: Deploy via Vercel CLI or UI

**Option 1: Vercel CLI:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option 2: Vercel UI:**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Configure: Build command `npm run build`, Output directory `dist`
5. Click "Deploy"

---

## Option C: GitHub Pages

**Recommended for:** Free hosting for public repos, GitHub integration

### C1: Create GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

### C2: Enable GitHub Pages

1. Push workflow file to GitHub
2. Go to repository Settings → Pages
3. Source: "GitHub Actions"
4. Wait for workflow to complete
5. Site live at: `https://username.github.io/repo-name/`

**Base path adjustment** (if not using custom domain):
- Update links to include base path: `/repo-name/`
- Or configure Eleventy `pathPrefix` in `.eleventy.js`

---

## Option D: Traditional Hosting (FTP)

**Recommended for:** Shared hosting, cPanel, existing server

### D1: Build Production Site

```bash
npm run build
```

This creates the `dist/` folder with your static site.

### D2: Upload via FTP

**Using FileZilla (or any FTP client):**

1. Connect to your server:
   - Host: `ftp.yourhost.com`
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or 22 for SFTP)

2. Navigate to web root:
   - Usually `public_html/` or `www/` or `htdocs/`

3. Upload `dist/` contents:
   - Select ALL files/folders inside `dist/`
   - Drag to web root folder
   - Wait for upload (may take 5-10 minutes)

### D3: Configure .htaccess (Apache)

If using Apache, ensure `.htaccess` is in web root:

**File:** `.htaccess` (already in project root, should be uploaded)

```apache
# Security headers
Header set X-Frame-Options "DENY"
Header set X-Content-Type-Options "nosniff"
Header set X-XSS-Protection "1; mode=block"

# Cache static assets
<FilesMatch "\.(jpg|jpeg|png|gif|svg|webp|avif|woff|woff2|css|js)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Enable gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

## Post-Deployment Validation

### Functional Testing
- [ ] Homepage loads without errors
- [ ] All sections render correctly
- [ ] Navigation works (all links functional)
- [ ] Language switcher works
- [ ] Contact form works (if using server-side handler)
- [ ] Blog posts load correctly
- [ ] Dark mode toggle works
- [ ] Mobile responsive (test on actual device)

### SSL/Security
- [ ] HTTPS enabled (green padlock in browser)
- [ ] No mixed content warnings
- [ ] Security headers present (check with [SecurityHeaders.com](https://securityheaders.com/))

### Analytics
- [ ] Analytics tracking works (check dashboard)
- [ ] Page views recorded
- [ ] No console errors related to analytics

### Performance
- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Check Core Web Vitals
- [ ] Test from different locations (use [WebPageTest](https://www.webpagetest.org/))
- [ ] Images load quickly
- [ ] No 404 errors in Network tab

### SEO
- [ ] Google Search Console verified
- [ ] Sitemap submitted: `yoursite.com/sitemap.xml`
- [ ] robots.txt accessible: `yoursite.com/robots.txt`
- [ ] Meta tags correct (check page source)
- [ ] Open Graph tags present (test with [Facebook Debugger](https://developers.facebook.com/tools/debug/))

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Build fails on deploy | Node version mismatch | Set NODE_VERSION=18 in config |
| 404 on refresh | SPA routing not configured | Add redirect rules (netlify.toml, vercel.json) |
| CSS/JS not loading | Wrong base path | Check asset paths start with `/` |
| Images 404 | Passthrough copy not configured | Verify `.eleventy.js` has `addPassthroughCopy('src/assets')` |
| HTTPS not working | SSL not provisioned | Wait 5-10 minutes for auto-SSL, or configure manually |
| Analytics not tracking | Wrong tracking ID or provider | Verify `site.js` analytics config |
| Slow performance | Images not optimized | Run optimize-images skill first |
| Contact form not working | Server-side handler missing | Configure contact-handler.php or use form service |

## Related Skills

- [optimize-images.md](./optimize-images.md) - Optimize before deploying
- [setup-analytics.md](./setup-analytics.md) - Configure analytics
- [setup-fresh-project.md](./setup-fresh-project.md) - Initial project setup

## Reference

- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [WebPageTest](https://www.webpagetest.org/) - Performance testing
- [Google Search Console](https://search.google.com/search-console) - SEO monitoring

## Notes

- **Custom domains:** All platforms support custom domains - follow provider instructions
- **SSL certificates:** Netlify and Vercel auto-provision Let's Encrypt SSL certificates
- **Build time:** Typically 1-3 minutes for this template
- **Redeployments:** Push to main branch triggers automatic rebuild on Netlify/Vercel/GitHub Pages
- **Environment variables:** Not needed for this static site (analytics configured in site.js)
- **Rollbacks:** Netlify and Vercel support instant rollbacks to previous deployments
- **Preview deploys:** Netlify and Vercel create preview URLs for pull requests

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-30
**Complexity:** Easy to Medium
**Estimated Time:** 30 minutes to 2 hours (depending on platform and DNS configuration)
