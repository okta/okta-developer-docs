To retain authentication control of your Vue.js single-page app (SPA) without redirection to Okta, you can implement the [embedded authentication](/docs/concepts/redirect-vs-embedded/#embedded-authentication) model with the help of Okta Auth JS and Okta Vue.js libraries. These libraries provide you with common, reusable OAuth 2.0 methods and properties to handle the interaction between the Okta authorization server and your client app. This allows you to customize the sign-in experience for your app with minimal use of low-level [Okta Authentication](/docs/reference/api/authn/) and [Okta OpenID Connect & OAuth 2.0](/docs/reference/api/oidc/) APIs.

The authentication interaction between the Okta authorization server and your client app follows the [Interaction Code](/docs/concepts/interaction-code/) flow. This Identity Engine flow is an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid/) standard that allows you to customize the user authentication experience for your app without redirecting to an authentication component outside your app. See [Implement authorization by Interaction Code grant type](/docs/guides/implement-grant-type/interactioncode/main/) to understand the Interaction Code flow and how to implement your authentication experience.

> **Note**: You can use the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) to quickly add embedded authentication if you don't need to customize your sign-in user experience. See [Sign in to your SPA with embedded Okta Sign-In Widget](/docs/guides/sign-in-to-spa-embedded-widget/vue/main/).

### Build Okta authentication with Auth JS in your SPA app

This guide explains how to build a password-only sign-in use case for your Vue.js app. This use case is outlined in the following sequence diagram with your single-page app as the client:

![Sequence diagram that displays the back and forth between the resource owner, sdk, authorization server, and resource server for a basic SPA password sign-in flow.](/img/oie-embedded-sdk/password-only-spa-authjs-flow.svg "Auth JS + SPA password-only sign-in flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Client (SPA)" as client
participant "Auth JS (SDK)" as sdk
participant "Authorization server (Okta)" as okta

autonumber "<b>#."
user -> client: Navigate to app sign-in page
client -> client: Display sign-in page, instantiate OktaAuth()
user -> client: Enter credentials
client -> sdk: Call idx.authenticate(username,password)
sdk -> okta: API request to authenticate user
okta -> sdk: Return Auth response
sdk -> client: Return tokens and idxStatus.SUCCESS
client -> user: Direct user to authenticated protected page
client -> client: For idxStatus.SUCCESS, store tokens in browser storage
client -> sdk: (Optional) Call token.getUserInfo() to get user info
sdk -> okta: (Optional) API request to get user info
okta -> sdk: (Optional) Return user info response
sdk -> client: (Optional) Return user info
client -> user:  (Optional) Display required user info
@enduml

-->
The steps to add Okta authentication described in the following sections focus on the interaction between your client app, the user, and the Auth JS SDK.

Before you build or integrate your Vue.js app, ensure that you:
* [enable the Interaction Code grant on you default Custom Authorization Server](/docs/guides/oie-embedded-common-org-setup/android/main/#update-the-default-custom-authorization-server)
* [set up your Okta org for a password-factor only use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-password-factor-only-use-case)
* register your Vue.js app in Okta by [creating an app integration](#create-an-okta-app-integration)

If you don't have an existing Vue.js app, you can [create a new basic Vue.js app](#create-a-new-vue-js-app) from the Vue CLI.

Add Okta authentication to your Vue.js app with the following steps:

 1. [Install dependencies](#install-dependencies): Install Okta libraries for your integration.
 2. [Create a custom sign-in form](#create-a-custom-sign-in-form): Create a custom sign-in form for your app.
 3. [Handle the basic sign-in flow](#basic-sign-in-flow): Write the code to handle 
 3. [Create routes](#create-routes): Create the routes for your app.
 4. [Connect the routes](#connect-the-routes): Connect your routes to the appropriate components.
 5. When you're done building your Vue.js app, [start your app](#start-your-app) to test your creation. Sign in with an [existing user from your Okta org](/docs/guides/quickstart/cli/main/#add-a-user-using-the-admin-console).

