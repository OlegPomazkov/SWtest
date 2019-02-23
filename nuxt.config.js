const path = require('path')

module.exports = {
  mode: 'spa',
  modules: [
    '@nuxtjs/axios',
  ],

  plugins: [
    '~/plugins/axios',
    '~plugins/element-ui.js'
  ],

  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  
  axios: {
    // proxyHeaders: false
  }


  // mode: 'spa',
  // head: {
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //   ],
  //   link: [
  //     { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  //   ]
  // },
  // plugins: [
  //   '~plugins/axios',
  //   '~lang',
  //   '~plugins/element-ui',
  //   '~plugins/moment',
  //   '~plugins/vuetrend',
  //   '~icons',
  //   '~plugins/nuxt-init',
  //   '~plugins/yandex-map'
  // ],

  // css: [
  //   { src: 'normalize.css/normalize.css', lang: 'css' },
  //   { src: 'element-ui/lib/theme-chalk/index.css', lang: 'css' },
  //   { src: '~/assets/styles/index.styl', lang: 'stylus' },
  //   { src: '~/assets/css/buttons.css', lang: 'css' }
  // ],
  // loading: { color: '#f86e00' }, // $primary from assets/styles/variables.styl
  // modules: [

  //   ['~/modules/backend', {
  //     baseURL: "http://ci.igtel.ru:8081"
  //   }]
  // ],
  // router: {
  //   middleware: ['auth']
  // },
  // build: {
  //   /*
  //   ** Run ESLint on save
  //   */
  //   extend (config, { isDev, isClient }) {
  //     if (isDev && isClient) {
  //       config.module.rules.push({
  //         enforce: 'pre',
  //         test: /\.(js|vue)$/,
  //         loader: 'eslint-loader',
  //         exclude: /(node_modules)/
  //       })
  //     }
  //   },



  //   // https://github.com/nuxt/nuxt.js/issues/1584
  //   extend (config, ctx) {

  //     config.module.rules.push({
  //       test: /\.(ico)$/,
  //       loader: 'url-loader',
  //     })

  //     // Excludes /assets/svg from url-loader
  //     const urlLoader = config.module.rules.find((rule) => rule.loader === 'url-loader')
  //     urlLoader.exclude = path.resolve(__dirname, 'icons/', 'svg/')

  //     // Includes /icons/svg for svg-sprite-loader
  //     config.module.rules.push({
  //       test: /\.svg$/,
  //       include: [
  //         path.resolve(__dirname, 'icons/', 'svg/')
  //         // /(icons\/svg)/
  //       ],
  //       options: {
  //         symbolId: 'icon-[name]'
  //       },
  //       loader: 'svg-sprite-loader'
  //     })
  //   }
  // }
}
