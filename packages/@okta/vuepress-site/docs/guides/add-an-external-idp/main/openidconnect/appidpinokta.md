* **Name**: Enter a name for the Identity Provider configuration.
* **Authentication method reference (AMR) claims**: Select **Trust AMR claims from this identity provider** to have Okta evaluate that AMR claims sent in the IdP response meet sign-on policy requirements. <ApiLifecycle access="ea" />

    > **Note:** Ensure that the IdP includes the correct AMR claims in the IdP response and that the claims match the requirements of your [sign-on policies](/docs/guides/configure-signon-policy/main/). If the claims don't satisfy the requirements, then users can't sign in to the application.

* **Scopes**: Leave the defaults. These scopes are included when Okta makes an OpenID Connect request to the Identity Provider.
    > **Note:** By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to the Okta Universal Directory.
* **Client ID**: Paste the app ID or client ID that you obtained when you configured the Identity Provider in the previous section.
* **Authentication type**: Leave the default of **Client secret** or select **Public key/private key** to automatically generate a public and private key pair. The public key is available for download when you click **Finish**.

* **Client Secret**: If you're using **Client secret** as the **Authentication type**, paste the secret that you obtained in the previous section.
* **Authorize requests**: Select **Enable signed requests** to send request parameters to the OpenID provider as an encoded JWT instead of passing the parameters in the URL.
* **Algorithm**: Select the algorithm to use for the signed requests from the dropdown list. If you're using the **Public key/private key** option, you must specify a signing algorithm, for example: **RSA256**.

    > **Note:** The **Algorithm** is used to sign authorize requests and to generate bearer assertions when you use a private/public key pair for `/token` endpoint authentication.

In the **Endpoints** section:

Add the following endpoint URLs for the OpenID Connect Identity Provider that you're configuring. You can obtain the appropriate endpoints and the required scopes in the well-known configuration document for the Identity Provider (for example, `https://${theIdPdomain}/.well-known/openid-configuration`).

* **Issuer**: The identifier of the OpenID Connect provider. For example, `https://${theIdPdomain}/`.
* **Authorization endpoint**: The URL of the Identity Provider's OAuth 2.0 authorization endpoint. For example: `https://${theIdPdomain}/oauth2/v1/authorize`
* **Token endpoint**: The URL of the Identity Provider's token endpoint for obtaining access and ID tokens. For example: `https://${theIdPdomain}/oauth2/v1/token`
* **JWKS endpoint**: The URL of the Identity Provider's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://${theIdPdomain}/oauth2/v1/keys`
* **Userinfo endpoint (optional)**: The endpoint for getting identity information about the user. For example: `https://${theIdPdomain}/oauth2/v1/userinfo`.

> **Note:** Okta requires an access token returned from the Identity Provider if you add the `/userinfo` endpoint URL.

In the optional **Authentication Settings** section:

* **IdP Username**: This is the expression (written in Okta Expression Language) that is used to convert an Identity Provider attribute to the application user's `username`. This Identity Provider username is used for matching an application user to an Okta user.

    For example, the value `idpuser.email` means that it takes the email attribute passed by the Identity Provider and maps it to the Okta application user's `username` property.

    You can enter an expression to reformat the value, if desired. For example, if the social username is `john.doe@mycompany.com`, then you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/).

* **Filter > Only allow usernames that match defined RegEx Pattern**: Select this option to only authenticate users with transformed usernames that match a regular expression pattern in the text field that appears. This filters the IdP username to prevent the IdP from authenticating unintended users. Users are only authenticated if the transformed username matches the regular expression pattern.

    > **Note:** When you use Okta for B2B or multi-tenancy use cases, select this checkbox. This helps you scope a subset of users in the org and enforce identifier constraints, such as email suffixes.

    For example, you could restrict an IdP for use only with users who have `@company.com` as their email address using the following expression: `^[A-Za-z0-9._%+-]+@company\.com`.

* **Account Link Policy**: Specify whether Okta automatically links the user's IdP account with a matching Okta account. See [Account link](#account-link).

   If the account link policy is automatic, when any validated OIDC JWT is provided, Okta searches the Universal Directory for a user's profile to link. The user profile is found when the **IdP username** value (email) passed by the IdP matches the **Match against** value (username). If there's a match, then the user is linked by mapping the required, static `sub` claim provided in the JWT to that user.

   After an account is linked, any validated JWT token with the same `sub` claim (which is mapped to the `idp.externalId` in the Identity Provider profile) is automatically mapped to the same user. This happens regardless of the content of the claims in the JWT or if the values for **IdP username** and **Match against** no longer result in a match.