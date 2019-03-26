---
<<<<<<< HEAD
title: Add and Configure Packages
---
## Add and Configure Packages

Next you need to add Okta to your application. You can use our SDKs to sign the user in by redirecting to Okta.

## Install the SDK
Install the SDK and add it as a dependency to your project. Using npm:

<StackSelector snippet="installsdk"/>

### Configure the Middleware

You need the Client ID that you copied from the Okta application that you created earlier to instantiate the middleware. You also need to know your Okta org URL, which you can find on the dashboard of the Okta Developer console.

The `issuer` parameter is your Okta Org URL + `oauth2/default`.

<StackSelector snippet="config"/>

> Note: `https://okta.okta.com` is different from your admin URL. Don't include `-admin` in the value.

<StackSelector snippet="attachcomponentsetc"/>
=======
title: Creating an Okta Application
---
# Create an Okta Application
In Okta, applications are OpenID Connect (OIDC) clients that can use Okta Authorization Aervers to authenticate users. Your Okta org already has a default Authorization Server, so you just need to create an OIDC client that uses it.

1. Sign in to the Okta Developer Console, click **Applications**, and then **Add Application**.
2. Select **Single-Page App (SPA)** as the platform, and then click **Next**.
3. Provide a name for your SPA application or leave the default value.
4. Enter values for **Base URIs**. You should add the base URI of your SPA application when you develop locally. Also add any additional base URIs where your SPA application is served in production.

5. Enter values for **Login redirect URIs** boxes. The URI should load your SPA application at the specific route you have defined for the login redirct callback. (See [Login Redirect / Callback](login-redirect-callback)) As with **Base URIs**, add values for local development and production.

6. Leave **Implicit** selected for **Grant Types Allowed**.
7. Click **Done**.
8. On the **General** tab of the app that you just created, click **Edit** and enter the correct URI in the **Logout redirect URIs** box. See [Sign Users Out](sign-users-outlink) for more information.
>>>>>>> bb923a3... further clarification on config

