<img src="https://aws1.discourse-cdn.com/standard14/uploads/oktadev/original/1X/0c6402653dfb70edc661d4976a43a46f33e5e919.png" align="right" width="256px"/>

[![Support](https://img.shields.io/badge/support-developer%20forum-blue.svg)](https://devforum.okta.com/)
[![Build Status](https://travis-ci.org/okta/okta-developer-docs.svg?branch=master)](https://travis-ci.org/okta/okta-developer-docs)

# Okta Developer Site

The [Okta developer site](https://developer.okta.com) serves Okta's API documentation and guides, including:

- [API references](https://developer.okta.com/docs/reference/)
- [SDK references and sample code](https://developer.okta.com/documentation/)
- [Authentication quickstarts](https://developer.okta.com/quickstart/)
- [Guides](https://developer.okta.com/guides/)
- [Developer Blog](https://developer.okta.com/blog/) (not published from this repo, see [okta/okta.github.io](https://github.com/okta/okta.github.io))

## Getting Started

Okta's developer documentation (this repo) is built using the [VuePress](https://vuepress.vuejs.org/) site generator.
There are currently 2 parts to the site, the content and the theming/plugins.

### Requirements

- [Node](https://nodejs.org/en/download/): 8+
- [Yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable): 1.15+

We recommend using one of the package manager options for installation as specified in the installation sites.

If you want to run `yarn build`, you must have a node version of 13+

Before getting started, open a terminal window and make sure these commands work:

```sh
node --version

yarn --version
```

### Local setup

1. Depending on your permissions, clone or fork the repo (if you fork the repo, be sure to [Allow edits from maintainers](https://help.github.com/en/articles/allowing-changes-to-a-pull-request-branch-created-from-a-fork)).
2. Install the dependencies with `yarn`:

```sh
cd okta-developer-docs

yarn install
```

This will install everything you need to build the documentation on your machine.

### Previewing the site

With the above steps completed, you can start a preview server by running this command inside the cloned directory:

```sh
yarn dev
```

This starts a preview server on your machine, and watches all files for changes. Open <http://localhost:8080/docs/> to view the documentation.

 > Note: if you try to visit the root, you will get a 404 page.  You must visit a path corresponding to a [directory under `vuepress-site`](https://github.com/okta/okta-developer-docs/tree/master/packages/%40okta/vuepress-site), like `/docs/`.

The preview server supports hot reloading. Once the server is running on your machine, any changes you make to Markdown content will appear automatically in your browser within a few seconds. Note that changes to page frontmatter or site configuration require you to stop and start the preview server.

## Troubleshooting 

If you are on a Windows machine you may experience the following issues.

### EOL Error
Because Windows handles line endings differently than *nix operating systems, you may see the following error after running `yarn dev`:

```
yarn run v1.22.4
$ yarn workspace @okta/vuepress-site dev
$ yarn conductor:validate && vuepress dev .
$ node .vuepress/scripts/yml-parse-check.js
conductor.yml parse successful
conductor.yml exports correct values
Error: Error: conductor.yml must end in a new (but not blank) line
    at Object.<anonymous> (C:\src\repos\okta-developer-docs\packages\@okta\vuepress-site\.vuepress\scripts\yml-parse-ch
eck.js:68:11)
    at Module._compile (internal/modules/cjs/loader.js:1133:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1153:10)
    at Module.load (internal/modules/cjs/loader.js:977:32)
    at Function.Module._load (internal/modules/cjs/loader.js:877:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:74:12)
    at internal/main/run_main_module.js:18:47
error Command failed with exit code 1.

... 
```

To resolve this issue run the following command from a bash prompt (included with git for windows installation):

```sh
dos2unix ./packages/\@okta/vuepress-site/conductor.yml
```

### Cannot resolve theme

Due to limitations of the Windows file system you may see the following error after running `yarn dev`:

```
yarn run v1.22.4
$ yarn workspace @okta/vuepress-site dev
$ yarn conductor:validate && vuepress dev .
$ node .vuepress/scripts/yml-parse-check.js
conductor.yml parse successful
conductor.yml exports correct values
conductor.yml end-of-file check successful
wait Extracting site metadata...
Error: Cannot resolve theme: @okta/vuepress-theme-prose.
    at resolveTheme (C:\src\repos\okta-developer-docs\node_modules\@vuepress\core\lib\node\loadTheme.js:111:13)        
    at loadTheme (C:\src\repos\okta-developer-docs\node_modules\@vuepress\core\lib\node\loadTheme.js:36:17)
    at App.process (C:\src\repos\okta-developer-docs\node_modules\@vuepress\core\lib\node\App.js:100:21)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async dev (C:\src\repos\okta-developer-docs\node_modules\@vuepress\core\lib\index.js:14:3)
error Command failed with exit code 1.

...
```

To resolve this issue run the following commands from a bash prompt (included with git for windows installation):

```sh
cd ./packages/\@okta/vuepress-theme-prose/
yarn link
cd ../../../
yarn link "@okta/vuepress-theme-prose"
```

Links:

- Developer docs: <https://developer.okta.com>
- Developer forum: <https://devforum.okta.com>
- VuePress software: <https://vuepress.vuejs.org>

See our updated wiki for full details on contributing to the developer documentation repo:

- [Home](https://github.com/okta/okta-developer-docs/wiki)
- [Getting set up](https://github.com/okta/okta-developer-docs/wiki/Getting-set-up)
- [Contributing to the site](https://github.com/okta/okta-developer-docs/wiki/Contributing-to-the-Site)
- [VuePress authoring guidelines](https://github.com/okta/okta-developer-docs/wiki/VuePress-Authoring-Guidelines)
- [Style guide](https://github.com/okta/okta-developer-docs/wiki/Style-Guide)
- [Deploying a doc release](https://github.com/okta/okta-developer-docs/wiki/Deploying-a-Doc-Release)
- [Creating a Guide](https://github.com/okta/okta-developer-docs/wiki/Creating-a-Guide)
- [Troubleshooting](https://github.com/okta/okta-developer-docs/wiki/Troubleshooting)

debug change that should not affect build ...
