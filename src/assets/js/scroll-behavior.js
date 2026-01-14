/**
 * Navbar scroll behavior
 * Makes navbar transparent at top on homepage, solid when scrolled past hero
 * On non-homepage pages, navbar becomes solid immediately on any scroll
 */

const heroHeight = () => document.querySelector('.hero')?.offsetHeight || window.innerHeight

function updateNavbarOnScroll() {
  const header = document.querySelector('.header')
  if (!header) return

  const currentScrollY = window.scrollY
  const hasHero = document.querySelector('.hero')

  // On pages without hero (blog, thank-you, legal-notice), add 'scrolled' class immediately on any scroll
  if (!hasHero) {
    if (currentScrollY > 0) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }
  } else {
    // On homepage with hero, add 'scrolled' class when past hero section
    if (currentScrollY > heroHeight()) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }
  }
}

/**
 * Initialize navbar scroll effects
 */
export function initNavbarScroll() {
  // Run on load
  updateNavbarOnScroll()

  // Run on scroll with throttling for performance
  let scrollTimeout
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout)
    }
    scrollTimeout = window.requestAnimationFrame(updateNavbarOnScroll)
  }, { passive: true })
}

/**
 * Smooth scroll behavior for anchor links
 * Handles smooth scrolling to sections when clicking anchor links
 */
export function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a')
    if (!link) return

    const href = link.getAttribute('href')
    if (!href || !href.startsWith('#')) return

    const targetId = href.slice(1)
    const targetElement = document.getElementById(targetId)
    if (!targetElement) return

    e.preventDefault()
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

/**
 * REMOVED: initIOSViewportFix()
 *
 * Previous implementation used Visual Viewport API to manually adjust
 * position: fixed header during iOS Safari address bar transitions.
 *
 * This caused jitter and layout issues.
 *
 * SOLUTION: Header now uses position: sticky instead of position: fixed.
 * Sticky positioning is handled natively by the browser and doesn't require
 * manual viewport offset adjustments. This eliminates the jitter completely
 * while preserving native browser UI autohide and pull-to-refresh.
 */
