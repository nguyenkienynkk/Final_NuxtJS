// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
      '/signup': {ssr: false},
      '/login': {ssr: false},
      '/products': {ssr: true},
      '/cart': {ssr: false, auth: true},
      '/checkout': {ssr: false, auth: true},
      '/order': {ssr: false, auth: true},
      '/profile': {ssr: false, auth: true}
  },

  devtools: {enabled: true},
  css: ['~/main.css'],

  postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
  },

  buildModules: [
      '@nuxt/image',
  ],

  toast: {
      position: 'top-center',
      duration: 5000,
      keepOnHover: true,
      theme: 'bubble',
      closeOnSwipe: true,
      singleton: true,
      register: [
          {
              name: 'my-error',
              message: 'Oops...Something went wrong',
              options: {
                  type: 'error'
              }
          },
          {
              name: 'my-success',
              message: 'Action completed successfully',
              options: {
                  type: 'success',
                  duration: 3000
              }
          }
      ]
  },

  compatibilityDate: '2024-11-14'
})