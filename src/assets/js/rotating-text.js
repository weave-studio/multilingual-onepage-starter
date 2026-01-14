/**
 * Rotating text animation for hero section
 * Smooth fade transitions between rotating words
 *
 * @returns {function} Cleanup function to remove event listeners and stop animation
 */
import { translations } from './translations-data.js'
import { getCurrentLanguage } from './language.js'

// eslint-disable-next-line consistent-return
export function initRotatingText() { // eslint-disable-line consistent-return
  const rotatingElement = document.querySelector('.hero__title-animated')
  if (!rotatingElement) {
    console.warn('Hero rotating text element not found')
    return
  }

  let currentIndex = 0
  let intervalId = null
  let words = []

  // Configuration
  const ROTATION_INTERVAL = 3000 // 3 seconds
  const FADE_DURATION = 300 // 300ms fade transition

  function getWords() {
    // Get current language and use it to access translations
    const currentLang = getCurrentLanguage()
    const currentWords = translations[currentLang]?.hero?.rotatingWords

    if (currentWords && Array.isArray(currentWords)) {
      return currentWords
    }

    console.warn(`Rotating words not available for language ${currentLang}`)
    return []
  }

  function updateWords() {
    words = getWords()
  }

  function rotateText() {
    if (!words.length || words.length <= 1) return

    // Fade out
    rotatingElement.style.opacity = '0'

    setTimeout(() => {
      // Update text
      currentIndex = (currentIndex + 1) % words.length
      rotatingElement.textContent = words[currentIndex]

      // Fade in
      setTimeout(() => {
        rotatingElement.style.opacity = '1'
      }, 50)
    }, FADE_DURATION)
  }

  function startRotation() {
    if (intervalId) clearInterval(intervalId)
    if (words.length <= 1) {
      return
    }

    intervalId = setInterval(rotateText, ROTATION_INTERVAL)
  }

  function stopRotation() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function handleLanguageChange(event) {
    // Use the language from event detail instead of getCurrentLanguage()
    const newLanguage = event.detail?.language
    if (newLanguage && ['en', 'he'].includes(newLanguage)) {
      // Directly update words with the new language
      const newWords = translations[newLanguage]?.hero?.rotatingWords
      if (newWords && Array.isArray(newWords)) {
        words = newWords

        stopRotation() // Immediately stop current rotation

        // Immediately display the first word (titleAnimated from translations)
        currentIndex = 0
        rotatingElement.textContent = words[currentIndex]

        // Restart rotation from the beginning
        startRotation()

        return
      }
    }

    console.warn('Could not update rotating text - invalid language or no words available')
  }

  // Add transition styles
  rotatingElement.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`

  // Initialize
  updateWords()
  if (words.length > 0) {
    rotatingElement.textContent = words[0]
  }

  // Start rotation if we have multiple words
  if (words.length > 1) {
    startRotation()
  }

  // Listen for language changes
  document.addEventListener('languageChanged', handleLanguageChange)

  // Pause on hover for accessibility
  rotatingElement.addEventListener('mouseenter', stopRotation)
  rotatingElement.addEventListener('mouseleave', startRotation)

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  function handleMotionPreference() {
    if (prefersReducedMotion.matches) {
      stopRotation()
      rotatingElement.style.transition = 'none'
    } else {
      rotatingElement.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`
      startRotation()
    }
  }

  prefersReducedMotion.addEventListener('change', handleMotionPreference)
  handleMotionPreference()

  // eslint-disable-next-line consistent-return
  return function cleanup() {
    stopRotation()
    document.removeEventListener('languageChanged', handleLanguageChange)
    prefersReducedMotion.removeEventListener('change', handleMotionPreference)
    rotatingElement.removeEventListener('mouseenter', stopRotation)
    rotatingElement.removeEventListener('mouseleave', startRotation)
  }
}
