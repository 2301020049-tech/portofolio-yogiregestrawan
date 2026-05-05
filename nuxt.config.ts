// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // Components: auto-import tanpa folder prefix (ui/BeforeAfterSlider → <BeforeAfterSlider />)
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  // SSR enabled (default, but explicit)
  ssr: true,

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
  ],

  // CSS Design System Tokens
  css: ['~/assets/css/tokens.css'],

  // Color Mode: dark/light toggle, class-based (.dark)
  colorMode: {
    classSuffix: '',          // uses `.dark` not `.dark-mode`
    preference: 'system',     // default: ikuti OS
    fallback: 'light',
  },

  // Google Fonts
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
      'DM Serif Display': [400],
    },
    display: 'swap',
    preload: true,
  },

  // Nuxt Image provider default
  image: {
    quality: 85,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Nuxt Content (v3 — highlight config moved to shiki renderer)
  content: {},

  // App-level head defaults
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Portfolio',
      meta: [
        { name: 'description', content: 'My personal portfolio' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})