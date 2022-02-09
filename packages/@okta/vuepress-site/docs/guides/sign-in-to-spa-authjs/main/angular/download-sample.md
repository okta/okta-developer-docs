### Create a new Angular.js app (optional)

If you don't have an existing Angular app, you can quickly create a new app by using the [Angular CLI](https://angular.io/cli):

```bash
npm install -g @angular/cli
ng new okta-app
```

When asked `Would you like to add Angular routing?`, select `Y`.

For this example we are using `CSS` as the style engine. If you want to use `SCSS` or another style engine, you may need to make a few adjustments to the code snippets shown in this guide.

After all prompts have been answered, the Angular CLI creates a new project in a folder named `okta-app` and installs all required dependencies.

```bash
cd okta-app
```

### Install dependencies

Add the [latest version of Okta Auth JS](https://github.com/okta/okta-auth-js/releases) (`@okta/okta-auth-js`) and the [latest version of Okta Angular](https://github.com/okta/okta-angular/releases)(`@okta/okta-angular`) libraries to your Angular app. You can install them by using `npm` from your root app directory:

```bash
npm install @okta/okta-angular@latest
npm install @okta/okta-auth-js@latest
```
