You need recent versions of [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Be sure to install the [Vue CLI](https://cli.vuejs.org/) as it is required for the steps below.

1. Install Vue CLI with the following command:

   ```shell
   npm install -g @vue/cli@4.5.15
   ```

2. Create a Vue application named **okta-vue-quickstart** using the following command:

   ```shell
   vue create okta-vue-quickstart
   ```

3. You are asked to pick a present or manually select features. Choose `Manually select features`, and:

* In the `Check the features needed for your project` menu, make sure that `Choose Vue version`, `Babel`, `Router`, and `Linter / Formatter` are selected using the spacebar.
* Select **3.x** for the Vue.js version.
* Select **Y** for router history mode.
* Select the defaults for the other options.

4. Go into your app's root app directory to view the created files:

   ```shell
   cd okta-vue-quickstart
   ```

> **Note**: This sample application uses Vue CLI v4.5.15, okta-vue v5.1.1, and okta-auth-js v6.0.0.
