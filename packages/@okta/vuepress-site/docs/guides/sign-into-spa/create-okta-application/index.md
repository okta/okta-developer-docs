---
title: Create an Okta app integration
---
Before you can sign a user in, you need to create an Okta app integration that represents your single-page application.

1. Sign in to your Okta organization with your administrator account.

    <a href="https://developer.okta.com/login" target="_blank" class="Button--blue">Go to Admin Console</a>

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-on method**.
1. Select **Single-Page Application** as the **Application type** and click **Next**.
    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have, and would break the sign-in or sign-out flow.
1. Enter a name for your app integration (or leave the default value).
1. Select **Authorization Code** and **Refresh Token** as the **Grant type**. This enables Authorization Code flow with PKCE for your application and the ability to refresh the access token when it expires without prompting the user to re-authenticate.
1. Enter values for the **Sign-in redirect URIs**. This is the callback from <GuideLink link="../define-callback/">Define a callback route</GuideLink>. Add values for local development (for example, `http://localhost:8080/login/callback` or `http://localhost:8080/authentication/login-callback` for Blazor) and production (for example, `https://app.example.com/login/callback`).
1. In the **Trusted Origins** section, add the **Base URI** of your application during local development, such as `http://localhost:8080`. Also, add any base URIs where your application runs in production, such as `https://app.example.com`. These URIs are added to the **Trusted Origins** for your Okta org and can be managed by navigating to **Security** > **API** and selecting the **Trusted Origins** tab. See [Enable Trusted Origins](#enable-trusted-origins).

1. In the **Assignments** section, select **Allow everyone in your organization to access** for everyone to access your app, or **Limit access to selected groups** and specify the groups that can access your app.
1. Click **Save** to finish creating the Okta app integration.
1. On the **General** tab, scroll to **General Settings** and click **Edit**.
1. If **Refresh Token** is selected as a **Grant type**, the **Refresh Token** section appears. [Refresh token rotation](/docs/guides/refresh-tokens/refresh-token-rotation) is automatically set as the default refresh token behavior.
    > **Note:** The default number of seconds for the **Grace period for token rotation** is set to 30 seconds. You can [change the value](/docs/guides/refresh-tokens/refresh-token-rotation/#enable-refresh-token-rotation) to any number between 0 and 60 seconds. After the refresh token is rotated, the previous token remains valid for this amount of time to allow clients to get the new token. Using a value of 0 indicates that there is no grace period.
1. Specify an **Initiate login URI** to have Okta initiate the sign-in flow. When Okta redirects to this URI (for example, `https://example:0000.com/login`), the client is triggered to send an authorize request. This URI is also used when users reset their passwords while signing in to the app. Okta redirects the user back to this URI after the password is reset so that the user can continue to sign in.
1. Click **Save** to update the Okta app settings.

## Enable Trusted Origins

To reduce possible attack vectors, you need to explicitly define the Trusted Origins that can access the Okta API for your app integration. Cross-Origin Resource Sharing (CORS) allows JavaScript hosted on your website to make a request using `XMLHttpRequest` to the Okta API with the Okta session cookie. For instructions on setting trusted origins, see [Grant cross-origin access to websites](/docs/guides/enable-cors/granting-cors/).

>**Note:** You should only grant access to specific origins (websites) that you control and trust to access the Okta API.

<NextSectionLink/>
