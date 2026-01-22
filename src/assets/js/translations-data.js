/**
 * Translation data for Weave Studio website
 * Bilingual support: English (en) and Hebrew (he)
 */

export const translations = {
  en: {
    // Navigation
    nav: {
      logo: 'Weave Studio',
      logoWeave: 'Weave',
      logoStudio: 'Studio',
      services: 'Services',
      portfolio: 'Portfolio',
      about: 'About',
      blog: 'Blog',
      faq: 'FAQ',
      contact: 'Get Started',
      toggleTheme: 'Toggle theme',
      currentLanguage: 'Language currently set to English',
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
          description:
            'Seamless online stores with secure payment integrations.'
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
      emptyMessage:
        'No blog posts yet. Check back soon for the latest insights!',
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

    // Meta information
    meta: {
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
  },

  he: {
    // Navigation
    nav: {
      logo: 'Weave Studio',
      logoWeave: 'Weave',
      logoStudio: 'Studio',
      services: 'שירותים',
      portfolio: 'תיק עבודות',
      about: 'אודות',
      blog: 'בלוג',
      faq: 'שאלות נפוצות',
      contact: 'צור קשר',
      toggleTheme: 'החלף נושא',
      currentLanguage: 'השפה הנוכחית היא עברית',
      switchToHebrew: 'החלף את שפת האתר לאנגלית'
    },

    // Skip link
    skipLink: {
      main: 'דלג לתוכן הראשי'
    },

    // Hero section
    hero: {
      titleFirstLine: 'וויב סטודיו אורגים רעיונות',
      titleAnimated: 'לאתרים',
      rotatingWords: ['לפורטפוליו', 'לחנויות מקוונות', 'לדפי נחיתה'],
      description:
        'אתרים מעוצבים, יפים ומקצועיים. מפותחים במיוחד עבור עסקים קטנים, פרילנסרים ויוצרי תוכן.',
      ctaPrimary: 'למד עוד',
      ctaLearnMore: 'השירותים שלנו',
      scrollHint: 'גלול למטה כדי ללמוד עוד'
    },

    // Welcome section
    welcome: {
      title: 'ברוכים הבאים לוויב סטודיו',
      subtitle: 'סטודיו עצמאי לעיצוב אתרים',
      content: {
        paragraph1:
          'דואגים לכל צרכי האתר שלכם, כך שתוכלו להתמקד במה שבאמת חשוב.'
      }
    },

    // Services section
    services: {
      title: 'שירותים',
      subtitle: 'אתרים שמתפקדים היטב',
      intro: {
        paragraph1:
          'כל אתר נבנה כדי לא רק להיראות טוב - הוא מתוכנן לעבוד קשה עבור העסק שלכם.',
        paragraph2:
          'בין אם אתה צריך דף נחיתה פשוטה, פורטפוליו, אתר עסקי, או חנות מסחר אלקטרוני מלאה, היה בטוח שהאתר שלך בעל מראה מקצועי, ידידותי למשתמש, ומוטב להשגת תוצאות מקסימליות.',
        paragraph3:
          'מפיתוח מותאם אישית ועד תחזוקה, שמירה על ביצועים, בהירות ותוצאות הם בליבת העבודה. בין אם אתה משיק משהו חדש או משפר את המערך הנוכחי שלך, וויב סטודיו יוצר אתרים מהירים ופונקציונליים שבאמת מספקים את הצורך.'
      },
      offerings: {
        title: 'הצעות שירותים'
      },
      items: [
        {
          title: 'פיתוח אתרים',
          description:
            'אתרים בעלי מראה מקצועי ומיטבי שנבנו לביצוע בכל סוגי המכשירים'
        },
        {
          title: 'עיצובים מותאמים אישית',
          description: 'מעוצב היטב כדי להתאים למותג ולקהל שלכם'
        },
        {
          title: 'כתיבת תוכן',
          description: 'כתיבת תוכן ברור, מרתק וידידותי ל-SEO'
        },
        {
          title: 'תחזוקת אתרים',
          description: 'עדכונים קבועים, גיבויים ותמיכה כדי לשמור על האתר שלכם'
        },
        {
          title: 'מסחר אלקטרוני',
          description:
            'חווית משתמש חלקה בחנויות אונליין עם אינטגרציות תשלום מאובטחות'
        },
        {
          title: 'SEO',
          description:
            'אופטימיזציה טכנית וOn-Page כדי לעזור לאתר שלכם להגיע לדירוג גבוה יותר'
        }
      ],
      cta: {
        paragraph:
          'מפיתוח מותאם אישית ועד תחזוקה, שמירה על ביצועים, בהירות ותוצאות הם בליבת העבודה. בין אם אתה משיק משהו חדש או משפר את המערך הנוכחי שלך, וויב סטודיו יוצר אתרים מהירים ופונקציונליים שבאמת מספקים את הצורך.',
        text: 'בואו נבנה משהו נפלא ביחד',
        button: 'צור קשר'
      },
      features: {
        title: 'תכונות מפתח',
        list1: {
          title: 'עיצוב אתר לנייד. רספונסיבי לחלוטין',
          description:
            'אתרים שנראים מעולה בכל גדלי מובייל, טאבלט ודסקטופ כך שמבקרים יכולים לגשת לאתר היפה שלכם מכל מקום'
        },
        list2: {
          title: 'ביצועים עוצמתיים. מהירות דף ממוטבת',
          description:
            'אתרים מקודדים בצורה חכמה ומתוחזקים היטב הנטענים תוך שנייה אחת או פחות, ומבטיחים טווח הגעה ונראות מקסימליים'
        },
        list3: {
          title: 'קוד חסון. מאובטח ואמין',
          description:
            'ללא תוספים מנופחים או תבניות מפוקפקות. רק קוד אמין ומתוחזק היטב שאתם יכולים לסמוך עליו'
        }
      },
      guarantee: {
        title: 'ערבות החזר כספי',
        description:
          'אם אני לא מצליח לעצב משהו שאתם אוהבים, תקבלו את הכסף שלכם בחזרה והחוזה יבוטל. אני עומד מאחורי העבודה שלי.'
      },
      pricing: {
        title: 'אפשרויות תמחור',
        packages: [
          {
            title: 'חבילת אתר סטנדרטית',
            description:
              'מושלם לעסקים שמוכנים להקים ולבסס את הנוכחות המקוונת שלהם',
            features: [
              '5 עמודים מעוצבים באופן מקצועי',
              'ממוטב למובייל ומהיר כברק',
              'טפסי יצירת קשר והגדרת SEO',
              'תשלום: 50% מראש, 50% בהשלמת העבודה',
              'תוספות זמינות: דפים נוספים, הקמת בלוג, מערכת ניהול תוכן לפוסטים ושאלות נפוצות'
            ]
          },
          {
            title: 'חבילת אתר + תמיכה',
            description: 'כל מה שבחבילה הסטנדרטית, בתוספת לשותפות מתמשכת',
            features: [
              'כל התכונות של אתר סטנדרטי',
              '12 חודשי אחסון חינם',
              '12 חודשי עריכות ללא הגבלה',
              'תמיכה מעודפת לשינויים ותוספות',
              'תשלום: 12 תשלומים חודשיים'
            ]
          },
          {
            title: 'חבילת מסחר אלקטרוני',
            description: 'חנויות מקוונות המותאמות אישית שנבנו להשיג תוצאות',
            features: [
              'עיצוב חנות Shopify בהתאמה אישית',
              'עיבוד תשלומים מאובטח',
              'שילוח משולב',
              'הדרכת Shopify',
              'ניהול מוצרים מלא Shopify-CMS',
              'תמחור בהתאם לדרישות'
            ]
          }
        ],
        subscriptionPlanLabel: 'מינוי חודשי',
        availableSoon: 'זמין בקרוב'
      }
    },

    // Performance section
    performance: {
      title: 'בניית אתרים שמציגים ביצועים טובים יותר',
      subtitle:
        'כשמדובר בזמני טעינת אתרים, לא הרבה יכולים להשיג את מהירויות שמושגים על ידי גוגל PageSpeed עם כל אתר ואתר של וויב סטודיו',
      content: {
        paragraph1:
          'בדוק את זמני טעינת האתר שלכם עם Google PageSpeed Insights וראה מה הזמן שהוא מקבל.'
      },
      benefitsTitle: 'למה ביצועים חשובים',
      benefits: {
        list1: 'זמני טעינה טובים יותר פירושם יותר תנועה ויותר לאורך זמן',
        list2:
          'אתרים מהירים יותר יכולים לעזור לשפר את ה-SEO ואת ביצועי ה-GoogleAds שלך',
        list3:
          'כל האתרים של וויב סטודיו נטענים באופן מיידי תוך שנייה אחת או פחות, מה שמוביל לחוויית משתמש טובות יותר והמרות'
      }
    },

    // Portfolio section
    portfolio: {
      title: 'עבודות אחרונות',
      subtitle: 'בניית פורטפוליו של פרויקטים שאנחנו גאים בהם',
      content: {
        paragraph1:
          'בררני לגבי הפרויקטים שאני לוקח, מתמקד באיכות על פני כמות. כל פרויקט מקבל תשומת לב מלאה ואנרגיה יצירתית כדי לספק תוצאות יוצאות דופן.',
        paragraph2:
          'הפרויקט שלכם עשוי להיות הבא להופיע כאן. עובד באופן פעיל עם עסקים שמעריכים איכות, אסתטיקה וגישה מחושבת לפיתוח אתרים.'
      },
      featured: {
        title: 'פרויקט שמוצג',
        description:
          '<strong>®SoulCollage</strong> – אתר נחיתה מקצועי המציג סדנת טיפול באמנות. נבנה עם דגש על סיפור חזותי, נגישות וחוויית משתמש חלקה.<br><br><a href="https://david-artfacilitator.co.il/" target="_blank" rel="noopener noreferrer">בקר באתר ←</a>'
      },
      cta: {
        text: 'בואו נבנה משהו עצום ביחד',
        button: 'התחל'
      }
    },

    // Blog preview section
    blog: {
      title: 'לאחרונה מהבלוג',
      subtitle: 'תובנות מועילות והדרכה',
      viewAll: 'צפה בכל הפוסטים',
      readMore: 'קרא עוד ←',
      minRead: 'דקות קריאה',
      categories: {
        webDevelopment: 'פיתוח אתרים',
        design: 'עיצוב',
        performance: 'ביצועים',
        seo: 'SEO'
      },
      placeholder: {
        title: 'בקרוב',
        excerpt1:
          'פוסטים בבלוג יופיעו כאן עם התובנות והטיפים האחרונים מהצוות שלנו.',
        excerpt2:
          'הישארו מעודכנים למאמרים על המגמות האחרונות בעיצוב ופיתוח אתרים.',
        excerpt3:
          'למדו על אופטימיזציה של האתר שלכם לביצועים טובים יותר וחוויית משתמש.',
        excerpt4: 'גלו אסטרטגיות לשיפור דירוג במנועי החיפוש ולהגדלת התנועה.'
      },
      published: 'פורסם',
      share: 'שתף',
      prevPost: 'הקודם',
      nextPost: 'הבא',
      listingTitle: 'בלוג',
      listingDescription:
        'תובנות שימושיות והדרכה כנה על פיתוח אתרים, עיצוב ואופטימיזציה של ביצועים.',
      emptyMessage: 'עדיין אין פוסטים בבלוג. חזרו בקרוב לתובנות האחרונות!',
      backToBlog: '→ חזרה לבלוג',
      readTimeLabel: 'דקות קריאה'
    },

    // About section
    about: {
      title: 'אודות וויב סטודיו',
      content: {
        paragraph1: 'מאחורי וויב סטודיו עומד איש אחד.',
        paragraph2:
          'מפתח אתרים פרילנסר המתמקד ביצירת אתרים בעלי מראה מקצועי שמתאמים לשימוש בכל מכשיר.',
        paragraph3:
          'אתרים מותאמים אישית ובשיתוף פעולה עם מעצבים, כותבי תוכן ומומחי SEO, עם נחוץ, כדי לוודא שכל פרויקט עונה על הצרכים מבחינה ויזואלית ואסטרטגית.',
        paragraph4:
          'המטרה פשוטה: לעזור לעסקים קטנים ויזמים להפוך את הרעיונות שלהם למציאות עוצמתיות ומרתקות.'
      },
      altText: 'תמונת פרופיל וויב סטודיו',
      profile: {
        name: 'אסף יחיאל',
        title: 'מפתח פרונט אנד'
      }
    },

    // FAQ section
    faq: {
      title: 'שאלות נפוצות',
      homeTitle: 'שאלות נפוצות',
      homeSubtitle: 'תשובות מהירות ופשוטות שיעזרו לך לדעת למה לצפות',
      listingTitle: 'שאלות נפוצות',
      listingDescription:
        'מצא תשובות לשאלות נפוצות על השירותים, התמחור והתהליך שלנו.',
      viewAll: 'צפה בכל השאלות',
      filters: {
        all: 'כל השאלות',
        process: 'התהליך',
        pricing: 'תמחור',
        technical: 'טכני'
      },
      questions: [
        {
          question: 'מה הוא תהליך הפיתוח שלכם?',
          answer:
            'אנחנו עוקבים אחר גישה איטרטיבית שמתחילה בגילוי ותכנון, עוברת לעיצוב ופיתוח, ומסתיימת בבדיקות והשקה. תהיה מעורב בכל שלב כדי לוודא שהתוצאה הסופית תתאים לחזון ולמטרות שלך.'
        },
        {
          question: 'כמה זמן לוקח פרויקט טיפוסי?',
          answer:
            'ציר הזמן משתנה בהתאם למורכבות, אבל רוב האתרים לוקחים 6-12 שבועות מההתחלה עד הסיום. נספק ציר זמן מפורט במהלך היעוץ ההתחלתי ונעדכן אותך לאורך כל התהליך.'
        },
        {
          question: 'האם אתם מציעים תחזוקה מתמשכת?',
          answer:
            'כן, אנחנו מציעים חבילות תחזוקה גמישות כולל עדכוני אבטחה, שינויי תוכן, מעקב ביצועים ותמיכה טכנית כדי לשמור על האתר שלך פועל בצורה חלקה לאחר ההשקה.'
        }
      ],
      categories: {
        process: {
          q1: {
            question: 'מהו תהליך בניית האתר שלך?',
            answer:
              'כל פרויקט מתחיל בשיחת היכרות קצרה כדי להבין את המטרות שלך, את הקהל שלך, ואת ה"סגנון" או ה־look & feel שאת/ה רוצה לאתר — לא צריך מיתוג מושלם מראש. מנקודה זו אני בונה תוכנית ואת הכיוון העיצובי, לפני שאני עובר לשלב הפיתוח. תראו את ההתקדמות בשלבים ברורים, עם מקום לפידבק בכל שלב.'
          },
          q2: {
            question: 'כמה זמן לוקח לבנות אתר?',
            answer:
              'בדרך כלל זה לוקח בין שבועיים לשישה שבועות, תלוי בגודל הפרויקט, בזמינות התוכן, ובכמות ההתאמות שנעשה יחד. לפני שמתחילים, תקבל/י לוח זמנים ברור כך שתמיד תדע/י מה קורה.'
          },
          q3: {
            question: 'מה צריכים לספק כדי להתחיל?',
            answer:
              'אחרי שנסכים על פרטי הפרויקט והתמחור, אבקש ממך את הטקסטים, התמונות, הלוגו (אם יש), ודוגמאות לאתרים או סגנונות שאת/ה אוהב/ת. אין לחץ אם לא הכל מוכן — אלווה אותך צעד־צעד.'
          },
          q4: {
            question: 'האם כלולים תיקונים ושינויים?',
            answer:
              'כן. כל פרויקט כולל שני סבבים של תיקונים/שינויים, עם גמישות במידת הצורך כדי לדייק את התוצאה. המטרה היא שאת/ה תרגיש/י שהאתר שלך מושלם — לא למהר לסיים.'
          }
        },
        pricing: {
          q1: {
            question: 'כמה עולה אתר?',
            answer:
              'כל פרויקט הוא שונה, אבל אתר מותאם אישית של חמישה עמודים מתחיל מ־₪4,500. המחיר הסופי תלוי בכמות העמודים, ברמת העיצוב, ובפונקציות הנוספות. אחרי שיחת ההיכרות תקבל/י הצעת מחיר ברורה — בלי הפתעות.'
          },
          q2: {
            question: 'מה הם תנאי התשלום?',
            answer:
              'תשלום של 50% בתחילת הפרויקט ו־50% עם סיום האתר. בנוסף, אני מציעה אפשרות מנוי חודשי (subscription) שבו העלות פרוסה על פני זמן וכוללת תמיכה שוטפת — אפשר לפנות אליי לפרטים נוספים.'
          },
          q3: {
            question: 'מה כלול בחבילות?',
            answer:
              'כל פרויקט כולל תכנון, עיצוב מותאם אישית, פיתוח רספונסיבי (למובייל, טאבלט ומחשב נייד), הגדרות SEO בסיסיות ואופטימיזציה לביצועים. בסיום תקבל/י מדריך קצר ותמיכה לאחר העלייה לאוויר כדי לוודא שהכל עובד חלק.'
          },
          q4: {
            question: 'כבר יש לי אתר — מה עכשיו?',
            answer:
              'אין בעיה! אני יכול לרענן או לבנות מחדש את האתר הקיים שלך, לשמור על מה שעובד ולשפר את מה שלא. זו דרך מצוינת לעדכן את הנראות והביצועים של העסק שלך בלי להתחיל מאפס.'
          }
        },
        technical: {
          q1: {
            question: 'באילו פלטפורמות אתה משתמש?',
            answer:
              'אני בונה אתרים בעזרת כלים מודרניים וקלים — לא בבילדרים כמו WordPress או Wix. התוצאה היא אתרים מהירים יותר, מאובטחים יותר, וגמישים יותר. כל אתר נבנה בקוד נקי ומדויק, במיוחד לעסק שלך — לא מתבנית מוכנה.'
          },
          q2: {
            question: 'האם אוכל לעדכן את האתר בעצמי?',
            answer:
              'כן. אם תרצה/י לבצע עדכונים פשוטים — כמו שינוי טקסטים, תמונות או הוספת פוסטים — אני יכול לחבר מערכת ניהול תוכן (CMS) קלה לשימוש. היא דומה ללוח בקרה של וורדפרס, אבל בלי העומס, ומאפשרת לערוך תוכן בצורה בטוחה ופשוטה. לשינויים מורכבים יותר — אני זמין לעזור בכל עת.'
          },
          q3: {
            question: 'האם את מספקת אחסון ותחזוקה?',
            answer:
              'כן — אני מטפל ברישום הדומיין ובהקמת האחסון עבורך. הדומיינים מחויבים שנתית, והאחסון יכול להיות מחויב חודשי או שנתי, לפי העדפתך. תחזוקה שוטפת (כמו עדכונים, ניטור וגיבוי) היא אופציונלית וניתנת להוספה בכל שלב.'
          },
          q4: {
            question: 'איך אתה שומר על האתר מהיר ויציב?',
            answer:
              'כל אתר נבנה כך שיהיה רספונסיבי, מהיר ונגיש בכל מכשיר. אני מקפיד על קוד נקי, אופטימיזציה לביצועים, וסטנדרטים עדכניים — כך שהאתר שלך יעבוד בצורה חלקה לאורך זמן.'
          }
        }
      }
    },

    // Contact section
    contact: {
      title: 'בואו נבנה משהו עצום ביחד',
      subtitle: 'מוכן לשוחח על הפרויקט שלכם?',
      description:
        'אם אתה מחפש מפתח אמין ליצור או לשפר את האתר שלכם, אשמח לשמוע עוד על הפרויקט שלכם.',
      expectations: {
        title: 'מה לצפות',
        list1: 'שיחה ראשונית: הבנת הצרכים והמטרות שלכם',
        list2: 'מתווה ברור של הפרויקט: היקף מפורט, ציר זמן ותמחור',
        list3: 'תהליך השיתופי: עדכונים ומשוב קבועים לאורך כל תקופת הפיתוח'
      },
      details: {
        email: { label: 'אימייל', value: 'assaf@weavewebdesign.com' },
        response: { label: 'זמן תגובה', value: 'תוך 24 שעות' }
      },
      form: {
        title: 'צור קשר',
        fields: {
          name: {
            label: 'שם',
            placeholder: '',
            error: 'שם נדרש'
          },
          email: {
            label: 'אימייל',
            placeholder: '',
            error: 'אנא הזן כתובת אימייל תקינה'
          },
          company: {
            label: 'חברה',
            placeholder: '',
            error: 'חברה נדרשת'
          },
          phone: {
            label: 'טלפון',
            placeholder: '',
            error: 'טלפון נדרש'
          },
          projectType: {
            label: 'סוג הפרויקט',
            options: [
              'בחר סוג פרויקט',
              'אתר חדש',
              'עיצוב מחדש של אתר',
              'חנות מסחר אלקטרוני',
              'תחזוקה ותמיכה',
              'אחר'
            ]
          },
          message: {
            label: 'הודעה',
            placeholder:
              'ספר לנו על הפרויקט שלך, ציר הזמן וכל דרישה ספציפית...',
            error: 'הודעה נדרשת'
          }
        },
        submit: 'שלח הודעה',
        success: 'ההודעה נשלחה בהצלחה!',
        error: 'אירעה שגיאה בשליחת ההודעה. אנא נסה שוב.'
      }
    },

    // Thank You Page
    thankYou: {
      title: 'תודה שיצרת קשר!',
      message:
        'הודעתך נשלחה בהצלחה. אנו מעריכים שהקדשת מזמנך ליצור איתנו קשר ונחזור אליך בהקדם האפשרי, בדרך כלל תוך 24 שעות.',
      nextSteps: {
        title: 'מה קורה עכשיו?',
        step1: '<strong>עיון:</strong> נעיין בזהירות בהודעתך ובפרטי הפרויקט',
        step2: '<strong>מענה:</strong> תקבל תשובה מותאמת אישית תוך 24 שעות',
        step3: '<strong>דיון:</strong> נתזמן שיחה כדי לדון בפרויקט שלך לעומק'
      },
      returnHome: 'חזור לדף הבית',
      viewServices: 'צפה בשירותים שלנו',
      urgentMessage: 'צריך עזרה דחופה? שלח לנו אימייל ישירות ל'
    },

    // Legal Notice page
    legalNotice: {
      title: 'הודעה משפטית',
      backButton: 'חזרה לדף הבית',
      returnHome: 'חזרה לדף הבית',
      lastUpdated: 'עדכון אחרון: ינואר 2025',
      sections: {
        businessInfo: {
          title: 'פרטי העסק',
          content:
            '<strong>שם העסק:</strong> Weave Studio<br><strong>בעלים:</strong> אסף יחיאל<br><strong>אימייל:</strong> <a href="mailto:assaf@weavewebdesign.com">assaf@weavewebdesign.com</a>'
        },
        disclaimer: {
          title: 'כתב ויתור',
          content:
            'המידע המסופק באתר זה הוא למטרות מידע כלליות בלבד. למרות שאנו שואפים לשמור על המידע מעודכן ונכון, איננו מספקים מצגים או אחריות מכל סוג, מפורשים או משתמעים, לגבי השלמות, הדיוק, האמינות, ההתאמה או הזמינות ביחס לאתר או למידע, מוצרים, שירותים או גרפיקה קשורה הכלולים באתר לכל מטרה.'
        },
        liability: {
          title: 'הגבלת אחריות',
          content:
            'בשום מקרה לא נישא באחריות לכל אובדן או נזק, לרבות ללא הגבלה, נזק עקיף או תוצאתי, או כל אובדן או נזק הנובעים מאובדן נתונים או רווחים הנובעים מ, או בקשר עם, השימוש באתר זה.'
        },
        externalLinks: {
          title: 'קישורים חיצוניים',
          content:
            'דרך אתר זה ייתכן שתוכל לקשר לאתרים אחרים שאינם תחת שליטת Weave Studio. אין לנו שליטה על האופי, התוכן והזמינות של אותם אתרים. הכללת קישורים אינה בהכרח מרמזת על המלצה או אישור הדעות המובעות בהם.'
        },
        copyright: {
          title: 'הודעת זכויות יוצרים',
          content:
            'אתר זה ותוכנו הם בזכויות יוצרים של Weave Studio - © 2025. כל הזכויות שמורות. כל הפצה מחדש או שעתוק של חלק או כל התוכן בכל צורה אסורה מלבד הדברים הבאים: ניתן להדפיס או להוריד לדיסק קשיח מקומי קטעים לשימוש אישי ולא מסחרי בלבד.'
        },
        contact: {
          title: 'יצירת קשר',
          content:
            'אם יש לך שאלות לגבי הודעה משפטית זו, אנא צור איתנו קשר בכתובת <a href="mailto:assaf@weavewebdesign.com">assaf@weavewebdesign.com</a>'
        }
      }
    },

    // Footer
    footer: {
      logo: 'וויב סטודיו',
      tagline: 'וויב סטודיו. כאן בשבילכם.',
      description:
        'שירותי פיתוח אתרים מקצועיים היוצרים חוויות דיגיטליות מודרניות ובעלות ביצועים גבוהים.',
      sections: {
        services: {
          title: 'התחבר',
          links: ['אימייל', 'LinkedIn', 'Twitter', 'GitHub']
        },
        company: {
          title: 'חקור',
          links: [
            'אודות',
            'שירותים',
            'תיק עבודות',
            'בלוג',
            'שאלות נפוצות',
            'צור קשר'
          ]
        },
        connect: {
          title: 'התחבר',
          links: ['אימייל', 'LinkedIn', 'Twitter', 'GitHub']
        }
      },
      copyright: '© 2025 וויב סטודיו | כל הזכויות שמורות',
      legal: ['הודעה משפטית']
    },

    // Meta information
    meta: {
      title: 'וויב סטודיו - פיתוח אתרים מקצועי',
      description:
        'שירותי פיתוח אתרים מקצועיים היוצרים אתרים ואתרים מודרניים בעלי ביצועים גבוהים.',
      keywords:
        'פיתוח אתרים, עיצוב אתרים, מסחר אלקטרוני, עיצוב תגובתי, אופטימיזציית ביצועים',
      ogTitle: 'וויב סטודיו - ��יתוח אתרים מקצועי',
      ogDescription:
        'המר את העסק שלך עם אתרים מודרניים ובעלי ביצועים גבוהים. שירותי פיתוח אתרים מומחים.',
      twitterCard: 'summary_large_image'
    }
  }
}
