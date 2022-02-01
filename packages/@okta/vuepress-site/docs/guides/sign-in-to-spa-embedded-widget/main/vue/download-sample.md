### Create a new Vue.js app (optional)

If you don't have an existing Vue.js app, you can quickly create a new app by using the [Vue CLI](https://cli.vuejs.org/guide/installation.html):

```bash
npm install -g @vue/cli
vue create okta-app
```

* Manually select the following features: defaults and **Router**.
* Select **3.x** for the Vue.js version.
* Select **Y** for router history mode.

Go into your root app directory to view the created files:

```bash
cd okta-app
```

### Install dependencies

Add the [latest version of the Okta Sign-In Widget](https://github.com/okta/okta-signin-widget/releases) library to your Vue.js app. You can install it by using `npm` from your root app directory:

```bash
npm install @okta/okta-signin-widget@latest
```

You also need the [latest version Okta Vue.js SDK](https://github.com/okta/okta-vue/releases)(`@okta/okta-vue`) for route protection and the [latest version of Okta Auth JS SDK](https://github.com/okta/okta-auth-js/releases) (`@okta/okta-auth-js`) for Widget dependencies:

```bash
npm install @okta/okta-vue@latest
npm install @okta/okta-auth-js@latest
```