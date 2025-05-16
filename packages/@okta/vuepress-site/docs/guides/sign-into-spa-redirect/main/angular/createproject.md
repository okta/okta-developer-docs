
You need recent versions of [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Okta also recommends installing the [Angular CLI](https://angular.dev/tools/cli).

Create an Angular app named **okta-angular-quickstart** using the following command. Choose any style sheet format you want when it asks you which format you want to use.

```shell
npx @angular/cli@19 new okta-angular-quickstart --ssr=false
```

This creates an Angular app using version 19 regardless of the version of the Angular CLI installed on your system.

> **Note**: This guide uses Angular CLI v19, okta-angular v6.4.0, and Okta Auth JavaScript SDK v7.8.0.

> **Note**: This quickstart uses the basic Angular CLI output instead, as it's easier to understand the Okta-specific additions if you work through them yourself.
