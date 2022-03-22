import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    modules: [
        // https://druxtjs.org/
        'druxt',
    ],
    buildModules: [
        '@nuxtjs/apollo',
        '@nuxtjs/vuetify',
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
                httpEndpoint: 'http://vuerjs.org/graphql-test-endpoint',
            },
        },
    },
})
