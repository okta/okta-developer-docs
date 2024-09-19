If you want to deploy a Vue.js single-page app (SPA) in the [embedded authentication](/docs/concepts/redirect-vs-embedded/#embedded-authentication) model, where your app retains authentication control without redirection to Okta, then you can use the [Okta Sign-In Widget](/docs/guides/embedded-siw/) to quickly add authentication. The Okta Sign-In Widget is a JavaScript library that includes support for full sign-in features with Okta so that the amount of authentication code you have to write for your app is minimal.

### Integrate the Sign-In Widget with your SPA app

This guide explains how to build a password-only sign-in flow for your Vue.js app. Before you build or integrate your Vue.js app, ensure that you:
* [enable the Interaction Code grant on your default custom authorization server](/docs/guides/oie-embedded-common-org-setup/android/main/#update-the-default-custom-authorization-server)
* register your Vue.js app in Okta by [creating an app integration](#create-an-okta-app-integration)

If you don't have an existing Vue.js app, you can [create a new basic Vue.js app](#create-a-new-vue-js-app-optional) from the Vue CLI.

Integrate the Sign-In Widget to your Vue.js app to add Okta authentication with the following steps:

 1. [Install dependencies](#install-dependencies): Install Okta libraries for your integration.
 2. [Load the Sign-In Widget](#load-the-sign-in-widget): Create the Sign-In Widget instance and a wrapper for the widget to be rendered as a Vue.js component.
 3. [Create routes](#create-routes): Create the routes for your app.
 4. [Connect the routes](#connect-the-routes): Connect your routes to the appropriate components.
 5. When you are done integrating the Sign-In Widget to your Vue.js app, [start your app](#start-your-app) to test your creation. Sign in with an existing user from your Okta org.

See [Run the sample Vue.js app](#run-the-sample-vue-js-app) for an example of a simple embedded authentication Vue.js app that uses the Okta libraries.

> **Note**: These steps are described in detail from the linked sections of this guide.
