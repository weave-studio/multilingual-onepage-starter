// Weave Studio - Main JavaScript
// Import SCSS styles
import '../scss/main.scss'

import { FAQAccordion } from './accordion.js'
import { initBackToTop } from './back-to-top.js'
import { initContactForm } from './form-validation.js'
import { initLazyLoading } from './lazy-loading.js'
import { initNavigation } from './navigation.js'
import { initRotatingText } from './rotating-text.js'
import { initNavbarScroll, initSmoothScroll } from './scroll-behavior.js'
import { initTheme } from './theme.js'
import './scroll-animations.js'
import './faq-filter.js'

document.addEventListener('DOMContentLoaded', () => {
  initTheme()
  initNavigation()
  initNavbarScroll()
  initSmoothScroll()
  // REMOVED: initIOSViewportFix() - no longer needed with position: sticky
  initRotatingText()

  // Initialize FAQ accordion on home page
  const faqSection = document.querySelector('.faq')
  if (faqSection) {
    new FAQAccordion(faqSection)
  }

  // Initialize FAQ accordion on FAQ listing page
  const faqListingSection = document.querySelector('.faq-listing')
  if (faqListingSection) {
    new FAQAccordion(faqListingSection)
  }

  // Initialize contact form validation
  initContactForm()

  // Initialize lazy loading for images
  initLazyLoading()

  // Initialize back-to-top button
  initBackToTop()
})
