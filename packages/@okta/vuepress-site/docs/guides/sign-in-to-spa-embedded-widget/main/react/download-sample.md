### Create a React app

If you don't have an existing React app, you can quickly create an app by using the [Create React App > Getting Started](https://create-react-app.dev/docs/getting-started/) guide:

```js
npx create-react-app okta-app
cd okta-app
```

### Install dependencies

Add the [latest version of the Okta Sign-In Widget](https://github.com/okta/okta-signin-widget/releases) library to your Vue.js app. You can install it by using `npm` from your root app directory:

```bash
npm install @okta/okta-signin-widget@latest
```

Then install `@okta/okta-auth-js`, `@okta/okta-react` and `react-router-dom` to manage the routes:

```js
npm install @okta/okta-auth-js @okta/okta-react react-router-dom
```
