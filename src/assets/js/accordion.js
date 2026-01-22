/**
 * FAQ Accordion Component
 * Accessible accordion with keyboard navigation and ARIA support
 */

export class FAQAccordion {
  constructor(container) {
    this.container = container
    this.accordions = container.querySelectorAll('.faq-accordion')

    // Prevent duplicate initialization
    if (container.dataset.accordionInitialized === 'true') {
      return
    }
    container.dataset.accordionInitialized = 'true'

    this.init()
  }

  init() {
    // Don't initialize if no accordions found
    if (this.accordions.length === 0) {
      return
    }

    this.setupEventListeners()
    this.setupKeyboardNavigation()
    this.setupReducedMotion()
  }

  setupEventListeners() {
    this.accordions.forEach((accordion, index) => {
      const button = accordion.querySelector('.faq-accordion__question button')
      const answer = accordion.querySelector('.faq-accordion__answer')

      if (!button || !answer) return

      // Generate unique ID for this accordion
      const uniqueId = `faq-${index + 1}-${Date.now()}`
      answer.id = uniqueId
      button.setAttribute('aria-controls', uniqueId)

      // Click handler
      button.addEventListener('click', e => {
        e.preventDefault()
        this.toggleAccordion(accordion, button, answer)
      })

      // Prevent default space bar behavior on button
      button.addEventListener('keydown', e => {
        if (e.key === ' ') {
          e.preventDefault()
        }
      })
    })
  }

  setupKeyboardNavigation() {
    this.accordions.forEach((accordion, index) => {
      const button = accordion.querySelector('.faq-accordion__question button')

      if (!button) return

      button.addEventListener('keydown', e => {
        const answer = accordion.querySelector('.faq-accordion__answer')

        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault()
            this.toggleAccordion(accordion, button, answer)
            break

          case 'ArrowDown':
            e.preventDefault()
            this.focusNextAccordion(index)
            break

          case 'ArrowUp':
            e.preventDefault()
            this.focusPreviousAccordion(index)
            break

          case 'Home':
            e.preventDefault()
            this.accordions[0]
              ?.querySelector('.faq-accordion__question button')
              ?.focus()
            break

          case 'End':
            e.preventDefault()
            this.accordions[this.accordions.length - 1]
              ?.querySelector('.faq-accordion__question button')
              ?.focus()
            break

          default:
            // Handle any other keys if needed
            break
        }
      })
    })
  }

  setupReducedMotion() {
    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', e => {
      this.prefersReducedMotion = e.matches
    })
  }

  toggleAccordion(_accordion, button, answer) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true'
    const willOpen = !isExpanded

    if (willOpen) {
      this.openAccordion(button, answer)
    } else {
      this.closeAccordion(button, answer)
    }
  }

  openAccordion(button, answer) {
    // Update ARIA states
    button.setAttribute('aria-expanded', 'true')
    answer.setAttribute('aria-hidden', 'false')

    // Announce to screen readers
    const questionText = button.textContent.trim()
    this.announceToScreenReader(`${questionText} expanded`)

    // Focus management - don't auto-focus content for better UX
  }

  closeAccordion(button, answer) {
    if (!button || !answer) return

    // Update ARIA states
    button.setAttribute('aria-expanded', 'false')
    answer.setAttribute('aria-hidden', 'true')

    // Announce to screen readers
    const questionText = button.textContent.trim()
    this.announceToScreenReader(`${questionText} collapsed`)
  }

  focusNextAccordion(currentIndex) {
    const nextIndex = (currentIndex + 1) % this.accordions.length
    this.accordions[nextIndex]
      ?.querySelector('.faq-accordion__question button')
      ?.focus()
  }

  focusPreviousAccordion(currentIndex) {
    const prevIndex =
      currentIndex === 0 ? this.accordions.length - 1 : currentIndex - 1
    this.accordions[prevIndex]
      ?.querySelector('.faq-accordion__question button')
      ?.focus()
  }

  announceToScreenReader(message) {
    // Create a live region for screen reader announcements
    let liveRegion = document.getElementById('accordion-live-region')

    if (!liveRegion) {
      liveRegion = document.createElement('div')
      liveRegion.id = 'accordion-live-region'
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.style.position = 'absolute'
      liveRegion.style.clip = 'rect(0, 0, 0, 0)'
      liveRegion.style.clipPath = 'inset(50%)'
      liveRegion.style.width = '1px'
      liveRegion.style.height = '1px'
      liveRegion.style.overflow = 'hidden'
      liveRegion.style.whiteSpace = 'nowrap'
      document.body.appendChild(liveRegion)
    }

    // Clear and set new message
    liveRegion.textContent = ''
    setTimeout(() => {
      liveRegion.textContent = message
    }, 100)
  }

  // Public method to close all accordions
  closeAll() {
    this.accordions.forEach(accordion => {
      const button = accordion.querySelector('.faq-accordion__question button')
      const answer = accordion.querySelector('.faq-accordion__answer')

      if (button && answer) {
        this.closeAccordion(button, answer)
      }
    })
  }

  // Public method to destroy the accordion instance
  destroy() {
    this.accordions.forEach(accordion => {
      const button = accordion.querySelector('.faq-accordion__question button')
      const answer = accordion.querySelector('.faq-accordion__answer')

      if (button && answer) {
        // Remove event listeners
        button.removeEventListener('click', this.toggleAccordion)
        button.removeEventListener('keydown', this.handleKeydown)

        // Reset ARIA attributes to default state
        button.removeAttribute('aria-expanded')
        button.removeAttribute('aria-controls')
        answer.removeAttribute('aria-hidden')
        answer.removeAttribute('id')
      }
    })

    this.accordions = []
    this.currentOpen = null
  }
}

// Helper function to initialize FAQ accordions
export function initFAQAccordions() {
  const faqContainer = document.querySelector('.faq')
  if (!faqContainer) return null

  return new FAQAccordion(faqContainer)
}

// Note: Auto-initialization removed - manually initialized in base.html
