---
title: Creating an Okta Application
---
# Create an Okta Application
In Okta, applications are OpenID Connect (OIDC) clients that can use Okta Authorization Aervers to authenticate users. Your Okta org already has a default Authorization Server, so you just need to create an OIDC client that uses it.

1. Sign in to the Okta Developer Console, click **Applications**, and then **Add Application**.
2. Select **Single-Page App (SPA)** as the platform, and then click **Next**.
3. Provide a name for your SPA application or leave the default value.
4. Enter the correct port in the **Base URIs** (`http://localhost:{port}`)  and **Login redirect URIs** (`http://localhost:{port}/implicit/callback`) boxes. 

If you are running this app locally and are using the defaults from the appropriate documentation, then your port is:

`<StackSelector snippet="port"/>`

5. Leave **Implicit** selected for **Grant Types Allowed**.
6. Click **Done**.
7. On the **General** tab of the app that you just created, click **Edit** and enter the correct URI in the **Logout redirect URIs** box. See [Sign Users Out](sign-users-outlink) for more information.

### Things You Need
After you create the application, there are two values that you need:

* **Client ID** - Find it in the applications list or on the **General** tab of a specific application.
* **Org URL** - Find it on the Developer console dashboard in the upper-right corner. 

These values are used in your application to set up the OpenID Connect flow with Okta.


