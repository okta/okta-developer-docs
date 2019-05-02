[<img src="https://devforum.okta.com/uploads/oktadev/original/1X/bf54a16b5fda189e4ad2706fb57cbb7a1e5b8deb.png" align="right" width="256px"/>][doc]

[![Support](https://img.shields.io/badge/support-developer%20forum-blue.svg)][devforum] [![Build Status](https://travis-ci.org/okta/okta.github.io.svg?branch=source)](https://travis-ci.org/okta/okta.github.io)

# Okta Developer Site

The [Okta developer site][doc] serves Okta's API documentation and guides, including:
- [API references](https://developer.okta.com/docs/api/resources/)
- [SDK references and sample code](https://developer.okta.com/documentation/)
- [Authentication quickstarts](https://developer.okta.com/quickstart/)
- [Guides](https://developer.okta.com/guides/)
- [Developer Blog](https://developer.okta.com/blog/) (not published from this repo, see [https://github.com/okta/okta.github.io](okta/okta.github.io))

If you have questions or need help with Okta's APIs or SDKs, visit the **[Developer Forum][devforum]**. You can also email developers@okta.com to create a support ticket.

## Getting Started
Okta's developer documentation (this repo) is built using the [VuePress][vuepress] site generator.
There are currently 2 parts to the site, the content and the theming/plugins.

### Requirements
 - [Node](https://nodejs.org/en/download/): 8+
 - [Yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable): 1.7+

Before getting started, open a terminal window and make sure these commands work:

```sh
node --version

yarn --version
```

### Local setup
 1. Fork this repository
 2. Clone (use the **Clone or download** button above)

3. Install the dependencies with `yarn`:

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

This starts a preview server on your machine, and watches all files for changes. Open http://localhost:8080/documentation/ to view the documentation.

 > Note: if you try to visit the root, you will get a 404 page.  You must visit a path corresponding to a [directory under `vuepress-site`](https://github.com/okta/okta-developer-docs/tree/master/packages/%40okta/vuepress-site), like `/documentation`.

The preview server supports hot reloading. Once the server is running on your machine, any changes you make to Markdown content will appear automatically in your browser within a few seconds. Note that changes to page frontmatter or site configuration require you to stop and start the preview server.

## Adding and editing pages

Documentation pages are stored as Markdown files in the `/packages/@okta/vuepress-site` directory.

As an example, lets say you want to edit the [Users API](https://developer.okta.com/docs/api/resources/users) page. The public path of this page is `/docs/api/resources/users/`.
To edit this page, you would navigate to `/packages/@okta/vuepress-site/docs/api/resources/users/index.md` and edit that Markdown file.

An `index.md` file in a directory like `users` will be served as `/users/` when the site is live. If you name the file anything other than `index.md`, you will need to include `.html` in the URL when you view the page in your browser.

More information about writing content for VuePress can be found in our [VuePress Authoring Guidelines](https://github.com/okta/okta-developer-docs/wiki/VuePress-Authoring-Guidelines). There you will also find our [Style Guide](https://github.com/okta/okta-developer-docs/wiki/Style-Guide).

### What About Building the Site Before Committing?
There is no need to build the rendered site before committing and submitting a PR. This will all happen on the CI side to test and build the rendered site.

## Running tests
Running the tests before committing should be done and can be accomplished by running `yarn test` from the terminal. This will run a series of tests to make sure that everything is working as expected and that your changes did not affect anything that was not planned.

> Note: If you're already running the preview server locally, you can run `yarn test-only` instead. This skips starting up the preview server.

If your test run fails unexpectedly, try executing `yarn stop` and running the tests again.

## Theme and Plugin Contribution
The theme and plugins are in separate packages from content. All of the theme files live in `/packages/@okta/vuepress-theme-default` – see that package's readme for more info.

[doc]: https://developer.okta.com
[devforum]: https://devforum.okta.com
[vuepress]: https://vuepress.vuejs.org

## Updating Guides

### Guides Directory Structure

#### Summary

Each guide URL:
* `/guides/NAME-OF-GUIDE/NAME-OF-FRAMEWORK/NAME-OF-SECTION`
Maps to a directory tree:
* `guides/NAME-OF-GUIDE/NAME-OF-SECTION/index.md`
Framework-specific text/code bits are in separate files named 'snippets' that are referenced in the content by their snippet name.  Their content is found in:
* `guides/NAME-OF-GUIDE/NAME-OF-SECTION/NAME-OF-FRAMEWORK/SNIPPET-NAME.md`

#### Details

Every guide is based in a subdirectory under `guides/` in `packages/@okta/vuepress-site/`.  This directory name is used in the url of the guide, so follow best practices for URLs (human-readable, lowercase, no spaces, no special characters other than '-').

The file `guides/index.md` contains the meta-data for the guides overall in the [front matter](https://github.com/vuejs/vuepress/blob/master/packages/docs/docs/guide/frontmatter.md), notably, the ordered list of guides to offer and the ordered list of "featured" guides for the main Guides page. (TODO: Move content from GuidesOverview to this index.md file) If a guide is not listed here, it IS on the site but is NOT linked to.

Each guide directory will have a number of section subdirectories.  These are used in the urls for each section of the guide, so follow best practices for URLs in naming these directories.  Each guide directory has an `index.md` file that holds meta-data for the guide, notably the ordered list of section directories.  Any section directory not listed can be accessed on the site but will not be linked to.  Each section directory has an `index.md` file that holds the content for that section.

If a guide section has framework-specific content, you can use `<StackSelector snippet="SNIPPET-NAME"/>` where `SNIPPET-NAME` is a section-specific indicator of your choice.  This does NOT appear in a url, but please follow common filename conventions.

Content for the StackSelector snippets are found in `guides/NAME-OF-GUIDE/NAME-OF-SECTION/NAME-OF-FRAMEWORK/SNIPPET-NAME.md` files.

### Writing a guide

1. Create the guide directory
2. Create the guide index.md
3. Create a subdirectory for every section
4. Put your content into the `index.md` file for each section subdirectory
5. For any snippets you declare, create the `NAME-OF-FRAMEWORK/NAME-OF-SNIPPET.md` files in the section subdirectory
6. Make sure the `index.md` file for the section includes the title of the section
7. Make sure the `index.md` file for the guide includes the title for the guide and the list of all section subdirectories (in order)
8. Make sure the main guides `index.md` file lists your guide in the desired position in the order

### Using the "Stack Selector"

Many guide sections will have one or more areas of framework-specific content.  This can be code, instructions, or a mix of the two.  When a guide section has need of such content, simply use `<StackSelector snippet="SNIPPET-NAME"/>` in your section `index.md` content where you want some framework-specific content to appear.  The create the relevant content in `NAME-OF-FRAMEWORK/SNIPPET-NAME.md` files for every relevant framework.

### Writing framework-specific content

Each guide should have the same list of frameworks for all StackSelectors in all sections of that guide, however each individual guide can have a distinct list of frameworks that does not have to be the same as different guides. For example, a mobile guide might have `ios`, `android`, and `reactnative` frameworks, while a front-end web guide might have `react`, `angular`, and `vue` options.

The framework names in the directories should be lowercased and without special characters.  The list of frameworks supported with icons and human names are:
* android
* ios
* reactnative
* xamarin
* angular
* preact
* react
* vue
* go
* java
* php
* python
* spring
* dotnet
* netcore
* osx

### Linking between sections and guides

**Always** have a trailing slash at the end of your guides link.  (Example: `/guides/NAME-OF-GUIDE/-/NAME-OF-SECTION/`)

When linking between sections in the same guide, simply use a relative link to the appropriate section name, which will be one directory back. (Example: `../OTHER-SECTION/`)  This will preserve whatever framework the user currently has selected.

When linking between different guides, use `-` in place of the framework name - this will default the framework to the first option in the StackSelector for that guide.  Example: `/guides/NAME-OF-GUIDE/-/NAME-OF-SECTION/`

To link to another guide you can, but do not need to, link to a specific section.  If you link to just the guide, it will redirect the user to the first section using the default (first) framework option in the StackSelector.

Within the content of a guide the `<NextSectionLink>` component is available to link to different sections:

* `<NextSectionLink/>` - Provides a "button" link to the next section
* `<NextSectionLink>Some Example Text</NextSectionLink>` - Provides the "button" with different text
* `<NextSectionLink name="next-steps"/>` - Provides the "button" to link to the named section of the guide (doesn't have to be the "next" section)

