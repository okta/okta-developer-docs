---
title: Create an Okta Application
---
## Create an Okta Application

In Okta, applications are OpenID Connect (OIDC) clients that can use Okta Authorization Servers to authenticate users. Your Okta org already has a default Authorization Server, so you just need to create an OIDC client that uses it.

1. Sign in to the Okta Developer Console, click **Applications**, and then **Add Application**.
2. Select **Single-Page App (SPA)** as the platform, and then click **Next**.
3. Provide a name for your SPA application or leave the default value.
4. Enter values for **Base URIs**. You should add the base URI of your SPA application when you develop locally. Also add any additional base URIs where your SPA application is served in production.
5. Enter values for the **Login redirect URIs** boxes. The URI should load your SPA application at the specific route you have defined for the login redirct callback. See [Define the Login Redirect/Callback](define-the-login-redirect/callback). As with **Base URIs**, add values for local development and production.
6. Leave **Implicit** selected for **Grant Types Allowed**.
7. Click **Done**.
8. On the **General** tab of the app that you just created, click **Edit** and enter the correct URI in the **Logout redirect URIs** box. <!-- See [Sign Users Out](sign-users-outlink) for more information. -->

