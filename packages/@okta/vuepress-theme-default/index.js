const moment = require('moment')
// Theme API.
module.exports = (options, ctx) => ({
  plugins: [
    ['@okta/vuepress-plugin-active-header-links', {
      headerTopOffset: 120
    }],
    ['@vuepress/last-updated', {
      transformer: (timestamp, lang) => {
        const moment = require('moment')
        moment.locale(lang)
        return moment(timestamp).format('LL')
      }
    }]
  ]
})
