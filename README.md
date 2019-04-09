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

## Contributing
The [Okta developer site][doc] is using [VuePress][vuepress] site generator. This allows the use of only yarn to install and build the site locally.
There are currently 2 parts to the site, the content and the theming/plugins.

### Requirements
 - Node: 8+
 - Yarn: 1.7+

### Installing the site.
 - Clone this repository (or fork if you aren't a core contributor):

 ```sh
 git clone git@github.com:okta/okta-developer-docs.git
 ```

- Install the dependencie with `yarn`:
```sh
yarn install
```

This will install all the modules you need for the site to run on your machine

### Viewing the Site Locally
Once you have the site cloned to your machine and installed, you will have to run the development environment to view the site.

 - Open Terminal and change directories into your cloned repo
 - Issue the `yarn dev` command
 - Once the command is done running, you can visit http://localhost:8080/documentation/ in your web browser to view the site.
 > Note: if you try to visit the root, you will get a 404 page.  You must visit a sub-path.

## Adding and Updating Content
As an example, lets say you want to edit the [Okta Angular Sign-in Widget](https://developer.okta.com/code/angular/okta_angular_sign-in_widget/) code page. The URL of this page is `/code/angular/okta_angular_sign-in_widget/`.
To edit this page, you would navigate to `/packages/@okta/vuepress-site/code/angular/okta_angular_sign-in_widget/index.md` to edit the content of this page.

The directory structure from the `/packages/@okta/vuepress-site` folder relates directly to the URL you want to show. The `index.md` file that lives in the last folder in the structure will be rendered.
If you name the file anything other than `index.md`, it will be required that you also include `.html` to the url when you go to view the page in the browser.

The [Guides](https://developer.okta.com/guides/) section has a more complex directory structure.  See the [Updating Guides](#updating-guides) section below.

Part of the power that the VuePress development server gives us is live reloading of the content. When you make any changes to the markdown of the file, you will see the changes on the browser within seconds.
However, if you make any chnages to the [front matter](https://github.com/vuejs/vuepress/blob/master/packages/docs/docs/guide/frontmatter.md) of the page, you may have to restart the development server.

## Testing Locally
Running the tests before committing should be done and can be accomplished by running `yarn test` from the terminal. This will run a series of tests to make sure that everything is working as expected and that your changes did not affect anything that was not planned.

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


## Theme and Plugin Contribution
The theme and all plugins are no longer a part of the content side of this repo. All of the theme files live in `/packages/@okta/vuepress-theme-default` and all other plugins for the theme live in

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

When linking between sections in the same guide, simply us a relative link to the appropriate section name.  This will preserve whatever framework the user currently has selected.

When linking between different guides, use `-` in place of the framework name - this will default the framework to the first option in the StackSelector for that guide.  Example: `/guides/NAME-OF-GUIDE/-/NAME-OF-SECTION`

To link to another guide you MUST link to a section of that guide - incomplete guide URLs will fallback to the main Guide Overview page.

