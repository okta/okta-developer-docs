'use strict'

const EventEmitter = require('events').EventEmitter
const os = require('os')
const webpack = require('webpack')
const readline = require('readline')
const { Worker } = require('worker_threads')

const {
  chalk,
  fs,
  path,
  logger,
  env,
  performance
} = require('@vuepress/shared-utils')
const createClientConfig = require('../webpack/createClientConfig')
const createServerConfig = require('../webpack/createServerConfig')
const { applyUserWebpackConfig } = require('../util/index')

// Each worker builds the SSR renderer once and then renders batches of pages
// until none are left, so the pool size is the real render parallelism.
const MAX_WORKER_THREADS = parseInt(process.env.BUILD_WORKER_THREADS, 10)
  || Math.max(1, Math.min(os.cpus().length - 1, 6));
const PAGES_PER_BATCH = 25;

/**
 * Expose Build Process Class.
 */

module.exports = class Build extends EventEmitter {
  constructor (context) {
    super()
    this.context = context;
    this.outDir = this.context.outDir;
    this.pagePaths = [];
  }

  /**
   * Doing somthing before render pages, e.g. validate and empty output directory,
   * prepare webpack config.
   *
   * @returns {Promise<void>}
   * @api public
   */

  async process () {
    if (this.context.cwd === this.outDir) {
      throw new Error(
        'Unexpected option: "outDir" cannot be set to the current working directory'
      )
    }

    this.context.resolveCacheLoaderOptions()
    await fs.emptyDir(this.outDir)
    logger.debug('Dist directory: ' + chalk.gray(this.outDir))
    this.prepareWebpackConfig()
  }

  /**
   * Compile and render pages.
   *
   * @returns {Promise<void>}
   * @api public
   */

  async render () {
    // compile!
    performance.start()
    const stats = await compile([this.clientConfig, this.serverConfig])

    // Read the manifests as raw strings: workers parse them once each, so there
    // is no need to parse and re-stringify them on the main thread.
    const serverBundle = await fs.readFile(
      path.resolve(this.outDir, 'manifest/server.json'),
      'utf-8'
    )
    const clientManifest = await fs.readFile(
      path.resolve(this.outDir, 'manifest/client.json'),
      'utf-8'
    )

    // remove manifests after loading them.
    await fs.remove(path.resolve(this.outDir, 'manifest'))

    // ref: https://github.com/vuejs/vuepress/issues/1367
    if (
      !this.clientConfig.devtool
      && (!this.clientConfig.plugins
        || !this.clientConfig.plugins.some(
          p =>
            p instanceof webpack.SourceMapDevToolPlugin
            || p instanceof webpack.EvalSourceMapDevToolPlugin
        ))
    ) {
      await workaroundEmptyStyleChunk(stats, this.outDir)
    }

    // if the user does not have a custom 404.md, generate the theme's default
    if (!this.context.pages.some(p => p.path === '/404.html')) {
      await this.context.addPage({ path: '/404.html' })
    }
    // render pages
    logger.wait('Rendering static HTML...')

    const pages = this.context.pages.map(p => ({
      path: p.path,
      frontmatter: JSON.stringify(p.frontmatter)
    }))
    const batches = []
    for (let i = 0; i < pages.length; i += PAGES_PER_BATCH) {
      batches.push(pages.slice(i, i + PAGES_PER_BATCH))
    }

    const init = {
      clientManifest,
      outDir: this.outDir,
      serverBundle,
      siteConfig: JSON.stringify(this.context.siteConfig),
      ssrTemplate: this.context.ssrTemplate,
      logLevel: logger.options.logLevel
    }

    const workerCount = Math.min(MAX_WORKER_THREADS, batches.length)
    logger.wait(`Rendering ${pages.length} pages with ${workerCount} worker threads...`)

    await Promise.all(
      Array.from({ length: workerCount }, (_, workerNumber) =>
        this.runWorker(workerNumber, init, batches)
      )
    )

    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0)
    const relativeDir = path.relative(this.context.cwd, this.outDir)
    const uniqPaths = new Set(this.pagePaths)
    logger.success(
      `Generated ${chalk.cyan(uniqPaths.size)} static files in ${chalk.cyan(relativeDir)}.`
    )

    await this.context.pluginAPI.applyAsyncOption('generated', this.pagePaths)

    const { duration } = performance.stop()
    logger.success(
      `It took a total of ${chalk.cyan(
        `${duration}ms`
      )} to run the ${chalk.cyan('vuepress build')}.`
    )
    console.log()
  }

  /**
   * Start a long-lived worker thread that pulls batches of pages off the
   * shared queue until it is empty. Resolves when the worker has exited
   * cleanly and rejects if any page fails to render.
   *
   * @param {Number} workerNumber
   * @param {Object} init payload used to build the renderer once per worker
   * @param {Array<Array<Object>>} batches shared queue of page batches
   * @returns {Promise<void>}
   */

  runWorker (workerNumber, init, batches) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.join(__dirname, './worker.js'))
      let failed = false

      const sendNextBatch = () => {
        const batch = batches.shift()
        if (batch) {
          worker.postMessage({ type: 'render', pages: batch })
        } else {
          worker.postMessage({ type: 'done' })
        }
      }

      worker.on('message', response => {
        if (response.message) {
          logger.wait(response.message)
        }
        if (response.type === 'ready') {
          sendNextBatch()
        } else if (response.type === 'rendered') {
          this.pagePaths.push(...response.filePaths)
          sendNextBatch()
        }
      })

      worker.on('error', error => {
        failed = true
        logger.error(chalk.red(
          `Worker #${workerNumber} sent error: ${error}\n\n${error.stack}`
        ))
        reject(error)
      })

      worker.on('exit', code => {
        if (code === 0 && !failed) {
          logger.success(`Worker ${workerNumber} completed successfully.`)
          resolve()
        } else {
          const error = new Error(`Worker #${workerNumber} sent exit code: ${code}`)
          logger.error(chalk.red(error.message))
          reject(error)
        }
      })

      worker.postMessage({ type: 'init', workerNumber, ...init })
    })
  }

  /**
   * Prepare webpack config under build.
   *
   * @api private
   */

  prepareWebpackConfig () {
    this.clientConfig = createClientConfig(this.context).toConfig()
    this.serverConfig = createServerConfig(this.context).toConfig()

    const userConfig = this.context.siteConfig.configureWebpack
    if (userConfig) {
      this.clientConfig = applyUserWebpackConfig(
        userConfig,
        this.clientConfig,
        false
      )
      this.serverConfig = applyUserWebpackConfig(
        userConfig,
        this.serverConfig,
        true
      )
    }
  }
}

/**
 * Compile a webpack application and return stats json.
 *
 * @param {Object} config
 * @returns {Promise<Object>}
 */

function compile (config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        return reject(err)
      }
      if (stats.hasErrors()) {
        stats.toJson().errors.forEach(err => {
          console.error(err)
        })
        reject(new Error(`Failed to compile with errors.`))
        return
      }
      if (env.isDebug && stats.hasWarnings()) {
        stats.toJson().warnings.forEach(warning => {
          console.warn(warning)
        })
      }
      resolve(stats.toJson({ modules: false }))
    })
  })
}

/**
 * find and remove empty style chunk caused by
 * https://github.com/webpack-contrib/mini-css-extract-plugin/issues/85
 * TODO remove when it's fixed
 *
 * @param {Object} stats
 * @param {String} outDir
 * @returns {Promise<void>}
 */

async function workaroundEmptyStyleChunk (stats, outDir) {
  const styleChunk = stats.children[0].assets.find(a => {
    return /styles\.\w{8}\.js$/.test(a.name)
  })
  if (!styleChunk) return
  const styleChunkPath = path.resolve(outDir, styleChunk.name)
  const styleChunkContent = await fs.readFile(styleChunkPath, 'utf-8')
  await fs.remove(styleChunkPath)
  // prepend it to app.js.
  // this is necessary for the webpack runtime to work properly.
  const appChunk = stats.children[0].assets.find(a => {
    return /app\.\w{8}\.js$/.test(a.name)
  })
  const appChunkPath = path.resolve(outDir, appChunk.name)
  const appChunkContent = await fs.readFile(appChunkPath, 'utf-8')
  await fs.writeFile(appChunkPath, styleChunkContent + appChunkContent)
}