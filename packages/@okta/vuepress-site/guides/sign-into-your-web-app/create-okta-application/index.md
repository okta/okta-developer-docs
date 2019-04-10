---
title: Create an Okta Application
---
## Create an Okta Application

In Okta, applications are OpenID Connect (OIDC) clients that can use Okta Authorization Servers to authenticate users. Your Okta org already has a default Authorization Server, so you just need to create an OIDC client that uses it.

1. Sign in to the Okta Developer Console, click **Applications**, and then **Add Application**.
2. Select **Web** as the platform, and then click **Next**.
3. Provide a name for your Web application or leave the default value.
4. Enter the correct port and URI for the **Base URIs** and **Login redirect URIs** boxes. 
5. Leave the default values for **Group assignments** and **Grant Types Allowed**.
6. Click **Done**.
7. On the **General** tab of the app that you just created, click **Edit** and enter the correct URI in the **Logout redirect URIs** box. See [Sign Users Out] for more information.

### Things You Need

After you create the application, there are three values that you need:

* **Client ID** - Find it in the applications list or on the **General** tab of a specific application.
* **Client secret** - Find it on the **General** tab of the application.
* **Org URL** - Find it on the Developer console dashboard in the upper-right corner. 

These values are used in your application to set up the OpenID Connect flow with Okta.

<NextSectionLink/>
