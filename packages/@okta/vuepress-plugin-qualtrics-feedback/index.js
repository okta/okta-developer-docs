const { path } = require('@vuepress/shared-utils')
module.exports = (options, context) => ({
    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
})
