module.exports = ( options, ctx) => {
  const { themeConfig, siteConfig } = ctx
  return {
    plugins: [
      ['@vuepress/last-updated', {
        transformer: (timestamp, lang) => {
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).format('LL')
        }
      }]
    ],
    extendPageData ($page) {
      $page.fullHeaders = resolveHeaders($page);
    }
  }
}

function resolveHeaders (page) {
  const headers = groupHeaders(page.headers || [], 5);
  return [{
    type: 'group',
    collapsable: false,
    title: page.title,
    path: null,
    children: headers.map(h => ({
      type: 'auto',
      title: h.title,
      basePath: page.path,
      path: page.path + '#' + h.slug,
      children: h.children || []
    }))
  }]
}

function groupHeaders(headers, headerLevel) {
  var headersCopy = headers.map(h => Object.assign({}, h))
  let lastHeaderOfContainingLevel
  headersCopy.forEach(h => {
    if (h.level === headerLevel - 1) {
      lastHeaderOfContainingLevel = h
    } else if (lastHeaderOfContainingLevel && h.level === headerLevel) {
      (lastHeaderOfContainingLevel.children || (lastHeaderOfContainingLevel.children = [])).push(h)
    }
  })

  if (headerLevel === 2) {
    return headers;
  }

  return groupHeaders(headersCopy.filter(h => h.level !== headerLevel), headerLevel - 1);
}

