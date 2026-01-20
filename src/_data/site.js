module.exports = {
  title: 'Your Site Title',
  description: 'Your site description goes here',
  url: 'https://example.com',
  author: 'Your Name',

  // Multilingual Configuration
  multilingual: {
    // Default language code (must exist in languages array)
    defaultLanguage: 'en',

    // Storage key for language preference
    storageKey: 'site-language',

    // Available languages
    languages: [
      {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        dir: 'ltr'
      },
      {
        code: 'he',
        name: 'Hebrew',
        nativeName: 'עברית',
        dir: 'rtl'
      },
      {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
        dir: 'ltr'
      }
    ]
  }
}
