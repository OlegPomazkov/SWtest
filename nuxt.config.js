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

  loading: { color: '#f86e00' }, // $primary from assets/styles/variables.styl

  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  
  axios: {
    // proxyHeaders: false
  }
}
