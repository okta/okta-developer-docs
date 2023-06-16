If you want to deploy a React single-page app (SPA) in the [embedded authentication](/docs/concepts/redirect-vs-embedded/#embedded-authentication) model, where your app retains authentication control without redirection to Okta, then you can use the Okta Sign-In Widget to quickly add authentication. The Sign-In Widget is a JavaScript library that includes full sign-in features with Okta so the amount of authentication code you have to write for your app is minimal.

### Integrate the Sign-In Widget with your SPA app

This guide explains how to build a password-only sign-in flow for your React app. Before you build or integrate your React app, ensure that you:

* [enable the Interaction Code grant on your default custom authorization server](/docs/guides/oie-embedded-common-org-setup/android/main/#update-the-default-custom-authorization-server)
* register your React app in Okta by [creating an app integration](#create-an-okta-app-integration)

If you don't have an existing React app, you can [create a new basic React app](#create-a-react-app-optional) from the Create React App command.

Integrate the Sign-In Widget to your React app to add Okta authentication with the following steps:

 1. [Install dependencies](#install-dependencies): Install the Okta libraries for the integration.
 2. [Load the Sign-In Widget](#load-the-sign-in-widget): Create the Sign-In Widget wrapper for the widget to be rendered as a React component.
 3. [Create the routes](#create-the-routes): Create the route components for your app.
 4. [Connect the routes](#connect-the-routes): Connect your routes to the appropriate components.
 5. When you are done integrating the Sign-In Widget to your React app, [start your app](#start-your-app) to test your creation. Sign in with an existing user from your Okta org.

See [Run the sample React app](#run-the-sample-react-app) for an example of a simple embedded authentication React app that uses the Okta Sign-In Widget and libraries.
