module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    // Code quality
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'warn',
    'prefer-const': 'error',

    // Style consistency
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'never'],

    // Performance
    'no-loop-func': 'error',
    'no-unmodified-loop-condition': 'error',

    // Accessibility
    'accessor-pairs': 'error',
    'consistent-return': 'error',
    'default-case': 'error',

    // Simplification
    'complexity': ['warn', 10],
    'max-depth': ['warn', 4],
    'max-lines-per-function': ['warn', 50]
  },

  // Ignore patterns
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.config.js',
    '**/*.min.js'
  ]
};
