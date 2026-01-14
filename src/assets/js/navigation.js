/**
 * Navigation functionality
 * Mobile menu interactions and responsive behavior
 */

let mobileMenuOpen = false

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
  const mobileToggle = document.querySelector('[data-mobile-toggle]')
  const navMenu = document.querySelector('.nav__menu--mobile')

  if (!mobileToggle || !navMenu) return

  mobileMenuOpen = !mobileMenuOpen

  // Update ARIA attributes for accessibility
  const expanded = mobileMenuOpen
  mobileToggle.setAttribute('aria-expanded', expanded.toString())
  navMenu.setAttribute('aria-hidden', (!expanded).toString())

  // Toggle CSS classes for animations
  mobileToggle.classList.toggle('active')
  navMenu.classList.toggle('mobile-menu-open')

  // Update hamburger animation
  const hamburger = mobileToggle.querySelector('.nav__hamburger')
  if (hamburger) {
    hamburger.classList.toggle('active')
  }

  // Prevent body scroll when menu is open
  document.body.classList.toggle('no-scroll', mobileMenuOpen)
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  if (!mobileMenuOpen) return

  const mobileToggle = document.querySelector('[data-mobile-toggle]')
  const navMenu = document.querySelector('.nav__menu--mobile')

  if (!mobileToggle || !navMenu) return

  mobileMenuOpen = false

  // Update ARIA attributes
  mobileToggle.setAttribute('aria-expanded', 'false')
  navMenu.setAttribute('aria-hidden', 'true')

  // Remove CSS classes
  mobileToggle.classList.remove('active')
  navMenu.classList.remove('mobile-menu-open')

  const hamburger = mobileToggle.querySelector('.nav__hamburger')
  if (hamburger) {
    hamburger.classList.remove('active')
  }

  // Restore body scroll
  document.body.classList.remove('no-scroll')
}

/**
 * Handle navigation link clicks
 * @param {Event} event - Click event
 */
function handleNavLinkClick() {
  // Close mobile menu when a link is clicked
  if (mobileMenuOpen) {
    closeMobileMenu()
  }
}

/**
 * Handle keyboard events
 * @param {Event} event - Keyboard event
 */
function handleKeydown(event) {
  if (event.key === 'Escape' && mobileMenuOpen) {
    closeMobileMenu()
    // Return focus to mobile toggle
    const mobileToggle = document.querySelector('[data-mobile-toggle]')
    if (mobileToggle) {
      mobileToggle.focus()
    }
  }
}

/**
 * Handle clicks outside the menu
 * @param {Event} event - Click event
 */
function handleOutsideClick(event) {
  if (!mobileMenuOpen) return

  const nav = document.querySelector('.nav')
  const mobileToggle = document.querySelector('[data-mobile-toggle]')
  const navMenu = document.querySelector('.nav__menu--mobile')

  // Don't close if clicking inside nav or on toggle
  if (nav && nav.contains(event.target)) return
  if (mobileToggle && mobileToggle.contains(event.target)) return
  if (navMenu && navMenu.contains(event.target)) return

  closeMobileMenu()
}

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('[data-mobile-toggle]')
  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu)

    // Keyboard support for mobile toggle
    mobileToggle.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        toggleMobileMenu()
      }
    })
  }

  // Handle navigation link clicks
  const navLinks = document.querySelectorAll('.nav__link')
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavLinkClick)
  })

  // Keyboard events
  document.addEventListener('keydown', handleKeydown)

  // Outside clicks
  document.addEventListener('click', handleOutsideClick)

  // Touch events for mobile
  document.addEventListener('touchstart', handleOutsideClick, { passive: true })

  // Handle resize - close menu if window becomes larger
  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      if (mobileMenuOpen && window.innerWidth >= 768) {
        closeMobileMenu()
      }
    }, 150)
  })
}
