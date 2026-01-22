/**
 * Multilingual System - Generic Language Engine
 * Supports unlimited languages via configuration
 */

import { getTranslations, hasLanguage } from './translations/index.js'

// Configuration - matches site.js multilingual config
const CONFIG = {
  defaultLanguage: 'en',
  storageKey: 'site-language',
  languages: [
    { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' }
  ]
}

// Runtime state
let currentLanguage = CONFIG.defaultLanguage
let currentTranslations = null
let dropdownBuilt = false

// RTL lookup set for O(1) performance
const rtlLanguages = new Set(
  CONFIG.languages.filter(l => l.dir === 'rtl').map(l => l.code)
)

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get nested value from object using dot notation
 * Supports array indices: "services.items.0.title"
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    if (current === null || current === undefined) return undefined
    // Handle array indices
    const index = parseInt(key, 10)
    if (!isNaN(index) && Array.isArray(current)) {
      return current[index]
    }
    return current[key]
  }, obj)
}

/**
 * Check if language code is RTL
 */
function isRTL(langCode) {
  return rtlLanguages.has(langCode)
}

/**
 * Get language configuration by code
 */
function getLanguageConfig(langCode) {
  return CONFIG.languages.find(l => l.code === langCode)
}

// ============================================
// DETECTION
// ============================================

/**
 * Detect user's preferred language
 * Priority: blog post attr -> localStorage -> browser -> default
 */
function detectUserLanguage() {
  // 1. Blog post language attribute
  const postArticle = document.querySelector('.post[data-post-lang]')
  if (postArticle) {
    const postLang = postArticle.getAttribute('data-post-lang')
    if (hasLanguage(postLang)) return postLang
  }

  // 2. LocalStorage preference
  const saved = localStorage.getItem(CONFIG.storageKey)
  if (saved && hasLanguage(saved)) return saved

  // 3. Browser language
  const browserLang = navigator.language || navigator.userLanguage
  if (browserLang) {
    // Try exact match first
    if (hasLanguage(browserLang)) return browserLang
    // Try language code without region
    const langCode = browserLang.split('-')[0]
    if (hasLanguage(langCode)) return langCode
  }

  // 4. Default
  return CONFIG.defaultLanguage
}

// ============================================
// CONTENT UPDATES
// ============================================

/**
 * Update HTML document attributes for language and direction
 */
function updateHtmlAttributes() {
  document.documentElement.lang = currentLanguage
  document.documentElement.dir = isRTL(currentLanguage) ? 'rtl' : 'ltr'

  // Update body class for CSS hooks
  document.body.classList.toggle('rtl', isRTL(currentLanguage))

  // Update language toggle button aria-label
  const languageToggle = document.querySelector('[data-language-toggle]')
  if (languageToggle) {
    const currentConfig = getLanguageConfig(currentLanguage)
    if (currentConfig) {
      languageToggle.setAttribute('aria-label', 'Switch language')
    }
  }
}

/**
 * Update all text content on the page using data attributes
 */
function updateContent() {
  // Helper function to get nested translation values
  function getTranslation(path) {
    return getNestedValue(currentTranslations, path)
  }

  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const translationKey = element.dataset.i18n
    const translation = getTranslation(translationKey)

    if (translation) {
      // Update text content
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.placeholder) {
          element.placeholder = translation
        }
      } else {
        // For list items and paragraphs that might contain HTML, use innerHTML
        // For links and buttons, use textContent to avoid security issues
        if (element.tagName === 'LI' || element.tagName === 'P') {
          element.innerHTML = translation
        } else {
          element.textContent = translation
        }
      }

      // Update aria-label if present
      if (element.hasAttribute('aria-label')) {
        const ariaKey = element.dataset.translateAria
        if (ariaKey) {
          const ariaTranslation = getTranslation(ariaKey)
          if (ariaTranslation) {
            element.setAttribute('aria-label', ariaTranslation)
          }
        }
      }
    }
  })

  // Update specific sections that need programmatic content replacement
  updateHeroSection()
  updateWelcomeSection()
  updateAboutSection()
  updateServicesSection()
  updatePerformanceSection()
  updatePortfolioSection()
  updateBlogSection()
  updateFaqSection()
  updateContactSection()
  updateFooter()
}

/**
 * Update navigation elements
 */
function updateNavigation() {
  const navTranslations = currentTranslations.nav

  // Update logo - preserve HTML structure with separate spans
  const logoPrimary = document.querySelector('.nav__logo-text-primary')
  const logoAccent = document.querySelector('.nav__logo-text-accent')
  if (logoPrimary && logoAccent) {
    // Logo is same in both languages: "Weave" + "Studio"
    logoPrimary.textContent = 'Weave'
    logoAccent.textContent = 'Studio'
  }

  // Update menu items (only navigation links, not CTA buttons)
  const menuItems = [
    { selector: '.nav__link[href="#hero"]', text: navTranslations.home },
    { selector: '.nav__link[href="#about"]', text: navTranslations.about },
    {
      selector: '.nav__link[href="#services"]',
      text: navTranslations.services
    },
    {
      selector: '.nav__link[href="#portfolio"]',
      text: navTranslations.portfolio
    },
    { selector: '.nav__link[href="#blog"]', text: navTranslations.blog },
    { selector: '.nav__link[href="#faq"]', text: navTranslations.faq },
    { selector: '.nav__link[href="#contact"]', text: navTranslations.contact }
  ]

  menuItems.forEach(({ selector, text }) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach(el => {
      el.textContent = text
    })
  })

  // Update theme toggle
  const themeToggle = document.querySelector('[data-theme-toggle]')
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', navTranslations.toggleTheme)
  }

  // Update language toggle - build dynamically based on language count
  buildLanguageSwitcher()
}

/**
 * Build language switcher UI based on available languages
 */
function buildLanguageSwitcher() {
  const languageToggle = document.querySelector('[data-language-toggle]')
  if (!languageToggle) return

  const languageCount = CONFIG.languages.length

  if (languageCount <= 1) {
    // Single language - hide the switcher entirely
    languageToggle.style.display = 'none'
    return
  }

  // Ensure switcher is visible (in case previously hidden)
  languageToggle.style.display = ''

  if (languageCount === 2) {
    // Use simple toggle for 2 languages - always show first language code | second language native abbreviation
    const firstLang = CONFIG.languages[0]
    const secondLang = CONFIG.languages[1]

    const currentText = languageToggle.querySelector('[data-lang-current]')
    const nextText = languageToggle.querySelector('[data-lang-next]')

    if (currentText && nextText && firstLang && secondLang) {
      currentText.textContent = firstLang.code.toUpperCase()
      nextText.textContent = secondLang.nativeName.substring(0, 2)
    }
  } else {
    // For 3+ languages, build dropdown ONCE, then update on language changes
    if (!dropdownBuilt) {
      buildLanguageDropdown()
      dropdownBuilt = true
    } else {
      updateLanguageDropdown()
    }
  }
}

/**
 * Build dropdown menu for 3+ languages
 */
function buildLanguageDropdown() {
  const languageToggle = document.querySelector('[data-language-toggle]')
  if (!languageToggle) return

  // Remove the simple toggle event listener if exists
  languageToggle.removeEventListener('click', toggleLanguage)

  // Get current language config
  const currentConfig = getLanguageConfig(currentLanguage)

  // Replace button content with dropdown structure
  languageToggle.innerHTML = `
    <span class="sr-only">Select website language</span>
    <span class="nav__language-pill">
      <span class="nav__language-current">${currentConfig ? currentConfig.code.toUpperCase() : 'EN'}</span>
      <svg class="nav__language-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  `

  // Create dropdown menu container
  let dropdownMenu = document.querySelector('.nav__language-menu')
  if (!dropdownMenu) {
    dropdownMenu = document.createElement('ul')
    dropdownMenu.className = 'nav__language-menu'
    dropdownMenu.setAttribute('role', 'menu')
    dropdownMenu.setAttribute('hidden', '')
    languageToggle.parentElement.style.position = 'relative'
    languageToggle.parentElement.appendChild(dropdownMenu)
  }

  // Clear and populate menu with all languages
  dropdownMenu.innerHTML = ''
  CONFIG.languages.forEach(lang => {
    const li = document.createElement('li')
    li.setAttribute('role', 'none')

    const button = document.createElement('button')
    button.className = 'nav__language-menu-item'
    button.setAttribute('role', 'menuitem')
    button.setAttribute('data-lang', lang.code)
    button.setAttribute('lang', lang.code)
    button.setAttribute('dir', lang.dir)

    if (lang.code === currentLanguage) {
      button.classList.add('nav__language-menu-item--active')
      button.setAttribute('aria-current', 'true')
    }

    button.innerHTML = `
      <span class="nav__language-menu-code">${lang.code.toUpperCase()}</span>
      <span class="nav__language-menu-name">${lang.nativeName}</span>
    `

    // Add click handler for language selection
    button.addEventListener('click', e => {
      e.stopPropagation()
      const newLang = button.getAttribute('data-lang')
      if (newLang && newLang !== currentLanguage) {
        setLanguage(newLang)
      }
      closeLanguageDropdown()
    })

    li.appendChild(button)
    dropdownMenu.appendChild(li)
  })

  // Toggle dropdown on button click
  languageToggle.addEventListener('click', e => {
    e.stopPropagation()
    toggleLanguageDropdown()
  })

  // Close dropdown when clicking outside
  document.addEventListener('click', e => {
    if (
      !languageToggle.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      closeLanguageDropdown()
    }
  })

  // Keyboard navigation
  languageToggle.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeLanguageDropdown()
      languageToggle.focus()
    }
  })
}

/**
 * Toggle language dropdown menu visibility
 */
function toggleLanguageDropdown() {
  const dropdownMenu = document.querySelector('.nav__language-menu')
  if (!dropdownMenu) return

  const isHidden = dropdownMenu.hasAttribute('hidden')

  if (isHidden) {
    dropdownMenu.removeAttribute('hidden')
    dropdownMenu.setAttribute('aria-expanded', 'true')
  } else {
    closeLanguageDropdown()
  }
}

/**
 * Close language dropdown menu
 */
function closeLanguageDropdown() {
  const dropdownMenu = document.querySelector('.nav__language-menu')
  if (!dropdownMenu) return

  dropdownMenu.setAttribute('hidden', '')
  dropdownMenu.setAttribute('aria-expanded', 'false')
}

/**
 * Update language dropdown display after language change
 * Updates current language indicator and active states
 * Does NOT recreate HTML or add event listeners
 */
function updateLanguageDropdown() {
  const languageToggle = document.querySelector('[data-language-toggle]')
  if (!languageToggle) return

  // Get current language config
  const currentConfig = getLanguageConfig(currentLanguage)

  // Update the current language code in button
  const currentSpan = languageToggle.querySelector('.nav__language-current')
  if (currentSpan && currentConfig) {
    currentSpan.textContent = currentConfig.code.toUpperCase()
  }

  // Update active states in menu items
  const dropdownMenu = document.querySelector('.nav__language-menu')
  if (!dropdownMenu) return

  const menuItems = dropdownMenu.querySelectorAll('.nav__language-menu-item')
  menuItems.forEach(item => {
    const itemLang = item.getAttribute('data-lang')

    if (itemLang === currentLanguage) {
      item.classList.add('nav__language-menu-item--active')
      item.setAttribute('aria-current', 'true')
    } else {
      item.classList.remove('nav__language-menu-item--active')
      item.removeAttribute('aria-current')
    }
  })
}

/**
 * Update hero section content
 */
function updateHeroSection() {
  const hero = currentTranslations.hero

  const titleLine = document.querySelector('.hero__title-line')
  if (titleLine) titleLine.textContent = hero.titleFirstLine

  const titleAnimated = document.querySelector('.hero__title-animated')
  if (titleAnimated) titleAnimated.setAttribute('data-rotating-text', 'אתרים')

  const description = document.querySelector('.hero__description')
  if (description) description.textContent = hero.description

  const ctaPrimary = document.querySelector('.hero__cta')
  if (ctaPrimary) ctaPrimary.textContent = hero.ctaPrimary

  const ctaLearnMore = document.querySelector('.hero__learn-more')
  if (ctaLearnMore) ctaLearnMore.textContent = hero.ctaLearnMore

  const scrollHint = document.querySelector('.hero__scroll-hint')
  if (scrollHint) scrollHint.setAttribute('aria-label', hero.scrollHint)
}

/**
 * Update welcome section
 */
function updateWelcomeSection() {
  const welcome = currentTranslations.welcome

  const title = document.querySelector('#welcome-title')
  if (title) title.textContent = welcome.title

  const subtitle = document.querySelector('.welcome__subtitle')
  if (subtitle) subtitle.textContent = welcome.subtitle

  const content = document.querySelector('.welcome__text p')
  if (content && welcome.content) {
    content.textContent = welcome.content.paragraph1
  }
}

/**
 * Update about section
 */
function updateAboutSection() {
  const about = currentTranslations.about

  const title = document.querySelector('#about-title')
  if (title) title.textContent = about.title

  // Update all about paragraphs
  const paragraphs = document.querySelectorAll('.about__paragraph')
  if (paragraphs.length > 0 && about.content) {
    paragraphs.forEach((paragraph, index) => {
      if (about.content[`paragraph${index + 1}`]) {
        paragraph.textContent = about.content[`paragraph${index + 1}`]
      }
    })
  }

  const image = document.querySelector('.about__image img')
  if (image) image.setAttribute('alt', about.altText)
}

/**
 * Update services section
 */
function updateServicesSection() {
  const services = currentTranslations.services

  const title = document.querySelector('#services-title')
  if (title) title.textContent = services.title

  const serviceCards = document.querySelectorAll('.service-card')
  serviceCards.forEach((card, index) => {
    if (services.items[index]) {
      const item = services.items[index]
      const titleEl = card.querySelector('.service-card__title')
      const descEl = card.querySelector('.service-card__description')

      if (titleEl) titleEl.textContent = item.title
      if (descEl) descEl.textContent = item.description
    }
  })
}

/**
 * Update performance section
 */
function updatePerformanceSection() {
  const performance = currentTranslations.performance

  const title = document.querySelector('.performance__title')
  if (title) title.textContent = performance.title

  const subtitle = document.querySelector('.performance__subtitle')
  if (subtitle) subtitle.textContent = performance.subtitle

  const paragraph1 = document.querySelector('.performance__content-paragraph1')
  if (paragraph1) paragraph1.textContent = performance.content.paragraph1

  const benefitsTitle = document.querySelector('.performance__benefits-title')
  if (benefitsTitle) benefitsTitle.textContent = performance.benefitsTitle

  const benefitsList = document.querySelectorAll(
    '.performance__benefits-list li'
  )
  const benefits = [
    performance.benefits.list1,
    performance.benefits.list2,
    performance.benefits.list3
  ]
  benefits.forEach((benefit, index) => {
    if (benefitsList[index]) {
      benefitsList[index].textContent = benefit
    }
  })
}

/**
 * Update portfolio section
 */
function updatePortfolioSection() {
  const portfolio = currentTranslations.portfolio

  const title = document.querySelector('#portfolio-title')
  if (title) title.textContent = portfolio.title

  const paragraph1 = document.querySelector('.portfolio__content-paragraph1')
  if (paragraph1) paragraph1.innerHTML = portfolio.content.paragraph1

  const paragraph2 = document.querySelector('.portfolio__content-paragraph2')
  if (paragraph2) paragraph2.innerHTML = portfolio.content.paragraph2

  const ctaText = document.querySelector('.portfolio__cta p')
  if (ctaText) ctaText.textContent = portfolio.cta.text

  const ctaButton = document.querySelector('.portfolio__cta .btn')
  if (ctaButton) ctaButton.textContent = portfolio.cta.button
}

/**
 * Update blog section
 */
function updateBlogSection() {
  const blog = currentTranslations.blog

  const title = document.querySelector('#blog-title')
  if (title) title.textContent = blog.title

  const viewAllButton = document.querySelector('.blog-preview__cta .btn')
  if (viewAllButton) viewAllButton.textContent = blog.viewAll

  const categories = document.querySelectorAll('.blog-card__category')
  categories.forEach(category => {
    const categoryText = category.textContent.toLowerCase()
    if (blog.categories[categoryText]) {
      category.textContent = blog.categories[categoryText]
    }
  })

  const readMoreButtons = document.querySelectorAll('.blog-card__read-more')
  readMoreButtons.forEach(button => {
    button.textContent = blog.readMore
  })

  // Show/hide blog posts based on current language
  const blogCards = document.querySelectorAll('.blog-card[data-lang]')
  blogCards.forEach(card => {
    const cardLang = card.getAttribute('data-lang')
    if (cardLang === currentLanguage) {
      card.classList.add('blog-card--visible')
    } else {
      card.classList.remove('blog-card--visible')
    }
  })
}

/**
 * Update FAQ section
 */
function updateFaqSection() {
  const faq = currentTranslations.faq

  const title = document.querySelector('#faq-title')
  if (title) title.textContent = faq.title

  const faqCards = document.querySelectorAll('.faq-card')
  faq.questions.forEach((question, index) => {
    if (faqCards[index]) {
      const questionEl = faqCards[index].querySelector('.faq-card__question')
      const answerEl = faqCards[index].querySelector('.faq-card__answer')

      if (questionEl) questionEl.textContent = question.question
      if (answerEl) answerEl.textContent = question.answer
    }
  })
}

/**
 * Update contact section
 */
function updateContactSection() {
  const contact = currentTranslations.contact

  const title = document.querySelector('#contact-title')
  if (title) title.textContent = contact.title

  const subtitle = document.querySelector('.contact__info h3')
  if (subtitle) subtitle.textContent = contact.subtitle

  const description = document.querySelector('.contact__info p')
  if (description) description.textContent = contact.description

  const emailLabel = document.querySelector('.contact__detail h4')
  if (emailLabel) emailLabel.textContent = contact.details.email.label
}

/**
 * Update footer
 */
function updateFooter() {
  const footer = currentTranslations.footer

  const logo = document.querySelector('.footer__logo-text')
  if (logo) logo.textContent = footer.logo

  const description = document.querySelector('.footer__description')
  if (description) description.textContent = footer.description

  const sectionTitles = document.querySelectorAll('.footer__nav-title')
  if (sectionTitles.length >= 3) {
    sectionTitles[0].textContent = footer.sections.services.title
    sectionTitles[1].textContent = footer.sections.company.title
    sectionTitles[2].textContent = footer.sections.connect.title
  }

  const copyright = document.querySelector('.footer__copyright')
  if (copyright) copyright.textContent = footer.copyright

  const legalLinks = document.querySelectorAll('.footer__legal a')
  if (legalLinks.length >= 2) {
    legalLinks[0].textContent = footer.legal[0]
    legalLinks[1].textContent = footer.legal[1]
  }
}

/**
 * Update form elements if present
 */
function updateForm() {
  const form = currentTranslations.contact.form

  const submitButton = document.querySelector('.contact__submit .btn__text')
  if (submitButton) submitButton.textContent = form.submit

  // Update placeholders using data-i18n-placeholder attributes
  updateFormPlaceholders()
}

/**
 * Update form field placeholders based on current language
 */
function updateFormPlaceholders() {
  const elementsWithPlaceholder = document.querySelectorAll(
    '[data-i18n-placeholder]'
  )

  elementsWithPlaceholder.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder')

    // Navigate through nested translation object
    const value = getNestedValue(currentTranslations, key)

    if (value && typeof value === 'string') {
      element.placeholder = value
    }
  })
}

// ============================================
// MAIN API
// ============================================

/**
 * Set website language and update all content
 */
function setLanguage(language) {
  if (!hasLanguage(language)) {
    console.warn(`Language '${language}' not available`)
    return
  }

  currentLanguage = language
  currentTranslations = getTranslations(language)

  // Save preference
  localStorage.setItem(CONFIG.storageKey, language)

  // Update DOM
  updateHtmlAttributes()
  updateContent()
  updateNavigation()
  updateForm()

  // Dispatch event for other modules
  document.dispatchEvent(
    new CustomEvent('languageChanged', {
      detail: { language, translations: currentTranslations }
    })
  )
}

/**
 * Toggle to next language (cycles through all available languages)
 */
export function toggleLanguage() {
  // Handle blog post redirect
  const postArticle = document.querySelector(
    '.post[data-post-lang][data-post-url]'
  )
  if (postArticle) {
    handleBlogLanguageSwitch(postArticle)
    return
  }

  // Find next language
  const currentIndex = CONFIG.languages.findIndex(
    l => l.code === currentLanguage
  )
  const nextIndex = (currentIndex + 1) % CONFIG.languages.length
  setLanguage(CONFIG.languages[nextIndex].code)
}

/**
 * Handle language switch on blog posts (URL redirect)
 */
function handleBlogLanguageSwitch(postArticle) {
  const currentPostLang = postArticle.getAttribute('data-post-lang')
  const currentPostUrl = postArticle.getAttribute('data-post-url')

  // Find next language
  const currentIndex = CONFIG.languages.findIndex(
    l => l.code === currentPostLang
  )
  const nextIndex = (currentIndex + 1) % CONFIG.languages.length
  const nextLang = CONFIG.languages[nextIndex]

  // Build new URL (simplified for now - assumes /blog/ for default, /blog/he/ for Hebrew)
  let newUrl = currentPostUrl

  // This is a simplified version - in a real implementation,
  // you'd want to read blog path patterns from config
  if (currentPostLang === 'he' && nextLang.code === 'en') {
    newUrl = newUrl.replace('/blog/he/', '/blog/')
  } else if (currentPostLang === 'en' && nextLang.code === 'he') {
    newUrl = newUrl.replace('/blog/', '/blog/he/')
  }

  window.location.href = newUrl
}

/**
 * Get current language
 * @returns {string} Current language code
 */
export function getCurrentLanguage() {
  return currentLanguage
}

/**
 * Get current translations object
 * @returns {object} Current translations
 */
export function getCurrentTranslations() {
  return currentTranslations
}

/**
 * Initialize language system
 */
export function initLanguage() {
  // Detect user's preferred language
  const detectedLanguage = detectUserLanguage()

  // Set initial language (this will update all content)
  setLanguage(detectedLanguage)

  // Set up language toggle event listener only for 2 languages
  // For 3+ languages, the dropdown handles its own events in buildLanguageDropdown()
  if (CONFIG.languages.length === 2) {
    const languageToggle = document.querySelector('[data-language-toggle]')
    if (languageToggle) {
      languageToggle.addEventListener('click', toggleLanguage)
    }
  }
}
