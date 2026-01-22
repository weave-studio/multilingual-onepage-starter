/**
 * Contact Form Validation Module
 * Provides client-side validation with bilingual error message support
 */

import { getCurrentTranslations } from './language.js'

export class ContactFormValidator {
  constructor(formElement) {
    this.form = formElement
    this.isSubmitting = false
    this.fields = {
      name: this.form.querySelector('#name'),
      email: this.form.querySelector('#email'),
      projectType: this.form.querySelector('#project-type'),
      message: this.form.querySelector('#message')
    }

    this.init()
  }

  init() {
    // Disable HTML5 validation to use custom validation
    this.form.setAttribute('novalidate', 'novalidate')

    // Add blur event listeners for real-time validation
    Object.values(this.fields).forEach(field => {
      if (field) {
        field.addEventListener('blur', () => this.validateField(field))
        field.addEventListener('input', () => {
          // Clear error on input
          if (field.classList.contains('form-input--error')) {
            this.clearError(field)
          }
        })
      }
    })

    // Handle form submission
    this.form.addEventListener('submit', e => this.handleSubmit(e))

    // Listen for language changes to update error messages and placeholders
    document.addEventListener('languageChanged', () => {
      this.updatePlaceholders()
      this.revalidateVisibleErrors()
    })
  }

  /**
   * Revalidate fields that currently have errors shown (for language switching)
   */
  revalidateVisibleErrors() {
    const errorFields = this.form.querySelectorAll('.form-input--error')
    errorFields.forEach(field => {
      this.validateField(field)
    })
  }

  /**
   * Validate individual field
   */
  validateField(field) {
    const fieldName = field.id
    let isValid = true
    let errorMessage = ''

    const translations = getCurrentTranslations()
    const formTranslations = translations.contact.form.fields

    switch (fieldName) {
      case 'name':
        isValid = this.validateName(field.value)
        if (!isValid) errorMessage = formTranslations.name.error
        break

      case 'email':
        isValid = this.validateEmail(field.value)
        if (!isValid) errorMessage = formTranslations.email.error
        break

      case 'project-type':
        isValid = this.validateProjectType(field.value)
        if (!isValid) errorMessage = 'Please select a project type'
        break

      case 'message':
        isValid = this.validateMessage(field.value)
        if (!isValid) errorMessage = formTranslations.message.error
        break

      default:
        // No validation for optional fields
        break
    }

    if (!isValid) {
      this.showError(field, errorMessage)
    } else {
      this.clearError(field)
    }

    return isValid
  }

  /**
   * Validate name field
   */
  validateName(value) {
    return value.trim().length >= 2
  }

  /**
   * Validate email field
   */
  validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value.trim())
  }

  /**
   * Validate project type selection
   */
  validateProjectType(value) {
    return value !== ''
  }

  /**
   * Validate message field
   */
  validateMessage(value) {
    return value.trim().length >= 10
  }

  /**
   * Show error message for a field
   */
  showError(field, message) {
    const errorElement = document.getElementById(`${field.id}-error`)

    if (errorElement) {
      errorElement.textContent = message
      errorElement.style.display = 'block'
    }

    field.classList.add('form-input--error')
    field.setAttribute('aria-invalid', 'true')
  }

  /**
   * Clear error message for a field
   */
  clearError(field) {
    const errorElement = document.getElementById(`${field.id}-error`)

    if (errorElement) {
      errorElement.textContent = ''
      errorElement.style.display = 'none'
    }

    field.classList.remove('form-input--error')
    field.setAttribute('aria-invalid', 'false')
  }

  /**
   * Validate entire form
   */
  validateForm() {
    let isValid = true

    // Validate all required fields
    Object.values(this.fields).forEach(field => {
      if (field && !this.validateField(field)) {
        isValid = false
      }
    })

    return isValid
  }

  /**
   * Handle form submission
   */
  async handleSubmit(event) {
    // Don't prevent default - let Netlify Forms handle the submission
    // But validate first and show errors if needed

    // Prevent double submission
    if (this.isSubmitting) {
      event.preventDefault()
      return
    }

    // Validate form
    if (!this.validateForm()) {
      event.preventDefault()

      // Focus first error field
      const firstError = this.form.querySelector('.form-input--error')
      if (firstError) {
        firstError.focus()
      }

      return
    }

    // Set submitting state
    this.isSubmitting = true
    this.setLoadingState(true)

    // Let the form submit naturally to Netlify
    // Netlify will redirect to the thank-you page
  }

  /**
   * Set loading state for form submission
   */
  setLoadingState(isLoading) {
    const submitButton = this.form.querySelector('button[type="submit"]')
    const buttonText = submitButton?.querySelector('.btn__text')
    const buttonSpinner = submitButton?.querySelector('.btn__spinner')

    if (submitButton) {
      submitButton.disabled = isLoading

      if (isLoading) {
        submitButton.classList.add('btn--loading')
        if (buttonText) buttonText.style.opacity = '0'
        if (buttonSpinner) buttonSpinner.style.display = 'inline-block'
      } else {
        submitButton.classList.remove('btn--loading')
        if (buttonText) buttonText.style.opacity = '1'
        if (buttonSpinner) buttonSpinner.style.display = 'none'
      }
    }
  }

  /**
   * Update placeholders when language changes
   */
  updatePlaceholders() {
    const translations = getCurrentTranslations()

    // Update placeholders using data attributes
    const elementsWithPlaceholder = this.form.querySelectorAll(
      '[data-i18n-placeholder]'
    )

    elementsWithPlaceholder.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder')

      // Navigate through nested translation object
      const keys = key.split('.')
      let value = translations

      for (const k of keys) {
        value = value?.[k]
      }

      if (value && typeof value === 'string') {
        element.placeholder = value
      }
    })
  }
}

/**
 * Initialize contact form validation
 */
export function initContactForm() {
  const contactForm = document.querySelector('[data-contact-form]')

  if (contactForm) {
    new ContactFormValidator(contactForm)
  }
}
