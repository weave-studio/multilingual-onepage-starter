/**
 * Analytics Module
 *
 * Multi-provider analytics integration with privacy controls.
 * Supports: Google Analytics 4, Plausible, Fathom, or none.
 *
 * Features:
 * - Respects Do Not Track (DNT) browser setting
 * - Dynamic script loading (no third-party scripts until privacy checks pass)
 * - Unified event tracking API across providers
 * - Cookie consent hooks for future integration
 *
 * Configuration is read from a data attribute injected by analytics.html partial,
 * which gets its values from site.js.
 *
 * @module analytics
 */

// Default configuration
const DEFAULT_CONFIG = {
  provider: 'none',
  trackingId: '',
  respectDNT: true,
  anonymizeIP: true
}

let config = { ...DEFAULT_CONFIG }
let isInitialized = false

// ============================================
// PRIVACY CHECKS
// ============================================

/**
 * Check if Do Not Track is enabled in the browser
 * @returns {boolean} True if DNT is enabled
 */
function isDNTEnabled() {
  return (
    navigator.doNotTrack === '1' ||
    navigator.doNotTrack === 'yes' ||
    window.doNotTrack === '1' ||
    navigator.msDoNotTrack === '1'
  )
}

/**
 * Check if tracking is allowed based on privacy settings
 * @returns {boolean} True if tracking is allowed
 */
function isTrackingAllowed() {
  // Respect DNT if configured to do so
  if (config.respectDNT && isDNTEnabled()) {
    return false
  }

  // Future: Add cookie consent check here
  // if (config.cookieConsent && !hasUserConsented()) {
  //   return false
  // }

  return true
}

// ============================================
// PROVIDER LOADERS
// ============================================

/**
 * Load Google Analytics 4 script
 */
function loadGA4() {
  if (!config.trackingId) {
    console.warn('[Analytics] GA4 requires a trackingId (e.g., G-XXXXXXXXXX)')
    return
  }

  // Load gtag.js script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${config.trackingId}`
  document.head.appendChild(script)

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  // Configure GA4
  gtag('js', new Date())
  gtag('config', config.trackingId, {
    anonymize_ip: config.anonymizeIP,
    send_page_view: true
  })
}

/**
 * Load Plausible Analytics script
 * Plausible is privacy-friendly by default (no cookies, GDPR compliant)
 */
function loadPlausible() {
  if (!config.trackingId) {
    console.warn('[Analytics] Plausible requires your domain as trackingId (e.g., yourdomain.com)')
    return
  }

  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = config.trackingId
  script.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(script)

  // Expose plausible function for custom events
  window.plausible = window.plausible || function() {
    (window.plausible.q = window.plausible.q || []).push(arguments)
  }
}

/**
 * Load Fathom Analytics script
 * Fathom is privacy-friendly by default (no cookies, GDPR compliant)
 */
function loadFathom() {
  if (!config.trackingId) {
    console.warn('[Analytics] Fathom requires a siteId as trackingId (e.g., ABCDEFGH)')
    return
  }

  const script = document.createElement('script')
  script.defer = true
  script.dataset.site = config.trackingId
  script.src = 'https://cdn.usefathom.com/script.js'
  document.head.appendChild(script)
}

// ============================================
// PROVIDER INITIALIZATION
// ============================================

/**
 * Initialize the configured analytics provider
 */
function initProvider() {
  if (config.provider === 'none' || !config.trackingId) {
    return
  }

  switch (config.provider) {
    case 'ga4':
      loadGA4()
      break
    case 'plausible':
      loadPlausible()
      break
    case 'fathom':
      loadFathom()
      break
    default:
      console.warn(`[Analytics] Unknown provider: ${config.provider}`)
      return
  }

  isInitialized = true
}

// ============================================
// PUBLIC API
// ============================================

/**
 * Track a custom event
 *
 * @param {string} eventName - Name of the event to track
 * @param {Object} params - Event parameters (varies by provider)
 *
 * @example
 * // Track a button click
 * trackEvent('button_click', { button_id: 'cta-hero' })
 *
 * // Track a form submission
 * trackEvent('form_submit', { form_name: 'contact' })
 */
export function trackEvent(eventName, params = {}) {
  if (!isTrackingAllowed() || !isInitialized) {
    return
  }

  switch (config.provider) {
    case 'ga4':
      if (window.gtag) {
        window.gtag('event', eventName, params)
      }
      break
    case 'plausible':
      if (window.plausible) {
        window.plausible(eventName, { props: params })
      }
      break
    case 'fathom':
      if (window.fathom) {
        // Fathom uses goals with optional monetary value
        window.fathom.trackGoal(params.goalId || eventName, params.value || 0)
      }
      break
    default:
      break
  }
}

/**
 * Track a page view (useful for SPA-like navigation)
 *
 * @param {string} [path] - Page path to track (defaults to current path)
 *
 * @example
 * // Track current page
 * trackPageView()
 *
 * // Track specific path
 * trackPageView('/thank-you')
 */
export function trackPageView(path) {
  if (!isTrackingAllowed() || !isInitialized) {
    return
  }

  const url = path || window.location.pathname

  switch (config.provider) {
    case 'ga4':
      if (window.gtag) {
        window.gtag('event', 'page_view', { page_path: url })
      }
      break
    case 'plausible':
      if (window.plausible) {
        window.plausible('pageview')
      }
      break
    case 'fathom':
      if (window.fathom) {
        window.fathom.trackPageview({ url })
      }
      break
    default:
      break
  }
}

// ============================================
// COOKIE CONSENT HOOKS (Future)
// ============================================

/**
 * Enable tracking after user consent
 * Call this when user accepts analytics cookies
 *
 * @example
 * // In your cookie consent banner's accept handler
 * document.querySelector('.accept-cookies').addEventListener('click', () => {
 *   enableTracking()
 * })
 */
export function enableTracking() {
  if (isInitialized) {
    return
  }
  initProvider()
}

/**
 * Disable tracking (user revoked consent)
 * Note: This prevents new tracking but doesn't remove already-loaded scripts
 */
export function disableTracking() {
  isInitialized = false
}

/**
 * Check if analytics is currently active
 * @returns {boolean} True if analytics is initialized and tracking
 */
export function isAnalyticsActive() {
  return isInitialized && isTrackingAllowed()
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize analytics system
 *
 * Reads configuration from data attribute (injected by analytics.html partial)
 * or accepts a configuration object directly.
 *
 * @param {Object} [userConfig] - Optional configuration override
 * @param {string} userConfig.provider - Analytics provider ('ga4', 'plausible', 'fathom', 'none')
 * @param {string} userConfig.trackingId - Provider-specific tracking ID
 * @param {boolean} userConfig.respectDNT - Whether to respect Do Not Track
 * @param {boolean} userConfig.anonymizeIP - Whether to anonymize IP (GA4 only)
 *
 * @example
 * // Initialize from data attribute (default)
 * initAnalytics()
 *
 * // Initialize with explicit config
 * initAnalytics({
 *   provider: 'plausible',
 *   trackingId: 'mysite.com',
 *   respectDNT: true
 * })
 */
export function initAnalytics(userConfig = null) {
  // Read config from data attribute if not passed directly
  if (!userConfig) {
    const analyticsEl = document.querySelector('[data-analytics-config]')
    if (analyticsEl) {
      try {
        userConfig = JSON.parse(analyticsEl.dataset.analyticsConfig)
      } catch (e) {
        console.warn('[Analytics] Failed to parse config from data attribute')
      }
    }
  }

  // Merge with defaults
  if (userConfig) {
    config = { ...DEFAULT_CONFIG, ...userConfig }
  }

  // Check privacy settings before loading any scripts
  if (!isTrackingAllowed()) {
    // Silent skip - no warning needed for privacy-respecting behavior
    return
  }

  // Initialize the configured provider
  initProvider()
}
