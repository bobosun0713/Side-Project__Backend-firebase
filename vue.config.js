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
}
