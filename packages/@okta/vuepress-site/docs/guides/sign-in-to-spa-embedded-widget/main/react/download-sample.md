### Create a React app (optional)

If you don't have an existing React app, you can quickly create an app by using the [Create React App command](https://create-react-app.dev/docs/getting-started/):

```js
npx create-react-app okta-app
cd okta-app
```

### Install dependencies

Add the [latest version of the Okta Sign-In Widget](https://github.com/okta/okta-signin-widget/releases) library to your React app. You can install it by using `npm` from your root app directory:

```bash
npm install @okta/okta-signin-widget@latest
```

You also need the [latest version of the Okta Auth JS SDK](https://github.com/okta/okta-auth-js/releases) (`@okta/okta-auth-js`) for Widget dependency:

```bash
npm install @okta/okta-auth-js@latest
```

Then install the [latest version of the Okta React SDK](https://github.com/okta/okta-react/releases) (`@okta/okta-react`) and `react-router-dom` to manage the routes:

```bash
npm install @okta/okta-react@latest
npm install react-router-dom
```

> **Note:** The sample code in this use case requires `react-router-dom` version 5.x. Certain objects used in the sample code does not exist in `react-router-dom` version 6.x.