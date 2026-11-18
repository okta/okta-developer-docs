const { parentPort } = require('worker_threads')
const escape = require('escape-html')
const { fs, path, logger } = require('@vuepress/shared-utils')
const { createBundleRenderer } = require('vue-server-renderer')
const { normalizeHeadTag } = require('../util/index')
const { version } = require('../../../package')

/**
 * Worker file for HTML page rendering
 *
 * Protocol (messages from the main thread):
 *   { type: 'init', ... }    build the renderer once, reply { type: 'ready' }
 *   { type: 'render', pages } render a batch, reply { type: 'rendered', filePaths }
 *   { type: 'done' }          exit
 *
 * @api private
 */

let workerNumber
let outDir
let renderer
let userHeadTags

parentPort.on('message', async payload => {
  try {
    if (payload.type === 'init') {
      await init(payload)
      parentPort.postMessage({ type: 'ready' })
    } else if (payload.type === 'render') {
      const filePaths = await renderPages(payload.pages)
      parentPort.postMessage({
        type: 'rendered',
        message: `Worker #${workerNumber} has rendered ${filePaths.length} of ${payload.pages.length} pages`,
        filePaths
      })
    } else if (payload.type === 'done') {
      parentPort.close()
    }
  } catch (e) {
    // Surface the failure to the main thread as a worker 'error' event.
    setImmediate(() => { throw e })
  }
})

async function init (payload) {
  logger.setOptions({ logLevel: payload.logLevel })
  workerNumber = payload.workerNumber
  outDir = payload.outDir
  const siteConfig = JSON.parse(payload.siteConfig)

  // create server renderer using built manifests
  renderer = createBundleRenderer(JSON.parse(payload.serverBundle), {
    clientManifest: JSON.parse(payload.clientManifest),
    runInNewContext: false,
    inject: false,
    shouldPrefetch: siteConfig.shouldPrefetch || (() => false),
    template: await fs.readFile(payload.ssrTemplate, 'utf-8')
  })

  // pre-render head tags from user config
  userHeadTags = (siteConfig.head || []).map(renderHeadTag).join('\n  ')
}

async function renderPages (pages) {
  const filePaths = []

  for (const page of pages) {
    const pagePath = decodeURIComponent(page.path)

    // #565 Avoid duplicate description meta at SSR.
    const meta = ((page.frontmatter && page.frontmatter.meta) || []).filter(
      item => item.name !== 'description'
    )
    const pageMeta = renderPageMeta(meta)

    const context = {
      url: page.path,
      userHeadTags: userHeadTags,
      pageMeta,
      title: 'VuePress',
      lang: 'en',
      description: '',
      version
    }

    let html
    try {
      html = await renderer.renderToString(context)
    } catch (e) {
      logger.error(
        `Worker #${workerNumber} error rendering ${pagePath}`
      )
      throw e
    }

    const filename = pagePath
        .replace(/\/$/, '/index.html')
        .replace(/^\//, '')
    const filePath = path.resolve(outDir, filename)
    await fs.ensureDir(path.dirname(filePath))

    await fs.writeFile(filePath, html)
    filePaths.push(filePath)
  }

  return filePaths
}

/**
 * Render html attributes
 *
 * @param {Object} attrs
 * @returns {string}
 */

function renderAttrs (attrs = {}) {
  const keys = Object.keys(attrs)
  if (keys.length) {
    return ' ' + keys.map(name => `${name}="${escape(attrs[name])}"`).join(' ')
  } else {
    return ''
  }
}

/**
 * Render head tag
 *
 * @param {Object} tag
 * @returns {string}
 */

function renderHeadTag (tag) {
  const { tagName, attributes, innerHTML, closeTag } = normalizeHeadTag(tag)
  return `<${tagName}${renderAttrs(attributes)}>${innerHTML}${
    closeTag ? `</${tagName}>` : ``
  }`
}

/**
 * Render meta tags
 *
 * @param {Array} meta
 * @returns {Array<string>}
 */

function renderPageMeta (meta) {
  if (!meta) return ''
  return meta
    .map(m => {
      let res = `<meta`
      Object.keys(m).forEach(key => {
        res += ` ${key}="${escape(m[key])}"`
      })
      return res + `>`
    })
    .join('')
}
