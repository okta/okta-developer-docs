const { path } = require('@vuepress/shared-utils')

module.exports = (options) => ({
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
  define: {
    AHL_SIDEBAR_LINK_SELECTOR: options.sidebarLinkSelector || '.sidebar-link',
    AHL_HEADER_ANCHOR_SELECTOR: options.headerAnchorSelector || '.header-anchor',
    AHL_HEADER_TOP_OFFSET: options.headerTopOffset || 90
  }
})
