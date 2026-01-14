// vite.config.mjs - Vite Build Configuration (ES Modules)
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  publicDir: '../public',

  server: {
    port: 3000,
    open: true,
    proxy: {
      // Proxy API requests to 11ty dev server
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/assets/js/main.js')
      },
      output: {
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: assetInfo => {
          if (/\.(css)$/.test(assetInfo.name)) {
            return 'assets/css/[name].[hash].[ext]'
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return 'assets/images/[name].[hash].[ext]'
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name].[hash].[ext]'
          }

          return 'assets/[name].[hash].[ext]'
        }
      }
    },

    // Optimization settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },

    // CSS optimization
    cssCodeSplit: false,

    // Asset optimization
    assetsInlineLimit: 4096 // 4kb
  },

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['markdown-it', 'markdown-it-attrs']
  },

  // Define environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },

  // Asset handling
  assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf'],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/_includes/components'),
      '@layouts': resolve(__dirname, 'src/_includes/layouts')
    }
  }
})
