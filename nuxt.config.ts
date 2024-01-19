import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // exp
  experimental: {
    localLayerAliases: true,
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // typescripts
  // todo: feat/strict-type-check
  // typescript: {
  //   strict: true,
  //   typeCheck: true,
  // },

  // modules
  modules: [
    // chore
    '@nuxtjs/eslint-module',
    // styling & ui
    // '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-icon',
    // '@nuxtjs/color-mode',
    // management
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/strapi',
    // contents,
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    [
      'nuxt-swiper',
      {
        // prefix: 'Swiper',
        // styleLang: 'css',
        // modules: ['navigation', 'pagination'], // all modules are imported by default
      },
    ],
    'nuxt-split-type',
    '@samk-dev/nuxt-vcalendar',
    '@vite-pwa/nuxt',
    [
      'nuxt-swiper',
      {
        // Swiper options
      },
    ],
  ],

  css: [
    resolve('./assets/scss/_variables.scss'),
    resolve('./assets/scss/app.scss'),
    resolve('./assets/scss/utils.scss'),
  ],

  components: [
    {
      prefix: 'Layout',
      path: resolve('./components/layouts'),
      global: true,
    },
    {
      prefix: 'Awesome',
      path: resolve('./components/awesome'),
      global: true,
    },
    {
      prefix: 'Mall',
      path: resolve('./components/mall'),
      global: true,
    },
    {
      prefix: 'Widget',
      path: resolve('./components/widget'),
      global: true,
    },
  ],

  imports: {
    dirs: [resolve('./stores'), '~/stores', '~/utils'],
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Nichiei Service',
      short_name: 'NichieiServices',
      description: 'description',
      start_url: '/',
      lang: 'ja',
      display_override: ['fullscreen', 'minimal-ui'],
      display: 'standalone',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icon-48x48.png',
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: 'icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: 'icon-128x128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: 'icon-284x284.png',
          sizes: '284x284',
          type: 'image/png',
        },
        {
          src: 'icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          // purpose: 'any maskable',
        },
      ],
    },
    // screenshots: [
    //   {
    //     src: '/images/screen540720.png',
    //     type: 'image/png',
    //     sizes: '540x720',
    //     form_factor: 'narrow',
    //   },
    //   {
    //     src: '/images/screen720540.jpg',
    //     type: 'image/jpg',
    //     sizes: '720x540',
    //     form_factor: 'wide',
    //   },
    // ],
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: ({ url }) => {
            return url.pathname.startsWith('/api/users/me')
          },
          handler: 'CacheFirst' as const,
          options: {
            cacheName: 'wavus-api-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
  i18n: {
    locales: [
      {
        code: 'ja',
        file: 'ja.json',
        name: 'Japanese',
      },
      {
        code: 'zh',
        file: 'zh.json',
        name: 'Chinese',
      },
    ],
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    defaultLocale: 'zh',
    // vueI18n: './i18n.config.ts', // if you are using custom path, default
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },
  strapi: {
    devtools: true,
    url: 'https://strapi.nichiei.services',
    prefix: '/api',
    version: 'v4',
    cookie: {},
    auth: {
      populate: [
        'client',
        'driver',
        'driver.drivership',
        'driver.wechat',
        'driver.driver_license',
        'profile',
        'profile.avatar',
        'role',
      ],
    },
    cookieName: 'strapi_jwt',
  },
  // module::pinia
  pinia: {
    storesDirs: ['~/stores/**', '#/stores/**', '@/stores/**'],
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage',
  },
  // module::headlessui
  headlessui: {
    prefix: 'Headless',
  },

  // module::color-mode
  colorMode: {
    classSuffix: '',
    preference: 'light',
  },

  // module::content
  content: {
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: 'github-dark',
    },
  },
})
