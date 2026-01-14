/**
 * Lazy loading functionality using IntersectionObserver
 * Loads images below the fold on demand
 */

export function initLazyLoading() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver not supported, loading all images immediately')
    loadAllImages()
    return
  }

  // Get all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]')

  if (lazyImages.length === 0) {
    return
  }

  // Create Intersection Observer with options
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target

        // Load the image
        const src = img.getAttribute('data-src')
        const srcset = img.getAttribute('data-srcset')

        // Wait for image to actually load before showing it
        img.onload = () => {
          img.classList.add('lazy-loaded')
        }

        img.onerror = () => {
          // If image fails to load, still remove loading state
          img.classList.add('lazy-loaded')
          console.warn('Failed to load image:', src)
        }

        if (src) {
          img.src = src
        }
        if (srcset) {
          img.srcset = srcset
        }

        // Remove data-src to prevent reloading
        img.removeAttribute('data-src')
        img.removeAttribute('data-srcset')

        // Stop observing this image
        observer.unobserve(img)
      }
    })
  }, {
    rootMargin: '200px' // Start loading 200px before entering viewport
  })

  // Observe all lazy images
  lazyImages.forEach((img) => {
    img.classList.add('lazy-loading')
    imageObserver.observe(img)
  })
}

/**
 * Fallback function for browsers without IntersectionObserver support
 */
function loadAllImages() {
  const lazyImages = document.querySelectorAll('img[data-src]')

  lazyImages.forEach((img) => {
    const src = img.getAttribute('data-src')
    const srcset = img.getAttribute('data-srcset')

    if (src) {
      img.src = src
    }
    if (srcset) {
      img.srcset = srcset
    }

    img.classList.add('lazy-loaded')
    img.removeAttribute('data-src')
    img.removeAttribute('data-srcset')
  })
}
