By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory. If your Identity Provider doesn't support this attribute, you can make it optional. See [Manage User Profiles](https://help.okta.com/en/prod/Content/Topics/Directory/eu-profile-editor.htm).

After you fill in your OpenID Connect Identity Provider's settings, add the following endpoint URIs for the generic OpenID Connect Identity Provider that you are configuring. You can find the endpoints in the well-known configuration document for the Identity Provider (for example, `https://theIdPorg.com/.well-known/openid-configuration`. 

For a list of fully-tested and supported Identity Providers, see [OpenID Connect Identity Providers](/docs/guides/federate-with-oidc/configure-idp/#openid-connect-identity-providers).

* **Issuer** - The identifier of the OpenID Connect provider. For example, the Okta org where you created the Identity Provider app: `https://theIdPorg.com`
* **Authorization endpoint** - The URL of the Identity Provider's OAuth 2.0 Authorization endpoint. For example: `https://theIdPorg.com/oauth2/v1/authorize`
* **Token endpoint** - The URL of the Identity Provider's token endpoint for obtaining access and ID tokens. For example: `https://theIdPorg.com/oauth2/v1/token`
* **JWKS endpoint** - The URL of the Identity Provider's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://theIdPorg.com/oauth2/v1/keys`
* **Userinfo endpoint** - The endpoint for getting identity information about the user. For example: `https://theIdPorg.com/oauth2/v1/userinfo`