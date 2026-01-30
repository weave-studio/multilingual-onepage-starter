module.exports = {
  title: 'Your Site Title',
  description: 'Your site description goes here',
  url: 'https://example.com',
  author: 'Your Name',

  // Multilingual Configuration
  multilingual: {
    // Default language code (must exist in languages array)
    defaultLanguage: 'en',

    // Storage key for language preference
    storageKey: 'site-language',

    // Available languages
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
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
        dir: 'ltr'
      }
    ],

    // Blog URL pattern configuration
    // Used for language switching on blog posts
    blog: {
      // Default path for default language (usually just /blog/)
      defaultPath: '/blog/',
      // Pattern for non-default languages: {langCode} will be replaced with language code
      langPath: '/blog/{langCode}/'
    }
  },

  // Analytics Configuration
  // Supports: 'ga4' (Google Analytics 4), 'plausible', 'fathom', or 'none'
  analytics: {
    // Provider: 'ga4' | 'plausible' | 'fathom' | 'none'
    provider: 'none',

    // Tracking ID (format varies by provider):
    // - GA4: 'G-XXXXXXXXXX'
    // - Plausible: 'yourdomain.com'
    // - Fathom: 'XXXXXXXX'
    trackingId: '',

    // Privacy settings
    respectDNT: true, // Honor "Do Not Track" browser setting
    anonymizeIP: true // Anonymize visitor IP addresses (GA4 only)
  }
}
