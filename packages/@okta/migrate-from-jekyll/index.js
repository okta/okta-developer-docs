const {applyRules} = require('./rules');

const {resolveFinalFileDestination} = require("./utils/fileDestination");
const {parseFile} =  require("./utils/parseFile");

const fs = require('fs-extra');
const chalk = require('chalk');
const { execSync } = require('child_process')
const matter  = require('gray-matter')
const { parseFrontmatterRedirects } = require('./utils/buildRedirects')

const rootPath = 'okta.github.io';
const docsRoot = '../vuepress-site';
const themeRoot = '../vuepress-theme-default'

const cleanupFileList = [
  '.github',
  'scripts',
  '.gitignore',
  '.nojekyll',
  '.nvmrc',
  '.ruby-gemset',
  '.ruby-version',
  '.travis.yml',
  '_config.yml',
  'Gemfile',
  'Gemfile.lock',
  'package.json',
  'package-lock.json',
  'README.md',

];

// define which files can be processed
const whitelist = [
  'okta.github.io/_source/_3rd_party_notices',
  'okta.github.io/_source/_authentication-guide',
  'okta.github.io/_source/_assets',
  'okta.github.io/_source/_change-log',
  'okta.github.io/_source/_code',
  'okta.github.io/_source/_data',
  'okta.github.io/_source/_docs',
  'okta.github.io/_source/_reference',
  'okta.github.io/_source/_sdk',
  'okta.github.io/_source/_standards',
  'okta.github.io/_source/_use_cases',
  'okta.github.io/_source/books',
  'okta.github.io/_source/test_page',
  'okta.github.io/_source/quickstart-fragments'
];

// define which files can not be processed
const blacklist = [
  'okta.github.io/_source/_includes',
  'okta.github.io/_source/_layouts',
  'okta.github.io/_source/_plugins',
  'okta.github.io/_source/_posts',
  'okta.github.io/_source/.nojekyll',
  'okta.github.io/_source/conductor.yml',
  'okta.github.io/_source/feed.xml',
  'okta.github.io/_source/feed-edgar.xml',
  'okta.github.io/_source/feed-full.xml',
  'okta.github.io/_source/google',
  'okta.github.io/_source/index.html',
  'okta.github.io/_source/sitemap.xml',
  'okta.github.io/_source/_docs/api/getting_started/enabling_cors.md',
  'okta.github.io/_source/_docs/api/resources/event-types.md'
];

function cloneRepo(gitRepo) {
  // console.log(`${chalk.bold.red("Cloning the repo")}`)
  execSync(`git clone ${gitRepo}`);
}

function cleanupFiles() {

  deleteRecursive = function(path) {
    if( fs.existsSync(rootPath + '/' + path) ) {
      if( fs.lstatSync(rootPath + '/' + path).isFile() ) {
        return fs.unlinkSync(rootPath + '/' + path)
      }
      fs.readdirSync(rootPath + '/' + path).forEach((file, index) => {
        let currentPath = rootPath + '/' + path + '/' + file
        if( fs.lstatSync(currentPath).isDirectory() ) {
          return deleteRecursive(currentPath)
        }
      })
        fs.rmdirSync(rootPath + '/' + path)
    }
  }

  cleanupFileList.forEach(path => {
    // deleteRecursive(path)
    fs.remove(rootPath + '/' + path)
  })
}

function processFile(filePath) {
  // console.log(`${chalk.bold.yellow("Processing File: " + filePath)}`)

  let fileData = parseFile(fs.readFileSync(filePath, 'utf8'), filePath)

  return fileData
}

function createDestinationPath(finalPath) {
  let pathParts = finalPath.split('/')
  pathParts.pop()

  fs.ensureDirSync(pathParts.join('/'))

}

function buildFile(file) {
  return matter.stringify(file.bodyLines.join('\n'), file.frontmatter)
}

function run() {
  // console.log(`${chalk.bold.green("Migrating from okta.github.io source repo.")}\n`)
  execSync(`rm -rf okta.github.io`);
  cloneRepo('https://github.com/okta/okta.github.io.git')
  cleanupFiles()

  let getFiles = (directory, filelist) => {
    let files = fs.readdirSync(directory);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(directory + '/' + file).isDirectory()) {
        return getFiles(directory + '/' + file, filelist)
      }

      filelist.push(directory + '/' + file)
    });

    return filelist;
  }

  let allFiles = getFiles('okta.github.io/_source')
  let massagedFiles = []

  // console.log(`${chalk.bold.green("Processing Files...")}`)
  allFiles.forEach(filePath => {
    // Do Not Process files listed in blacklist
    if( new RegExp(blacklist.join("|")).test(filePath) ) {
      return
    }

    if( whitelist.length >= 0 ) {
      whitelist.forEach(whitelistFilePath => {
        if( filePath.startsWith(whitelistFilePath)) {
          massagedFiles.push(processFile(filePath))
        }
      })
    }

    // Process all files if whitelist is empty or `*`
    if( whitelist.length === 0 || whitelist.indexOf('*') > -1) {
      massagedFiles.push(processFile(filePath))
    }



  })

  let redirects = []

  redirects.push({path: '/code', redirect: '/documentation/'})
  redirects.push({path: '/use_cases/api_security', redirect: '/use_cases/api_access_management/'})

  massagedFiles.forEach((file, index) => {
    if( file.origPath.includes('_assets/img/blog') ) {
      return
    }

    file = applyRules(file)

    // console.log(file)
    let fileData = buildFile(file);
    let rootPath = docsRoot

    if(file.origPath.includes('_assets/')) {
      rootPath = themeRoot
      if(file.origPath.includes('_assets/img/')) {
        rootPath = docsRoot+'/.vuepress/public/'
      }

    }

    if(file.origPath.includes('books/') && file.origPath.includes('images')) {
        rootPath = docsRoot+'/.vuepress/public/assets/img/'
    }

    if (file.origPath.includes('_change-log')) {
      rootPath = docsRoot+'/docs/'
    }


    file['finalPath'] = resolveFinalFileDestination(file, rootPath)

    let fileRedirects = parseFrontmatterRedirects(file)
    fileRedirects.forEach(redirect => {
      redirects.push(redirect)
    })

    createDestinationPath(file.finalPath)

    if(new RegExp(['.md','.scss'].join("|")).test(file.origPath)) {
      fs.writeFileSync(file.finalPath, fileData)
    } else {
      fs.copySync(file.origPath, file.finalPath)
    }

  })

  // Needed for redirects, but no longer need
  fs.remove(docsRoot+'/docs/platform-release-notes')


  fs.writeFileSync(docsRoot+'/.vuepress/redirects.json', JSON.stringify(redirects, null, 2))
}

run()
