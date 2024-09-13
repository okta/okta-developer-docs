You can retain authentication control of your Vue.js single-page app (SPA) without redirection to Okta by implementing [embedded authentication](/docs/concepts/redirect-vs-embedded/#embedded-authentication). Use embedded authentication with the help of the Auth JS and Vue.js libraries. These libraries provide you with common, reusable OAuth 2.0 methods and properties to handle the interaction between the authorization server and your client app.

You can customize the sign-in experience for your app with minimal use of low-level [Okta Authentication](/docs/reference/api/authn/) and [Okta OpenID Connect (OIDC) and OAuth 2.0](/docs/reference/api/oidc/) APIs.

The authentication interaction between the authorization server and your client app follows the [Interaction Code](/docs/concepts/interaction-code/) flow. This flow is an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid/) standard. It allows you to customize the user authentication experience for your app without redirecting to an authentication component outside of your app. See [Implement authorization by Interaction Code grant type](/docs/guides/implement-grant-type/interactioncode/main/) to understand the Interaction Code flow and necessary interactions between the authorization server and your app.

> **Note**: You can use the [Okta Sign-In Widget](/docs/guides/embedded-siw) to quickly add embedded authentication if you don't need full customization capabilities for your sign-in user experience. The Sign-In Widget handles the Interaction Code flow in authentication use cases offered by Okta. See [Sign in to your SPA with embedded Okta Sign-In Widget](/docs/guides/sign-in-to-spa-embedded-widget/vue/main/).

### Build Okta authentication with Auth JS in your SPA app

This guide explains how to build a password-only sign-in use case for your Vue.js app. See [Next steps](#next-steps) for resources to other use cases.

Before you build or integrate your Vue.js app, ensure that you:
* [enable the Interaction Code grant on your default custom authorization server](/docs/guides/oie-embedded-common-org-setup/android/main/#update-the-default-custom-authorization-server)
* register your Vue.js app in Okta by [creating an app integration](#create-an-okta-app-integration)

If you don't have an existing Vue.js app, you can [create a new basic Vue.js app](#create-a-new-vue-js-app-optional) from the Vue CLI.

Add Okta authentication to your Vue.js app with the following steps:

 1. [Install dependencies](#install-dependencies): Install Okta libraries for your integration.
 2. [Implement the basic sign-in flow](#basic-sign-in-flow):

    * [Set up the Okta configuration settings](#set-up-the-okta-configuration-settings) to initialize the Okta Auth JS instance with your app.
    * [Create a custom sign-in form](#create-the-sign-in-component) and handle the response from the Auth JS SDK.
    * [Create the Vue.js app and instantiate the Okta Auth JS client](#create-the-vue-js-app-and-instantiate-the-okta-auth-js-client).
    * [Create routes](#create-routes) for your app.
    * [Connect the routes](#connect-the-routes) to the appropriate components.
 3. When you're done building your Vue.js app, [start your app](#start-your-app) to test your creation. Sign in with an existing user from your Okta org.
