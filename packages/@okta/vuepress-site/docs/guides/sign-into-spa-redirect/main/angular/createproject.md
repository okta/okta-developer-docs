
You need recent versions of [Node](https://nodejs.org/en/) and  [npm](https://www.npmjs.com/). We also recommend installing the [Angular CLI](https://angular.io/cli).

Create an Angular application named **okta-angular-quickstart** with routing in your current directory using the following command. Choose **CSS** when it asks you what stylesheet format you want to use.

```shell
npx @angular/cli@15 new okta-angular-quickstart --routing
```

This creates an Angular application using version 14 regardless of the version of the Angular CLI installed on your system.

> **Note**: This guide uses Angular CLI v15, okta-angular v6.1.0, and okta-auth-js v7.2.0.

> **Note**: You can also install the Okta CLI and run `okta start angular` to download and configure an Angular app with Okta integrated. This quickstart uses the basic Angular CLI output instead, as it's easier to understand the Okta-specific additions if you work through them yourself.
