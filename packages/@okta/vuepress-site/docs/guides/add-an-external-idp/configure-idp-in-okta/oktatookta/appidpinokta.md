In the **General Settings** section:

* **Name** &mdash; Enter a name for the Identity Provider configuration.
* **Client Id** &mdash; Paste the client ID that you obtained from the Okta org that represents the Identity Provider in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>. 
* **Client Secret** &mdash; Paste the secret that you obtained in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>. 
* **Scopes** &mdash; Leave the defaults. These scopes are included when your Okta org makes a request to the other Okta org that represents the Identity Provider.

    By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory. For Just In Time (JIT) provisioning, Okta requires the `firstName` and `lastName` attributes for a user. Include the `name` scope if the the Identity Provider needs to support JIT.

In the **Endpoints** section:

Add the following endpoint URLs for the Okta Identity Provider that you are configuring. In the Okta org that represents the Identity Provider, you can find the endpoints in the well-known configuration document (for example, `https://{theOktaIdPOrg}/.well-known/openid-configuration`.

* **Issuer** &mdash; The identifier of the Okta Identity Provider. For example, the Okta org where you created the Identity Provider app: `https://{theOktaIdPOrg}`
* **Authorization endpoint** &mdash; The URL of the Okta Identity Provider's OAuth 2.0 authorization endpoint. For example: `https://{theOktaIdPOrg}/oauth2/v1/authorize`
* **Token endpoint** &mdash; The URL of the Okta Identity Provider's token endpoint for obtaining access and ID tokens. For example: `https://{theOktaIdPOrg}/oauth2/v1/token`
* **JWKS endpoint** &mdash; The URL of the Okta Identity Provider's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://{theOktaIdPOrg}/oauth2/v1/keys`
* **Userinfo endpoint** &mdash; The endpoint for getting identity information about the user. For example: `https://{theOktaIdPOrg}/oauth2/v1/userinfo`
