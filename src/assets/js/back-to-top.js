/**
 * Back to top button functionality
 * Shows a smooth scroll button that appears when user scrolls down the page
 */

export function initBackToTop() {
  // Create link element if it doesn't exist
  let backToTopBtn = document.querySelector('.back-to-top')

  if (!backToTopBtn) {
    backToTopBtn = document.createElement('a')
    backToTopBtn.className = 'back-to-top'
    backToTopBtn.setAttribute('href', '#')
    backToTopBtn.setAttribute('aria-label', 'Back to top')
    backToTopBtn.setAttribute('title', 'Scroll back to top')

    // Create SVG arrow icon
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('stroke', 'currentColor')
    svg.setAttribute('stroke-width', '2')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke-linecap', 'round')
    svg.setAttribute('stroke-linejoin', 'round')

    // Arrow up path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', 'M12 19V5M5 12l7-7 7 7')

    svg.appendChild(path)
    backToTopBtn.appendChild(svg)

    document.body.appendChild(backToTopBtn)
  }

  // Show/hide button based on scroll position
  function toggleBackToTopVisibility() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible')
    } else {
      backToTopBtn.classList.remove('visible')
    }
  }

  // Smooth scroll to top
  function scrollToTop(e) {
    // Prevent default jump, we'll handle URL update manually
    e.preventDefault()

    // Update URL hash to '#'
    if (window.location.hash !== '') {
      window.history.pushState(null, null, '#')
    }

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Click handler
  backToTopBtn.addEventListener('click', scrollToTop)

  // Keyboard handler (Space key - Enter is handled natively by <a>)
  backToTopBtn.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault()
      scrollToTop(e)
    }
  })

  // Scroll event listener with throttling for performance
  let scrollTimeout
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        toggleBackToTopVisibility()
        scrollTimeout = null
      }, 50)
    }
  }, { passive: true })

  // Initial check on load
  toggleBackToTopVisibility()
}
