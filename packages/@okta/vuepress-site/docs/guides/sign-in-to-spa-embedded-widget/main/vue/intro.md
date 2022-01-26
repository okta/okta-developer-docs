If you want to deploy a Vue.js single-page app (SPA) in the [embedded authentication](/docs/concepts/redirect-vs-embedded/#embedded-authentication) model, where your app retains authentication control without redirection to Okta, then you can use the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) to quickly add authentication. The Okta Sign-In Widget is a JavaScript library that includes full sign-in features with Okta Identity Engine so the amount of authentication code you have to write for your app is minimal.

### Integrate the Sign-In Widget with your SPA app

Before you build or integrate your Vue.js app, ensure that you [set up](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#get-set-up) your [Okta org for your use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-your-use-case) and register your Vue.js app in Okta by [creating an app integration](#create-an-okta-app-integration).

If you don't have an existing Vue.js app, you can [create a new basic Vue.js app](#create-a-new-vue-js-app) from the Vue CLI.

Integrate the Sign-In Widget to your Vue.js app to add Okta authentication:

 * [Install dependencies](#install-dependencies): Install Okta libraries for your integration.
 * [Load the Sign-In Widget](#load-the-sign-in-widget): Create the Sign-In Widget instance and a wrapper for the Widget to be rendered as a Vue.js component.
 * [Create routes](#create-routes): Create the routes for your app.
 * [Connect the routes](#connect-the-routes): Connect your routes to the appropriate components.
 * When you are done integrating the Sign-In Widget to your Vue.js app, [start your app](#start-your-app) to test your creation. Sign in with an [existing user from your Okta org](/docs/guides/quickstart/cli/main/#add-a-user-using-the-admin-console).

See [Run the sample Vue.js app](#run-the-sample-vue-js-app) for an example of a simple embedded authentication Vue.js app that uses the Okta libraries.
