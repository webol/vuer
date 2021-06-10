export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - outline-nuxt',
    title: 'outline-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/socket-io.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
  ],
  
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://druxtjs.org/
    'druxt',
    'druxt-entity',
    'druxt-menu',
    'druxt-schema',
  ],

  apollo: {
    tokenName: 'nuxt-apollo', // specify token name
    cookieAttributes: {
      expires: 7, // optional, default: 7 (days)
    },
    defaultOptions: {
      $query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
    watchLoading: '@/apollo/loadingHandler.js',
    errorHandler: '@/apollo/errorHandler.js',
    clientConfigs: {
      default: {
        httpEndpoint: 'http://drupal-outline.lndo.site/outline-graphql',
      },
    },
  },

  druxt: {
    baseUrl: 'http://drupal-outline.lndo.site/',
    schema: {
      filter: ['node--.*?--view'],
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    optionsPath: '@/plugins/vuetify.js',
    treeShake: true,
  },
}
