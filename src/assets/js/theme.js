/**
 * Theme Toggle System
 * Handles light/dark mode switching with localStorage persistence
 */

/**
 * Get the user's preferred theme from localStorage or system preference
 * @returns {string} 'light' or 'dark'
 */
function getPreferredTheme() {
  // Check localStorage first
  const stored = localStorage.getItem('theme')
  if (stored) {
    return stored
  }

  // Fall back to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Apply theme to the document
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)

  // Update theme toggle button aria-label for accessibility
  const toggleButton = document.querySelector('[data-theme-toggle]')
  if (toggleButton) {
    toggleButton.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    )
  }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  applyTheme(newTheme)
}

/**
 * Initialize theme system
 */
export function initTheme() {
  // Apply user's preferred theme on load
  const preferredTheme = getPreferredTheme()
  applyTheme(preferredTheme)

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually chosen a theme
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light'
      applyTheme(newTheme)
    }
  })

  // Set up theme toggle button
  const themeToggle = document.querySelector('[data-theme-toggle]')
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme)

    // Add keyboard support
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleTheme()
      }
    })
  }
}
