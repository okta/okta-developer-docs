You need recent versions of [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/).

1. Create a Vue app using the following command:

   ```shell
   npm create vue@3.11.2
   ```

1. You're asked to name the project and manually select features. Name the project `okta-vue-quickstart` and:

    * Select **No** for TypeScript.
    * Select **No** for JSX Support.
    * Select **Y** to add Vue Router for SPA development.
    * Select the defaults for the other options.

1. Go into your app's root app directory to view the created files and install dependencies:

   ```shell
   cd okta-vue-quickstart
   npm install
   ```

> **Note**: This sample app uses create-vue v3.11.2, okta-vue v5.7.0, and okta-auth-js v7.8.1.
