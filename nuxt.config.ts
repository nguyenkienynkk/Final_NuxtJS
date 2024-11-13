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
    devtools: { enabled: true },
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
})
