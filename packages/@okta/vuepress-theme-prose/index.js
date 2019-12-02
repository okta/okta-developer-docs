module.exports = (options, ctx) => ({
  plugins: [
    ['@vuepress/last-updated', {
      transformer: (timestamp, lang) => {
        const moment = require('moment')
        moment.locale(lang)
        return moment(timestamp).format('LL')
      }
    }]
  ]
});