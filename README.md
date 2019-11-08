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
