Use Okta Auth JS and Vue.js libraries to implement the [embedded authentication](/docs/concepts/redirect-vs-embedded/#embedded-authentication) model for your Vue.js single-page app (SPA), where your app retains authentication control without redirection to Okta. The Okta libraries provide you with the flexibility to handle the interaction between the Okta authorization server and your client app with common, re-usable OAuth 2.0 methods and properties. This flexibility allows you to customize the sign-in experience for your app with minimal use of low-level [Okta Authentication API](/docs/reference/api/authn/) and [Okta OpenID Connect &OAuth 2.0 API](/docs/reference/api/oidc/).

> **Note**: You can use the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) to quickly add embedded authentication if you don't need to customize your sign-in form and interaction. See [Sign in to your SPA with embedded Okta Sign-In Widget](/docs/guides/sign-in-to-spa-embedded-widget/vue/main/).

### Build Okta authentication with Auth JS to your SPA app

Before you add Okta authentication to your Vue.js app, ensure that you [set up](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#get-set-up) your [Okta org for your use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-your-use-case) and register your Vue.js app in Okta by [creating an app integration](#create-an-okta-app-integration).

If you don't have an existing Vue.js app, you can [create a new basic Vue.js app](#create-a-new-vue-js-app) from the Vue CLI.

Add Okta authentication to your Vue.js app:

 1. [Install dependencies](#install-dependencies): Install Okta libraries for your integration.
 2. [Load the Sign-In Widget](#load-the-sign-in-widget): Create the Sign-In Widget instance and a wrapper for the Widget to be rendered as a Vue.js component.
 3. [Create routes](#create-routes): Create the routes for your app.
 4. [Connect the routes](#connect-the-routes): Connect your routes to the appropriate components.
 5. When you are done integrating the Sign-In Widget to your Vue.js app, [start your app](#start-your-app) to test your creation. Sign in with an [existing user from your Okta org](/docs/guides/quickstart/cli/main/#add-a-user-using-the-admin-console).

See [Run the sample Vue.js app](#run-the-sample-vue-js-app) for an example of a simple embedded authentication Vue.js app that uses the Okta libraries.

> **Note**: These steps are described in the linked sections of this guide.
