const webpack = require('webpack')
module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/Side-Project__Backend-firebase/'
      : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
           @import "@/assets/scss/main.scss";
        `,
      },
    },
  },

  chainWebpack: (config) => {
    config.plugin('provide').use(webpack.ProvidePlugin, [
      {
        'window.Quill': 'quill/dist/quill.js',
        Quill: 'quill/dist/quill.js',
      },
    ])
  },
}
