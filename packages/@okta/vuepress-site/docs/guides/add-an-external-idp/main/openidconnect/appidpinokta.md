* **Name**: Enter a name for the Identity Provider configuration.
* **Scopes**: Leave the defaults. These scopes are included when Okta makes an OpenID Connect request to the Identity Provider.
    > **Note:** By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory.
* **Client ID**: Paste the app ID or client ID that you obtained when you configured the Identity Provider in the previous section.
* **Authentication type**: Leave the default of **Client secret** or select **Public key/private key** to automatically generate a public and private key pair. The private key is available for download when you click **Finish**.
* **Client Secret**: If you are using **Client secret** as the **Authentication type**, paste the secret that you obtained in the previous section.
* **Authorize requests**: Select **Enable signed requests** to send request parameters to the OpenID provider as an encoded JWT instead of passing the parameters in the URL. <ApiLifecycle access="ea" />
* **Algorithm**: Select the algorithm to use for the signed requests from the dropdown list. If you are using **Public key/private key**, you must specify an encryption algorithm, for example: **RSA256**. <ApiLifecycle access="ea" />

In the **Endpoints** section:

Add the following endpoint URLs for the OpenID Connect Identity Provider that you are configuring. You can obtain the appropriate endpoints and the required scopes in the well-known configuration document for the Identity Provider (for example, `https://${theIdPdomain}/.well-known/openid-configuration`).

* **Issuer**: The identifier of the OpenID Connect provider. For example, `https://${theIdPdomain}/`.
* **Authorization endpoint**: The URL of the Identity Provider's OAuth 2.0 authorization endpoint. For example: `https://${theIdPdomain}/oauth2/v1/authorize`
* **Token endpoint**: The URL of the Identity Provider's token endpoint for obtaining access and ID tokens. For example: `https://${theIdPdomain}/oauth2/v1/token`
* **JWKS endpoint**: The URL of the Identity Provider's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://${theIdPdomain}/oauth2/v1/keys`
* **Userinfo endpoint (optional)**: The endpoint for getting identity information about the user. For example: `https://${theIdPdomain}/oauth2/v1/userinfo`.

> **Note:** Okta requires an access token returned from the Identity Provider if you add the `/userinfo` endpoint URL.
