
Start with the basics. You need recent versions of [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/), and Okta also recommends installing the [Angular CLI](https://angular.dev/tools/cli).

Create an Angular app named **okta-angular-quickstart** using the following command. When the CLI prompts you for a style sheet format, choose whichever one you prefer.

```shell
npx @angular/cli@21 new okta-angular-quickstart --ssr=false
```

This creates the app using Angular version 21 regardless of which version of the Angular CLI you've installed on your system.

> **Note**: This guide uses Angular CLI v21, okta-angular v8.0.0, and Okta Auth JavaScript SDK v8.0.1.

> **Note**: This quickstart uses the basic Angular CLI output, as it's easier to understand the Okta-specific additions if you work through them yourself.
