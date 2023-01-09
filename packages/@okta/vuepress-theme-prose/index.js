module.exports = (options, ctx) => {
  const { themeConfig, siteConfig } = ctx;
  return {
    plugins: [
      [
        "@vuepress/last-updated",
        {
          transformer: (timestamp, lang) => {
            const { DateTime } = require('luxon');
            return DateTime.fromMillis(timestamp).setLocale(lang).toLocaleString(DateTime.DATE_FULL);
          }
        }
      ]
    ],
    extendPageData($page) {
      $page.fullHeaders = resolveHeaders($page);
    }
  };
};

function resolveHeaders(page) {
  const headers = groupHeaders(page.headers || []);
  return [
    {
      type: "group",
      collapsable: false,
      title: page.title,
      path: null,
      children: headers.map(h => ({
        type: "auto",
        title: h.title,
        basePath: page.path,
        path: page.path + "#" + h.slug,
        children: h.children || []
      }))
    }
  ];
}

function groupHeaders(headers) {
  // group h3s under h2
  headers = headers.map(h => Object.assign({}, h));
  let lastH2;
  headers.forEach(h => {
    if (h.level === 2) {
      lastH2 = h;
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h);
    }
  });
  return headers.filter(h => h.level === 2);
}
