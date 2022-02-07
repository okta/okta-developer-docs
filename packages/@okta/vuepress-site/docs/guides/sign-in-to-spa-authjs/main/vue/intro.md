To retain authentication control of your Vue.js single-page app (SPA) without redirection to Okta, you can implement the [embedded authentication](/docs/concepts/redirect-vs-embedded/#embedded-authentication) model with the help of Okta Auth JS and Okta Vue.js libraries. These libraries provide you with common, reusable OAuth 2.0 methods and properties to handle the interaction between the Okta authorization server and your client app. This allows you to customize the sign-in experience for your app with minimal use of low-level [Okta Authentication](/docs/reference/api/authn/) and [Okta OpenID Connect & OAuth 2.0](/docs/reference/api/oidc/) APIs.

> **Note**: You can use the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) to quickly add embedded authentication if you don't need to customize your sign-in form and interaction. See [Sign in to your SPA with embedded Okta Sign-In Widget](/docs/guides/sign-in-to-spa-embedded-widget/vue/main/).

### Build Okta authentication with Auth JS to your SPA app

This guide explains how to build a password-only sign-in flow for your Vue.js app. Before you build or integrate your Vue.js app, ensure that you:
* [enable the Interaction Code grant on you default Custom Authorization Server](/docs/guides/oie-embedded-common-org-setup/android/main/#update-the-default-custom-authorization-server)
* [set up your Okta org for a password-factor only use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-password-factor-only-use-case)
* register your Vue.js app in Okta by [creating an app integration](#create-an-okta-app-integration)

If you don't have an existing Vue.js app, you can [create a new basic Vue.js app](#create-a-new-vue-js-app) from the Vue CLI.

Add Okta authentication to your Vue.js app with the following steps:

 1. [Install dependencies](#install-dependencies): Install Okta libraries for your integration.
 2. [Create a custom sign-in form](#create-a-custom-sign-in-form): Create a custom sign-in form for your app.
 3. [Create routes](#create-routes): Create the routes for your app.
 4. [Connect the routes](#connect-the-routes): Connect your routes to the appropriate components.
 5. When you're done building your Vue.js app, [start your app](#start-your-app) to test your creation. Sign in with an [existing user from your Okta org](/docs/guides/quickstart/cli/main/#add-a-user-using-the-admin-console).

> **Note**: These steps are described in detail from the linked sections of this guide.
