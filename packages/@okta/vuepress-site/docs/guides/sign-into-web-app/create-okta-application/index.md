---
title: Create an Okta app integration
---
Before you can sign a user in, you need to create an Okta app integration that represents your web application.

1. Sign in to your Okta organization with your administrator account.

    <a href="https://developer.okta.com/login" target="_blank" class="Button--blue">Go to Admin Console</a>

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Web Application** as the **Application type** and click **Next**.
    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients aren't designed to have, hence breaking the sign-in or sign-out flow.
1. Enter a name for your app integration (or leave the default value).
1. Enter values for the **Sign-in redirect URIs**. This is the callback described in <GuideLink link="../define-callback">Understand the callback route</GuideLink>. Add values for local development (for example, `http://localhost:8080/authorization-code/callback`) and production (for example, `https://app.example.com/authorization-code/callback`).
1. Include a URI in the **Initiate login URI** box to have Okta initiate the sign-in flow. When Okta redirects to this endpoint (for example, `https://example:0000.com/login`), the client is triggered to send an authorize request. This URI is also used when users reset their passwords while signing in to the app. Okta redirects the user back to this URI after the password is reset so that the user can continue to sign in.
1. Add the **Base URI** of your application during local development, such as `http://localhost:3000`. Also, add any base URIs where your application runs in production, such as `https://app.example.com`.
1. Click **Save** to finish creating the Okta app integration.
1. On the **General** tab, the **Client Credentials** section shows the client ID and client secret values for your app integration.
1. Copy the **Client ID** and **Client secret** values using the **Copy to Clipboard** button beside each text field.
You need to copy some values into your application later, so leave your Admin Console open.

## Enable refresh token rotation

You can choose to [get a refresh token](/docs/guides/refresh-tokens/get-refresh-token/) along with the access token and/or ID token.

The default refresh token behavior is **Use persistent token** for web apps.

Rotating refresh tokens is an <ApiLifecycle access="ea"/> feature.
You can enable an [Early Access (Self-Service)](/docs/reference/releases-at-okta/#early-access-ea) feature for your org in the **Settings** > **Features** page inside the Admin Console.

To enable refresh token rotation in your app integration, do the following:

1. Open the web app integration that you just created and select the **General** tab.
1. Scroll to the **General Settings** panel, and click **Edit**.
1. In the **Allowed grant types**, select **Refresh Token**.
1. In the **Refresh Token** section, select **Rotate token after every use**.
    > **Note:** The default number of seconds for the **Grace period for token rotation** is set to 30 seconds. You can [change the value](/docs/guides/refresh-tokens/refresh-token-rotation/#enable-refresh-token-rotation) to any number between 0 and 60 seconds. After the refresh token is rotated, the previous token remains valid for this amount of time to allow clients to get the new token. Using a value of 0 indicates that there is no grace period.

## Enable Trusted Origins

To reduce possible attack vectors, you need to explicitly define the Trusted Origins that can access the Okta API for your app integration. Cross-Origin Resource Sharing (CORS) allows JavaScript hosted on your website to make a request using `XMLHttpRequest` to the Okta API with the Okta session cookie. For instructions on setting trusted origins, see [Grant cross-origin access to websites](/docs/guides/enable-cors/granting-cors/).

>**Note:** You should only grant access to specific origins (websites) that you control and trust to access the Okta API.

<NextSectionLink/>
