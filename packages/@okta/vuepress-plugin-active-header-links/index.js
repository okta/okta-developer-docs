const { path, extractHeaders } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
  define: {
    AHL_SIDEBAR_LINK_SELECTOR: options.sidebarLinkSelector || '.sidebar-link',
    AHL_HEADER_ANCHOR_SELECTOR: options.headerAnchorSelector || '.header-anchor',
    AHL_HEADER_TOP_OFFSET: options.headerTopOffset || 90
  },
  extendPageData ($page) {
    $page.fullHeaders = extractHeaders(
      $page._strippedContent,
      ['h2', 'h3', 'h4'],
      context.markdown
    )
  }
})
