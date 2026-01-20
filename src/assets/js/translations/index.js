/**
 * Translation System - Dynamic Language Loader
 * Supports unlimited languages via configuration
 */

// Import all translation files
import en from './en.js'
import he from './he.js'
import es from './es.js'

// Registry of all loaded translations
const translationRegistry = {
  en,
  he,
  es
}

/**
 * Get translations for a specific language
 * @param {string} langCode - ISO 639-1 language code
 * @returns {object|null} - Translation object or null if not found
 */
export function getTranslations(langCode) {
  return translationRegistry[langCode] || null
}

/**
 * Get all available language codes
 * @returns {string[]} - Array of language codes
 */
export function getAvailableLanguages() {
  return Object.keys(translationRegistry)
}

/**
 * Check if a language is loaded
 * @param {string} langCode - ISO 639-1 language code
 * @returns {boolean}
 */
export function hasLanguage(langCode) {
  return langCode in translationRegistry
}

/**
 * Get language metadata from translations
 * @param {string} langCode - ISO 639-1 language code
 * @returns {object|null} - { code, name, nativeName, dir }
 */
export function getLanguageMeta(langCode) {
  const translations = translationRegistry[langCode]
  return translations?.meta || null
}

// Export the full registry for backward compatibility during migration
export const translations = translationRegistry
