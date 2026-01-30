# Skill: Setup Analytics

> Configure Google Analytics 4, Plausible, or Fathom Analytics for visitor tracking

## Purpose

Add analytics to track visitor behavior, page views, and user interactions. The template supports three privacy-friendly analytics providers out of the box.

## Prerequisites

- [ ] Analytics provider chosen (GA4, Plausible, or Fathom)
- [ ] Account created with chosen provider
- [ ] Tracking ID obtained
- [ ] Privacy policy updated (if needed)
- [ ] Build succeeds: `npm run build`

## Input

| Parameter | Example | Required |
|-----------|---------|----------|
| Provider | `ga4`, `plausible`, `fathom`, or `none` | Yes |
| Tracking ID | `G-XXXXXXXXXX` (GA4)<br>`yourdomain.com` (Plausible)<br>`XXXXXXXX` (Fathom) | Yes |
| Respect DNT | `true` or `false` | Yes |
| Anonymize IP | `true` or `false` (GA4 only) | Yes |

## Steps

### Step 1: Choose Analytics Provider

**Comparison:**

| Feature | Google Analytics 4 | Plausible | Fathom |
|---------|-------------------|-----------|--------|
| **Price** | Free | $9/mo+ | $14/mo+ |
| **Privacy** | Moderate (Google) | High | High |
| **GDPR** | Requires consent banner | Compliant by default | Compliant by default |
| **Features** | Very comprehensive | Essential metrics | Essential metrics |
| **Cookie-free** | No (uses cookies) | Yes | Yes |
| **Data ownership** | Google | You | You |
| **Learning curve** | Steep | Easy | Easy |

**Recommendations:**
- **GA4:** Need detailed reports, integrations, free tier acceptable
- **Plausible:** Privacy-focused, simple dashboard, EU hosting
- **Fathom:** Similar to Plausible, Canada/US hosting

### Step 2: Get Tracking ID

#### For Google Analytics 4:
1. Go to [analytics.google.com](https://analytics.google.com/)
2. Create account and property
3. Get Measurement ID (format: `G-XXXXXXXXXX`)

#### For Plausible:
1. Go to [plausible.io](https://plausible.io/)
2. Add your website
3. Use your domain as tracking ID (e.g., `yourdomain.com`)

#### For Fathom:
1. Go to [usefathom.com](https://usefathom.com/)
2. Add your site
3. Get Site ID (8-character code: `ABCD1234`)

### Step 3: Configure in site.js

**File:** `src/_data/site.js`

Find the `analytics` section (lines 47-62):

```javascript
//  Analytics Configuration
analytics: {
  // Provider: 'ga4' | 'plausible' | 'fathom' | 'none'
  provider: 'ga4',  // ← Change this

  // Tracking ID (format varies by provider):
  // - GA4: 'G-XXXXXXXXXX'
  // - Plausible: 'yourdomain.com'
  // - Fathom: 'XXXXXXXX'
  trackingId: 'G-XXXXXXXXXX',  // ← Add your ID

  // Privacy settings
  respectDNT: true,     // Honor "Do Not Track" browser setting
  anonymizeIP: true     // Anonymize visitor IP addresses (GA4 only)
}
```

**Example configurations:**

**Google Analytics 4:**
```javascript
analytics: {
  provider: 'ga4',
  trackingId: 'G-ABC123XYZ',
  respectDNT: true,
  anonymizeIP: true
}
```

**Plausible:**
```javascript
analytics: {
  provider: 'plausible',
  trackingId: 'example.com',  // Your domain
  respectDNT: true,
  anonymizeIP: false  // Not applicable for Plausible
}
```

**Fathom:**
```javascript
analytics: {
  provider: 'fathom',
  trackingId: 'ABCD1234',
  respectDNT: true,
  anonymizeIP: false  // Not applicable for Fathom
}
```

**Disable analytics:**
```javascript
analytics: {
  provider: 'none',
  trackingId: '',
  respectDNT: true,
  anonymizeIP: false
}
```

### Step 4: Build and Deploy

```bash
npm run build
```

The analytics script is automatically injected based on your configuration. Check `src/_includes/partials/scripts.html` to see the implementation.

### Step 5: Verify Tracking Works

#### Development Testing:
```bash
npm run dev
```

1. Open DevTools → Network tab
2. Filter by "analytics", "gtag", "plausible", or "fathom"
3. Navigate pages - verify requests are sent
4. Check Console for any errors

#### Production Testing:
1. Deploy your site
2. Visit your live site
3. **For GA4:** Check Real-Time reports in Analytics dashboard
4. **For Plausible:** Check dashboard (updates within minutes)
5. **For Fathom:** Check dashboard (updates every 10 minutes)

### Step 6: Verify DNT Respects User Privacy

**Test Do Not Track:**

1. **Enable DNT in your browser:**
   - Chrome/Edge: Settings → Privacy → Send "Do Not Track"
   - Firefox: Settings → Privacy → Send websites a "Do Not Track" signal
   - Safari: Preferences → Privacy → Ask websites not to track me

2. **Visit your site with DevTools open:**
   - Network tab should show NO analytics requests
   - Console should show: "Analytics disabled: DNT enabled" (if respectDNT: true)

3. **Disable DNT and refresh:**
   - Analytics requests should now appear

## Validation Checklist

### Configuration
- [ ] Provider set correctly in `site.js`
- [ ] Tracking ID matches provider format
- [ ] `respectDNT` configured (recommend `true`)
- [ ] `anonymizeIP` configured (GA4 only)

### Build & Deploy
- [ ] `npm run build` succeeds
- [ ] No console errors
- [ ] Analytics script injected in HTML (view page source)

### Tracking Verification
- [ ] Network requests show analytics calls
- [ ] GA4: Real-time reports show active user (you)
- [ ] Plausible: Dashboard shows pageview within 5 minutes
- [ ] Fathom: Dashboard shows visit within 10 minutes
- [ ] Page view events tracked
- [ ] Navigation events tracked

### Privacy Compliance
- [ ] DNT honored (no tracking when DNT enabled)
- [ ] IP anonymization enabled (if applicable)
- [ ] Privacy policy updated to mention analytics
- [ ] Cookie notice added (if using GA4)

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| No analytics script in HTML | Provider set to `'none'` | Change `provider` in `site.js` |
| Script loads but no data | Wrong tracking ID | Verify ID matches dashboard |
| GA4 shows no data | Measurement ID incorrect | Check format: `G-XXXXXXXXXX` |
| Plausible 404 error | Domain mismatch | Use exact domain from Plausible dashboard |
| DNT not working | `respectDNT: false` | Set to `true` in `site.js` |
| Tracking works locally but not production | Build/deploy issue | Rebuild and redeploy |
| CORS errors | Self-hosting Plausible with wrong domain | Check Plausible docs for self-hosting |

## Related Skills

- [deploy-site.md](./deploy-site.md) - Deploy site to production
- [setup-fresh-project.md](./setup-fresh-project.md) - Initial project setup

## Reference

- [Google Analytics 4 Setup](https://support.google.com/analytics/answer/9304153)
- [Plausible Documentation](https://plausible.io/docs)
- [Fathom Documentation](https://usefathom.com/docs)
- [GDPR Compliance Guide](https://gdpr.eu/)

## Notes

- **Privacy-first:** Plausible and Fathom don't require cookie consent banners (GDPR compliant by default)
- **GA4 cookies:** If using GA4, you may need a cookie consent banner (check your jurisdiction)
- **DNT respect:** Enabling `respectDNT: true` is best practice for user privacy
- **Testing:** Analytics won't track during local development on `localhost` by default
- **Ad blockers:** Analytics may be blocked by browser extensions - this is expected behavior
- **Data retention:** Check each provider's data retention policies
- **Export data:** All three providers allow data export if you want to switch later

---

**Skill Version:** 1.0.0
**Last Updated:** 2026-01-30
**Complexity:** Easy
**Estimated Time:** 15-30 minutes
