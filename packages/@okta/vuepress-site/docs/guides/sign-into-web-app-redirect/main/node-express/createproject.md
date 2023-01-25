
1. Make sure that you have a recent version of [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.

1. Create an express application named `okta-express-quickstart` using the following command. This creates an express application that uses pug as the view engine.

   ```shell
   npx express-generator --view=pug okta-express-quickstart
   cd okta-express-quickstart
   npm install
   ```

> **Note**: This guide uses express v4.16.1, express-session v1.17.2, passport v0.5.2, and passport-openidconnect v0.1.1.

> **Note**: If you're using the Okta CLI, you can also run `okta start express` to create an app. This command creates an OIDC app in Okta, downloads the [okta-express-sample](https://github.com/okta-samples/okta-express-sample), and configures it to work with the OIDC app. This quickstart uses the basic Express starter app instead, as it's easier to understand the Okta-specific additions if you work through them yourself.
