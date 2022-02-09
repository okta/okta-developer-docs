To retain authentication control of your Angular single-page app (SPA) without redirection to Okta, you can implement the [embedded authentication](/docs/concepts/redirect-vs-embedded/#embedded-authentication) model with the help of Okta Auth JS and Okta Vue.js libraries. These libraries provide you with common, reusable OAuth 2.0 methods and properties to handle the interaction between the Okta authorization server and your client app. This allows you to customize the sign-in experience for your app with minimal use of low-level [Okta Authentication](/docs/reference/api/authn/) and [Okta OpenID Connect & OAuth 2.0](/docs/reference/api/oidc/) APIs.

> **Note**: You can use the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) to quickly add embedded authentication if you don't need to customize your sign-in form and interaction. See [Sign in to your SPA with embedded Okta Sign-In Widget](/docs/guides/sign-in-to-spa-embedded-widget/angular/main/).

### Build Okta authentication with Auth JS to your SPA app

This guide explains how to build a password-only sign-in flow for your Angular app. Before you build or integrate your Angular app, ensure that you:

* [enable the Interaction Code grant on you default Custom Authorization Server](/docs/guides/oie-embedded-common-org-setup/android/main/#update-the-default-custom-authorization-server)
* [set up your Okta org for a password-factor only use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-password-factor-only-use-case)
* register your Angular app in Okta by [creating an app integration](#create-an-okta-app-integration)

If you don't have an existing Angular app, you can [create a new basic Angular app](#create-a-new-angular-js-app) from the Angular CLI.
