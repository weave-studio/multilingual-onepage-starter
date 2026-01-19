/**
 * FAQ Filter Component
 * Filters FAQ items by category with smooth transitions
 * Accessible tab interface with ARIA support
 */

export class FAQFilter {
  constructor(container) {
    this.container = container
    this.filterButtons = container.querySelectorAll('.faq-filter')
    this.faqItems = document.querySelectorAll('.faq-accordion[data-category]')

    // Prevent duplicate initialization
    if (container.dataset.filterInitialized === 'true') {
      return
    }
    container.dataset.filterInitialized = 'true'

    this.init()
  }

  init() {
    if (this.filterButtons.length === 0) {
      return
    }

    this.setupEventListeners()
  }

  setupEventListeners() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        this.handleFilter(button)
      })

      // Keyboard navigation for tabs
      button.addEventListener('keydown', (e) => {
        this.handleKeyboardNavigation(e, button)
      })
    })
  }

  handleFilter(activeButton) {
    const filter = activeButton.dataset.filter

    // Update button states
    this.filterButtons.forEach(btn => {
      const isActive = btn === activeButton
      btn.classList.toggle('faq-filter--active', isActive)
      btn.setAttribute('aria-selected', isActive)
    })

    // Filter FAQ items
    this.faqItems.forEach(item => {
      const category = item.dataset.category
      const shouldShow = filter === 'all' || category === filter

      if (shouldShow) {
        item.classList.remove('hidden')
        item.setAttribute('aria-hidden', 'false')
      } else {
        item.classList.add('hidden')
        item.setAttribute('aria-hidden', 'true')

        // Close the accordion if it's open
        const button = item.querySelector('.faq-accordion__question button')
        if (button && button.getAttribute('aria-expanded') === 'true') {
          button.setAttribute('aria-expanded', 'false')
          const answer = item.querySelector('.faq-accordion__answer')
          if (answer) {
            answer.setAttribute('aria-hidden', 'true')
          }
        }
      }
    })

    // Announce to screen readers
    const visibleCount = Array.from(this.faqItems).filter(
      item => !item.classList.contains('hidden')
    ).length
    this.announceToScreenReader(
      `Showing ${visibleCount} question${visibleCount !== 1 ? 's' : ''}`
    )
  }

  handleKeyboardNavigation(e, currentButton) {
    const buttons = Array.from(this.filterButtons)
    const currentIndex = buttons.indexOf(currentButton)

    let nextIndex = currentIndex

    switch (e.key) {
    case 'ArrowRight':
      e.preventDefault()
      nextIndex = (currentIndex + 1) % buttons.length
      break

    case 'ArrowLeft':
      e.preventDefault()
      nextIndex = currentIndex === 0 ? buttons.length - 1 : currentIndex - 1
      break

    case 'Home':
      e.preventDefault()
      nextIndex = 0
      break

    case 'End':
      e.preventDefault()
      nextIndex = buttons.length - 1
      break

    default:
      return
    }

    buttons[nextIndex].focus()
    this.handleFilter(buttons[nextIndex])
  }

  announceToScreenReader(message) {
    let liveRegion = document.getElementById('filter-live-region')

    if (!liveRegion) {
      liveRegion = document.createElement('div')
      liveRegion.id = 'filter-live-region'
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

    liveRegion.textContent = ''
    setTimeout(() => {
      liveRegion.textContent = message
    }, 100)
  }
}

// Helper function to initialize FAQ filters
export function initFAQFilter() {
  const filterContainer = document.querySelector('.faq-listing__filters')
  if (!filterContainer) return null

  return new FAQFilter(filterContainer)
}

// Auto-initialize if on FAQ listing page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFAQFilter)
} else {
  initFAQFilter()
}

export default FAQFilter
