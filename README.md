[<img src="https://devforum.okta.com/uploads/oktadev/original/1X/bf54a16b5fda189e4ad2706fb57cbb7a1e5b8deb.png" align="right" width="256px"/>][doc]

[![Support](https://img.shields.io/badge/support-developer%20forum-blue.svg)][devforum] [![Build Status](https://travis-ci.org/okta/okta.github.io.svg?branch=source)](https://travis-ci.org/okta/okta.github.io)

# Okta Developer Site

The [Okta developer site][doc] serves Okta's API documentation and guides, including:
- [API references](https://developer.okta.com/docs/api/resources/)
- [SDK references and sample code](https://developer.okta.com/documentation/)
- [Authentication quickstarts](https://developer.okta.com/quickstart/)
- [Developer Blog](https://developer.okta.com/blog/) (not published from this repo, see [https://github.com/okta/okta.github.io](okta/okta.github.io))

If you have questions or need help with Okta's APIs or SDKs, visit the **[Developer Forum][devforum]**. You can also email developers@okta.com to create a support ticket.

## Contributing
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
 1. Fork this repository (if you're an Okta employee, skip this step)
 2. Clone

 ```sh
 git clone git@github.com:okta/okta-developer-docs.git
 ```

3. Install the dependencies with `yarn`:
```sh
cd okta-developer-docs

yarn install
```

This will install everything you need to build the documentation on your machine.

### Building the site

With the above steps completed, you can start a local server by running this command inside the cloned directory:

```sh
yarn dev
```

This starts a preview server on your machine, and watches all files for changes. Open http://localhost:8080/documentation/ to view the documentation.

 > Note: if you try to visit the root, you will get a 404 page.  You must visit a path like `/documentation`.

The preview server supports hot reloading. Once the server is running on your machine, any changes you make to Markdown files will appear automatically in your browser within a few seconds.

## Adding and editing pages

Documentation pages are stored as Markdown files in the `/packages/@okta/vuepress-site` directory.

As an example, lets say you want to edit the [Users API](https://developer.okta.com/docs/api/resources/users) page. The public path of this page is `/docs/api/resources/users`.
To edit this page, you would navigate to `/packages/@okta/vuepress-site/docs/api/resources/users/index.md` and edit that Markdown file.

An `index.md` file in a directory like `users` will be served as `/users` when the site is live. If you name the file anything other than `index.md`, you will need to include `.html` in the URL when you view the page in your browser.


### Where do Pictures and Assets go?
All images and other assets will live in the folder `/packages/@okta/vuepress-site/.vuepress/public` and should be referenced as such.

### Using Components in Markdown
There are a few different components that can be used inside the markdown files to render some design specific html

#### Api Operations
The Api Operations component is used to render the html for defining an operation in our API reference

In the markdown, you can add
```html
<ApiOperation method="delete" url="/api/v1/apps" />
```
and this would render as:

<img src=".github/images/api-operations-rendered.png" width="150px"/>

Method value is used in the class to determine the background color.

get => $islamic-green (Green)

post => $sea-buckthorn (Orange)

put => $cerulean-5 (Blue)

delete => $valencia (Red)

#### Api Lifecycle
The API Lifecycle tag allows you to mark items as beta, ea, or deprecated.

In the markdown, you can add
```html
<ApiLifecycle access="beta" />
```
and this would render as:

<img src=".github/images/api-lifecycle-rendered.png" width="150px"/>

#### Category Links
If you need to include a list of links for a category group which was defined in the frontmatter, you can use the `CategoryLinks` component.

As long as you have the category defined in your markdowns frontmatter such as:

```
---
category: myCategory
---
```

You can then use the category links component:

```html
<CategoryLinks category="myCategory" />
```

A few options are provided for you to allow for some customization

| Property    | Description                                                                                   |
|-------------|-----------------------------------------------------------------------------------------------|
| category    | The category you want to display for the links. This is based on your markdown frontmatter    |
| linkPrefix  | [ADVANCED] This property allows you to include links based on the path, instead of a category |
| sort        | Allows you to sort based on the defined property                                              |
| showExcerpt | This property defaults to `true` and will display the frontmatter excerpt                     |


### What About Building the Site Before Committing?
There is no need to build the rendered site before committing and submitting a PR. This will all happen on the CI side to test and build the rendered site.

## Running tests
Running the tests before committing should be done and can be accomplished by running `yarn test` from the terminal. This will run a series of tests to make sure that everything is working as expected and that your changes did not affect anything that was not planned.

## Theme and Plugin Contribution
The theme and all plugins are no longer a part of the content side of this repo. All of the theme files live in `/packages/@okta/vuepress-theme-default` and all other plugins for the theme live in

[doc]: https://developer.okta.com
[devforum]: https://devforum.okta.com
[vuepress]: https://vuepress.vuejs.org
