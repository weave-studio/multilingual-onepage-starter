// Weave Studio - Main JavaScript
import { initTheme } from './theme.js'
import { initNavigation } from './navigation.js'
import { initNavbarScroll } from './scroll-behavior.js'
import { initSmoothScroll } from './scroll-behavior.js'
import { initRotatingText } from './rotating-text.js'
import { FAQAccordion } from './accordion.js'
import { initContactForm } from './form-validation.js'
import { initLazyLoading } from './lazy-loading.js'
import { initBackToTop } from './back-to-top.js'
import './scroll-animations.js'
import './faq-filter.js'

console.log('Weave Studio website loading...')

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
    console.log('FAQ accordion initialized')
  }

  // Initialize FAQ accordion on FAQ listing page
  const faqListingSection = document.querySelector('.faq-listing')
  if (faqListingSection) {
    new FAQAccordion(faqListingSection)
    console.log('FAQ listing accordion initialized')
  }

  // Initialize contact form validation
  initContactForm()

  // Initialize lazy loading for images
  initLazyLoading()

  // Initialize back-to-top button
  initBackToTop()
})
