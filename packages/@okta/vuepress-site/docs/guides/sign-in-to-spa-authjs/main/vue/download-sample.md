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

Add the [latest version of Okta Auth JS](https://github.com/okta/okta-auth-js/releases) (`@okta/okta-auth-js`) and the [latest version Okta Vue.js](https://github.com/okta/okta-vue/releases)(`@okta/okta-vue`) libraries to your Vue.js app. You can install them by using `npm` from your root app directory:

```bash
npm install @okta/okta-vue@latest
npm install @okta/okta-auth-js@latest
```
