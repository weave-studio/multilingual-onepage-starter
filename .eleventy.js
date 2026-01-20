const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // Add syntax highlighting for code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // Note: Vite plugin (@11ty/eleventy-plugin-vite) is ESM-only and incompatible
  // with Eleventy 2.0's CommonJS config. The site builds fine without it.

  // Copy assets directly to build folder
  eleventyConfig.addPassthroughCopy("src/assets");

  // Copy SEO files to root of build folder
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");

  // Copy PHP contact handler
  eleventyConfig.addPassthroughCopy("src/contact-handler.php");

  // Copy .htaccess to root of build folder
  eleventyConfig.addPassthroughCopy({".htaccess": ".htaccess"});

  // Add date filter for readable dates
  eleventyConfig.addFilter("readableDate", dateObj => {
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // Add lowercase filter
  eleventyConfig.addFilter("lowercase", string => {
    return string.toLowerCase();
  });

  // Add a way to reverse arrays (useful for featured posts)
  eleventyConfig.addFilter("reverse", arr => {
    return arr.slice().reverse();
  });

  // Add limit filter for arrays (Liquid needs this)
  eleventyConfig.addFilter("limit", (arr, limit) => {
    return arr.slice(0, limit);
  });

  // Add blog collection (all languages)
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Dynamically generate per-language blog collections
  // Reads language configuration from site.js
  const siteData = require('./src/_data/site.js');
  const languages = siteData.multilingual.languages;

  languages.forEach(lang => {
    // Generate collection name: 'en' -> 'blogEn', 'he' -> 'blogHe', 'es' -> 'blogEs'
    const collectionName = `blog${lang.code.charAt(0).toUpperCase()}${lang.code.slice(1)}`;

    eleventyConfig.addCollection(collectionName, function(collectionApi) {
      return collectionApi.getFilteredByGlob("src/blog/*.md")
        .filter(post => post.data.language === lang.code)
        .sort((a, b) => b.date - a.date);
    });
  });

  // Add reading time filter for blog posts
  eleventyConfig.addFilter("readingTime", function(content) {
    if (!content || typeof content !== 'string') return 1;
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(1, minutes); // Minimum 1 minute
  });

  // Add ISO date filter for datetime attributes
  eleventyConfig.addFilter("dateIso", dateObj => {
    return dateObj.toISOString();
  });

  // Add category translation filter for blog posts
  eleventyConfig.addFilter("translateCategory", function(category) {
    const categoryMap = {
      'Web Development': 'blog.categories.webDevelopment',
      'Design': 'blog.categories.design',
      'Performance': 'blog.categories.performance',
      'SEO': 'blog.categories.seo'
    };
    return categoryMap[category] || category;
  });

  // Markdown settings if needed
  let markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };

  let markdownLib = markdownIt(markdownItOptions);
  eleventyConfig.setLibrary("md", markdownLib);

  // Configure input and output directories
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },

    // Set default template formats
    templateFormats: [
      "html",
      "njk",
      "md",
      "11ty.js"
    ]
  };
};
