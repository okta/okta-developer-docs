In the **General Settings** section:

* **Name** &mdash; enter a name for the Identity Provider configuration.
* **Client Id** &mdash; paste the app ID or client ID that you obtained when you configured the Identity Provider in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>.
* **Client Secret** &mdash; paste the secret that you obtained in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>.
* **Scopes** &mdash; leave the defaults. These scopes are included when Okta makes an OpenID Connect request to the Identity Provider.

    By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory.

In the **Endpoints** section:

Add the following endpoint URLs for the OpenID Connect Identity Provider that you are configuring. You can obtain the appropriate endpoints and the required scopes in the well-known configuration document for the Identity Provider (for example, `https://{theIdPdomain}/.well-known/openid-configuration`). See the [Well-known configuration URLs](/docs/guides/add-an-external-idp/openidconnect/configure-idp-in-okta/#well-known-configuration-urls) section for URL details for the Identity Providers that we support.

* **Issuer** &mdash; the identifier of the OpenID Connect provider. For example, where you created the Identity Provider app: `https://{theIdPdomain}/`
* **Authorization endpoint** &mdash; the URL of the Identity Provider's OAuth 2.0 authorization endpoint. For example: `https://{theIdPdomain}/oauth2/v1/authorize`
* **Token endpoint** &mdash; the URL of the Identity Provider's token endpoint for obtaining access and ID tokens. For example: `https://{theIdPdomain}/oauth2/v1/token`
* **JWKS endpoint** &mdash; the URL of the Identity Provider's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://{theIdPdomain}/oauth2/v1/keys`
* **Userinfo endpoint** &mdash; the endpoint for getting identity information about the user. For example: `https://{theIdPdomain}/oauth2/v1/userinfo`
