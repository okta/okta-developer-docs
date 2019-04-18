# Okta Developer VuePress Theme
This theme contains our developer docs layouts, components, and styles. Content lives separately, in `/packages/@okta/vuepress-site`.

## Contributing
Contributions are welcome!

### Requirements
First, you'll need the site running locally. Start with the `okta-developer-docs` root readme.

### Dependencies
This theme uses [stylelint](https://stylelint.io) for SCSS linting. A plugin is likely available for your favorite text editor! Linting rules ([source](https://github.com/okta/okta-ui/blob/master/packages/nim/.stylelintrc.json)) are defined in `.stylelintrc`, and require supporting configuration files to be installed. (Most of our SCSS fails linting today; please clean what you touch.)

These dependencies should automatically be installed by a root `yarn install`. If not:
- Open a terminal in this package (`vuepress-theme-default`)
- Run `yarn install`

Okta's design system, [Nim](https://github.com/okta/okta-ui/tree/master/packages/nim) (private repo), is _not_ yet imported. See its documentation for a vision of things to come.

## SCSS
- `assets/css/` is the source SCSS directory.
- `assets/css/okta.scss` is the root file that is compiled to CSS. Abstracts are available in any file imported here.
- `assets/css/legacy/` includes a lot of legacy CSS. Avoid using legacy styles, and remove legacy files when possible.
- `assets/css/okta/` contains SCSS currently in use. Some should be migrated to Vue components over time; all should adopt Nim over time.
- `assets/css/okta/base/variables.scss` contains abstracts currently available for use.

<!-- ### Vue Components
Vue components, such as `ApiOperation`, can include styles scoped to the component. To use abstracts in a scoped context, import the Nim files you need:
```html
<style scoped lang="scss">
  @import '~@okta/nim/src/scss/abstracts/functions';
  @import '~@okta/nim/src/scss/abstracts/colors';
  span {
    color: cv('warning', 'base');
  }
</style>
```

Scoped imports will _not_ be de-duplicated through the asset pipeline. For better runtime performance, only import sources that will have no output when compiled.
-->
