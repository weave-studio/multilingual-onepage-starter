/**
 * Language switching functionality with bilingual support
 * Handles automatic language detection, manual switching, and content updates
 */
import { translations } from './translations-data.js'

// Language detection priority: localStorage → browser language → default Hebrew
const STORAGE_KEY = 'weave-studio-language'
const DEFAULT_LANGUAGE = 'he' // Hebrew as default

let currentLanguage = DEFAULT_LANGUAGE
let currentTranslations = translations[currentLanguage]

/**
 * Detect the user's preferred language based on priority
 * @returns {string} Language code ('en' or 'he')
 */
function detectUserLanguage() {
  // 1. Check if we're on a blog post page - use the post's language
  const postArticle = document.querySelector('.post[data-post-lang]')
  if (postArticle) {
    const postLang = postArticle.getAttribute('data-post-lang')
    if (postLang && translations[postLang]) {
      return postLang
    }
  }

  // 2. Check localStorage for saved preference
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && translations[saved]) {
    return saved
  }

  // 3. Check browser language
  const browserLang = navigator.language || navigator.userLanguage
  if (browserLang && browserLang.startsWith('he')) {
    return 'he'
  }
  if (browserLang && browserLang.startsWith('en')) {
    return 'en'
  }

  // 4. Default to Hebrew
  return DEFAULT_LANGUAGE
}

/**
 * Set the website language and update all content
 * @param {string} language - Language code ('en' or 'he')
 */
function setLanguage(language) {
  if (!translations[language]) {
    console.warn(`Language '${language}' not found in translations`)
    return
  }

  currentLanguage = language
  currentTranslations = translations[currentLanguage]

  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, language)

  // Update HTML attributes for language and RTL
  updateHtmlAttributes()

  // Update all text content
  updateContent()

  // Update navigation specifically
  updateNavigation()

  // Update form if present
  updateForm()

  // Dispatch custom event for other modules to listen
  document.dispatchEvent(new CustomEvent('languageChanged', {
    detail: { language, translations: currentTranslations }
  }))
}

/**
 * Update HTML document attributes for language and direction
 */
function updateHtmlAttributes() {
  document.documentElement.lang = currentLanguage
  document.documentElement.dir = currentLanguage === 'he' ? 'rtl' : 'ltr'

  // Update language toggle button aria-label
  const languageToggle = document.querySelector('[data-language-toggle]')
  if (languageToggle) {
    const isEnglish = currentLanguage === 'en'
    languageToggle.setAttribute('aria-label',
      isEnglish ? currentTranslations.nav.switchToHebrew : currentTranslations.nav.currentLanguage
    )
  }
}

/**
 * Update all text content on the page using data attributes
 */
function updateContent() {
  // Helper function to get nested translation values
  function getTranslation(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], currentTranslations)
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
    { selector: '.nav__link[href="#services"]', text: navTranslations.services },
    { selector: '.nav__link[href="#portfolio"]', text: navTranslations.portfolio },
    { selector: '.nav__link[href="#blog"]', text: navTranslations.blog },
    { selector: '.nav__link[href="#faq"]', text: navTranslations.faq },
    { selector: '.nav__link[href="#contact"]', text: navTranslations.contact }
  ]

  menuItems.forEach(({ selector, text }) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach(el => el.textContent = text)
  })

  // Update theme toggle
  const themeToggle = document.querySelector('[data-theme-toggle]')
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', navTranslations.toggleTheme)
  }

  // Update language toggle
  const languageToggle = document.querySelector('[data-language-toggle]')
  if (languageToggle) {
    const currentText = languageToggle.querySelector('[data-lang-current]')
    const nextText = languageToggle.querySelector('[data-lang-next]')
    if (currentLanguage === 'en') {
      if (currentText) currentText.textContent = 'EN'
      if (nextText) nextText.textContent = 'עב'
    } else {
      if (currentText) currentText.textContent = 'עב'
      if (nextText) nextText.textContent = 'EN'
    }
  }
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

  const benefitsList = document.querySelectorAll('.performance__benefits-list li')
  const benefits = [performance.benefits.list1, performance.benefits.list2, performance.benefits.list3]
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
  const elementsWithPlaceholder = document.querySelectorAll('[data-i18n-placeholder]')

  elementsWithPlaceholder.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder')

    // Navigate through nested translation object
    const keys = key.split('.')
    let value = currentTranslations

    for (const k of keys) {
      value = value?.[k]
    }

    if (value && typeof value === 'string') {
      element.placeholder = value
    }
  })
}

/**
 * Toggle between English and Hebrew
 */
export function toggleLanguage() {
  const newLanguage = currentLanguage === 'en' ? 'he' : 'en'

  // Check if we're on a blog post page
  const postArticle = document.querySelector('.post[data-post-lang][data-post-url]')

  if (postArticle) {
    const currentPostLang = postArticle.getAttribute('data-post-lang')
    const currentPostUrl = postArticle.getAttribute('data-post-url')

    // If we're switching languages on a blog post, redirect to the other language version
    if (currentPostLang === 'en' && newLanguage === 'he') {
      // Redirect from /blog/slug/ to /blog/he/slug/
      const newUrl = currentPostUrl.replace('/blog/', '/blog/he/')
      window.location.href = newUrl
      return
    } else if (currentPostLang === 'he' && newLanguage === 'en') {
      // Redirect from /blog/he/slug/ to /blog/slug/
      const newUrl = currentPostUrl.replace('/blog/he/', '/blog/')
      window.location.href = newUrl
      return
    }
  }

  // For all other pages, just toggle the language
  setLanguage(newLanguage)
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

  // Set up language toggle event listener
  const languageToggle = document.querySelector('[data-language-toggle]')
  if (languageToggle) {
    languageToggle.addEventListener('click', toggleLanguage)
  }
}
