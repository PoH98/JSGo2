// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass'],
    build: {
      transpile: ['vuetify'],
    },
    vite: {
      define: {
        'process.env.DEBUG': false,
      },
    },
    modules:[
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
    ],
    appConfig:{
      apiUrl:'https://gal-xe.skimnerphi.net'
    }
})
