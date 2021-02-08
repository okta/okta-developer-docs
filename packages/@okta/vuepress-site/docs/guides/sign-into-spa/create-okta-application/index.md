---
title: Create an Okta app integration
---
Before you can sign a user in, you need to create an Okta app integration that represents your single-page application.

1. Sign in to your Okta organization with your administrator account.

    <a href="https://developer.okta.com/login" target="_blank" class="Button--blue">Go to Admin Console</a>

1. From the Admin Console side navigation, click **Applications** > **Applications**.
1. Click **Add Application** and click **Create New App**.
1. Pick **Single-Page App (SPA)** as the platform and click **Create**.
    > **Note:** It is important to choose the appropriate application type for apps which are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have, hence breaking the sign-in or sign-out flow.
1. Enter a name for your app integration (or leave the default value).
1. Enter values for the **Login redirect URI**. This is the callback from <GuideLink link="../define-callback/">Define a callback route</GuideLink>. Add values for local development (for example, `http://localhost:8080/login/callback`) and production (for example, `https://app.example.com/login/callback`).

<!-- removed the Base URI step (was step #6 here) until the new UI is updated to include it -->
<!-- 1. Add the **Base URI** of your application during local development, such as `http://localhost:8080`. Also, add any base URIs where your application runs in production, such as `https://app.example.com`.
-->

7. Click **Save** to finish creating the Okta app integration.
1. On the **General** settings tab, scroll to **General Settings** and click **Edit**.
1. In the **Allowed grant types**, make sure that **Authorization Code** and **Refresh Token** are selected.

   This enables PKCE flow for your application and the ability to refresh the access token when it expires without prompting the user to reauthenticate. [Refresh token rotation](/docs/guides/refresh-tokens/refresh-token-rotation) is automatically set as the default refresh token behavior.

    Refresh token rotation for SPA is an <ApiLifecycle access="ea"/> feature.
    You can enable an [Early Access (Self-Service)](/docs/reference/releases-at-okta/#early-access-ea) feature for your org in the **Settings** > **Features** page inside the Admin Console.

    > **Note:** The default number of seconds for the **Grace period for token rotation** is set to 30 seconds. You can [change the value](/docs/guides/refresh-tokens/refresh-token-rotation/#enable-refresh-token-rotation) to any number between 0 and 60 seconds. After the refresh token is rotated, the previous token remains valid for this amount of time to allow clients to get the new token. Using a value of 0 indicates that there is no grace period.

## Enable Trusted Origins

In order to reduce possible attack vectors, you need to explicitly define the Trusted Origins that can access the Okta API for your app integration. Cross-Origin Resource Sharing (CORS) allows JavaScript hosted on your website to make a request using `XMLHttpRequest` to the Okta API with the Okta session cookie. For instructions on setting trusted origins, see [Grant cross-origin access to websites](/docs/guides/enable-cors/granting-cors/).

>**Note:** You should only grant access to specific origins (websites) that you control and trust to access the Okta API.

<NextSectionLink/>
