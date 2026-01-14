/**
 * Scroll-triggered fade-in animations
 * Uses Intersection Observer for performance
 * Respects prefers-reduced-motion preference
 */

class ScrollAnimations {
  constructor() {
    this.sections = document.querySelectorAll('[data-scroll-reveal]')
    this.aboutLabel = document.querySelector('.about__image-label')
    this.observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Trigger 100px before element enters viewport
      threshold: 0.1 // Trigger when 10% of element is visible
    }

    this.init()
  }

  init() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Skip animations if user prefers reduced motion
      this.sections.forEach(section => {
        section.classList.add('is-visible')
      })
      if (this.aboutLabel) {
        this.aboutLabel.classList.add('is-visible')
      }
      return
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('is-visible')

          // Optional: Stop observing after animation (one-time reveal)
          observer.unobserve(entry.target)
        }
      })
    }, this.observerOptions)

    // Observe all sections with data-scroll-reveal attribute
    this.sections.forEach(section => observer.observe(section))

    // Also observe the about image label
    if (this.aboutLabel) {
      observer.observe(this.aboutLabel)
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ScrollAnimations())
} else {
  new ScrollAnimations()
}

export default ScrollAnimations
