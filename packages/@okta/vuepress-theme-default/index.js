// Theme API.
module.exports = (options, ctx) => ({
  plugins: [
    ['@okta/vuepress-plugin-active-header-links', {
      headerTopOffset: 120
    }]
  ]
})
