* **Name**: Enter a name for the Identity Provider configuration.
* **Client ID**: Paste the app ID or client ID that you obtained when you configured the Identity Provider in the previous section.
* **Client Secret**: Paste the secret that you obtained in the previous section.
* **Scopes**: Leave the defaults. These scopes are included when Okta makes an OpenID Connect request to the Identity Provider.

    > **Note:** By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory.

* **Authorize requests**: Select **Enable signed requests** to send request parameters to the OpenID provider as an encoded JWT instead of passing the parameters in the URL. <ApiLifecycle access="ea" />
* **Algorithm**: Select the algorithm to use for the signed requests from the dropdown list. <ApiLifecycle access="ea" />

In the **Endpoints** section:

Add the following endpoint URLs for the OpenID Connect Identity Provider that you are configuring. You can obtain the appropriate endpoints and the required scopes in the well-known configuration document for the Identity Provider (for example, `https://${theIdPdomain}/.well-known/openid-configuration`).

* **Issuer**: The identifier of the OpenID Connect provider. For example, `https://${theIdPdomain}/`.
* **Authorization endpoint**: The URL of the Identity Provider's OAuth 2.0 authorization endpoint. For example: `https://${theIdPdomain}/oauth2/v1/authorize`
* **Token endpoint**: The URL of the Identity Provider's token endpoint for obtaining access and ID tokens. For example: `https://${theIdPdomain}/oauth2/v1/token`
* **JWKS endpoint**: The URL of the Identity Provider's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://${theIdPdomain}/oauth2/v1/keys`
* **Userinfo endpoint (optional)**: The endpoint for getting identity information about the user. For example: `https://${theIdPdomain}/oauth2/v1/userinfo`.

> **Note:** Okta requires an access token returned from the Identity Provider if you add the `/userinfo` endpoint URL.

In the optional **Authentication Settings** section:

* **IdP Username**: This is the expression (written in Okta Expression Language) that is used to convert an Identity Provider attribute to the application user's `username`. This Identity Provider username is used for matching an application user to an Okta User.

    For example, the value `idpuser.email` means that it takes the email attribute passed by the Identity Provider and maps it to the Okta application user's `username` property.

    You can enter an expression to reformat the value, if desired. For example, if the social username is `john.doe@mycompany.com`, then you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/) for more information.

* **Filter > Only allow usernames that match defined RegEx Pattern**: Select this option to only authenticate users from the <StackSnippet snippet="idp" inline /> IdP that have their transformed usernames matching a regular expression pattern in the text field that appears.