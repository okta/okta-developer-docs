---
title: Create an Okta application
---
Before you can sign a user in, you need to create an Okta application that represents your single-page application.

Start by signing in to the Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, then **Add Application**. Pick **Single-Page App (SPA)** as the platform. Enter a name for your application (or leave the default value).

2. Add the **Base URI** of your application during local development, such as `http://localhost:8080`. Also, add any base URIs where your application runs in production, such as `https://app.example.com`.

3. Next, enter values for the **Login redirect URI**. This is the callback from <GuideLink link="../define-callback/">Define a callback route</GuideLink>. Add values for local development (such as `http://localhost:8080/login/callback`) and production (such as `https://app.example.com/login/callback`).

4. For allowed grant types, make sure that both **Authorization Code** and **Refresh Token** are selected. This enables PKCE flow for your application and the ability to refresh the access token when it expires without prompting the user to reauthenticate. [Refresh token rotation](/docs/guides/refresh-tokens/refresh-token-rotation) is automatically set as the default refresh token behavior.

    Refresh tokens for SPA is an <ApiLifecycle access="ea"/> feature. Enable an [Early Access (Self-Service)](/docs/reference/releases-at-okta/#early-access-ea) feature for your org from the **Settings** > **Features** page in the Admin Console. To switch from the Developer Console to the Admin Console, select **Classic UI** in the top left of the page.

    > **Note:** There is a default grace period for token rotation of 30 seconds. You can [change the value](/docs/guides/refresh-tokens/refresh-token-rotation/#enable-refresh-token-rotation) to any number between 0 and 60 seconds. After the refresh token is rotated, the previous token remains valid for this amount of time to allow clients to get the new token. Using a value of 0 indicates that there is no grace period.

5. Click **Done** to finish creating the Okta Application. You need to copy some values into your code later, so leave the Developer Console open.

<NextSectionLink/>
