To create a web app integration with an OpenID Connect (OIDC) sign-in:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OpenID Connect** for the **Sign-in method**.
1. Select **Web Application** for the **Application type**.
    > **Note:** **Web Application** is typically used for applications that use tokens in server-side code. For applications that use tokens in Angular, React, Vue, or other browser-side code, choose **Single-Page Application**.
1. Click **Next**.
1. From the **New Web App Integration** page, specify your **App integration name**.
1. Next to **Sign-in redirect URIs**, click **+ Add URI** to specify each sign-in redirect URI for your app. Okta sends OAuth authorization responses to the specified URIs, which are also known as callback endpoints. For the Okta sample **Web Application** apps, specify `http://localhost:8080/authorization-code/callback` as a sign-in redirect URI. For **Single-Page Application** samples, use `http://localhost:8080/login/callback`.
1. Next to **Sign-out redirect URIs**, click **+ Add URI** to specify the sign-out redirect URI. This setting lets you specify a URI to redirect the user’s browser to when they sign out. For the Okta sample **Web Application** app integrations, you don't need to specify a sign-out redirect URI. For **Single-Page Application** app integrations, use the base URI, e.g., `http://localhost:8080`.
1. Click **Save**.

Your registered app page is displayed.

From the **General** tab, save the following client credentials for your app build:

- **Client ID** &mdash; the public identifier for the client that is required for all OAuth flows
- **Client secret** &mdash; the secret key used by the client to exchange an authorization code for a token (must be kept confidential)

Remaining in the Admin Console, go to **Security** > **API**. From the **Authorization Servers** tab, save the following value from your **default** authorization server:

- **Issuer URI** &mdash; the authorization server URI that will perform authentication

If you create a **Single-Page Application**, make sure to register its trusted origin to enable CORS (Cross-Origin Resource Sharing). go to **Security** > **API**** > **Trusted Origins** and add `http://localhost:8080` (select both CORS and redirect).
