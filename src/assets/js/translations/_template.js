/**
 * [Language Name] translations
 * @language [code]
 * @dir [ltr/rtl]
 * @nativeName [Native Language Name]
 *
 * INSTRUCTIONS FOR TRANSLATORS:
 * 1. Copy this file and rename it to your language code (e.g., es.js for Spanish)
 * 2. Update the meta section with your language details
 * 3. Translate all text values (keep all property keys unchanged)
 * 4. Maintain the exact structure - do not add or remove properties
 * 5. Keep all HTML tags, placeholders, and formatting intact
 * 6. Test thoroughly after translation
 */
export default {
  meta: {
    code: '[code]', // ISO 639-1 language code (e.g., 'es', 'fr', 'de')
    name: '[Language Name]', // English name (e.g., 'Spanish', 'French', 'German')
    nativeName: '[Native]', // Native name (e.g., 'Español', 'Français', 'Deutsch')
    dir: 'ltr' // Text direction: 'ltr' or 'rtl'
  },

  // Navigation
  nav: {
    logo: '[Your Brand]',
    logoText1: '[Your]',
    logoText2: '[Brand]',
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'About',
    blog: 'Blog',
    faq: 'FAQ',
    contact: 'Get Started',
    toggleTheme: 'Toggle theme',
    currentLanguage: 'Language currently set to [Language Name]',
    switchToHebrew: 'Switch website language to Hebrew'
  },

  // Skip link
  skipLink: {
    main: 'Skip to main content'
  },

  // Hero section
  hero: {
    titleFirstLine: 'Weaving ideas into',
    titleAnimated: 'websites',
    rotatingWords: ['websites', 'portfolios', 'online stores', 'your vision'],
    description:
      'Beautifully designed, professional websites. Developed especially for small businesses, freelancers, and creatives.',
    ctaPrimary: 'Learn More',
    ctaLearnMore: 'Our Services',
    scrollHint: 'Scroll down to learn more'
  },

  // Welcome section
  welcome: {
    title: 'Welcome to Weave Studio',
    subtitle: 'An Independent Web Design Studio',
    content: {
      paragraph1:
        'Tending to all your website needs, so that you can focus on what really matters.'
    }
  },

  // Services section
  services: {
    title: 'What We Do',
    subtitle: 'Websites that work for you',
    intro: {
      paragraph1:
        "Every website is built to do more than just look good — it's designed to work hard for your business.",
      paragraph2:
        'Whether you need a simple landing page, portfolio, a business website, or a full-fledged e-commerce store, be ensured that your website is professional-looking, user-friendly, and optimized for maximum results.',
      paragraph3:
        "From custom development to maintenance, staying focused on performance, clarity, and results is at the core. Whether you're launching something new or refining your current setup, Weave Studio creates fast, functional websites that truly deliver."
    },
    items: [
      {
        title: 'Website Development',
        description:
          'Professional-looking and optimized websites built to perform on all devices.'
      },
      {
        title: 'Custom Designs',
        description:
          'Tailor-made layouts to match your brand and your audience.'
      },
      {
        title: 'Content Writing',
        description:
          'Clear, engaging, and SEO-friendly copywriting for your website.'
      },
      {
        title: 'Website Maintenance',
        description:
          'Regular updates, backups, and support to keep your website healthy.'
      },
      {
        title: 'E-Commerce',
        description: 'Seamless online stores with secure payment integrations.'
      },
      {
        title: 'SEO',
        description:
          'Technical and on-page optimisation to help your website rank higher.'
      }
    ],
    cta: {
      paragraph:
        "From custom development to maintenance, staying focused on performance, clarity, and results is at the core. Whether you're launching something new or refining your current setup, Weave Studio creates fast, functional websites that truly deliver.",
      text: "Let's Build Something Great Together",
      button: 'Get Started'
    },
    features: {
      title: 'Key Features',
      list1: {
        title: 'Mobile First Design. Fully Responsive',
        description:
          'Websites that look great on all mobile, tablet, and desktop sizes so visitors can access your beautiful website from anywhere.'
      },
      list2: {
        title: 'Powerful Performance. Optimized Page Speed',
        description:
          'Smartly coded and well-maintained websites load in 1 second or less, ensuring maximum reach and visibility.'
      },
      list3: {
        title: 'Solid Code. Secure & Reliable',
        description:
          'No bloated plugins or sketchy themes. Just solid, well-maintained code you can rely on.'
      }
    },
    guarantee: {
      title: 'Money Back Guarantee',
      description:
        "If I can't design something you like, you get your money back and the contract is cancelled. I stand by my work."
    },
    pricing: {
      title: 'Pricing Options',
      packages: [
        {
          title: 'Standard Website Package',
          description:
            'Perfect for businesses ready to establish their online presence.',
          features: [
            '5 professionally designed pages',
            'Mobile-optimized and lightning fast',
            'Contact forms and SEO setup',
            'Payment: 50% upfront, 50% on completion',
            'Add-ons available: Extra pages, blog setup, content management system'
          ]
        },
        {
          title: 'Website + Support Package',
          description:
            'Everything in the standard package, plus ongoing partnership.',
          features: [
            'All standard website features',
            '12 months free hosting',
            '12 months unlimited edits',
            'Priority support for changes and additions',
            'Payment: Monthly installments over 12 months'
          ]
        },
        {
          title: 'E-Commerce Package',
          description: 'Custom online stores built for results.',
          features: [
            'Custom Shopify store design',
            'Secure payment processing',
            'Integrated shipping',
            'Shopify tutorial walkthrough',
            'Full product management in Shopify CMS',
            'Custom pricing based on requirements'
          ]
        }
      ],
      subscriptionPlanLabel: 'Subscription Plan',
      availableSoon: 'Available Soon'
    }
  },

  // Performance section
  performance: {
    title: 'Building Better Websites That Perform',
    subtitle:
      'When it comes to website load times, not very many can get the Google PageSpeed scores that are achieved with each and every website.',
    content: {
      paragraph1:
        'Test your website load times with Google PageSpeed Insights and see what your current website is scoring right now.'
    },
    benefitsTitle: 'Why Performance Matters:',
    benefits: {
      list1:
        'Better load times means more traffic and more website conversions over time',
      list2:
        'Faster websites can help improve SEO and your Google ads performance',
      list3:
        'All websites load instantly in under 1 second or less, which leads to a better user experience and conversions'
    }
  },

  // Portfolio section
  portfolio: {
    title: 'Recent Work',
    subtitle: "Building a portfolio of projects we're proud of",
    content: {
      paragraph1:
        'Selective about the projects taken on, focusing on quality over quantity.<br>Each project receives full attention and creative energy to deliver exceptional results.',
      paragraph2:
        'Your project could be featured here next. Actively working with businesses who value quality, aesthetics, and a thoughtful approach to web development.'
    },
    featured: {
      title: 'Featured Project',
      description:
        '<strong>SoulCollage®</strong> – A professional landing page showcasing an art therapy workshop. Built with a focus on visual storytelling, accessibility, and seamless user experience.<br><br><a href="https://david-artfacilitator.co.il/" target="_blank" rel="noopener noreferrer">Visit site →</a>'
    },
    cta: {
      text: "Let's Build Something Great Together",
      button: 'Get Started'
    }
  },

  // Blog preview section
  blog: {
    title: 'Recently From the Blog',
    subtitle: 'Helpful insights and honest guidance',
    viewAll: 'View All Posts',
    readMore: 'Read More →',
    minRead: 'min read',
    categories: {
      webDevelopment: 'Web Development',
      design: 'Design',
      performance: 'Performance',
      seo: 'SEO'
    },
    placeholder: {
      title: 'Coming Soon',
      excerpt1:
        'Blog posts will appear here with the latest insights and tips from our team.',
      excerpt2:
        'Stay tuned for articles about the latest trends in web design and development.',
      excerpt3:
        'Learn about optimizing your website for better performance and user experience.',
      excerpt4:
        'Discover strategies to improve your search engine rankings and drive more traffic.'
    },
    published: 'Published',
    share: 'Share',
    prevPost: 'Previous',
    nextPost: 'Next',
    listingTitle: 'Blog',
    listingDescription:
      'Helpful insights and honest guidance on web development, design, and performance.',
    emptyMessage: 'No blog posts yet. Check back soon for the latest insights!',
    backToBlog: '← Back to Blog',
    readTimeLabel: 'min read'
  },

  // About section
  about: {
    title: 'Behind The Scenes',
    content: {
      paragraph1: 'Weave Studio is a one-man operation.',
      paragraph2:
        'A freelance web developer focused on crafting clean, professional-looking websites that feel good to use on any device.',
      paragraph3:
        'Building custom-coded websites and teaming up with designers, copywriters, and SEO specialists when needed, to make sure every project delivers — both visually and strategically.',
      paragraph4:
        'The goal is simple: to help small businesses and entrepreneurs bring their ideas to life online through powerful, engaging digital experiences.'
    },
    altText: 'Weave Studio Profile Picture',
    profile: {
      name: 'Assaf Yechiel',
      title: 'Front End Developer'
    }
  },

  // FAQ section
  faq: {
    title: 'Common Questions',
    homeTitle: 'Common Questions',
    homeSubtitle: 'Quick, simple answers that help you know what to expect',
    listingTitle: 'Frequently Asked Questions',
    listingDescription:
      'Find answers to common questions about our services, pricing, and process.',
    viewAll: 'View All FAQs',
    filters: {
      all: 'All Questions',
      process: 'Process',
      pricing: 'Pricing',
      technical: 'Technical'
    },
    questions: [
      {
        question: 'What is your development process?',
        answer:
          "We follow an iterative approach starting with discovery and planning, moving through design and development, and ending with testing and launch. You'll be involved at every stage to ensure the final result meets your vision and goals."
      },
      {
        question: 'How long does a typical project take?',
        answer:
          "Timeline varies based on complexity, but most websites take 6-12 weeks from start to finish. We'll provide a detailed timeline during our initial consultation and keep you updated throughout the process."
      },
      {
        question: 'Do you offer ongoing maintenance?',
        answer:
          'Yes, we offer flexible maintenance packages including security updates, content changes, performance monitoring, and technical support to keep your site running smoothly after launch.'
      }
    ],
    categories: {
      process: {
        q1: {
          question: 'How does your web design process work?',
          answer:
            'Each project starts with a short discovery call to understand your goals, audience, and overall style — no "perfect brand" required. From there, I create a personalized website plan and design direction before moving into development. You\'ll see progress in clear stages, with space for feedback at every step.'
        },
        q2: {
          question: 'How long does a typical project take?',
          answer:
            "A website can take anywhere from 2–6 weeks, depending on project size, how quickly content is ready, and how many refinements we make together. You'll get a clear timeline before we start so you always know what to expect."
        },
        q3: {
          question: 'What do you need from me to get started?',
          answer:
            "Once we agree on the project details and pricing, I'll ask for your text, images, logo (if you have one), and a few examples of sites or styles you like. Don't worry if everything isn't ready — I'll guide you through what's needed, step by step."
        },
        q4: {
          question: 'Do you offer revisions?',
          answer:
            'Yes — every project includes two rounds of revisions, with flexibility if we need an extra round to fine-tune things. The goal is always to make sure your site feels just right, not to rush the process.'
        }
      },
      pricing: {
        q1: {
          question: 'How much does a website cost?',
          answer:
            "Every project is different. A custom 5 page website starts at $1,500 (₪4500). The exact price depends on the number of pages, level of design detail, and any special features. After our initial chat, you'll receive a clear proposal and quote — no surprises."
        },
        q2: {
          question: 'What is your payment structure like?',
          answer:
            "Payments are paid 50% upfront and 50% on completion. I'm also piloting a subscription option, which spreads costs over time and includes ongoing support — contact me if you'd like early access."
        },
        q3: {
          question: "What's included in your packages?",
          answer:
            "All projects include planning, custom design, responsive development (mobile, tablet & laptop), basic SEO setup, and performance optimization. You'll also receive a handover guide for any necessary technical know-how and support after launch to make sure everything runs smoothly."
        },
        q4: {
          question: 'What if I already have a website?',
          answer:
            "That's totally fine — I can refresh or rebuild your existing site, keeping what still works and improving what doesn't. It's a great way to modernize your online presence without starting from scratch."
        }
      },
      technical: {
        q1: {
          question: 'What platforms do you use?',
          answer:
            'I build using lightweight, modern tools — not site builders like WordPress or Wix. This means faster load times, better security, and more flexibility for your website. Each site is coded by hand to fit your business, not a template.'
        },
        q2: {
          question: 'Will I be able to update my website myself?',
          answer:
            "Yes. If you'd like to make simple updates (like changing text or images, uploading blog posts, etc.), I can connect a lightweight content management system (CMS). It works a bit like a WordPress dashboard but without the clutter — letting you edit content safely through a simple interface. For advanced edits, I'm always available to help."
        },
        q3: {
          question: 'Do you provide hosting or maintenance?',
          answer:
            'Yes — I handle domain registration and hosting setup for you. Domains are billed annually, and hosting can be billed monthly or yearly, depending on your preference. Ongoing maintenance (such as updates, performance monitoring, backups) is optional, and can be added anytime.'
        },
        q4: {
          question: 'How do you keep websites fast and reliable?',
          answer:
            'Each site is built to be responsive, fast-loading, and accessible across devices. I focus on clean, efficient code and modern best practices — so your website performs smoothly for years to come.'
        }
      }
    }
  },

  // Contact section
  contact: {
    title: "Let's Build Something Great Together",
    subtitle: 'Ready to discuss your project?',
    description:
      "If you're looking for a reliable developer to create or improve your website, I'd be happy to learn more about your project.",
    expectations: {
      title: 'What to Expect:',
      list1: 'Initial discussion: Understanding your needs and goals',
      list2: 'Clear project outline: Detailed scope, timeline, and pricing',
      list3:
        'Collaborative process: Regular updates and feedback throughout development'
    },
    details: {
      email: { label: 'Email', value: 'assaf@weavewebdesign.com' },
      response: { label: 'Response Time', value: 'Within 24 hours' }
    },
    form: {
      title: 'Get in Touch',
      fields: {
        name: {
          label: 'Name',
          placeholder: '',
          error: 'Name is required'
        },
        email: {
          label: 'Email',
          placeholder: '',
          error: 'Please enter a valid email address'
        },
        company: {
          label: 'Company',
          placeholder: '',
          error: 'Company is required'
        },
        phone: {
          label: 'Phone',
          placeholder: '',
          error: 'Phone is required'
        },
        projectType: {
          label: 'Project Type',
          options: [
            'Select a project type',
            'New Website',
            'Website Redesign',
            'E-commerce Store',
            'Maintenance & Support',
            'Other'
          ]
        },
        message: {
          label: 'Message',
          placeholder:
            'Tell us about your project, timeline, and any specific requirements...',
          error: 'Message is required'
        }
      },
      submit: 'Send Message',
      success: 'Message sent successfully!',
      error: 'There was an error sending your message. Please try again.'
    }
  },

  // Thank You Page
  thankYou: {
    title: 'Thank You for Reaching Out!',
    message:
      'Your message has been successfully sent. We appreciate you taking the time to contact us and will get back to you as soon as possible, usually within 24 hours.',
    nextSteps: {
      title: 'What Happens Next?',
      step1:
        "<strong>Review:</strong> We'll carefully review your message and project details",
      step2:
        "<strong>Response:</strong> You'll receive a personalized reply within 24 hours",
      step3:
        "<strong>Discussion:</strong> We'll schedule a call to discuss your project in detail"
    },
    returnHome: 'Return to Homepage',
    viewServices: 'View Our Services',
    urgentMessage: 'Need immediate assistance? Email us directly at'
  },

  // Footer
  footer: {
    logo: 'Weave Studio',
    tagline: 'Weave. Got You Covered.',
    description:
      'Professional web development services creating modern, high-performance digital experiences.',
    sections: {
      services: {
        title: 'Connect',
        links: ['Email', 'LinkedIn', 'Twitter', 'GitHub']
      },
      company: {
        title: 'Explore',
        links: ['About', 'Services', 'Portfolio', 'Blog', 'FAQ', 'Contact']
      },
      connect: {
        title: 'Connect',
        links: ['Email', 'LinkedIn', 'Twitter', 'GitHub']
      }
    },
    copyright: '© Copyright 2025 Weave Studio | All Rights Reserved.',
    legal: ['Legal Notice']
  },

  // Legal Notice page
  legalNotice: {
    title: 'Legal Notice',
    backButton: 'Back to Home',
    returnHome: 'Return to Homepage',
    lastUpdated: 'Last Updated: January 2025',
    sections: {
      businessInfo: {
        title: 'Business Information',
        content:
          '<strong>Business Name:</strong> Weave Studio<br><strong>Owner:</strong> Assaf Yechiel<br><strong>Email:</strong> <a href="mailto:assaf@weavewebdesign.com">assaf@weavewebdesign.com</a>'
      },
      disclaimer: {
        title: 'Disclaimer',
        content:
          'The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.'
      },
      liability: {
        title: 'Limitation of Liability',
        content:
          'In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.'
      },
      externalLinks: {
        title: 'External Links',
        content:
          'Through this website you may be able to link to other websites which are not under the control of Weave Studio. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.'
      },
      copyright: {
        title: 'Copyright Notice',
        content:
          'This website and its content are copyright of Weave Studio - © 2025. All rights reserved. Any redistribution or reproduction of part or all of the contents in any form is prohibited other than the following: you may print or download to a local hard disk extracts for your personal and non-commercial use only.'
      },
      contact: {
        title: 'Contact',
        content:
          'If you have any questions about this legal notice, please contact us at <a href="mailto:assaf@weavewebdesign.com">assaf@weavewebdesign.com</a>'
      }
    }
  },

  // Page meta information (SEO)
  pageMeta: {
    title: 'Weave Studio - Professional Web Development',
    description:
      'Professional web development services creating modern, high-performance websites and experiences.',
    keywords:
      'web development, web design, e-commerce, responsive design, performance optimization',
    ogTitle: 'Weave Studio - Professional Web Development',
    ogDescription:
      'Transform your business with modern, high-performance websites. Expert web development services.',
    twitterCard: 'summary_large_image'
  }
}
