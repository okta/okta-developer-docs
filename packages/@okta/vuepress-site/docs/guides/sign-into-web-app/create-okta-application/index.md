---
title: Create an Okta application
---
Before you can sign a user in, you need to create an Okta application that represents your web application.

Start by signing in to the Okta Admin Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications** and then **Applications**

1. Click **Add Application**. Pick **Web** as the platform. Click **Next**.

1. Enter a name for your application (or leave the default value).

1. Add the **Base URI** of your application during local development, such as `http://localhost:3000`. Also, add any base URIs where your application runs in production, such as `https://app.example.com`.

1. Next, enter values for the **Login redirect URI**. This is the callback described in <GuideLink link="../define-callback">Understand the callback route</GuideLink>. Add values for local development (such as `http://localhost:8080/authorization-code/callback`) and production (such as `https://app.example.com/authorization-code/callback`).

1. Select **Refresh Token** when you want to [get a refresh token](/docs/guides/refresh-tokens/get-refresh-token/) along with the access token and/or ID token. See [Enable refresh token rotation](/docs/guides/sign-into-web-app/aspnet/create-okta-application#enable-refresh-token-rotation) for more information.

1. Click **Done** to finish creating the Okta application. You need to copy some values into your code later, so leave the Admin Console open.

## Enable refresh token rotation

The default refresh token behavior is **Use persistent token** for web apps. To enable refresh token rotation, do the following:

1. Open the Web app that you just created and select the **General** tab.
2. Click **Edit**.
3. In the **REFRESH TOKEN** section, select **Rotate token after every use**.
4. Make any adjustments to the number of seconds for the **Grace period for token rotation**. You can change the value to any number between 0 and 60 seconds. After the refresh token is rotated, the previous token remains valid for this amount of time to allow clients to get the new token.

<NextSectionLink/>
