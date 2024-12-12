* **Name**: Enter a name for the IdP configuration.
* **Client Id**: Paste the client ID that you obtained from the Okta org that represents the IdP in the previous section.
* **Client Secret**: Paste the secret that you obtained in the previous section.
* **Scopes**: Leave the defaults. These scopes are included when your Okta org makes a request to the other Okta org that represents the IdP.

    > **Note:** By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to the Okta Universal Directory.

In the **Endpoints** section:

Add the following endpoint URLs for the Okta IdP that you're configuring. In the Okta org that represents the IdP, you can find the endpoints in the well-known configuration document (for example, `https://{theOktaIdPOrg}/.well-known/openid-configuration`).

* **Issuer**: The identifier of the Okta IdP. For example, the Okta org where you created the IdP app: `https://{theOktaIdPOrg}`
* **Authorization endpoint**: The URL of the Okta IdP's OAuth 2.0 authorization endpoint. For example: `https://{theOktaIdPOrg}/oauth2/v1/authorize`
* **Token endpoint**: The URL of the Okta IdP's token endpoint for obtaining access and ID tokens. For example: `https://{theOktaIdPOrg}/oauth2/v1/token`
* **JWKS endpoint**: The URL of the Okta IdP's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://{theOktaIdPOrg}/oauth2/v1/keys`
* **Userinfo endpoint (optional)**: The endpoint for getting identity information about the user. For example: `https://{theOktaIdPOrg}/oauth2/v1/userinfo`

> **Note:** Okta requires an access token returned from the IdP if you add the `/userinfo` endpoint URL.

In the optional **Authentication Settings** section:

* **IdP Username:** This is the expression (written in Okta Expression Language) that is used to convert an IdP attribute to the app user's username. This IdP username is used for matching an app user to an Okta user.

    For example, the value `idpuser.email` means that it takes the email attribute passed by the IdP and maps it to the Okta app user's username property.

    You can enter an expression to reformat the value, if desired. For example, if the social username is `john.doe@mycompany.com`, then you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/).

    > **Note:** When you use multi-tenancy, Okta recommends you add a unique username format with a suffix per spoke org. This prevents all potential impersonation, except with intentional scenarios such as using AD as the sign-in source for Okta.

* **Filter > Only allow usernames that match defined RegEx Pattern:** Select this option to only authenticate users with transformed usernames that match a regular expression pattern in the text field that appears. This filters the IdP username to prevent the IdP from authenticating unintended users. Users are only authenticated if the transformed username matches the regular expression pattern.

    For example, you could restrict an IdP for use only with users who have `@company.com` as their email address using the following expression: `^[A-Za-z0-9._%+-]+@company\.com`.

    > **Note:** When you use Okta for B2B or multi-tenancy use cases, select this checkbox. This helps you scope a subset of users in the org and enforce identifier constraints, such as email suffixes.

* **Account Link Policy**: Specify whether Okta automatically links the user's IdP account with a matching Okta account. See [Account link](#account-link).