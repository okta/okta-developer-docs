const fs = require('fs');
const { extractHeaders } = require('@vuepress/shared-utils')
const createMarkdown = require('@vuepress/markdown')

const removeFrontMatterFrom = text => text.replace(/^---(.|\n|\r)*---$/mg, '');
const getMarkdownContentFor = path => removeFrontMatterFrom(fs.readFileSync(path, { encoding: 'utf8' }));
const getHeadersFor = folderPath => extractHeaders(getMarkdownContentFor(`${folderPath}/index.md`), ['h2', 'h3'], createMarkdown({}));

const PATH_LIKE = '(?:([^\/]*)\/?)';
const GUIDE_FRAGMENTS = '/docs/guides/';
const DEFAULT_FRAMEWORK = '-'; 
const DEFAULT_SECTION = '';
const GUIDE_ROOT = 'docs/guides';
const guideFromPath = path => {
  let guideName;
  let framework;
  let sectionName;
  [, guideName, sectionName ] = path.match(`${GUIDE_FRAGMENTS}${PATH_LIKE}${PATH_LIKE}$`) || [];
  if( !sectionName ) { 
    [, guideName, framework, sectionName ] = path.match(`${GUIDE_FRAGMENTS}${PATH_LIKE}${PATH_LIKE}${PATH_LIKE}`) || [];
  }
  framework = framework === DEFAULT_FRAMEWORK ? '' : framework; // Drop useless default
  sectionName = sectionName || DEFAULT_SECTION; // default is useable here
  return { guideName, framework, sectionName };
};

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
  let toGroup = page.headers;
  if(!toGroup) {
    let extracted = []
    if(page._content && page._content.trim() != ''){
      extracted = extractHeaders(page._content, ['h2', 'h3'], createMarkdown({}));
    } else if (page.path.includes(GUIDE_FRAGMENTS)) {
      const meta = guideFromPath(page.path);
      const folderPath = `${page._context.sourceDir}/${GUIDE_ROOT}/${meta.guideName}/${meta.sectionName}`
      // console.debug(`Extracting headers for: ${folderPath}`);
      extracted = getHeadersFor(folderPath);
    }
    page.headers = extracted;
    toGroup = extracted || []
  }
  const headers = groupHeaders(toGroup)
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

function groupHeaders (headers) {
  // group h3s under h2
  headers = headers.map(h => Object.assign({}, h))
  let lastH2
  headers.forEach(h => {
    if (h.level === 2) {
      lastH2 = h
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h)
    }
  })
  return headers.filter(h => h.level === 2)
}