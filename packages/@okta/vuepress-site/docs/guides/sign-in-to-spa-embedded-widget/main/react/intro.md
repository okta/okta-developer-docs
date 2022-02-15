If you want to deploy a React single-page app (SPA) in the embedded authentication model, where your app retains authentication control without redirection to Okta, then you can use the Okta Sign-In Widget (SIW) to quickly add authentication. The Okta SIW is a JavaScript library that includes full sign-in features with Okta Identity Engine so the amount of authentication code you have to write for your app is minimal.

Before you build your React app, ensure that you [set up](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#get-set-up) your [Okta org for your use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-your-use-case) and [register your React app in Okta](#register-your-app-in-okta).

### Build the React app

Build your React app by integrating the Okta libraries:

 * [Create a React app](#create-a-react-app)(optional): Create a new simple React.js app if you don't have an existing app.
 * [Install dependencies](#install-dependencies): Install the Okta libraries for the integration.
 * [Create Okta instances](#create-okta-instances): Create the Okta auth and SIW instances to be used in your app.
 * [Create a SIW wrapper](#create-a-siw-wrapper): Create a wrapper for the Sign-In Widget to be rendered as a React component.
 * [Create routes](#create-routes): Create the routes for your app.
 * [Connect the routes](#connect-the-routes): Connect your routes to the appropriate components.

[Start your app](#start-your-app) to test your creation. Sign in with an [existing user from your Okta org](/docs/guides/quickstart/cli/main/#add-a-user-using-the-admin-console).

After successfully authenticating with Okta, the app obtains the user's `id_token`, which contains basic claims for the user's identity. You can extend the set of claims by modifying the [scopes](/docs/reference/api/oidc/#scopes) to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/#scope-values). See [Sign users in to your SPA guide for Vue.js](/docs/guides/sign-into-spa/vue/main/#use-the-access-token) to learn how to use the user's `access_token` to protect routes and validate tokens.

See [Run the sample React app](#run-the-sample-react-app) for an example of a simple embedded authentication React app that uses the Okta SIW and libraries.
