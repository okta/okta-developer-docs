You will need recent versions of [Node](https://nodejs.org/en/) and  [npm](https://www.npmjs.com/). Installation of [Vue CLI](https://cli.vuejs.org/) is required as we use it below.

1. Install Vue CLI with the following command:

```shell
npm install -g @vue/cli@4.5.15
```

2. Create a Vue application named "okta-vue-quickstart" using the Vue CLI:

```shell
vue create okta-vue-quickstart
```

* Manually select the following features: defaults and Router.
* Select 3.x for the Vue.js version.
* Select Y for router history mode.

3. Go into your root app directory to view the created files:

```shell
cd okta-vue-quickstart
```

> **Note**: This sample application uses Vue CLI v4.5.15, okta-vue v5.1.1, and okta-auth-js v6.0.0.